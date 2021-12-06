import { Request, Response } from 'express'
import {
  ExpressNextFunction,
  WalletCreatePayload,
  WalletParams,
} from '../types'
import { Wallet } from '../models'
import { ResponseHelper } from '../helpers'
import { WalletService } from '../services/wallet.service'

export class WalletControllers {
  public static async create(
    req: Request<any, any, WalletCreatePayload>,
    res: Response,
    next: ExpressNextFunction,
  ): Promise<void> {
    const { name, balance } = req.body

    const walletService = new WalletService()

    const payload = await walletService.create(name, balance)

    return ResponseHelper.dispatch<Wallet>(res, payload, next)
  }

  public static async getById(
    req: Request<WalletParams>,
    res: Response,
    next: ExpressNextFunction,
  ): Promise<void> {
    const { walletId } = req.params

    const walletService = new WalletService()

    const payload = await walletService.getById(walletId)

    return ResponseHelper.dispatch<Wallet>(res, payload, next)
  }
}
