const { Router } = require('express');
const { authenticateToken, authorizeRoles } = require('../../../shared/http/auth-middleware');
const {
  matchController,
  queueController,
  registerGuideController,
  joinQueueController,
  removeFromQueueController,
} = require('./rotation-engine.controller');

const rotationEngineRouter = Router();

rotationEngineRouter.get('/queue', authenticateToken, authorizeRoles(['admin', 'guide']), queueController);
rotationEngineRouter.post('/queue/guides', authenticateToken, authorizeRoles(['admin']), registerGuideController);
rotationEngineRouter.delete('/queue/guides/:guideId', authenticateToken, authorizeRoles(['admin']), removeFromQueueController);
rotationEngineRouter.post('/join-queue', authenticateToken, authorizeRoles(['guide']), joinQueueController);
rotationEngineRouter.post('/match', authenticateToken, authorizeRoles(['admin']), matchController);

module.exports = { rotationEngineRouter };
