const { Router } = require('express');
const { authenticateToken, authorizeRoles } = require('../../../shared/http/auth-middleware');
const {
  createCommissionController,
  listCommissionsController,
  updateCommissionController,
  getCommissionByGuideController,
} = require('./commissions.controller');

const commissionsRouter = Router();

commissionsRouter.post('/setup', authenticateToken, authorizeRoles(['admin']), createCommissionController);
commissionsRouter.get('/', authenticateToken, authorizeRoles(['admin']), listCommissionsController);
commissionsRouter.put('/:commissionId', authenticateToken, authorizeRoles(['admin']), updateCommissionController);
commissionsRouter.get('/guide/:guideId', authenticateToken, authorizeRoles(['admin']), getCommissionByGuideController);

module.exports = { commissionsRouter };
