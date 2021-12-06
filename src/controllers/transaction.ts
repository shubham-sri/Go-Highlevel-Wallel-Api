import { Request, Response } from 'express'
import {
  ExpressNextFunction,
  WalletParams,
  TransactionCreatePayload,
  TransactionQuery,
} from '../types'
import { TransactionResponse } from '../models'
import { ResponseHelper } from '../helpers'
import { TransactionService } from '../services/transaction.service'

export class TransactionControllers {
  public static async create(
    req: Request<WalletParams, any, TransactionCreatePayload>,
    res: Response,
    next: ExpressNextFunction,
  ): Promise<void> {
    const { amount, description } = req.body
    const { walletId } = req.params

    const transactionService = new TransactionService()

    const payload = await transactionService.create(
      walletId,
      amount,
      description,
    )
    return ResponseHelper.dispatch<TransactionResponse>(res, payload, next)
  }

  public static async get(
    req: Request<any, any, any, TransactionQuery>,
    res: Response,
    next: ExpressNextFunction,
  ): Promise<void> {
    const { walletId, skip, limit } = req.query

    const transactionService = new TransactionService()

    const payload = await transactionService.get(walletId, skip, limit)
    return ResponseHelper.dispatch(res, payload, next)
  }
}
