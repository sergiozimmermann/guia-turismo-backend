const { ContactsService } = require('../application/contacts.service');
const { AppError } = require('../../../shared/errors/app-error');

async function listContactsController(req, res, next) {
  try {
    const { type } = req.query;
    const contacts = await ContactsService.listContacts(type);
    return res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
}

async function createContactController(req, res, next) {
  try {
    const { name, email, phone, document, address, type } = req.body;
    if (!name || !email || !phone || !document || !address || !type) {
      throw new AppError('name, email, phone, document, address e type são obrigatórios', 400);
    }
    const contact = await ContactsService.createContact({ name, email, phone, document, address, type });
    return res.status(201).json({ contact });
  } catch (error) {
    next(error);
  }
}

async function updateContactController(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await ContactsService.updateContact(contactId, req.body);
    return res.status(200).json({ contact });
  } catch (error) {
    next(error);
  }
}

async function deleteContactController(req, res, next) {
  try {
    const { contactId } = req.params;
    await ContactsService.deleteContact(contactId);
    return res.status(200).json({ message: 'Contact deleted', id: contactId });
  } catch (error) {
    next(error);
  }
}

module.exports = { listContactsController, createContactController, updateContactController, deleteContactController };
