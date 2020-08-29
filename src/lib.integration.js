const {expect} = require('chai')

const LazyLogger = require('./lib')

describe('', () => {
    it('should use newlines as the default delimiter', () => {
        const logger = LazyLogger()
        logger.info('hi there')
        logger.debug('hi world')
        logger.fatal('hello world')
        logger.trace('hi')
        logger.error('hi')
        logger.log('hi')

        expect(logger.write()).to.equal(`INFO:hi there
DEBUG:hi world
FATAL:hello world
TRACE:hi
ERROR:hi
LOG:hi
`)
    })

    it('should use the delimiter passed in', () => {
        const logger = LazyLogger({delimiter: ' -- '})
        logger.info('hi there')
        logger.debug('hi world')
        logger.fatal('hello world')
        logger.trace('hi')
        logger.error('hi')
        logger.log('hi')

        expect(logger.write()).to.equal('INFO:hi there -- DEBUG:hi world -- FATAL:hello world -- TRACE:hi -- ERROR:hi -- LOG:hi\n')
    })
})
