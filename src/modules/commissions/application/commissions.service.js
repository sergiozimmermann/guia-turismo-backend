const { prisma } = require('../../../config/prisma');

class CommissionsService {
  async createCommission({ guideId, guideName, percentage, effectiveDate }) {
    return prisma.commission.create({
      data: { guideId, guideName, percentage: Number(percentage), effectiveDate: new Date(effectiveDate) },
    });
  }

  async listCommissions() {
    return prisma.commission.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async updateCommission(id, data) {
    return prisma.commission.update({ where: { id }, data });
  }

  async getCommissionByGuide(guideId) {
    return prisma.commission.findFirst({ where: { guideId } });
  }
}

module.exports = { CommissionsService: new CommissionsService() };
