import { ResponseModel } from './response.model'
import { ExpressMessage, ExpressStatusCode } from '../types'

export class SuccessResponseModel<T = any> extends ResponseModel {
  public readonly data: T

  constructor(status: ExpressStatusCode, message: ExpressMessage, data: T) {
    super(status, message)
    this.data = data
  }
}
