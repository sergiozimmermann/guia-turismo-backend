const { Router } = require('express');

const {
  registerUserController,
  loginUserController,
  getCurrentUserController,
} = require('./users.controller');
const { authenticateToken } = require('../../../shared/http/auth-middleware');

const usersRouter = Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registrar novo usuário
 *     description: Cria uma nova conta de usuário com email e senha
 *     tags:
 *       - Users (Usuários)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: Turista registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthToken'
 *       400:
 *         description: Dados inválidos ou turista já existente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
usersRouter.post('/register', registerUserController);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login de usuário
 *     description: Autentica um usuário e retorna um token JWT
 *     tags:
 *       - Users (Usuários)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthToken'
 *       400:
 *         description: Email ou senha incorretos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
usersRouter.post('/login', loginUserController);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Retornar usuário autenticado
 *     description: Retorna os dados do usuário logado com base no token JWT.
 *     tags:
 *       - Users (Usuários)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário autenticado retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Token inválido ou ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
usersRouter.get('/me', authenticateToken, getCurrentUserController);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Status do módulo
 *     description: Verifica se o módulo de usuários está disponível
 *     tags:
 *       - Users (Usuários)
 *     responses:
 *       200:
 *         description: Módulo está operacional
 */
usersRouter.get('/', (_req, res) => {
  return res.status(200).json({
    module: 'users',
    message: 'Users module is ready',
  });
});

module.exports = { usersRouter };
