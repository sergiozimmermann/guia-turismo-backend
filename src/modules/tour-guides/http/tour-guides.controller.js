const bcrypt = require('bcryptjs');
const { AppError } = require('../../../shared/errors/app-error');
const env = require('../../../config/env');
const { TourGuidesService } = require('../application/tour-guides.service');
const { UsersService } = require('../../users/application/users.service');

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

function validateClaimAccessPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new AppError('Payload inválido para criação do usuário de acesso do guia.', 400);
  }

  const token = payload.token ? String(payload.token).trim() : '';
  const password = payload.password ? String(payload.password) : '';
  const email = payload.email ? String(payload.email).trim().toLowerCase() : null;

  if (!token) {
    throw new AppError('O campo token é obrigatório.', 400);
  }

  if (!password || password.length < 6) {
    throw new AppError('Senha deve ter no mínimo 6 caracteres.', 400);
  }

  return { token, password, email };
}

function validateSchedulePayload(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new AppError('Payload inválido para atualização da grade de horário.', 400);
  }

  const schedule = Array.isArray(payload.schedule) ? payload.schedule : null;
  if (!schedule || schedule.length === 0) {
    throw new AppError('O campo schedule deve ser um array com ao menos um item.', 400);
  }

  const allowedDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  return schedule.map((item, index) => {
    if (!item || typeof item !== 'object') {
      throw new AppError(`Item de schedule inválido na posição ${index}.`, 400);
    }

    const dayOfWeek = item.dayOfWeek ? String(item.dayOfWeek).trim().toLowerCase() : '';
    const startTime = item.startTime ? String(item.startTime).trim() : '';
    const endTime = item.endTime ? String(item.endTime).trim() : '';
    const active = typeof item.active === 'boolean' ? item.active : true;

    if (!allowedDays.includes(dayOfWeek)) {
      throw new AppError(`dayOfWeek inválido no item ${index}.`, 400);
    }

    if (!startTime || !timeRegex.test(startTime)) {
      throw new AppError(`startTime inválido no item ${index}. Use HH:mm.`, 400);
    }

    if (!endTime || !timeRegex.test(endTime)) {
      throw new AppError(`endTime inválido no item ${index}. Use HH:mm.`, 400);
    }

    return {
      dayOfWeek,
      startTime,
      endTime,
      active,
    };
  });
}

async function createTourGuideController(req, res, next) {
  try {
    const tourGuideData = validateCreateTourGuidePayload(req.body);
    const result = await TourGuidesService.createTourGuide(tourGuideData);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function listTourGuidesController(_req, res, next) {
  try {
    const tourGuides = await TourGuidesService.listTourGuides();
    return res.status(200).json({ tourGuides });
  } catch (error) {
    next(error);
  }
}

async function ensureGuideAccess(req, guideId) {
  if (req.user.role !== 'guide') {
    return;
  }

  const tourGuide = await TourGuidesService.getTourGuideByUserId(req.user.id);

  if (!tourGuide || tourGuide.id !== guideId) {
    throw new AppError('Acesso negado.', 403);
  }
}

async function getTourGuideScheduleController(req, res, next) {
  try {
    const { guideId } = req.params;
    await ensureGuideAccess(req, guideId);

    const schedule = await TourGuidesService.getAvailabilitySchedule(guideId);

    return res.status(200).json({ guideId, schedule });
  } catch (error) {
    next(error);
  }
}

async function updateTourGuideScheduleController(req, res, next) {
  try {
    const { guideId } = req.params;
    await ensureGuideAccess(req, guideId);
    const scheduleItems = validateSchedulePayload(req.body);
    const schedule = await TourGuidesService.setAvailabilitySchedule(guideId, scheduleItems);

    return res.status(200).json({ guideId, schedule });
  } catch (error) {
    next(error);
  }
}

async function claimAccessController(req, res, next) {
  try {
    const { token, password, email } = validateClaimAccessPayload(req.body);
    const [tokenId, tokenSecret] = String(token).split('.');

    if (!tokenId || !tokenSecret) {
      throw new AppError('Token inválido.', 400);
    }

    const tourGuide = await TourGuidesService.getTourGuideByTokenId(tokenId);

    if (!tourGuide || !tourGuide.tokenHash || !tourGuide.tokenCreatedAt) {
      throw new AppError('Token inválido ou expirado.', 400);
    }

    const tokenAgeMs = Date.now() - new Date(tourGuide.tokenCreatedAt).getTime();
    const tokenLifetimeMs = env.tourGuideTokenExpiresInHours * 60 * 60 * 1000;

    if (tokenAgeMs > tokenLifetimeMs) {
      throw new AppError('Token expirado.', 400);
    }

    const isTokenValid = await bcrypt.compare(tokenSecret, tourGuide.tokenHash);

    if (!isTokenValid) {
      throw new AppError('Token inválido ou expirado.', 400);
    }

    const guideEmail = tourGuide.email || email;

    if (!guideEmail) {
      throw new AppError('Email do guia é necessário para criar o usuário de acesso.', 400);
    }

    const result = await UsersService.register(guideEmail, password, tourGuide.name, 'guide');
    await TourGuidesService.linkUserToGuide(tourGuide.id, result.user.id);
    await TourGuidesService.clearAccessToken(tourGuide.id);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTourGuideController,
  claimAccessController,
  listTourGuidesController,
  getTourGuideScheduleController,
  updateTourGuideScheduleController,
};