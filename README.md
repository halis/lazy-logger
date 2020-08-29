# lazy-logger
A logger that will store logs in memory until you are ready to write them to STDOUT

```js
const logger = LazyLogger({delimiter: ':::'})
logger.info('hi there') // prints nothing
logger.debug('hi world') // prints nothing
logger.fatal('hello world') // prints nothing
logger.trace('hi') // prints nothing
logger.error('hi') // prints nothing
logger.log('hi') // prints nothing

logger.write() /* prints `
INFO:hi there
DEBUG:hi world
FATAL:hello world
TRACE:hi
ERROR:hi
LOG:hi`
*/

const logger = LazyLogger({delimiter: ':::'})
logger.info('hi there') // prints nothing
logger.debug('hi world') // prints nothing
logger.fatal('hello world') // prints nothing
logger.trace('hi') // prints nothing
logger.error('hi') // prints nothing
logger.log('hi') // prints nothing

logger.write() // prints `INFO:hi there -- DEBUG:hi world -- FATAL:hello world -- TRACE:hi -- ERROR:hi -- LOG:hi`
```