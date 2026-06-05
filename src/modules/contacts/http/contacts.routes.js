const { Router } = require('express');
const { authenticateToken, authorizeRoles } = require('../../../shared/http/auth-middleware');
const {
  listContactsController,
  createContactController,
  updateContactController,
  deleteContactController,
} = require('./contacts.controller');

const contactsRouter = Router();

contactsRouter.get('/', authenticateToken, authorizeRoles(['admin']), listContactsController);
contactsRouter.post('/', authenticateToken, authorizeRoles(['admin']), createContactController);
contactsRouter.put('/:contactId', authenticateToken, authorizeRoles(['admin']), updateContactController);
contactsRouter.delete('/:contactId', authenticateToken, authorizeRoles(['admin']), deleteContactController);

module.exports = { contactsRouter };
