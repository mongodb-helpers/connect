'use strict'

import mongoose from 'mongoose'
import type { ConnectOptions } from 'mongoose'

interface ConnectionOptions extends ConnectOptions {
  forceClose?: boolean,
  url?: string
}

const defaultOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// TODO: should fix the generic type in the result promise
export async function connect(options: ConnectionOptions): Promise<any> {
  options = { ...defaultOptions, ...options }

  const forceClose = !!options.forceClose
  delete options.forceClose

  const url = options.url
  delete options.url

  if (!url) {      
    throw new Error('`url` parameter is mandatory if no client is provided')
  }

  const mongooseClient = await mongoose.connect(url, options)
  const mongodbClient = mongooseClient.connection.getClient()
  const onClose = () => mongooseClient.connection.close(forceClose as boolean)
  const db = mongooseClient.connection.db

  return { db, client: mongooseClient, mongodbClient, onClose }
}
