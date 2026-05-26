const { AppError } = require('../../../shared/errors/app-error');

class RotationQueue {
  constructor(initialGuides = []) {
    this.guides = [...initialGuides];
    this.cursor = 0;
  }

  nextGuide() {
    if (this.guides.length === 0) {
      throw new AppError('No guides available in rotation queue', 409);
    }

    const guide = this.guides[this.cursor];
    this.cursor = (this.cursor + 1) % this.guides.length;
    return guide;
  }

  registerGuide(guide) {
    this.guides.push(guide);
  }

  listGuides() {
    return [...this.guides];
  }
}

module.exports = { RotationQueue };
