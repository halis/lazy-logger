# lazy-logger
A logger that will store logs in memory until you are ready to write them to STDOUT.

A couple other things to note. 
- When you call write or flush to actually print the logs, it will use " -- " as the delimiter by default instead of newline
- It will also replace newlines in the resulting message with "  "

The purpose of removing all newlines is to get all logs on a single line. Cloudwatch breaks logs up by newline. So it becomes difficult to associate your logs with a particular request.

So, here is an example of how this is useful:

```js
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
        logger.error(e.stack)
    } finally {
        logger.write() // writes `INFO:RequestID: 1234 -- INFO:Read 4 records from the db -- INFO:DB Result: {"msg":"Successfully wrote 4 records"} -- ERROR:ReferenceError: intentional is not defined      at go (/Users/asdf/lazy-logger/example.js:20:9)`
    }
}
go()
```

Then in CloudWatch you will only have a single log entry for this request:

INFO:RequestID: 1234 -- INFO:Read 4 records from the db -- INFO:DB Result: {"msg":"Successfully wrote 4 records"} -- ERROR:ReferenceError: intentional is not defined      at go (/Users/asdf/lazy-logger/example.js:20:9)

If you need to log deeper than the top level, then I would recommend passing the logger down to any function that you want to log.
