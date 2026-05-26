const { AppError } = require('../../../shared/errors/app-error');
const { RotationEngineService } = require('../application/rotation-engine.service');

const rotationEngineService = new RotationEngineService();

function matchController(req, res, next) {
  try {
    const { groupId, groupName, requestedAt } = req.body;

    if (!groupId || !groupName) {
      throw new AppError('groupId and groupName are required', 422);
    }

    const result = rotationEngineService.matchGuideToGroup({
      id: groupId,
      name: groupName,
      requestedAt: requestedAt ?? new Date().toISOString(),
    });

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

function queueController(_req, res) {
  return res.status(200).json({
    guides: rotationEngineService.listQueue(),
  });
}

function registerGuideController(req, res, next) {
  try {
    const { id, name } = req.body;

    if (!id || !name) {
      throw new AppError('id and name are required', 422);
    }

    const guide = rotationEngineService.addGuide({ id, name });

    return res.status(201).json({
      message: 'Guide added to rotation queue',
      guide,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  matchController,
  queueController,
  registerGuideController,
};
