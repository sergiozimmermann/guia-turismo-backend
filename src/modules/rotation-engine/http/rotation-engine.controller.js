const { AppError } = require('../../../shared/errors/app-error');
const { RotationEngineService } = require('../application/rotation-engine.service');

const service = new RotationEngineService();

async function matchController(req, res, next) {
  try {
    const { groupId, groupName, requestedAt } = req.body;
    if (!groupId || !groupName) {
      throw new AppError('groupId e groupName são obrigatórios', 422);
    }
    const result = await service.matchGuideToGroup({
      id: groupId,
      name: groupName,
      requestedAt: requestedAt ?? new Date().toISOString(),
    });
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function queueController(_req, res, next) {
  try {
    const queue = await service.listQueue();
    return res.status(200).json({ queue });
  } catch (error) {
    return next(error);
  }
}

async function registerGuideController(req, res, next) {
  try {
    const { id, name } = req.body;
    if (!id || !name) {
      throw new AppError('id e name são obrigatórios', 422);
    }
    const guide = await service.addGuide(id, name);
    return res.status(201).json({ message: 'Guia adicionado à fila de rodízio', guide });
  } catch (error) {
    return next(error);
  }
}

async function joinQueueController(req, res, next) {
  try {
    const { guideId } = req.body;
    if (!guideId) throw new AppError('guideId é obrigatório', 422);

    const { prisma } = require('../../../config/prisma');
    const tourGuide = await prisma.tourGuide.findUnique({ where: { id: guideId } });
    if (!tourGuide) throw new AppError('Guia não encontrado.', 404);

    const guide = await service.addGuide(tourGuide.id, tourGuide.name);
    return res.status(201).json({ message: 'Você entrou no rodízio', guide });
  } catch (error) {
    return next(error);
  }
}

async function removeFromQueueController(req, res, next) {
  try {
    const { guideId } = req.params;
    await service.removeGuide(guideId);
    return res.status(200).json({ message: 'Guia removido da fila', guideId });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  matchController,
  queueController,
  registerGuideController,
  joinQueueController,
  removeFromQueueController,
};
