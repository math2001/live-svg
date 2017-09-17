// a quick and dirty cli interface

const runServer = require('./server.js')

const defaults = { port: 6336 }

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
    console.error('  $ live-svg             -> Just starts the')
    console.error('  $ live-svg --port 8000 -> Starts the server on port 8000')
    console.error('  $ live-svg mysvg.svg   -> Starts the server in the CWD and open mysvg.svg ')
    console.error('                            in the browser')
    console.error()
    console.error('See https://github.com/math2001/live-svg for more infos')
    process.exit(1)
}

if (process.argv.indexOf('--help') !== -1) {
    showHelp()
}

let portIndex = process.argv.indexOf('--port'), port, files
if (portIndex !== -1) {
    port = process.argv[portIndex + 1]
    if (port === undefined) {
        console.error("Wrong use: need to specify a port to use after --port")
        showHelp()
    } else {
        port = parseInt(port)
    }
    console.log(portIndex)
    files = Array.from(process.argv)
    files.splice(portIndex, 2)
} else {
    port = defaults.port
    files = process.argv
}



runServer(port, files)
