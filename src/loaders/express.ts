import express, { type Express } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import errorHandler from '../api/middlewares/error'
import routes from '../api'

export default function initExpress (app: Express): Express {
  app.use(cors())

  app.use(express.json())
  app.use(helmet())
  app.use(morgan('dev'))

  app.use('/', routes())
  app.get('/health', (_req, res) => {
    res.status(200).end()
  })

  app.use(errorHandler)

  return app
};
