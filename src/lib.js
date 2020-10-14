
const LazyLogger = ({
    stdout = process.stdout.write.bind(process.stdout), 
    delimiter = ' -- ',
    replaceNewlines = true,
} = {}) => {
    try {
        let logs = []
        const log = (...any) => logs.push({level: 'log', data: any})
        const info = (...any) => logs.push({level: 'info', data: any})
        const debug = (...any) => logs.push({level: 'debug', data: any})
        const trace = (...any) => logs.push({level: 'trace', data: any})
        const error = (...any) => logs.push({level: 'error', data: any})
        const fatal = (...any) => logs.push({level: 'fatal', data: any})

        const write = () => {
            if (!logs || !logs.length) {
                logs = []
                return
            }
            let ctr = 0
            let str = ''
            for (const message of logs) {
                if (ctr > 0) {
                    str += '%%%###'
                }
                ctr++
                const {level, data} = message
                str += `${level.toUpperCase()}:`
                let c = 0
                data.map(x => {
                    if (c > 0) {
                        str += ' '
                    }
                    c++
                    if (typeof x === 'object') {
                        str += JSON.stringify(x)
                        return
                    }
                    str += x
                })
            }
            if (replaceNewlines === true) {
                str = str.replace(/\n+/g, '  ')
            }
            str += '\n'
            str = str.replace(/%%%###/g, delimiter)
            logs = []
            stdout(str)
            return str
        }

        const clear = () => {
            logs = []
        }

        const logger = {
            clear,
            log,
            info,
            debug,
            trace,
            error,
            fatal,
            write,
            flush: write,
        }
        return logger
    } catch (e) {
        console.error(`Error creating LazyLogger: ${e.stack || e.message || e}`)
        throw e
    }
}

module.exports = LazyLogger
