import Sequelize, { DataTypes, Model, Optional } from 'sequelize'
import { DatabaseService } from '../services'

export interface TransactionAttributes {
  id: string
  amount: number
  walletId: string
  description?: string
}

type TransactionCreationAttributes = Optional<TransactionAttributes, 'id'>

export class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes
{
  public id!: string
  public amount!: number
  public walletId!: string
  public description!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

const attributes = {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  description: {
    type: new DataTypes.STRING(512),
    allowNull: true,
  },
  amount: {
    type: Sequelize.REAL,
    allowNull: false,
  },
  walletId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}

const options = {
  sequelize: DatabaseService.postgres,
  indexes: [{ unique: true, fields: ['id'] }],
  underscored: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
}

export const TransactionModel = DatabaseService.postgres.define<Transaction>(
  'transaction',
  attributes,
  options,
)

export class TransactionResponse {
  public readonly transactionId: string
  public readonly balance: number
  public readonly createdAt: Date
  public readonly updatedAt: Date

  constructor({
    id,
    balance,
    createdAt,
    updatedAt,
  }: {
    id: string
    balance: number
    createdAt: Date
    updatedAt: Date
  }) {
    this.transactionId = id
    this.balance = balance
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
