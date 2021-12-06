import { Transaction } from 'sequelize'
import {
  ErrorResponseModel,
  SuccessResponseModel,
  TransactionModel,
  TransactionResponse,
} from '../models'
import { Logger } from '../config'
import { ExpressMessage, ExpressStatusCode } from '../types'
import { WalletService } from './wallet.service'
import { CommonService } from './common.service'

export class TransactionService extends CommonService {
  constructor(transaction?: Transaction) {
    super(transaction)
  }

  public async create(
    walletId: string,
    amount: number,
    description?: string,
  ): Promise<SuccessResponseModel<TransactionResponse> | ErrorResponseModel> {
    try {
      await this.startTransaction()

      const walletService = new WalletService(this.transaction)

      let wallet = await walletService.get({ id: walletId })

      if (!wallet) {
        await this.rollbackTransaction()
        return new ErrorResponseModel(
          ExpressStatusCode.notFound,
          ExpressMessage.walletNotFound,
          'TransactionService.create',
        )
      }

      if (wallet.balance + amount < 0) {
        await this.rollbackTransaction()
        return new ErrorResponseModel(
          ExpressStatusCode.notAllowed,
          ExpressMessage.walletLowBalance,
          'TransactionService.create',
        )
      }

      const transaction = await TransactionModel.create({
        amount,
        walletId,
        description,
      })

      const newBal = (wallet.balance + amount).toFixed(4)

      wallet = await wallet.update({ balance: parseFloat(newBal) })

      await this.commitTransaction()

      return new SuccessResponseModel<TransactionResponse>(
        new TransactionResponse({
          id: transaction.id,
          balance: wallet.balance,
          createdAt: transaction.createdAt,
          updatedAt: transaction.updatedAt,
        }),
      )
    } catch (error: any) {
      await this.rollbackTransaction()
      Logger.error(
        'TransactionService.create: Error while creating wallet',
        error,
      )
      return new ErrorResponseModel(
        ExpressStatusCode.serverError,
        ExpressMessage.somethingWrong,
        'TransactionService.create',
      )
    }
  }

  public async get(
    walletId?: string,
    skip?: number,
    limit?: number,
  ): Promise<SuccessResponseModel | ErrorResponseModel> {
    try {
      const transactions = await TransactionModel.findAll({
        where: {
          walletId: walletId,
        },
        offset: skip,
        limit,
      })

      return new SuccessResponseModel(transactions)
    } catch (error: any) {
      await this.rollbackTransaction()
      Logger.error(
        'TransactionService.create: Error while creating wallet',
        error,
      )
      return new ErrorResponseModel(
        ExpressStatusCode.serverError,
        ExpressMessage.somethingWrong,
        'TransactionService.create',
      )
    }
  }
}
