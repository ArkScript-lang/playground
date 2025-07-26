if (process.getuid() === 0 && process.getgid() === 0) {
    // running as root
    console.error("app.js seems to be running as root, which is a major security concern. Aborting.");
    process.exit(1);
}


const express = require('express');
const pty = require('node-pty');
const fs = require('fs');
const {spawn} = require("child_process");
const http = require('http');
const websocket = require('ws');

const app = express();
app.disable('x-powered-by');
const port = 8081;

const server = http.createServer(app).listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});

const websocketServer = new websocket.Server({server, path: '/terminal'});

setInterval(function ping() {
    if (websocketServer.clients.size > 0) {
        websocketServer.clients.forEach(function each(socket) {
            if (socket.isAlive === false) return socket.terminate()

            socket.isAlive = false;
            socket.ping(websocketServer.clients.size);
            socket.send('2' + websocketServer.clients.size);
        });
    }
}, 5000);

function log(state, ...args) {
    const date = new Date().toUTCString();
    console.log(`[${date}] - ${state} -`, args.join(" ; "));
}

let dockerCount = 0;
let docker_seq = 0;

websocketServer.on('connection', (ws, req) => {
    docker_seq = docker_seq > 99999999 ? 0 : docker_seq + 1;
    const docker_name = `RS0000000${docker_seq}`.slice(-8);
    const command = `arkscript /tmp/${docker_seq}.ark; exit\n`;

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const lang = req.headers["accept-language"];
    log('Connected', `ip: ${ip}`, `docker: ${docker_name}`, `lang: ${lang}`);

    ws.hasShell = false;

    const child = pty.spawn('timeout', [
        '-s', '9', '20s',  // 20 seconds timeout before killing container
        'docker',
        'run',
        '--env',
        'LANG=C.UTF-8',
        '-it',
        '--name',
        docker_name,
        '--rm',
        '--entrypoint=/bin/sh',
        '--volume=/tmp/playground:/tmp',
        '--memory=16M',
        '--pids-limit=50',
        '--stop-timeout=1',  // 1 second before docker send sigkill
        '--read-only',
        '--cpu-quota=5000',  // 5% of cpu
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
        'arkscript/harden',
    ], {
        name: 'xterm-color',
        env: {
            'SHELL': '/bin/sh',
            'PATH': '/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin',
        },
        cwd: "/tmp/playground/",
    });
    log('Forking', `docker: ${docker_name}`, `pid: ${child.pid}`);
    dockerCount++;

    child.onData((data) => {
        // send the shell output only if code was submitted
        const text = data.toString();
        if (ws.hasShell) {
            ws.send('1' + text);
        }
    });
    child.onExit((code) => {
        ws.close();
        dockerCount--;
        log('Pty closed', `ip: ${ip}`, `docker: ${docker_name}`, `pid: ${child.pid}`, `code: ${code.exitCode}`, `signal: ${code.signal}`);
    });

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
                    const msg = decoded.slice(1);
                    fs.writeFileSync(
                        `/tmp/playground/${docker_seq}.ark`,
                        msg,
                        {encoding: 'utf8', flag: 'w', flush: true,});
                    child.write(command);
                    ws.hasShell = true;
                }
                break;
            // resize
            case '2':
                const size = decoded.split(' ');
                child.resize(parseInt(size[1]), parseInt(size[2]));
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
            log('Closed', `ip: ${ip}`, `docker: ${docker_name}`, `pid: ${child.pid}`, `event: ${e}`);
        });
    });
    ws.on('error', (err) => {
        log('WS error', `ip: ${ip}`, err);
    });
    ws.on('pong', () => {
        ws.isAlive = true;
    });
});
