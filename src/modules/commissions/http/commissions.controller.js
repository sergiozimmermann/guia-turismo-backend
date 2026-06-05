const { CommissionsService } = require('../application/commissions.service');
const { AppError } = require('../../../shared/errors/app-error');

async function createCommissionController(req, res, next) {
  try {
    const { guideId, guideName, percentage, effectiveDate } = req.body;
    if (!guideId || percentage == null || !effectiveDate) {
      throw new AppError('guideId, percentage e effectiveDate são obrigatórios', 400);
    }

    const commission = await CommissionsService.createCommission({ guideId, guideName: guideName || '', percentage, effectiveDate });
    return res.status(201).json({ commission });
  } catch (error) {
    next(error);
  }
}

async function listCommissionsController(req, res, next) {
  try {
    const commissions = await CommissionsService.listCommissions();
    return res.status(200).json({ commissions });
  } catch (error) {
    next(error);
  }
}

async function updateCommissionController(req, res, next) {
  try {
    const { commissionId } = req.params;
    const { percentage } = req.body;
    if (percentage == null) {
      throw new AppError('percentage é obrigatório', 400);
    }
    const commission = await CommissionsService.updateCommission(commissionId, { percentage: Number(percentage) });
    return res.status(200).json({ commission });
  } catch (error) {
    next(error);
  }
}

async function getCommissionByGuideController(req, res, next) {
  try {
    const { guideId } = req.params;
    const commission = await CommissionsService.getCommissionByGuide(guideId);
    if (!commission) return res.status(404).json({ message: 'Commission not found' });
    return res.status(200).json({ commission });
  } catch (error) {
    next(error);
  }
}

module.exports = { createCommissionController, listCommissionsController, updateCommissionController, getCommissionByGuideController };
