const { Router } = require('express');
const { authenticateToken, authorizeRoles } = require('../../../shared/http/auth-middleware');
const {
  listEmergencyContactsController,
  createEmergencyContactController,
  updateEmergencyContactController,
  deleteEmergencyContactController,
} = require('./emergency-contacts.controller');

const emergencyContactsRouter = Router();

// Admin pode ver todos; guia pode ver os seus (filtrado por guideId no query)
emergencyContactsRouter.get('/', authenticateToken, authorizeRoles(['admin', 'guide']), listEmergencyContactsController);
emergencyContactsRouter.post('/', authenticateToken, authorizeRoles(['admin', 'guide']), createEmergencyContactController);
emergencyContactsRouter.put('/:contactId', authenticateToken, authorizeRoles(['admin', 'guide']), updateEmergencyContactController);
emergencyContactsRouter.delete('/:contactId', authenticateToken, authorizeRoles(['admin']), deleteEmergencyContactController);

module.exports = { emergencyContactsRouter };
