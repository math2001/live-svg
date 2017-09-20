#! /usr/bin/env node
// a quick and dirty cli interface

const runServer = require('./server.js')
const HELP_MESSAGE = `
live-svg [options] files...

Start a server in the current working directory to serve svgs, live.

Usage:
  --help: display help message and exit
  --port <int>: port to use [default: 6336]
  --cwd <string>: origin of the url (default .)

Examples:
  $ live-svg             -> Starts the server
  $ live-svg --port 8000 -> Starts the server on port 8000
  $ live-svg mysvg.svg   -> Starts the server and open http://localhost:6336/mysvg.svg
                            in the browser

See https://github.com/math2001/live-svg for more infos
`.trim()

function showHelp() {
    console.error(HELP_MESSAGE)
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

const args = parseArgs(process.argv.slice(2))
if (args.help) showHelp()

if (!module.parent) {
    runServer(args)
} else {
    module.exports = parseArgs
}
