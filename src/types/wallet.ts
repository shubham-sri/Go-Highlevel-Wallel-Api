export interface WalletCreatePayload {
  name: string
  balance: number
}

export interface TransactionCreatePayload {
  description: string
  amount: number
}

export interface WalletParams {
  walletId: string
}

export interface TransactionQuery {
  walletId?: string
  skip?: number
  limit?: number
}
