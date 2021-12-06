import { TransactionValidator } from '../../validators/transaction'
import { TransactionControllers } from '../../controllers'
import { Router } from 'express'

const router = Router()

/**
 * @swagger
 * /v0/transactions:
 *   post:
 *     parameters:
 *     - in: query
 *       name: walletId
 *       schema:
 *         type: string
 *     - in: query
 *       name: skip
 *       schema:
 *         type: number
 *     - in: query
 *       name: limit
 *       schema:
 *         type: number
 *     tags:
 *       - Transaction
 *     summary: Get transaction
 *     responses:
 *       200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/TransactionResponse'
 *       4xx:
 *        description: Client Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/CommonPayload'
 *       5xx:
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/CommonPayload'
 */
router.get('/', TransactionValidator.get, TransactionControllers.get)

export const TransactionsRoutes = router
