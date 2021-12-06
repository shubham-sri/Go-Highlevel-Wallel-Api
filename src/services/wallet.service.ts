import { CommonService } from './common.service'
import { Transaction, WhereOptions } from 'sequelize'
import {
  ErrorResponseModel,
  SuccessResponseModel,
  Wallet,
  WalletModel,
} from '../models'
import { Logger } from '../config'
import { ExpressMessage, ExpressStatusCode } from '../types'

export class WalletService extends CommonService {
  constructor(transaction?: Transaction | null) {
    super(transaction)
  }

  public async create(
    name: string,
    balance: number,
  ): Promise<SuccessResponseModel<Wallet> | ErrorResponseModel> {
    try {
      const wallet = await WalletModel.create(
        {
          name,
          balance,
        },
        {
          transaction: this.transaction,
        },
      )
      return new SuccessResponseModel<Wallet>(wallet)
    } catch (error: any) {
      Logger.error('WalletService.create: Error while creating wallet', error)
      return new ErrorResponseModel(
        ExpressStatusCode.serverError,
        ExpressMessage.somethingWrong,
        'WalletService.create',
      )
    }
  }

  public async get(where: WhereOptions<Wallet>): Promise<Wallet | null> {
    try {
      return await WalletModel.findOne({ where })
    } catch (error: any) {
      Logger.error('WalletService.get: Error while creating wallet', error)
      throw error
    }
  }

  public async getById(
    walletId: string,
  ): Promise<SuccessResponseModel<Wallet> | ErrorResponseModel> {
    try {
      const wallet = await WalletModel.findOne({
        where: {
          id: walletId,
        },
      })

      if (!wallet) {
        return new ErrorResponseModel(
          ExpressStatusCode.notFound,
          ExpressMessage.walletNotFound,
          'WalletService.getById',
        )
      }

      return new SuccessResponseModel<Wallet>(wallet)
    } catch (error: any) {
      Logger.error('WalletService.getById: Error while creating wallet', error)
      return new ErrorResponseModel(
        ExpressStatusCode.serverError,
        ExpressMessage.somethingWrong,
        'WalletService.getById',
      )
    }
  }
}
