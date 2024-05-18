#!/usr/local/bin/node

const express = require('express')
const pty = require('node-pty')
const fs = require('fs')
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
    const docker_name = `RS0000000${docker_seq}`.slice(-8)

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const lang = req.headers["accept-language"]
    console.log(new Date().toString(), 'connected...', ip, docker_name, lang)

    ws.hasShell = false;

    const child = pty.spawn('docker', [
        'run',
        '--env',
        'LANG=C.UTF-8',
        '-itq',
        '--name',
        docker_name,
        '--rm',
        '--entrypoint=/bin/sh',
        '--volume=/tmp:/tmp',
        '--memory=16M',
        '--pids-limit=50',
        '--stop-timeout=30',  // 30 seconds before shutoff
        '--read-only',
        '--cpu-quota=20000',  // 20% of cpu
        '--cap-drop=CHOWN',
        '--cap-drop=DAC_OVERRIDE',
        '--cap-drop=FOWNER',
        '--cap-drop=FSETID',
        '--cap-drop=KILL',
        '--cap-drop=MKNOD',
        '--cap-drop=NET_BIND_SERVICE',
        '--cap-drop=NET_RAW',
        '--cap-drop=SETFCAP',
        '--cap-drop=SETGID',
        '--cap-drop=SETPCAP',
        '--cap-drop=SETUID',
        '--cap-drop=SYS_CHROOT',
        'arkscript/nightly',
    ], {
        name: 'xterm-color',
    })
    console.log('forking docker: ', docker_name, child.pid)
    dockerCount++

    child.onData((data) => {
        // send the shell output only if code was submitted
        if (ws.hasShell)
            ws.send('1' + data.toString())
    })
    child.onExit((code) => {
        ws.close()
        dockerCount--
        console.log('child closed', docker_name, child.pid, code)
    })

    const isAuthorizedChar = (char) => {
        const codepoint = char.charCodeAt(0);
        if (codepoint === 8) // backspace
            return true;
        else if (codepoint === 9 || codepoint === 0xb) // tab
            return true;
        else if (codepoint === 0xa || codepoint === 0xd)  // newline
            return true;
        else if (codepoint >= 0x20 && codepoint <= 0x7f)  // text
            return true;
        return false;
    };

    ws.on('message', (message, isBinary) => {
        const decoded = !isBinary ? message.toString() : message;
        switch (decoded.at(0)) {
            // file
            case '1':
                if (message) {
                    const msg = decoded.slice(1)
                    // todo do we want to use /tmp?
                    fs.writeFileSync(`/tmp/${docker_seq}.ark`, msg, {encoding: 'utf8', flag: 'w', flush: true,});
                    child.write(`arkscript /tmp/${docker_seq}.ark; exit\n`);
                    ws.hasShell = true;
                }
                break;
            // resize
            case '2':
                const size = decoded.split(' ')
                child.resize(parseInt(size[1]), parseInt(size[2]))
                break;
            // user input
            case '3':
                if (message && ws.hasShell) {
                    const char = decoded.at(1);
                    if (char !== undefined && isAuthorizedChar(char))
                        child.write(char);
                }
                break;
        }
    })
    ws.on('close', (e) => {
        spawn('docker', ['kill', docker_name]).on('close', () => {
            console.log('socket closed...', new Date().toString(), docker_name, child.pid, e);
        })
    })
    ws.on('error', (err) => {
        console.log('error occurred', err);
    })
    ws.on('pong', () => {
        ws.isAlive = true;
    })
})
