const { AppError } = require('../../../shared/errors/app-error');
const { TourGroupsService } = require('../application/tour-groups.service');

function parseBoolean(value) {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  const normalized = String(value).trim().toLowerCase();
  return ['true', '1', 'yes', 'sim', 's'].includes(normalized);
}

function validateTourGroupPayload(payload) {
  const requiredFields = [
    'contractorName',
    'contractorDocument',
    'address',
    'contactPerson',
    'transportType',
    'transportModel',
    'transportColor',
    'licensePlate',
    'driverName',
    'driverContact',
    'language',
    'destination',
    'serviceDate',
    'meetingPoint',
    'departureTime',
    'returnEstimate',
    'accommodation',
    'dayTrip',
    'arrivalDate',
    'returnDate',
    'passengerCount',
    'profile',
  ];

  const missingFields = requiredFields.filter(
    (field) => payload[field] === undefined || payload[field] === null || String(payload[field]).trim() === ''
  );

  if (missingFields.length > 0) {
    throw new AppError(
      `O cadastro de grupo de turistas exige os campos: ${missingFields.join(', ')}`,
      400,
      { missingFields }
    );
  }

  const serviceDate = new Date(payload.serviceDate);
  const arrivalDate = new Date(payload.arrivalDate);
  const returnDate = new Date(payload.returnDate);
  const passengerCount = Number(payload.passengerCount);
  const dayTrip = parseBoolean(payload.dayTrip);

  if (Number.isNaN(serviceDate.getTime())) {
    throw new AppError('serviceDate inválido. Use um formato de data válido.', 400);
  }

  if (Number.isNaN(arrivalDate.getTime())) {
    throw new AppError('arrivalDate inválido. Use um formato de data válido.', 400);
  }

  if (Number.isNaN(returnDate.getTime())) {
    throw new AppError('returnDate inválido. Use um formato de data válido.', 400);
  }

  if (!Number.isInteger(passengerCount) || passengerCount < 1) {
    throw new AppError('passengerCount deve ser um número inteiro maior que zero.', 400);
  }

  return {
    contractorName: String(payload.contractorName).trim(),
    contractorDocument: String(payload.contractorDocument).trim(),
    passport: payload.passport ? String(payload.passport).trim() : null,
    address: String(payload.address).trim(),
    nationality: payload.nationality ? String(payload.nationality).trim() : null,
    contactPerson: String(payload.contactPerson).trim(),
    transportType: String(payload.transportType).trim(),
    transportModel: String(payload.transportModel).trim(),
    transportColor: String(payload.transportColor).trim(),
    licensePlate: String(payload.licensePlate).trim(),
    driverName: String(payload.driverName).trim(),
    driverContact: String(payload.driverContact).trim(),
    language: String(payload.language).trim(),
    destination: String(payload.destination).trim(),
    serviceDate,
    meetingPoint: String(payload.meetingPoint).trim(),
    departureTime: String(payload.departureTime).trim(),
    returnEstimate: String(payload.returnEstimate).trim(),
    accommodation: String(payload.accommodation).trim(),
    dayTrip,
    arrivalDate,
    returnDate,
    passengerCount,
    profile: String(payload.profile).trim(),
  };
}

async function registerTourGroupController(req, res, next) {
  try {
    const tourGroupData = validateTourGroupPayload(req.body);
    const tourGroup = await TourGroupsService.createTourGroup(tourGroupData);

    return res.status(201).json(tourGroup);
  } catch (error) {
    next(error);
  }
}

async function listTourGroupsController(_req, res, next) {
  try {
    const tourGroups = await TourGroupsService.listTourGroups();
    return res.status(200).json({ tourGroups });
  } catch (error) {
    next(error);
  }
}

module.exports = { registerTourGroupController, listTourGroupsController };
