import { ExpressNextFunction } from '../types'
import { Response, Request } from 'express'
import { ServerStateService } from '../services'

export const ServerStateController = {
  async blockIfDbNotConnected(
    req: Request,
    res: Response,
    next: ExpressNextFunction,
  ): Promise<void> {
    if (ServerStateService.dbConnection) {
      next()
    } else {
      return next({
        status: 503,
        message: 'Db not found, please after sometime!',
        module: 'ServerStateController.blockIfDbNotConnected',
      })
    }
  },
}
