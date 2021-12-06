import winston from 'winston'
import { NODE_ENV } from './common'

interface Logger extends winston.Logger {
  enableConsole?: () => void
  disableConsole?: () => void
}

const logger: Logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.prettyPrint(),
  ),
  defaultMeta: { service: 'api-service' },
  transports:
    NODE_ENV === 'dev'
      ? [
          new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
          }),
          new winston.transports.File({
            filename: 'logs/warn.log',
            level: 'warn',
          }),
          new winston.transports.File({
            filename: 'logs/info.log',
            level: 'info',
          }),
          new winston.transports.File({ filename: 'logs/combined.log' }),
        ]
      : [],
})

const consoleTransporter = new winston.transports.Console({
  format: winston.format.simple(),
})

logger.enableConsole = () => {
  logger.add(consoleTransporter)
}

logger.disableConsole = () => {
  logger.remove(consoleTransporter)
}

if (process.env.NODE_ENV !== 'production') {
  logger.enableConsole()
}

export const Logger = logger
