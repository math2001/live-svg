#! /usr/bin/env node
// a quick and dirty cli interface

const runServer = require('./server.js')

const defaults = { port: 6336 }

const argv = process.argv.slice(2)

function showHelp() {
    console.error('live-svg [options] files...')
    console.error()
    console.error('Start a server in the current working directory to serve svgs, live')
    console.error('')
    console.error('Usage:')
    console.error('  --help: display help message and exit')
    console.error(`  --port <int>: port to use [default: ${defaults.port}]`)
    console.error()
    console.error('Examples:')
    console.error('  $ live-svg             -> Starts the server')
    console.error('  $ live-svg --port 8000 -> Starts the server on port 8000')
    console.error('  $ live-svg mysvg.svg   -> Starts the server and open mysvg.svg')
    console.error('                            in the browser')
    console.error()
    console.error('See https://github.com/math2001/live-svg for more infos')
    process.exit(1)
}

if (argv.indexOf('--help') !== -1) {
    showHelp()
}

let portIndex =argv.indexOf('--port'), port, files
if (portIndex !== -1) {
    port = rocess.argv[portIndex + 1]
    if (port === undefined) {
        console.error("Wrong use: need to specify a port to use after --port")
        showHelp()
    } else {
        port = parseInt(port)
    }
    files = Array.from(argv)
    files.splice(portIndex, 2)
} else {
    port = defaults.port
    files = argv
}

runServer(port, files)
