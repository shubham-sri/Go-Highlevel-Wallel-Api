import { ExpressNextFunction, ExpressStatusCode } from '../types'
import { ObjectSchema } from 'joi'
import { Request, Response } from 'express'

export class Validate {
  public static async validate<T = any>(
    req: Request<T>,
    _res: Response,
    next: ExpressNextFunction,
    validator: ObjectSchema,
  ): Promise<void> {
    try {
      if (validator) {
        const { body, params, query } = await validator.validateAsync({
          body: req.body,
          params: req.params,
          query: req.query,
        })
        req.body = body
        req.params = params
        req.query = query
      }
      return next()
    } catch (error: any) {
      return next({
        status: ExpressStatusCode.badRequest,
        message: error.details[0].message,
        module: 'AuthValidator.validate',
      })
    }
  }
}
