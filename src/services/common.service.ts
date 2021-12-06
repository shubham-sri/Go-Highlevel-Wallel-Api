import { Transaction } from 'sequelize'

export class CommonService {
  protected transaction?: Transaction | null

  constructor(transaction?: Transaction | null) {
    this.transaction = transaction
  }
}
