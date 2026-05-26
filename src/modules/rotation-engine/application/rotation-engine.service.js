const { RotationQueue } = require('../domain/rotation-queue');

class RotationEngineService {
  constructor() {
    this.queue = new RotationQueue([
      { id: 'guide-1', name: 'Guia 01' },
      { id: 'guide-2', name: 'Guia 02' },
      { id: 'guide-3', name: 'Guia 03' },
    ]);
  }

  matchGuideToGroup(group) {
    const selectedGuide = this.queue.nextGuide();

    return {
      group,
      guide: selectedGuide,
      matchedAt: new Date().toISOString(),
      policy: 'round-robin',
    };
  }

  listQueue() {
    return this.queue.listGuides();
  }

  addGuide(guide) {
    this.queue.registerGuide(guide);
    return guide;
  }
}

module.exports = { RotationEngineService };
