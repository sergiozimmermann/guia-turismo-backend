const { AdhesionService } = require('../application/adhesion.service');
const { AppError } = require('../../../shared/errors/app-error');

async function createAdhesionController(req, res, next) {
  try {
    const { guideId } = req.params;
    const { adhesionDate, validityDate, amount } = req.body;
    if (!adhesionDate || !validityDate || amount == null) throw new AppError('adhesionDate, validityDate e amount são obrigatórios', 400);
    const adhesion = await AdhesionService.createAdhesion({ guideId, adhesionDate, validityDate, amount });
    return res.status(201).json({ adhesion });
  } catch (error) {
    next(error);
  }
}

async function getAdhesionsController(req, res, next) {
  try {
    const { guideId } = req.params;
    const adhesions = await AdhesionService.getAdhesionsByGuide(guideId);
    return res.status(200).json({ adhesions });
  } catch (error) {
    next(error);
  }
}

async function updateAdhesionPaymentController(req, res, next) {
  try {
    const { adhesionId } = req.params;
    const { paymentDate, paymentStatus, amount } = req.body;
    if (!paymentStatus) throw new AppError('paymentStatus é obrigatório', 400);
    const adhesion = await AdhesionService.updateAdhesionPayment(adhesionId, { paymentDate, paymentStatus, amount });
    return res.status(200).json({ adhesion });
  } catch (error) {
    next(error);
  }
}

async function listAllAdhesionsController(req, res, next) {
  try {
    const adhesions = await AdhesionService.listAllAdhesions();
    return res.status(200).json({ adhesions });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createAdhesionController,
  getAdhesionsController,
  updateAdhesionPaymentController,
  listAllAdhesionsController,
};
