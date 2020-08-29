
const {stub} = require('sinon')
const {expect} = require('chai')

const LazyLogger = require('./lib')

describe('LazyLogger', () => {
    let logger
    let stdout
    beforeEach(() => {
        stdout = stub()
        logger = LazyLogger({stdout, delimiter: ':::'})
    })
    it('if write or flush not called, should not call stdout', () => {
        logger.log('hi', 'there', 'world')
        logger.info('hello world')
        logger.debug('Hello, world!')
        logger.error('hi', {msg: 'Hello, world!'})
        logger.fatal('Hello, world!')
        logger.trace('Hello, world!')
        expect(stdout.called).to.equal(false)
    })

    it('if write or flush is called, should call stdout', () => {
        logger.log('hi', 'there', 'world')
        logger.info('hello world')
        logger.debug('Hello, world!')
        logger.error('hi', {msg: 'Hello, world!'})
        logger.fatal('Hello, world!')
        logger.trace('Hello, world!')
        logger.write()
        expect(stdout.callCount).to.equal(1)
    })

    it('if write or flush is called, should print each message, the level and the delimiter', () => {
        logger.log('hi', 'there', 'world')
        logger.info('hello world')
        logger.debug('Hello, world!')
        logger.error('hi', {msg: 'Hello, world!'})
        logger.fatal('Hello, world!')
        logger.trace('Hello, world!')

        logger.write()
        
        expect(stdout.getCall(0).args).to.deep.equal(['LOG:hi there world:::INFO:hello world:::DEBUG:Hello, world!:::ERROR:hi {\"msg\":\"Hello, world!\"}:::FATAL:Hello, world!:::TRACE:Hello, world!\n'])
    })

    it('if clear is called before write or flush, should clear the messages and nothing should be written to stdout', () => {
        logger.log('hi', 'there', 'world')
        logger.info('hello world')
        logger.debug('Hello, world!')
        logger.error('hi', {msg: 'Hello, world!'})
        logger.fatal('Hello, world!')
        logger.trace('Hello, world!')

        logger.clear()

        logger.write()
        expect(stdout.callCount).to.equal(0)
    })
})
