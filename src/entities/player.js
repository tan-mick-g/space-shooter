import { GAME } from '../core/constants.js';
import { Input } from '../core/input.js';

export class Player {
  constructor(input = new Input()) {
    this.input = input;
    this.size = GAME.PLAYER_SIZE;
    this.speed = GAME.PLAYER_SPEED;
    this.x = GAME.CANVAS_WIDTH / 2;
    this.y = GAME.CANVAS_HEIGHT - this.size * 1.5;
    this.lastFireTime = -Infinity;
  }

  update(dt) {
    let moveX = 0;
    let moveY = 0;

    if (this.input.isKeyDown('ArrowLeft') || this.input.isKeyDown('a')) {
      moveX -= 1;
    }
    if (this.input.isKeyDown('ArrowRight') || this.input.isKeyDown('d')) {
      moveX += 1;
    }
    if (this.input.isKeyDown('ArrowUp') || this.input.isKeyDown('w')) {
      moveY -= 1;
    }
    if (this.input.isKeyDown('ArrowDown') || this.input.isKeyDown('s')) {
      moveY += 1;
    }

    if (moveX !== 0 && moveY !== 0) {
      const invLength = 1 / Math.sqrt(2);
      moveX *= invLength;
      moveY *= invLength;
    }

    const velocity = this.speed * dt * 60;
    this.x += moveX * velocity;
    this.y += moveY * velocity;

    const half = this.size / 2;
    this.x = Math.max(half, Math.min(GAME.CANVAS_WIDTH - half, this.x));
    this.y = Math.max(half, Math.min(GAME.CANVAS_HEIGHT - half, this.y));
  }

  render(ctx) {
    const half = this.size / 2;

    ctx.save();
    ctx.fillStyle = '#39ff14';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - half);
    ctx.lineTo(this.x - half, this.y + half);
    ctx.lineTo(this.x + half, this.y + half);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  shoot() {
    const now = performance.now();
    if (now - this.lastFireTime < GAME.FIRE_RATE) {
      return null;
    }

    this.lastFireTime = now;

    return {
      x: this.x - GAME.BULLET_WIDTH / 2,
      y: this.y - this.size / 2 - GAME.BULLET_HEIGHT,
    };
  }
}

