import { ExpressMessage, ExpressStatusCode } from '../types'

export class ResponseModel {
  public readonly status: ExpressStatusCode
  public readonly message: ExpressMessage

  constructor(status: ExpressStatusCode, message: ExpressMessage) {
    this.status = status
    this.message = message
  }
}
