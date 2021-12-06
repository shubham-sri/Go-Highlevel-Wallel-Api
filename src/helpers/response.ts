import { Response } from 'express'
import { ErrorResponseModel, SuccessResponseModel } from '../models'
import { ExpressNextFunction } from '../types'

export class ResponseHelper {
  public static dispatch(
    res: Response,
    payload: ErrorResponseModel | SuccessResponseModel,
    next?: ExpressNextFunction,
  ): void {
    if (payload instanceof SuccessResponseModel) {
      res.status(payload.status)
      res.send(payload.data || payload.message)
    } else if (next) {
      next(payload)
    } else {
      res.status(payload.status)
      res.send(payload.message)
    }
    return
  }
}
