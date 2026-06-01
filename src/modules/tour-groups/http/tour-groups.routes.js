const { Router } = require('express');

const { registerTourGroupController } = require('./tour-groups.controller');

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
 *     summary: Status do módulo
 *     description: Verifica se o módulo de grupos de turistas está disponível
 *     tags:
 *       - Tour Groups (Grupos de Turistas)
 *     responses:
 *       200:
 *         description: Módulo está operacional
 */
tourGroupsRouter.get('/', (_req, res) => {
  return res.status(200).json({
    module: 'tour-groups',
    message: 'Tour groups module is ready',
  });
});

module.exports = { tourGroupsRouter };
