const { WarningsService } = require('../application/warnings.service');
const { AppError } = require('../../../shared/errors/app-error');

async function createWarningController(req, res, next) {
  try {
    const data = req.body;
    if (!data.guideId || !data.reason) throw new AppError('guideId e reason são obrigatórios', 400);
    const warning = await WarningsService.createWarning({ ...data, date: data.date ? new Date(data.date) : new Date() });
    return res.status(201).json({ warning });
  } catch (error) {
    next(error);
  }
}

async function listWarningsController(req, res, next) {
  try {
    const { severity, guideId } = req.query;
    const filter = {};
    if (severity) filter.severity = severity;
    if (guideId) filter.guideId = guideId;
    const warnings = await WarningsService.listWarnings(filter);
    return res.status(200).json({ warnings });
  } catch (error) {
    next(error);
  }
}

async function deleteWarningController(req, res, next) {
  try {
    const { warningId } = req.params;
    await WarningsService.deleteWarning(warningId);
    return res.status(200).json({ message: 'Warning deleted', id: warningId });
  } catch (error) {
    next(error);
  }
}

module.exports = { createWarningController, listWarningsController, deleteWarningController };
