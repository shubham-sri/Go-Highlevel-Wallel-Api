import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { v0IndexRoute } from './v0'
import { swaggerConfig } from '../config'

const router = Router()

const oas3Specification = swaggerJsdoc(swaggerConfig)
router.use('/docs', swaggerUi.serve, swaggerUi.setup(oas3Specification))

router.use('/v0', v0IndexRoute)

export const IndexRoute = router
