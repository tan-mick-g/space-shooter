export class GameLoop {
  constructor(update, render) {
    this.update = typeof update === 'function' ? update : () => {};
    this.render = typeof render === 'function' ? render : () => {};

    this.running = false;
    this.lastTime = 0;
    this.frameId = null;

    this.tick = (timestamp) => {
      if (!this.running) {
        return;
      }

      const rawDelta = (timestamp - this.lastTime) / 1000;
      const deltaTime = Math.min(rawDelta, 0.1);
      this.lastTime = timestamp;

      this.update(deltaTime);
      this.render();

      this.frameId = requestAnimationFrame(this.tick);
    };
  }

  start() {
    if (this.running) {
      return;
    }

    this.running = true;
    this.lastTime = performance.now();
    this.frameId = requestAnimationFrame(this.tick);
  }

  stop() {
    if (!this.running) {
      return;
    }

    this.running = false;

    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }
}

