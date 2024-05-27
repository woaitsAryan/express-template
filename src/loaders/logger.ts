import envHandler from '../config/envHandler'
import winston from 'winston'

const formatconfig = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.simple(),
  winston.format.json(),
  winston.format.prettyPrint(),
  winston.format.errors({ stack: true })
)

const createLog = (filename: string, level: string): winston.Logger => {
  if (envHandler.ENVIRONMENT === 'dev') {
    return winston.createLogger({
      transports: [
        new winston.transports.Console({
          level,
          format: winston.format.combine(
            winston.format.cli(),
            winston.format.splat()
          )
        })
      ]
    })
  } else {
    return winston.createLogger({
      transports: [
        new winston.transports.File({
          filename: `logs/${filename}.log`,
          level,
          format: formatconfig
        }),
        new winston.transports.Console({
          level,
          format: winston.format.combine(
            winston.format.cli(),
            winston.format.splat()
          )
        })
      ]
    })
  }
}

const errorLogger = createLog('error', 'error')
const infoLogger = createLog('info', 'info')
const protectLogger = createLog('protect', 'warn')

const logger = {
  info: (log: string) => infoLogger.info(log),
  error: (log: string) => errorLogger.error(log),
  protect: (log: string) => protectLogger.warn(log)
}

export default logger
