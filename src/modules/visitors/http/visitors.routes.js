const { Router } = require('express');

const {
  registerVisitorController,
  loginVisitorController,
} = require('./visitors.controller');

const visitorsRouter = Router();

/**
 * @swagger
 * /visitors/register:
 *   post:
 *     summary: Registrar novo turista
 *     description: Cria uma nova conta de turista com email e senha
 *     tags:
 *       - Visitors (Turistas)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VisitorRegister'
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
visitorsRouter.post('/register', registerVisitorController);

/**
 * @swagger
 * /visitors/login:
 *   post:
 *     summary: Login de turista
 *     description: Autentica um turista e retorna um token JWT
 *     tags:
 *       - Visitors (Turistas)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VisitorLogin'
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
visitorsRouter.post('/login', loginVisitorController);

/**
 * @swagger
 * /visitors:
 *   get:
 *     summary: Status do módulo
 *     description: Verifica se o módulo de turistas está disponível
 *     tags:
 *       - Visitors (Turistas)
 *     responses:
 *       200:
 *         description: Módulo está operacional
 */
visitorsRouter.get('/', (_req, res) => {
  return res.status(200).json({
    module: 'visitors',
    message: 'Visitors module is ready',
  });
});

module.exports = { visitorsRouter };
