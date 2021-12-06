import { ResponseModel } from './response.model'
import { ExpressMessage, ExpressStatusCode } from '../types'

export class SuccessResponseModel<T = any> extends ResponseModel {
  public readonly data: T

  constructor(data: T) {
    super(ExpressStatusCode.success, ExpressMessage.ok)
    this.data = data
  }
}
