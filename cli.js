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

function parseArgs(argv) {
    const args = Object.create(null)
    args.help = consumeBoolean(argv, 'help')
    args.port = consumeOption(argv, 'port')
    args.cwd = consumeOption(argv, 'cwd')
    args.files = Array.from(argv)
    argv.splice(0, Infinity)

    if (args.port !== null) args.port = parseInt(args.port)
    return args
}

function consumeBoolean(args, name) {
    let index = args.indexOf('--' + name)
    if (index === -1) return false
    value = args[index + 1]
    args.splice(index, 1)
    return true
}

function consumeOption(args, name) {
    let index = args.indexOf('--' + name)
    if (index === -1) return null
    value = args[index + 1]
    args.splice(index, 2)
    return value
}

if (!module.parent) {
    runServer(parseArgs(argv))
} else {
    module.exports = parseArgs
}
