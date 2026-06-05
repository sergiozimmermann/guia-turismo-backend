const { Router } = require('express');
const { authenticateToken, authorizeRoles } = require('../../../shared/http/auth-middleware');
const { createWarningController, listWarningsController, deleteWarningController } = require('./warnings.controller');
const { createPenaltyController, listPenaltiesController, updatePenaltyController, deletePenaltyController } = require('./penalties.controller');

const disciplineRouter = Router();

// Warnings
disciplineRouter.post('/warnings', authenticateToken, authorizeRoles(['admin']), createWarningController);
disciplineRouter.get('/warnings', authenticateToken, authorizeRoles(['admin']), listWarningsController);
disciplineRouter.delete('/warnings/:warningId', authenticateToken, authorizeRoles(['admin']), deleteWarningController);

// Penalties
disciplineRouter.post('/penalties', authenticateToken, authorizeRoles(['admin']), createPenaltyController);
disciplineRouter.get('/penalties', authenticateToken, authorizeRoles(['admin']), listPenaltiesController);
disciplineRouter.put('/penalties/:penaltyId', authenticateToken, authorizeRoles(['admin']), updatePenaltyController);
disciplineRouter.delete('/penalties/:penaltyId', authenticateToken, authorizeRoles(['admin']), deletePenaltyController);

module.exports = { disciplineRouter };
