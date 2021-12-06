import Sequelize, {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  Model,
  Optional,
} from 'sequelize'
import { DatabaseService } from '../services'
import { Transaction, TransactionModel } from './transaction.model'

export interface WalletAttributes {
  id: string
  name: string
  balance: number
}

type WalletCreationAttributes = Optional<WalletAttributes, 'id'>

export class Wallet
  extends Model<WalletAttributes, WalletCreationAttributes>
  implements WalletAttributes
{
  public id!: string
  public name!: string
  public balance!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public getTransactions!: HasManyGetAssociationsMixin<Transaction>
  public createTransaction!: HasManyCreateAssociationMixin<Transaction>

  public transactions?: Transaction[]

  public static associations: {
    transactions: Association<Wallet, Transaction>
  }
}

const attributes = {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  balance: {
    type: Sequelize.REAL,
    defaultValue: 0,
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

export const WalletModel = DatabaseService.postgres.define<Wallet>(
  'wallets',
  attributes,
  options,
)

WalletModel.hasMany(TransactionModel)
