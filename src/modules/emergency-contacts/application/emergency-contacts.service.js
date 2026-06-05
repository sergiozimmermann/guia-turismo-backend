const { prisma } = require('../../../config/prisma');

class EmergencyContactsService {
  async listByGuide(guideId) {
    return prisma.emergencyContact.findMany({ where: { guideId }, orderBy: { createdAt: 'desc' } });
  }

  async listAll() {
    return prisma.emergencyContact.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(data) {
    return prisma.emergencyContact.create({ data });
  }

  async update(id, data) {
    return prisma.emergencyContact.update({ where: { id }, data });
  }

  async delete(id) {
    return prisma.emergencyContact.delete({ where: { id } });
  }
}

module.exports = { EmergencyContactsService: new EmergencyContactsService() };
