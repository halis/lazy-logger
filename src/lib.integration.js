const {expect} = require('chai')

const LazyLogger = require('./lib')

describe('', () => {
    it('should use " -- " as the default delimiter', () => {
        const logger = LazyLogger()
        logger.info('hi there')
        logger.debug('hi world')
        logger.fatal('hello world')
        logger.trace('hi')
        logger.error('hi')
        logger.log('hi')

        expect(logger.write()).to.equal(`INFO:hi there -- DEBUG:hi world -- FATAL:hello world -- TRACE:hi -- ERROR:hi -- LOG:hi\n`)
    })

    it('should use the delimiter passed in', () => {
        const logger = LazyLogger({delimiter: '\n'})
        logger.info('hi there')
        logger.debug('hi world')
        logger.fatal('hello world')
        logger.trace('hi')
        logger.error('hi')
        logger.log('hi')

        expect(logger.write()).to.equal('INFO:hi there\nDEBUG:hi world\nFATAL:hello world\nTRACE:hi\nERROR:hi\nLOG:hi\n')
    })

    it('should replace all newlines by default (except the one at the end)', () => {
        const error = new Error('hi')
        const logger = LazyLogger()
        logger.info(error.stack)
        const string = logger.write()
        expect(string.endsWith('\n')).to.equal(true)
        expect(string.trim().split('\n').length).to.equal(1)
    })

    it('should NOT replace all newlines if replaceNewlines is false', () => {
        const error = new Error('hi')
        const logger = LazyLogger({replaceNewlines: false})
        logger.info(error.stack)
        const string = logger.write()
        expect(string.endsWith('\n')).to.equal(true)
        expect(string.split('\n').length > 1).to.equal(true)
    })
})
