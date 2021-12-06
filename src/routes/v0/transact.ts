import { Router } from 'express'
import { TransactionValidator } from '../../validators/transaction'
import { TransactionControllers } from '../../controllers'

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     TransactionResponse:
 *       properties:
 *         transactionId:
 *           type: string
 *         balance:
 *           type: number
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

/**
 * @swagger
 * /v0/transaction/{walletId}:
 *   post:
 *     parameters:
 *     - in: path
 *       name: walletId
 *       schema:
 *         type: string
 *         required: true
 *     tags:
 *       - Transaction
 *     summary: Create transaction
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *            description:
 *              type: string
 *              required: true
 *            amount:
 *              type: number
 *              required: true
 *     responses:
 *       200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/TransactionResponse'
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
router.post(
  '/:walletId',
  TransactionValidator.create,
  TransactionControllers.create,
)

export const TransactRoutes = router
