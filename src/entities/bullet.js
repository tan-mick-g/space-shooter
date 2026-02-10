import { GAME } from '../core/constants.js';

export class BulletPool {
  constructor() {
    this.bullets = [];
  }

  spawn(x, y) {
    this.bullets.push({
      x,
      y,
      width: GAME.BULLET_WIDTH,
      height: GAME.BULLET_HEIGHT,
      alive: true,
    });
  }

  update(dt) {
    const step = GAME.BULLET_SPEED * dt * 60;

    for (const bullet of this.bullets) {
      bullet.y -= step;
    }

    this.bullets = this.bullets.filter(
      (bullet) => bullet.alive !== false && bullet.y + bullet.height > 0
    );
  }

  render(ctx) {
    ctx.save();
    ctx.fillStyle = '#00ffff';

    for (const bullet of this.bullets) {
      ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }

    ctx.restore();
  }
}

