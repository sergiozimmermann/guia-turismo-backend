const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { prisma } = require('../../../config/prisma');
const { AppError } = require('../../../shared/errors/app-error');

class TourGuidesService {
  async createTourGuide(tourGuideData) {
    const tokenId = crypto.randomUUID();
    const tokenSecret = crypto.randomBytes(24).toString('hex');
    const tokenHash = await bcrypt.hash(tokenSecret, 10);

    const tourGuide = await prisma.tourGuide.create({
      data: {
        ...tourGuideData,
        tokenId,
        tokenHash,
        tokenCreatedAt: new Date(),
      },
    });

    const { tokenHash: _, tokenId: __, tokenCreatedAt: ___, ...safeTourGuide } = tourGuide;

    return {
      tourGuide: safeTourGuide,
      token: `${tokenId}.${tokenSecret}`,
    };
  }

  async getTourGuideByTokenId(tokenId) {
    return prisma.tourGuide.findUnique({
      where: {
        tokenId,
      },
    });
  }

  async clearAccessToken(tourGuideId) {
    return prisma.tourGuide.update({
      where: { id: tourGuideId },
      data: {
        tokenId: null,
        tokenHash: null,
        tokenCreatedAt: null,
      },
    });
  }

  async linkUserToGuide(tourGuideId, userId) {
    return prisma.tourGuide.update({
      where: { id: tourGuideId },
      data: {
        userId,
      },
    });
  }

  async getTourGuideByUserId(userId) {
    return prisma.tourGuide.findUnique({
      where: { userId },
    });
  }

  async listTourGuides() {
    return prisma.tourGuide.findMany({
      select: {
        id: true,
        cnpj: true,
        legalRepresentativeCpf: true,
        name: true,
        email: true,
        phone: true,
        licenseNumber: true,
        languages: true,
        address: true,
        active: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getAvailabilitySchedule(guideId) {
    const tourGuide = await prisma.tourGuide.findUnique({
      where: { id: guideId },
    });

    if (!tourGuide) {
      throw new AppError('Guia de turismo não encontrado.', 404);
    }

    return prisma.tourGuideAvailability.findMany({
      where: { tourGuideId: guideId },
      orderBy: { dayOfWeek: 'asc' },
    });
  }

  async setAvailabilitySchedule(guideId, scheduleItems) {
    const tourGuide = await prisma.tourGuide.findUnique({
      where: { id: guideId },
    });

    if (!tourGuide) {
      throw new AppError('Guia de turismo não encontrado.', 404);
    }

    await prisma.tourGuideAvailability.deleteMany({
      where: { tourGuideId: guideId },
    });

    const scheduleWithGuideId = scheduleItems.map((item) => ({
      ...item,
      tourGuideId: guideId,
    }));

    await prisma.tourGuideAvailability.createMany({
      data: scheduleWithGuideId,
    });

    return this.getAvailabilitySchedule(guideId);
  }
}

module.exports = { TourGuidesService: new TourGuidesService() };