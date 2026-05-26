const { Router } = require('express');
const {
  matchController,
  queueController,
  registerGuideController,
} = require('./rotation-engine.controller');

const rotationEngineRouter = Router();

rotationEngineRouter.get('/queue', queueController);
rotationEngineRouter.post('/queue/guides', registerGuideController);
rotationEngineRouter.post('/match', matchController);

module.exports = { rotationEngineRouter };
