import { Logger } from '../config'
import { NextFunction, Request, Response } from 'express'
import {
  ExpressErrorBody,
  ExpressMessage,
  ExpressNextFunction,
  ExpressStatusCode,
} from '../types'
import { NODE_ENV } from '../config/common'
import { ErrorResponseModel } from '../models'

export const ErrorControllers = {
  async create404Error(
    req: Request,
    res: Response,
    next: ExpressNextFunction,
  ): Promise<void> {
    next({
      status: ExpressStatusCode.notFound,
      message: ExpressMessage.notFound,
      module: 'ErrorControllers.create404Error',
    })
  },

  async dispatch(
    error: ErrorResponseModel,
    req: Request,
    res: Response<ExpressErrorBody>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
  ): Promise<void> {
    let message = error.message
    if (error.status && error.status < 500) {
      Logger.warn(`${error.module}: ${error.message}`, {
        error: error.object,
        type: 'client',
      })
    } else {
      message = NODE_ENV !== 'dev' ? ExpressMessage.somethingWrong : message
      Logger.warn(`${error.module}: ${error.message}`, {
        error: error.object,
        type: 'server',
      })
    }
    res.status(error.status || 500)
    res.send({
      message,
      object: NODE_ENV === 'dev' ? error.object : undefined,
    })
  },
}
