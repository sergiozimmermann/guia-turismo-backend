const { prisma } = require('../../../config/prisma');

class TourGroupsService {
  async createTourGroup(tourGroupData) {
    return prisma.tourGroup.create({
      data: tourGroupData,
    });
  }
}

module.exports = { TourGroupsService: new TourGroupsService() };
