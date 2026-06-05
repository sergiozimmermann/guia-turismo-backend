const { prisma } = require('../../../config/prisma');

class WarningsService {
  async createWarning(data) {
    return prisma.warning.create({ data });
  }

  async listWarnings(filter = {}) {
    return prisma.warning.findMany({ where: filter, orderBy: { createdAt: 'desc' } });
  }

  async deleteWarning(id) {
    return prisma.warning.delete({ where: { id } });
  }
}

module.exports = { WarningsService: new WarningsService() };
