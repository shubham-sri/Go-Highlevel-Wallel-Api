import Joi from 'joi'
import { ExpressNextFunction, WalletParams } from '../types'
import { Validate } from '../helpers'
import { Request, Response } from 'express'
import { JoiErrorMessages } from '../config'

const transactionCreateSchema = Joi.object({
  body: Joi.object({
    description: Joi.string().messages(
      JoiErrorMessages.general('Description', 'string'),
    ),
    amount: Joi.number()
      .required()
      .precision(4)
      .messages(JoiErrorMessages.general('Balance', 'number')),
  }),
  params: Joi.object({
    walletId: Joi.string()
      .required()
      .trim()
      .messages(JoiErrorMessages.general('Wallet Id', 'string')),
  }),
  query: Joi.object().max(0),
})

const getTransactionsCreateSchema = Joi.object({
  body: Joi.object().max(0),
  params: Joi.object().max(0),
  query: Joi.object({
    walletId: Joi.string()
      .trim()
      .messages(JoiErrorMessages.general('Wallet Id', 'string')),
    skip: Joi.number().messages(JoiErrorMessages.general('Skip', 'number')),
    limit: Joi.number().messages(JoiErrorMessages.general('Limit', 'number')),
  }),
})

export class TransactionValidator {
  public static async create<T = WalletParams>(
    req: Request<T>,
    res: Response,
    next: ExpressNextFunction,
  ): Promise<void> {
    return Validate.validate(req, res, next, transactionCreateSchema)
  }

  public static async get<T = WalletParams>(
    req: Request<T>,
    res: Response,
    next: ExpressNextFunction,
  ): Promise<void> {
    return Validate.validate(req, res, next, getTransactionsCreateSchema)
  }
}
