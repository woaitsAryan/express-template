import envHandler from '../config/envHandler'
import { Redis } from 'ioredis'
import logger from './logger'

let redisClient: Redis

async function connectToRedis (): Promise<void> {
  if (!redisClient || redisClient.status !== 'ready') {
    redisClient = new Redis({
      host: envHandler.REDIS_HOST,
      port: envHandler.REDIS_PORT,
      password: envHandler.REDIS_PASSWORD
    })

    redisClient.on('error', (error) => {
      logger.error(`Redis client not connected - ${error.message}`)
      process.exit(1)
    })

    redisClient.on('connect', () => {
      logger.info('Redis client connected')
    })
  }
}

export { connectToRedis, redisClient }