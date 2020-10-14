const LazyLogger = require('./src/lib')

const db = {
    read: () => Promise.resolve([1,2,3,4]),
    doThings: () => Promise.resolve({
        msg: 'Successfully wrote 4 records'
    })
}

const go = async () => {
    let logger = LazyLogger()
    const request = {id: 1234}
    try {
        logger.info(`RequestID: ${request.id}`)
        const things = await db.read()
        logger.info(`Read ${things.length} records from the db`)
        const result = await db.doThings(things)
        logger.info(`DB Result: ${JSON.stringify(result)}`)
        intentional.error()
    } catch (e) {
        logger.error(e)
    } finally {
        logger.write() // writes `INFO:RequestID: 1234 -- INFO:Read 4 records from the db -- INFO:DB Result: {"msg":"Successfully wrote 4 records"} -- ERROR:ReferenceError: intentional is not defined      at go (/Users/elzqz/cx/lazy-logger/some.js:20:9)`
    }
}

go()