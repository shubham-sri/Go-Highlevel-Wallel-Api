import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import fs from 'fs'
import cors from 'cors'
import path from 'path'

import { IndexRoute } from './routes'
import { ErrorControllers, ServerStateController } from './controllers'
import { DatabaseService } from './services'
import { Logger } from './config'
import { NODE_ENV } from './config/common'

DatabaseService.init()
  .then(() => {
    Logger.info(`Data Init: Successful....`)
  })
  .catch((error: any) => {
    Logger.error(`Data Init: Failed ${error.message}`, error)
  })

const accessLogStream =
  NODE_ENV === 'dev'
    ? fs.createWriteStream(path.join(__dirname, '..', 'logs', 'access.log'), {
        flags: 'a',
      })
    : undefined

const app = express()

app.use(
  logger('combined', {
    stream: accessLogStream,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

app.use(ServerStateController.blockIfDbNotConnected)

app.use('/', IndexRoute)

app.use(ErrorControllers.create404Error)

app.use(ErrorControllers.dispatch)

export const App = app
