import { Router } from 'express'
import { HealthCheckControllers } from '../../controllers'

const router = Router()

/**
 * @swagger
 * /v0/health-check:
 *   get:
 *     tags:
 *       - Health check
 *     summary: This route is used to check if the server is online and running
 *     responses:
 *       200:
 *         description: Returns 'OK' if server is running
 */
router.get('/', HealthCheckControllers.healthCheck)

export const HealthCheckRoutes = router
