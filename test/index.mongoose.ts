import { assert, expect } from 'chai'

import { connect } from '../src/mongoose'

const MONGODB_URL = 'mongodb+srv://test:test@cluster0.6os9x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

describe('connect mongoose odm', () => {
  it('should export connect as function with 1 param', () => {
    assert.strictEqual(typeof connect, 'function')
    assert.strictEqual(connect.length, 1)
  })

  it('should connect to mongodb when pass valid url', async () => {
    const socket = await connect({ url: MONGODB_URL })
    expect(socket).that.has.property('db')
    // assert(socket.db instanceof Db) --should-fix-mongoose-types
    expect(socket).that.has.property('client')
    // assert(socket.client instanceof mongoose) --should-fix-mongoose-types
    expect(socket).that.has.property('mongodbClient')
    // assert(socket.mongodbClient instanceof MongoClient) --should-fix-mongoose-types
    expect(socket).that.has.property('onClose')
    // assert(typeof socket.onClose === 'function') --should-fix-mongoose-types
    socket.onClose()
  })

  it('should throw to mongodb when pass invalid url', () => { 
    expect(connect.call(this, { url: 'MONGODB_URL' })).to.Throw
  })

  it('should throw when don\'t pass url', async () => {
    try {
      await connect({ url: undefined })
    } catch (error) {
      expect(error).to.include(/`url` parameter is mandatory if no client is provided/)   
    }
  })

  it('should close connection to mongodb when call onClose', async () => {
    const { client, onClose } = await connect({ url: MONGODB_URL })    
    assert.strictEqual(client.connection.readyState, 1)
    onClose()
    assert.notStrictEqual(client.connection.readyState, 1)
  })
})
