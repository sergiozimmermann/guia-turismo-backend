const { prisma } = require('../../../config/prisma');

class PenaltiesService {
  async createPenalty(data) {
    return prisma.penalty.create({ data });
  }

  async listPenalties(filter = {}) {
    return prisma.penalty.findMany({ where: filter, orderBy: { createdAt: 'desc' } });
  }

  async updatePenalty(id, data) {
    return prisma.penalty.update({ where: { id }, data });
  }

  async deletePenalty(id) {
    return prisma.penalty.delete({ where: { id } });
  }
}

module.exports = { PenaltiesService: new PenaltiesService() };
