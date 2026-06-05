const { prisma } = require('../../../config/prisma');
const { AppError } = require('../../../shared/errors/app-error');

class RotationEngineService {
  async listQueue() {
    return prisma.rotationQueueEntry.findMany({ orderBy: { position: 'asc' } });
  }

  async addGuide(guideId, guideName) {
    const existing = await prisma.rotationQueueEntry.findUnique({ where: { guideId } });
    if (existing) {
      throw new AppError('Guia já está na fila de rodízio.', 409);
    }
    const count = await prisma.rotationQueueEntry.count();
    return prisma.rotationQueueEntry.create({
      data: { guideId, guideName, position: count + 1 },
    });
  }

  async removeGuide(guideId) {
    const entry = await prisma.rotationQueueEntry.findUnique({ where: { guideId } });
    if (!entry) throw new AppError('Guia não encontrado na fila.', 404);

    await prisma.rotationQueueEntry.delete({ where: { guideId } });

    // Reordena posições
    const remaining = await prisma.rotationQueueEntry.findMany({ orderBy: { position: 'asc' } });
    for (let i = 0; i < remaining.length; i++) {
      await prisma.rotationQueueEntry.update({
        where: { id: remaining[i].id },
        data: { position: i + 1 },
      });
    }
  }

  async matchGuideToGroup(group) {
    const queue = await this.listQueue();
    if (queue.length === 0) {
      throw new AppError('Nenhum guia disponível na fila de rodízio.', 409);
    }

    const selected = queue[0];

    // Move o guia selecionado para o final (round-robin)
    const newPosition = queue.length;
    await prisma.rotationQueueEntry.update({
      where: { id: selected.id },
      data: { position: newPosition + 1 },
    });
    // Reorganiza os demais
    for (let i = 1; i < queue.length; i++) {
      await prisma.rotationQueueEntry.update({
        where: { id: queue[i].id },
        data: { position: i },
      });
    }
    await prisma.rotationQueueEntry.update({
      where: { id: selected.id },
      data: { position: queue.length },
    });

    return {
      group,
      guide: { id: selected.guideId, name: selected.guideName },
      matchedAt: new Date().toISOString(),
      policy: 'round-robin',
    };
  }
}

module.exports = { RotationEngineService: new RotationEngineService() };
