import Sequelize, { DataTypes, Model, Optional } from 'sequelize'
import { DatabaseService } from '../services'

export interface PermissionAttributes {
  id: string
  name: string
  description: string | null
}

type PermissionCreationAttributes = Optional<PermissionAttributes, 'id'>

export class Permission
  extends Model<PermissionAttributes, PermissionCreationAttributes>
  implements PermissionAttributes
{
  public id!: string
  public name!: string
  public description!: string | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
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
    unique: true,
  },
  description: {
    type: new DataTypes.STRING(),
    allowNull: true,
  },
}

const options = {
  sequelize: DatabaseService.postgres,
  indexes: [{ unique: true, fields: ['id'] }],
  underscored: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
}

export const PermissionModel = DatabaseService.postgres.define<Permission>(
  'permissions',
  attributes,
  options,
)
