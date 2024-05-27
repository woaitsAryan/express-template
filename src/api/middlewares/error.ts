import logger from '../../loaders/logger'
import { type Request, type Response, type NextFunction } from 'express'

interface CustomError extends Error {
  status?: number
}

const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  const status = err.status ?? 500
  logger.error(err.message)
  return res.status(status).json({ error: err.message })
}

export default errorHandler
