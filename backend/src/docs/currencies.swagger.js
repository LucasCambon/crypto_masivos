/**
 * @swagger
 * tags:
 *   name: Currencies
 *   description: Currency CRUD endpoints
 */

/**
 * @swagger
 * /api/v1/currencies/list:
 *   get:
 *     summary: Retrieve a list of all currencies
 *     tags: [Currencies]
 *     responses:
 *       200:
 *         description: List of currencies
 *       500:
 *         description: Error getting currencies
 */

/**
 * @swagger
 * /api/v1/currencies/{id}:
 *   get:
 *     summary: Retrieve a currency by ID
 *     tags: [Currencies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Currency ID
 *     responses:
 *       200:
 *         description: Currency found.
 *       400:
 *         description: Invalid or missing currency ID.
 *       404:
 *         description: Currency not found.
 *       500:
 *         description: Error fetching currency.
 */

/**
 * @swagger
 * /api/v1/currencies/create:
 *   post:
 *     summary: Create a new currency
 *     tags: [Currencies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - usd_value
 *               - symbol
 *               - liquidity
 *             properties:
 *               name:
 *                 type: string
 *               usd_value:
 *                 type: number
 *               symbol:
 *                 type: string
 *               type:
 *                 type: string
 *               volatility:
 *                 type: string
 *               liquidity:
 *                 type: string
 *     responses:
 *       201:
 *         description: Currency created correctly.
 *       400:
 *         description: Missing required fields or validation error.
 *       500:
 *         description: Error creating currency.
 */

/**
 * @swagger
 * /api/v1/currencies/update:
 *   put:
 *     summary: Update an existing currency
 *     tags: [Currencies]
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
 *               name:
 *                 type: string
 *               usd_value:
 *                 type: number
 *               symbol:
 *                 type: string
 *               type:
 *                 type: string
 *               volatility:
 *                 type: string
 *               liquidity:
 *                 type: string
 *     responses:
 *       200:
 *         description: Currency updated correctly.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: Currency not found.
 *       500:
 *         description: Error updating currency.
 */

/**
 * @swagger
 * /api/v1/currencies/delete:
 *   delete:
 *     summary: Delete a currency by ID
 *     tags: [Currencies]
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
 *         description: Currency deleted correctly.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: Currency not found.
 *       500:
 *         description: Error deleting currency.
 */