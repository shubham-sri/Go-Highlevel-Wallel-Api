import { ResponseModel } from './response.model'
import { ExpressMessage, ExpressStatusCode } from '../types'

export class ErrorResponseModel extends ResponseModel {
  public readonly object?: Error
  public readonly module: string

  constructor(
    status: ExpressStatusCode,
    message: ExpressMessage,
    module: string,
    error?: Error,
  ) {
    super(status, message)
    this.object = error
    this.module = module
  }
}
