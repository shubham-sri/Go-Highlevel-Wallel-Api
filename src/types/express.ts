import { NextFunction } from 'express'
import { ErrorResponseModel } from '../models'

export enum ExpressStatusCode {
  success = 200,
  badRequest = 400,
  authFailed = 401,
  authForbidden = 403,
  notFound = 404,
  status422 = 422,
  notAllowed = 405,
  serverError = 500,
}

export enum ExpressMessage {
  somethingWrong = `Something went wrong!`,
  notFound = 'Not found!',
  walletNotFound = 'Wallet not found!',
  walletLowBalance = 'Wallet balance id low!',
  badRequest = 'Invalid request body!',
  notFoundData = 'No data found!',
  ok = 'Ok!',
}

export interface ExpressErrorBody {
  message: ExpressMessage
  object?: Error
}

export interface ExpressNextFunction extends NextFunction {
  (err?: ErrorResponseModel): void
}

export enum ExpressErrorType {
  server = 'server',
  client = 'client',
}

export type NODE_ENV_TYPE = undefined | 'dev' | 'prod' | 'qa'
