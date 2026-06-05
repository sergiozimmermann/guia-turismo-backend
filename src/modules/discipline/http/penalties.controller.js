const { PenaltiesService } = require('../application/penalties.service');
const { AppError } = require('../../../shared/errors/app-error');

async function createPenaltyController(req, res, next) {
  try {
    const data = req.body;
    if (!data.guideId || !data.reason || !data.type) throw new AppError('guideId, reason e type são obrigatórios', 400);
    const penalty = await PenaltiesService.createPenalty({ ...data, startDate: new Date(data.startDate), endDate: new Date(data.endDate) });
    return res.status(201).json({ penalty });
  } catch (error) {
    next(error);
  }
}

async function listPenaltiesController(req, res, next) {
  try {
    const { status, type } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    const penalties = await PenaltiesService.listPenalties(filter);
    return res.status(200).json({ penalties });
  } catch (error) {
    next(error);
  }
}

async function updatePenaltyController(req, res, next) {
  try {
    const { penaltyId } = req.params;
    const { status } = req.body;
    const penalty = await PenaltiesService.updatePenalty(penaltyId, { status });
    return res.status(200).json({ penalty });
  } catch (error) {
    next(error);
  }
}

async function deletePenaltyController(req, res, next) {
  try {
    const { penaltyId } = req.params;
    await PenaltiesService.deletePenalty(penaltyId);
    return res.status(200).json({ message: 'Penalty deleted', id: penaltyId });
  } catch (error) {
    next(error);
  }
}

module.exports = { createPenaltyController, listPenaltiesController, updatePenaltyController, deletePenaltyController };
