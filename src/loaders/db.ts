import envHandler from '../config/envHandler'
import mongoose from 'mongoose'
import logger from './logger'

async function connectToDB (): Promise<void> {
  const DB_HOST = envHandler.DB_HOST
  const DB_PORT = envHandler.DB_PORT
  const DB_USER = envHandler.DB_USER
  const DB_PASSWORD = envHandler.DB_PASSWORD
  const DB_DATABASE = envHandler.DB_DATABASE
  const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=admin`
  try {
    await mongoose.connect(url)
    logger.info('Connected to Database!')
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`Error connecting to the database: ${error.message}`)
    } else {
      logger.error('An unknown error occurred while connecting to the database.')
    }
    process.exit(1)
  }
}

export default connectToDB
