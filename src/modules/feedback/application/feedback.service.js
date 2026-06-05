const { prisma } = require('../../../config/prisma');

class FeedbackService {
  async list({ targetType, targetId, type } = {}) {
    const where = {};
    if (targetType) where.targetType = targetType;
    if (targetId) where.targetId = targetId;
    if (type) where.type = type;
    return prisma.feedback.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  async create(data) {
    return prisma.feedback.create({ data });
  }

  async updateStatus(id, status) {
    return prisma.feedback.update({ where: { id }, data: { status } });
  }

  async delete(id) {
    return prisma.feedback.delete({ where: { id } });
  }
}

module.exports = { FeedbackService: new FeedbackService() };
