import { Router } from 'express'

import { HealthCheckRoutes } from './healthCheck'
import { WalletRoutes } from './wallet'
import { TransactRoutes } from './transact'
import { TransactionsRoutes } from './transactions'

const router = Router()

router.use('/health-check', HealthCheckRoutes)

router.use('/wallet', WalletRoutes)

router.use('/transact', TransactRoutes)

router.use('/transactions', TransactionsRoutes)

export const v0IndexRoute = router
