const { prisma } = require('../../../config/prisma');

class AdhesionService {
  async createAdhesion({ guideId, adhesionDate, validityDate, amount }) {
    return prisma.tourGuideAdhesion.create({
      data: { guideId, adhesionDate: new Date(adhesionDate), validityDate: new Date(validityDate), amount: Number(amount) },
    });
  }

  async getAdhesionsByGuide(guideId) {
    return prisma.tourGuideAdhesion.findMany({ where: { guideId }, orderBy: { createdAt: 'desc' } });
  }

  async updateAdhesionPayment(id, { paymentDate, paymentStatus }) {
    return prisma.tourGuideAdhesion.update({ where: { id }, data: { paymentDate: paymentDate ? new Date(paymentDate) : undefined, paymentStatus } });
  }
}

module.exports = { AdhesionService: new AdhesionService() };
