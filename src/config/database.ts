export const DB_HOST = process.env.DB_HOST || 'localhost'

export const DB_USERNAME = process.env.DB_USERNAME || 'admin'

export const DB_PASSWORD = process.env.DB_PASSWORD

export const DB_TYPE = 'postgres'

export const DB_NAME = process.env.DB_NAME || 'testing'

export const DB_PORT = parseInt(process.env.DB_PORT || '3306')

export const DB_ENABLE_SSL = process.env.DB_ENABLE_SSL === 'true'

export const DB_CA_CONFIG = Buffer.from(
  process.env.DB_CA_CONFIG || '',
  'base64',
).toString('ascii')
