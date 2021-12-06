import { Request, Response } from 'express'
import { ExpressMessage, ExpressStatusCode } from '../types'
import { SuccessResponseModel } from '../models'
import { ResponseHelper } from '../helpers'

export class HealthCheckControllers {
  public static async healthCheck(req: Request, res: Response): Promise<void> {
    const payload = new SuccessResponseModel(
      ExpressStatusCode.success,
      ExpressMessage.ok,
      {
        message: ExpressMessage.ok,
      },
    )
    return ResponseHelper.dispatch(res, payload)
  }
}
