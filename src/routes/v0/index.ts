import { Router } from 'express'

import { HealthCheckRoutes } from './healthCheck'

const router = Router()

router.use('/health-check', HealthCheckRoutes)

export const v0IndexRoute = router
