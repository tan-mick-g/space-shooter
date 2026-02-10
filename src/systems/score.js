import { GAME } from '../core/constants.js';

export class HUD {
  constructor() {
    this.reset();
  }

  addScore(points) {
    this.score += points;
  }

  loseLife() {
    this.lives = Math.max(0, this.lives - 1);
  }

  setWave(waveNumber) {
    this.wave = Math.max(1, Math.floor(waveNumber));
  }

  reset() {
    this.score = 0;
    this.lives = GAME.MAX_LIVES;
    this.wave = 1;
  }

  render(ctx) {
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px monospace';
    ctx.textBaseline = 'top';

    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${this.score}`, 12, 10);

    ctx.textAlign = 'center';
    ctx.fillText(`Wave: ${this.wave}`, GAME.CANVAS_WIDTH / 2, 10);

    ctx.textAlign = 'right';
    ctx.fillText(`Lives: ${this.lives}`, GAME.CANVAS_WIDTH - 12, 10);

    ctx.restore();
  }
}

