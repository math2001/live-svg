const parseArgs = require('../cli.js')

function areEqual(a, b) {
    if (['number', 'float', 'string', 'boolean'].includes(typeof a)) return Object.is(a, b)
    if (typeof a === 'undefined' || typeof b === 'undefined') return a === undefined && b === undefined
    if (a === null || b === null) return a === b

    const aProps = Object.getOwnPropertyNames(a)
    const bProps = Object.getOwnPropertyNames(b)

    if (aProps.length !== bProps.length) {
        return false
    }

    for (propName of aProps) {
        if (!areEqual(a[propName], b[propName])) return false
    }

    return true
}

function isInvalid(args, expectedResult) {
    actualResut = parseArgs(Array.from(args))
    return areEqual(actualResut, expectedResult) ? null : actualResut
}

tests = [
    [ [], { files: [], port: null, cwd: null, help: false } ],
    [ ['--help'], { files: [], port: null, cwd: null, help: true } ],
    [ ['somefile'], { files: ['somefile'], port: null, cwd: null, help: false } ],
    [ ['--port', '9879'], { files: [], port: 9879, cwd: null, help: false } ],
    [ ['--cwd', '..'], { files: [], port: null, cwd: '..', help: false } ],
    [ ['--cwd', '..', '--port', '9999'], { files: [], port: 9999, cwd: '..', help: false } ],
    [ ['--cwd', '..', '--port', '9999', '--help'], { files: [], port: 9999, cwd: '..', help: true } ],
    [ ['--cwd', '..', '--port', '9999', 'hello'], { files: ['hello'], port: 9999, cwd: '..', help: false } ],
]

let actualResult
for (let test of tests) {
    actualResult = isInvalid(test[0], test[1])
    if (actualResult) {
        console.error('----', test[0])
        console.error('Got', actualResult, 'instead of', test[1])
    }
}

