const { AppError } = require('../../../shared/errors/app-error');
const { AdminService } = require('../application/admin.service');
const { TourGuidesService } = require('../../tour-guides/application/tour-guides.service');

function validateAssignGuidePayload(payload) {
  if (!payload || !payload.guideId || String(payload.guideId).trim() === '') {
    throw new AppError('O campo guideId é obrigatório para vincular um guia.', 400);
  }

  return {
    guideId: String(payload.guideId).trim(),
  };
}

function validateCreateTourGuidePayload(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new AppError('Payload inválido para criação do guia de turismo.', 400);
  }

  const cnpj = payload.cnpj ? String(payload.cnpj).trim() : '';
  const legalRepresentativeCpf = payload.legalRepresentativeCpf ? String(payload.legalRepresentativeCpf).trim() : '';
  const name = payload.name ? String(payload.name).trim() : '';

  if (!cnpj) {
    throw new AppError('O campo cnpj é obrigatório.', 400);
  }

  if (!legalRepresentativeCpf) {
    throw new AppError('O campo cpf do responsável legal é obrigatório.', 400);
  }

  if (!name) {
    throw new AppError('O campo name é obrigatório.', 400);
  }

  return {
    cnpj,
    legalRepresentativeCpf,
    name,
    email: payload.email ? String(payload.email).trim() : null,
    phone: payload.phone ? String(payload.phone).trim() : null,
    licenseNumber: payload.licenseNumber ? String(payload.licenseNumber).trim() : null,
    languages: payload.languages ? String(payload.languages).trim() : null,
    address: payload.address ? String(payload.address).trim() : null,
    active: typeof payload.active === 'boolean' ? payload.active : true,
  };
}

async function assignGuideToTourGroupController(req, res, next) {
  try {
    const { tourGroupId } = req.params;
    const { guideId } = validateAssignGuidePayload(req.body);
    const updatedTourGroup = await AdminService.assignGuideToTourGroup(tourGroupId, guideId);

    return res.status(200).json(updatedTourGroup);
  } catch (error) {
    next(error);
  }
}

async function createTourGuideController(req, res, next) {
  try {
    const tourGuideData = validateCreateTourGuidePayload(req.body);
    const tourGuide = await TourGuidesService.createTourGuide(tourGuideData);

    return res.status(201).json(tourGuide);
  } catch (error) {
    next(error);
  }
}

module.exports = { assignGuideToTourGroupController, createTourGuideController };
