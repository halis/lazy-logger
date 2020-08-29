
const LazyLogger = ({stdout = console.log} = {}) => {
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
            for (const message of logs) {
                const {level, data} = message
                const string = `${level.toUpperCase()}:`.padEnd(6)
                stdout(string, ...data)
            }
            logs = []
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
