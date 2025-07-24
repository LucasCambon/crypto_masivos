/**
 * @swagger
 * tags:
 *   name: Wallets
 *   description: Wallets CRUD endpoints
 */

/**
 * @swagger
 * /api/v1/wallets/list:
 *   get:
 *     summary: Retrieve a list of all wallets for the current user
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of wallets
 *       404:
 *         description: No wallets found for this user
 *       500:
 *         description: Error getting wallets
 */

/**
 * @swagger
 * /api/v1/wallets/{id}:
 *   get:
 *     summary: Retrieve a wallet by ID
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Wallet ID
 *     responses:
 *       200:
 *         description: Wallet found.
 *       400:
 *         description: Invalid or missing wallet ID.
 *       404:
 *         description: Wallet not found.
 *       500:
 *         description: Error fetching wallet.
 */

/**
 * @swagger
 * /api/v1/wallets/create:
 *   post:
 *     summary: Create a new wallet
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - address
 *               - currency_id
 *             properties:
 *               user_id:
 *                 type: integer
 *               address:
 *                 type: string
 *               alias:
 *                 type: string
 *               currency_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Wallet created correctly.
 *       400:
 *         description: Missing required fields or validation error.
 *       500:
 *         description: Error creating wallet.
 */

/**
 * @swagger
 * /api/v1/wallets/update:
 *   put:
 *     summary: Update an existing wallet
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - type
 *             properties:
 *               id:
 *                 type: integer
 *               balance:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [withdraw, deposit]
 *                 description: Movement type to be done
 *                  
 *     responses:
 *       200:
 *         description: Wallet updated correctly.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: Wallet not found.
 *       500:
 *         description: Error updating wallet.
 */

/**
 * @swagger
 * /api/v1/wallets/delete:
 *   delete:
 *     summary: Delete a wallet by ID
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Wallet deleted correctly.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: Wallet not found.
 *       500:
 *         description: Error deleting wallet.
 */
