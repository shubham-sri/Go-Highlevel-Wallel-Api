import { Router } from 'express'
import { WalletValidator } from '../../validators'
import { WalletControllers } from '../../controllers/wallet'

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Wallet:
 *       properties:
 *         id:
 *           type: string
 *         name:
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
 * /v0/wallet:
 *   post:
 *     tags:
 *       - Wallet
 *     summary: Create wallet
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          type: object
 *          properties:
 *             name:
 *                 type: string
 *                 required: true
 *             balance:
 *                 type: number
 *                 required: true
 *     responses:
 *       200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Wallet'
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
router.post('/', WalletValidator.create, WalletControllers.create)

/**
 * @swagger
 * /v0/wallet/{walletId}:
 *   get:
 *     parameters:
 *     - in: path
 *       name: walletId
 *       schema:
 *         type: string
 *         required: true
 *     tags:
 *       - Wallet
 *     summary: Get wallet
 *     responses:
 *       200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Wallet'
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
router.get('/:walletId', WalletValidator.getById, WalletControllers.getById)

export const WalletRoutes = router
