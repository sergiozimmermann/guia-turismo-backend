const { prisma } = require('../../../config/prisma');
const { AppError } = require('../../../shared/errors/app-error');

class AdminService {
  async assignGuideToTourGroup(tourGroupId, guideId) {
    const tourGroup = await prisma.tourGroup.findUnique({
      where: {
        id: tourGroupId,
      },
    });

    if (!tourGroup) {
      throw new AppError('Grupo de turistas não encontrado.', 404);
    }

    const tourGuide = await prisma.tourGuide.findUnique({
      where: { id: guideId },
    });

    if (!tourGuide) {
      throw new AppError('Guia de turismo não encontrado.', 404);
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

module.exports = { AdminService: new AdminService() };
