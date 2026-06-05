const { EmergencyContactsService } = require('../application/emergency-contacts.service');
const { AppError } = require('../../../shared/errors/app-error');

async function listEmergencyContactsController(req, res, next) {
  try {
    const { guideId } = req.query;
    const contacts = guideId
      ? await EmergencyContactsService.listByGuide(guideId)
      : await EmergencyContactsService.listAll();
    return res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
}

async function createEmergencyContactController(req, res, next) {
  try {
    const { guideId, guideName, name, relationship, phone, email } = req.body;
    if (!guideId || !name || !phone) {
      throw new AppError('guideId, name e phone são obrigatórios', 400);
    }
    const contact = await EmergencyContactsService.create({
      guideId,
      guideName: guideName || '',
      name,
      relationship: relationship || '',
      phone,
      email: email || '',
    });
    return res.status(201).json({ contact });
  } catch (error) {
    next(error);
  }
}

async function updateEmergencyContactController(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await EmergencyContactsService.update(contactId, req.body);
    return res.status(200).json({ contact });
  } catch (error) {
    next(error);
  }
}

async function deleteEmergencyContactController(req, res, next) {
  try {
    const { contactId } = req.params;
    await EmergencyContactsService.delete(contactId);
    return res.status(200).json({ message: 'Emergency contact deleted', id: contactId });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listEmergencyContactsController,
  createEmergencyContactController,
  updateEmergencyContactController,
  deleteEmergencyContactController,
};
