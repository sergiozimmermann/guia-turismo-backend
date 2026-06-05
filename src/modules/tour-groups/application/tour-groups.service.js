const { prisma } = require('../../../config/prisma');
const { AppError } = require('../../../shared/errors/app-error');

class TourGroupsService {
  async createTourGroup(tourGroupData) {
    return prisma.tourGroup.create({
      data: tourGroupData,
    });
  }

  async getTourGroupById(tourGroupId) {
    return prisma.tourGroup.findUnique({
      where: {
        id: tourGroupId,
      },
    });
  }

  async listTourGroups() {
    const groups = await prisma.tourGroup.findMany({ orderBy: { createdAt: 'desc' } });
    // attach basic guide info when available
    return Promise.all(groups.map(async (g) => {
      if (g.guideId) {
        const guide = await prisma.tourGuide.findUnique({ where: { id: g.guideId } });
        return { ...g, guide: guide ? { id: guide.id, name: guide.name } : null };
      }
      return { ...g, guide: null };
    }));
  }

  async assignGuideToTourGroup(tourGroupId, guideId) {
    const tourGroup = await this.getTourGroupById(tourGroupId);

    if (!tourGroup) {
      throw new AppError('Grupo de turistas não encontrado.', 404);
    }

    return prisma.tourGroup.update({
      where: {
        id: tourGroupId,
      },
      data: {
        guideId,
        status: 'guide_linked',
      },
    });
  }
}

module.exports = { TourGroupsService: new TourGroupsService() };
