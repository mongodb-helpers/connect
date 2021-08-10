'use strict'

import { MongoClient } from 'mongodb'
import type { MongoClientOptions } from 'mongodb'

interface ConnectionOptions extends MongoClientOptions {
  forceClose?: boolean,
  url?: string
}

const defaultOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

export async function connect(options: ConnectionOptions) {
  options = { ...defaultOptions, ...options }

  const forceClose = !!options.forceClose
  delete options.forceClose

  const url = options.url
  delete options.url

  if (!url) {      
    throw new Error('`url` parameter is mandatory if no client is provided')
  }

  const databaseName = (/\w\/([^?]*)/g.exec(url as string) as RegExpExecArray)[1]

  const client = await MongoClient.connect(url, options)
  const onClose = () => client.close(forceClose as boolean)
  const db = client.db(databaseName as string)

  return { db, client, onClose }
}
