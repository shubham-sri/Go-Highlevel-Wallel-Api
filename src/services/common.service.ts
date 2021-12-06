import { Transaction } from 'sequelize'
import { DatabaseService } from './database.service'

export class CommonService {
  protected transaction?: Transaction | null

  constructor(transaction?: Transaction | null) {
    this.transaction = transaction
  }

  protected async startTransaction(): Promise<void> {
    this.transaction = await DatabaseService.postgres.transaction()
  }

  protected async commitTransaction(): Promise<void> {
    await this.transaction?.commit()
  }

  protected async rollbackTransaction(): Promise<void> {
    await this.transaction?.rollback()
  }
}
