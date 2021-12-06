import { Sequelize, Options } from 'sequelize'
import {
  DB_TYPE,
  DB_PASSWORD,
  DB_USERNAME,
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_ENABLE_SSL,
  DB_CA_CONFIG,
} from '../config'
import { Logger } from '../config'
import { ExpressErrorType } from '../types'
import { ServerStateService } from './serverState.service'
import { NODE_ENV } from '../config/common'

class Database {
  private readonly host = DB_HOST
  private readonly username = DB_USERNAME
  private readonly password = DB_PASSWORD
  private readonly type = DB_TYPE
  private readonly dbName = DB_NAME
  private readonly port = DB_PORT
  private readonly enableSsl = DB_ENABLE_SSL
  private readonly caConfig = DB_CA_CONFIG

  protected readonly options: Options = {
    host: this.host,
    dialect: this.type,
    port: this.port,
    database: this.dbName,
    username: this.username,
    password: this.password,
    dialectOptions: {
      ssl: this.enableSsl
        ? {
            rejectUnauthorized: false,
            ca: this.caConfig,
          }
        : undefined,
    },
    logging: (message) => {
      Logger.info(message)
    },
  }

  public readonly postgres: Sequelize = new Sequelize(this.options)

  async init() {
    try {
      Logger.info('DatabaseService.init: Connecting....')
      await this.postgres.authenticate()
      Logger.info(
        'DatabaseService.init: Connection has been established successfully...',
      )
      Logger.info('DatabaseService.init: Syncing db...')
      await this.postgres.sync({ force: NODE_ENV !== 'prod' })
      Logger.info('DatabaseService.init: Sync successfully...')
      ServerStateService.dbConnection = true
    } catch (error: any) {
      ServerStateService.dbConnection = false
      Logger.error(`DatabaseService.init: ${error.message}`, {
        type: ExpressErrorType.server,
        error,
      })
      throw error
    }
  }
}

export const DatabaseService = new Database()
