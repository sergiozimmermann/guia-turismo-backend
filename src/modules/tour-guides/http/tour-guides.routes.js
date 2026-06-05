const { Router } = require('express');
const {
  claimAccessController,
  listTourGuidesController,
  getTourGuideScheduleController,
  updateTourGuideScheduleController,
} = require('./tour-guides.controller');
const { createAdhesionController, getAdhesionsController, updateAdhesionPaymentController } = require('./adhesion.controller');
const { authenticateToken, authorizeRoles } = require('../../../shared/http/auth-middleware');

const tourGuidesRouter = Router();

/**
 * @swagger
 * /tour-guides/claim-access:
 *   post:
 *     summary: Criar usuário de acesso do guia
 *     description: Valida o token enviado pelo administrador e cria o usuário de acesso para o guia.
 *     tags:
 *       - Tour Guides (Guias de Turismo)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TourGuideClaimAccess'
 *     responses:
 *       201:
 *         description: Usuário de acesso do guia criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthToken'
 *       400:
 *         description: Token inválido ou dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
tourGuidesRouter.post('/claim-access', claimAccessController);
// admin endpoints to manage guides
tourGuidesRouter.put('/:guideId', authenticateToken, authorizeRoles(['admin']), async (req, res, next) => {
  try {
    const { guideId } = req.params;
    const data = req.body;
    const updated = await require('../application/tour-guides.service').TourGuidesService ? null : null; // placeholder
    next();
  } catch (err) {
    next(err);
  }
});
tourGuidesRouter.delete('/:guideId', authenticateToken, authorizeRoles(['admin']), async (req, res, next) => {
  try {
    const { guideId } = req.params;
    const { prisma } = require('../../../config/prisma');
    await prisma.tourGuide.delete({ where: { id: guideId } });
    return res.status(200).json({ message: 'Tour guide deleted successfully', id: guideId });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /tour-guides:
 *   get:
 *     summary: Listar guias de turismo
 *     description: Retorna a lista de guias de turismo cadastrados.
 *     tags:
 *       - Tour Guides (Guias de Turismo)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de guias retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tourGuides:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TourGuide'
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
 *
 * /tour-guides/{guideId}/schedule:
 *   get:
 *     summary: Obter grade de horário do guia
 *     description: Retorna os horários de disponibilidade configurados para o guia.
 *     tags:
 *       - Tour Guides (Guias de Turismo)
 *     parameters:
 *       - in: path
 *         name: guideId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do guia
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Grade de horário retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 guideId:
 *                   type: string
 *                 schedule:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TourGuideScheduleItem'
 *       404:
 *         description: Guia não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
tourGuidesRouter.get('/', authenticateToken, authorizeRoles(['admin']), listTourGuidesController);

tourGuidesRouter.get('/:guideId/schedule', authenticateToken, authorizeRoles(['admin', 'guide']), getTourGuideScheduleController);

/**
 * @swagger
 * /tour-guides/{guideId}/schedule:
 *   put:
 *     summary: Atualizar grade de horário do guia
 *     description: Cadastra ou atualiza a grade de horário do guia para controle de disponibilidade.
 *     tags:
 *       - Tour Guides (Guias de Turismo)
 *     parameters:
 *       - in: path
 *         name: guideId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do guia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TourGuideScheduleUpdate'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Grade de horário atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 guideId:
 *                   type: string
 *                 schedule:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TourGuideScheduleItem'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Guia não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
tourGuidesRouter.put('/:guideId/schedule', authenticateToken, authorizeRoles(['admin', 'guide']), updateTourGuideScheduleController);
// admin: update guide
tourGuidesRouter.put('/:guideId', authenticateToken, authorizeRoles(['admin']), require('./tour-guides.controller').updateTourGuideController);

// Adhesion endpoints
tourGuidesRouter.post('/:guideId/adhesion', authenticateToken, authorizeRoles(['admin']), createAdhesionController);
tourGuidesRouter.get('/:guideId/adhesion', authenticateToken, authorizeRoles(['admin', 'guide']), getAdhesionsController);
tourGuidesRouter.put('/adhesion/:adhesionId/payment', authenticateToken, authorizeRoles(['admin']), updateAdhesionPaymentController);

tourGuidesRouter.get('/status', (_req, res) => {
  return res.status(200).json({
    module: 'tour-guides',
    message: 'Tour guides module is ready',
  });
});

module.exports = { tourGuidesRouter };
