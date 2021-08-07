import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'

export function withMongoose (mongodbClient: MongoClient) {
  mongoose.createConnection().setClient(mongodbClient as any)
}
