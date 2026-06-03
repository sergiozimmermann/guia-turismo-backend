const { Router } = require('express');
const { authenticateToken, authorizeRoles } = require('../../../shared/http/auth-middleware');
const { assignGuideToTourGroupController, createTourGuideController } = require('./admin.controller');

const adminRouter = Router();

adminRouter.get('/', (_req, res) => {
  return res.status(200).json({
    module: 'admin',
    message: 'Admin module is ready',
  });
});

/**
 * @swagger
 * /admin/tour-guides:
 *   post:
 *     summary: Criar um guia de turismo
 *     description: Cria um guia de turismo e retorna um token seguro para ativação do acesso do guia.
 *     tags:
 *       - Admin (Administrador)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TourGuideRegister'
 *     responses:
 *       201:
 *         description: Guia de turismo criado com sucesso com token de ativação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tourGuide:
 *                   $ref: '#/components/schemas/TourGuide'
 *                 token:
 *                   type: string
 *                   description: Token de ativação que deve ser usado pelo guia para criar seu usuário
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
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

/**
 * @swagger
 * /admin/tour-groups/{tourGroupId}/assign-guide:
 *   post:
 *     summary: Vincular um guia a um grupo de turistas
 *     description: Atualiza um grupo de turistas com o ID do guia vinculado e altera o status para guia vinculado.
 *     tags:
 *       - Admin (Administrador)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tourGroupId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do grupo de turistas a ser vinculado a um guia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TourGroupAssignGuide'
 *     responses:
 *       200:
 *         description: Grupo de turistas atualizado com o guia vinculado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TourGroup'
 *       400:
 *         description: Dados inválidos ou guiaId ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Grupo de turistas não encontrado
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
adminRouter.post('/tour-guides', authenticateToken, authorizeRoles(['admin']), createTourGuideController);
adminRouter.post('/tour-groups/:tourGroupId/assign-guide', authenticateToken, authorizeRoles(['admin']), assignGuideToTourGroupController);

module.exports = { adminRouter };
