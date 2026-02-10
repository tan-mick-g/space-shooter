import { GAME } from '../core/constants.js';

export class Spawner {
  constructor(enemyManager = null) {
    this.enemyManager = enemyManager;
    this.spawnTimer = 1.5;
    this.totalEnemiesSpawned = 0;
    this.enemiesPerWave = 10;
    this.baseInterval = 1.5;
    this.minInterval = 0.5;
    this.intervalDropPerWave = 0.08;
  }

  getCurrentWave() {
    return Math.floor(this.totalEnemiesSpawned / this.enemiesPerWave) + 1;
  }

  getCurrentInterval() {
    const wave = this.getCurrentWave();
    return Math.max(
      this.minInterval,
      this.baseInterval - (wave - 1) * this.intervalDropPerWave
    );
  }

  spawnEnemy() {
    const size = GAME.ENEMY_SIZE;
    const x = Math.random() * (GAME.CANVAS_WIDTH - size);
    const y = -size;

    if (this.enemyManager && typeof this.enemyManager.spawn === 'function') {
      this.enemyManager.spawn(x, y);
    }

    this.totalEnemiesSpawned += 1;
    return { x, y, size, alive: true };
  }

  update(dt) {
    this.spawnTimer -= dt;

    while (this.spawnTimer <= 0) {
      this.spawnEnemy();
      this.spawnTimer += this.getCurrentInterval();
    }
  }
}

