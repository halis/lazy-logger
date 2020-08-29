
const {stub} = require('sinon')
const {expect} = require('chai')

const LazyLogger = require('./lib')

describe('LazyLogger', () => {
    let logger
    let stdout
    beforeEach(() => {
        stdout = stub()
        logger = LazyLogger({stdout})
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

    it('if write or flush is called, should call stdout for each time a message was logged', () => {
        logger.log('hi', 'there', 'world')
        logger.info('hello world')
        logger.debug('Hello, world!')
        logger.error('hi', {msg: 'Hello, world!'})
        logger.fatal('Hello, world!')
        logger.trace('Hello, world!')
        logger.write()
        expect(stdout.callCount).to.equal(6)
    })

    it('if write or flush is called, should print the level with each message', () => {
        logger.log('hi', 'there', 'world')
        logger.info('hello world')
        logger.debug('Hello, world!')
        logger.error('hi', {msg: 'Hello, world!'})
        logger.fatal('Hello, world!')
        logger.trace('Hello, world!')

        logger.write()
        
        expect(stdout.getCall(0).args).to.deep.equal(['LOG:  ', 'hi', 'there', 'world'])
        expect(stdout.getCall(1).args).to.deep.equal(['INFO: ', 'hello world'])
        expect(stdout.getCall(2).args).to.deep.equal(['DEBUG:', 'Hello, world!'])
        expect(stdout.getCall(3).args).to.deep.equal(['ERROR:', 'hi', {msg: 'Hello, world!'}])
        expect(stdout.getCall(4).args).to.deep.equal(['FATAL:', 'Hello, world!'])
        expect(stdout.getCall(5).args).to.deep.equal(['TRACE:', 'Hello, world!'])
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
