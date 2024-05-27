import { type Express } from 'express'
import connectToDB from './db'
import initExpress from './express'
import { connectToRedis } from './redis'

function loadServer (app: Express): void {
  void connectToDB()
  void connectToRedis()
  initExpress(app)
}

export default loadServer
