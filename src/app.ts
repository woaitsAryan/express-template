import express from 'express'
import loadServer from './loaders'
import envHandler from './config/envHandler'
import logger from './loaders/logger'

async function startServer (): Promise<void> {
  const app = express()

  loadServer(app)

  app.listen(
    envHandler.PORT, () => {
      logger.info(`Server is running on port ${envHandler.PORT}`)
    }
  )
}

void startServer()
