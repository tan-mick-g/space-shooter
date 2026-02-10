import { GAME } from '../core/constants.js';

export class EnemyManager {
  constructor() {
    this.enemies = [];
  }

  spawn(x, y) {
    this.enemies.push({
      x,
      y,
      size: GAME.ENEMY_SIZE,
      alive: true,
    });
  }

  update(dt) {
    const step = GAME.ENEMY_SPEED * dt * 60;

    for (const enemy of this.enemies) {
      enemy.y += step;
    }

    this.enemies = this.enemies.filter(
      (enemy) => enemy.alive !== false && enemy.y < GAME.CANVAS_HEIGHT + enemy.size
    );
  }

  render(ctx) {
    ctx.save();
    ctx.fillStyle = '#ff3b30';

    for (const enemy of this.enemies) {
      ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    }

    ctx.restore();
  }
}

