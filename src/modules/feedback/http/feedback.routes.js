const { Router } = require('express');
const { authenticateToken, authorizeRoles } = require('../../../shared/http/auth-middleware');
const {
  listFeedbackController,
  createFeedbackController,
  updateFeedbackStatusController,
  deleteFeedbackController,
} = require('./feedback.controller');

const feedbackRouter = Router();

feedbackRouter.get('/', authenticateToken, authorizeRoles(['admin', 'guide']), listFeedbackController);
feedbackRouter.post('/', authenticateToken, authorizeRoles(['admin', 'guide']), createFeedbackController);
feedbackRouter.put('/:feedbackId/status', authenticateToken, authorizeRoles(['admin']), updateFeedbackStatusController);
feedbackRouter.delete('/:feedbackId', authenticateToken, authorizeRoles(['admin']), deleteFeedbackController);

module.exports = { feedbackRouter };
