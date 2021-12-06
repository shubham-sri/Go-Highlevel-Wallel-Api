import Joi from 'joi'
import { ExpressNextFunction } from '../types'
import { Validate } from '../helpers'
import { Request, Response } from 'express'

export class AuthValidator {
  private static loginSchema = Joi.object({
    body: Joi.object({
      email: Joi.string().email().required().lowercase(),
      password: Joi.string().required().min(8).trim(),
    }),
    params: Joi.object().max(0),
    query: Joi.object().max(0),
  })

  public static async login(
    req: Request,
    res: Response,
    next: ExpressNextFunction,
  ): Promise<void> {
    return Validate.validate(req, res, next, AuthValidator.loginSchema)
  }
}
