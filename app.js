#!/usr/local/bin/node

const express = require('express')
const pty = require('node-pty')
const {spawn} = require("child_process")
const http = require('http')
const websocket = require('ws')

const default_files = require('./default_files.json')

const app = express()
app.disable('x-powered-by')
const port = 8081;

// set up rate limiter: maximum of five requests per minute
const RateLimit = require('express-rate-limit');
const limiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per windowMs
    validate: {xForwardedForHeader: false},
});

// apply rate limiter to all requests
app.use(limiter);

app.use(express.json({limit: "1gb"}));
app.use(express.urlencoded({limit: "1mb", extended: false}));

app.use('/contents', express.static('contents'));
app.get('/contents/ide/ark/', (req, res) => {
    res.send(default_files);
});

const server = http.createServer(app).listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});

const websocketServer = new websocket.Server({server, path: '/terminal'});

setInterval(function ping() {
    if (websocketServer.clients.size > 0) {
        websocketServer.clients.forEach(function each(socket) {
            if (socket.isAlive === false) return socket.terminate()

            socket.isAlive = false;
            socket.ping(websocketServer.clients.size)
            socket.send('2' + websocketServer.clients.size)
        })
    }
}, 5000)

let dockerCount = 0
let docker_seq = 0

websocketServer.on('connection', (ws, req) => {
    docker_seq = docker_seq > 99999999 ? 0 : docker_seq + 1
    const docker_name = 'RS' + `0000000${docker_seq}`.slice(-8)

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const lang = req.headers["accept-language"]
    const locale = 'C'
    console.log(new Date().toString(), 'connected...', ip, docker_name, lang)

    const child = pty.spawn('docker', [
        'run',
        '--env',
        `LANG=${locale}.UTF-8`,
        '--env',
        `DOCKER_NAME=${docker_name}`,
        '-it',
        '--name',
        docker_name,
        '--rm',
        '--entrypoint=/bin/sh',
        'arkscript/nightly',
    ], {
        name: 'xterm-color',
    })
    console.log('forking docker: ', docker_name, child.pid)
    dockerCount++

    child.onData((data) => {
        ws.send('1' + data.toString())
    })
    child.onExit((code) => {
        ws.close()
        dockerCount--
        console.log('child closed', docker_name, child.pid, code)
    })

    ws.on('message', (message, isBinary) => {
        const decoded = !isBinary ? message.toString() : message
        console.log(decoded)
        const cmd = decoded[0]
        switch (cmd) {
            case '1':
                if (message) {
                    const msg = decoded.slice(1)
                    child.write(msg)
                }
                break
            case '2': /* resize */
                const size = decoded.split(' ')
                child.resize(parseInt(size[1]), parseInt(size[2]))
                break
        }
    })
    ws.on('close', (e) => {
        spawn('docker', ['kill', docker_name]).on('close', () => {
            console.log('socket closed...', new Date().toString(), docker_name, child.pid, e)
        })
    })
    ws.on('error', (err) => {
        console.log('error occurred', err)
    })
    ws.on('pong', () => {
        ws.isAlive = true
    })
})
