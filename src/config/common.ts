import { NODE_ENV_TYPE } from '../types'

export const JWT_KEY = process.env.JWT_KEY || 'sjkhdhsidshj'

export const JWT_ACCESS_EXPIRE_IN = '2h'

export const JWT_REFRESH_EXPIRE_IN = '2d'

export const PORT = process.env.PORT || '3000'

export const NODE_ENV: NODE_ENV_TYPE = process.env.NODE_ENV as NODE_ENV_TYPE
