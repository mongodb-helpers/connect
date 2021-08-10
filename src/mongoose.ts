'use strict'

import mongoose from 'mongoose'
import type { ConnectOptions } from 'mongoose'
import { Db, MongoClient } from 'mongodb'

interface ConnectionOptions extends ConnectOptions {
  forceClose?: boolean,
  url?: string
}

const defaultOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

type Result = {
  db: Db,
  client: typeof mongoose,
  mongodbClient: typeof MongoClient,
  onClose: () => Promise<void>
}

export async function connect(options: ConnectionOptions): Promise<Result> {
  options = { ...defaultOptions, ...options }

  const forceClose = !!options.forceClose
  delete options.forceClose

  const url = options.url
  delete options.url

  if (!url) {      
    throw new Error('`url` parameter is mandatory if no client is provided')
  }

  const mongooseClient = await mongoose.connect(url, options)
  const mongodbClient = mongooseClient.connection.getClient() as any
  const onClose = () => mongooseClient.connection.close(forceClose as boolean)
  const db = mongooseClient.connection.db as any
  return { db, client: mongooseClient, mongodbClient, onClose }
}
