import Joi from 'joi'
import { ExpressNextFunction, WalletParams } from '../types'
import { Validate } from '../helpers'
import { Request, Response } from 'express'
import { JoiErrorMessages } from '../config'

const walletCreateSchema = Joi.object({
  body: Joi.object({
    name: Joi.string()
      .required()
      .lowercase()
      .messages(JoiErrorMessages.general('Name', 'string')),
    balance: Joi.number()
      .required()
      .min(0)
      .precision(4)
      .messages(JoiErrorMessages.general('Balance', 'number')),
  }),
  params: Joi.object().max(0),
  query: Joi.object().max(0),
})

const walletGetBySchema = Joi.object({
  body: Joi.object().max(0),
  params: Joi.object({
    walletId: Joi.string()
      .required()
      .trim()
      .messages(JoiErrorMessages.general('Wallet Id', 'string')),
  }),
  query: Joi.object().max(0),
})

export class WalletValidator {
  public static async create(
    req: Request,
    res: Response,
    next: ExpressNextFunction,
  ): Promise<void> {
    return Validate.validate(req, res, next, walletCreateSchema)
  }

  public static async getById(
    req: Request<WalletParams>,
    res: Response,
    next: ExpressNextFunction,
  ): Promise<void> {
    return Validate.validate(req, res, next, walletGetBySchema)
  }
}
