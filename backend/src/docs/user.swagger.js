/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User CRUD and authentication endpoints
 */

/**
 * @swagger
 * /api/v1/users/list:
 *   get:
 *     summary: Retrieve a list of all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Error obtaining all users
 */

/**
 * @swagger
 * /api/v1/users/profile:
 *   get:
 *     summary: Get the profile of the current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile data
 *       500:
 *         description: Error fetching profile
 */

/**
 * @swagger
 * /api/v1/users/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: New user created correctly.
 *       400:
 *         description: Validation error.
 *       409:
 *         description: Username or email already in use.
 *       500:
 *         description: Error creating user.
 */

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Invalid email or password.
 *       500:
 *         description: Login failed.
 */

/**
 * @swagger
 * /api/v1/users/update:
 *   put:
 *     summary: Update the current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated correctly.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error updating user.
 */

/**
 * @swagger
 * /api/v1/users/update/admin:
 *   put:
 *     summary: Manage user roles
 *     tags: [Users]
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
 *               - role
 *             properties:
 *               id:
 *                 type: integer
 *                 description: User ID
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 description: Role to be assigned
 *     responses:
 *       200:
 *         description: Role updated correctly.
 *       400:
 *         description: Validation error.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Failed to assign admin role.
 */

/**
 * @swagger
 * /api/v1/users/delete:
 *   delete:
 *     summary: Delete the current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted correctly.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error deleting user.
 */

