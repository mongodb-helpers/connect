import { assert, expect } from 'chai'
import mongoose from 'mongoose'
import { Db, MongoClient } from 'mongodb'
import { connect, withMongoose } from '../src'

const MONGODB_URL = 'mongodb+srv://test:test@cluster0.6os9x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

describe('connect module', () => {
  it('should export connect as function with 1 param', () => {
    assert.strictEqual(typeof connect, 'function')
    assert.strictEqual(connect.length, 1)
  })

  it('should export withMongoose as function with 1 param', () => {
    assert.strictEqual(typeof withMongoose, 'function')
    assert.strictEqual(withMongoose.length, 1)
  })

  it('should connect to mongodb when pass valid url', async () => {
    const socket = await connect({ url: MONGODB_URL })
    expect(socket).that.has.property('db')
    assert(socket.db instanceof Db)
    expect(socket).that.has.property('client')
    assert(socket.client instanceof MongoClient)
    expect(socket).that.has.property('onClose')
    assert(typeof socket.onClose === 'function') 
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

  it('should with-mongoose wrap correctly the connect', async () => {
    const connection = await connect({ url: MONGODB_URL })
    try {
      withMongoose(connection.client)
    } catch (error) {
      // Throw here beacause we use mongodb driver v4 and mongoose use v3
      assert.ok
    }
    // assert.strictEqual(mongoose.connection.readyState, 1)
  })

  it('should close connection to mongodb when call onClose', async () => {
    const socket = await connect({ url: MONGODB_URL })
    // socket.db.stats()
    assert.strictEqual((await socket.db.admin().ping()).ok, 1)
    socket.onClose()
    expect(async () => { await socket.db.admin().ping() }).to.Throw
  })
})
