"use strict";
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')
const {access, constants: fs_constants, readFile} = require('fs')
const url = require('url')
const chokidar = require('chokidar')
const opn = require('opn')

const sockets = {}
const watchers = []

function pageFrom(filepath, callback) {
    readFile(__dirname + '/template.html', 'utf-8', (err, template) => {
        if (err) throw err
        readFile(filepath, 'utf-8', (err, data) => {
            if (err) throw err
            callback(template.replace('SVG_GOES_HERE', data))
        })
    })
}

function getBrowserRefresher(filepath) {
    return function refreshBrowser(eventName, _path, curr, prev) {
        if (eventName === 'add') {
            return
        }
        console.info(`${eventName} @ '${filepath}'`)
        if (!sockets[filepath]) {
            throw new Error(`[internal error] No socket for ${filepath}`)
        }
        readFile(path.join(PARAMS.cwd, filepath), 'utf-8', (err, data) => {
            for (let socket of sockets[filepath]) {
                // here, we don't throw the error because it might fail since we migth read
                // straight after or while the file is being written.
                if (err) return console.error(`Couldn't read ${filepath}`)
                socket.emit('change', { svg: data })
            }
        })
    }
}

function setDefault(args) {
    args = Object.assign({}, args)
    if (args.port === null) args.port = 6336
    if (args.cwd === null) args.cwd = process.cwd()
    return args
}

function main(args) {

    global.PARAMS = setDefault(args)

    app.get('/\*.svg', (req, res) => {
        const filepath = path.join(PARAMS.cwd, req.path)
        access(filepath, fs_constants.F_OK, (err) => {
            if (err) {
                return res.status(404)
                    .send(`<h1>404</h1><p>Couldn't find <code>${filepath}</code> on this computer...</p>`)
            }
            pageFrom(filepath, html => res.send(html))
        })
    })

    io.on('connection', socket => {
        console.info("Got a connection", socket.handshake.headers.referer)
        const obj = url.parse(socket.handshake.headers.referer)
        if (typeof sockets[obj.path] === 'undefined') {
            sockets[obj.path] = []
        }

        sockets[obj.path].push(socket)
        if (!watchers[obj.path]) {
            console.info('  - add new watcher')
            watchers[obj.path] = chokidar.watch(path.join(PARAMS.cwd, obj.path))
                .on('all', getBrowserRefresher(obj.path))
        }
        socket.on('disconnect', () => {
            console.info(`Close socket for ${obj.path}`)
            sockets[obj.path] = sockets[obj.path].filter(sock => socket.id !== sock.id)
            if (sockets[obj.path].length === 0) {
                console.info('  - And close watcher (no socket left)')
                watchers[obj.path].close()
                delete watchers[obj.path]
            }
            if (PARAMS.autoExit && Object.keys(watchers).length === 0) {
                console.info('  - And quit because of --auto-exit')
                process.exit(0)
            }
        })
    })

    http.listen(PARAMS.port, () => {
        console.info(`Listening on http://localhost:${PARAMS.port}/`)
        let _url;
        for (let file of PARAMS.files) {
            _url = `http://localhost:${PARAMS.port}/${file}`
            console.info('Opening', _url)
            opn(_url)
        }
    })

}

module.exports = main
