const { prisma } = require('../../../config/prisma');

class ContactsService {
  async listContacts(type) {
    const where = type ? { type } : {};
    return prisma.contact.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  async createContact(data) {
    return prisma.contact.create({ data });
  }

  async updateContact(id, data) {
    return prisma.contact.update({ where: { id }, data });
  }

  async deleteContact(id) {
    return prisma.contact.delete({ where: { id } });
  }
}

module.exports = { ContactsService: new ContactsService() };
