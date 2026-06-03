const { Router } = require('express');
const { authenticateToken, authorizeRoles } = require('../../../shared/http/auth-middleware');

const { registerTourGroupController, listTourGroupsController } = require('./tour-groups.controller');

const tourGroupsRouter = Router();

/**
 * @swagger
 * /tour-groups/register:
 *   post:
 *     summary: Registrar novo grupo de turistas
 *     description: Cria um novo registro de grupo de turistas com informações de contratante, transporte e serviço
 *     tags:
 *       - Tour Groups (Grupos de Turistas)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TourGroupRegister'
 *     responses:
 *       201:
 *         description: Grupo de turistas registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TourGroup'
 *       400:
 *         description: Dados inválidos ou campos obrigatórios faltando
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
tourGroupsRouter.post('/register', registerTourGroupController);

/**
 * @swagger
 * /tour-groups:
 *   get:
 *     summary: Listar grupos de turistas
 *     description: Retorna os grupos de turistas cadastrados.
 *     tags:
 *       - Tour Groups (Grupos de Turistas)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de grupos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tourGroups:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TourGroup'
 *       401:
 *         description: Token inválido ou ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Acesso negado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
tourGroupsRouter.get('/', authenticateToken, authorizeRoles(['admin']), listTourGroupsController);

/**
 * @swagger
 * /tour-groups/status:
 *   get:
 *     summary: Status do módulo
 *     description: Verifica se o módulo de grupos de turistas está disponível
 *     tags:
 *       - Tour Groups (Grupos de Turistas)
 *     responses:
 *       200:
 *         description: Módulo está operacional
 */
tourGroupsRouter.get('/status', (_req, res) => {
  return res.status(200).json({
    module: 'tour-groups',
    message: 'Tour groups module is ready',
  });
});

module.exports = { tourGroupsRouter };
