/**
 * main.js — Bootstrap module
 *
 * Imports all Phase 1 modules and wires them into a playable game.
 */

import { GAME } from './core/constants.js';
import { Input } from './core/input.js';
import { GameLoop } from './core/game-loop.js';
import { Player } from './entities/player.js';
import { BulletPool } from './entities/bullet.js';
import { EnemyManager } from './entities/enemy.js';
import { checkCollisions } from './systems/collision.js';
import { Spawner } from './systems/spawner.js';
import { HUD } from './systems/score.js';

// --- Canvas ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- Game state ---
let gameOver = false;
let invincibleTimer = 0; // brief invincibility after being hit

// --- Instantiate modules ---
const input = new Input();
const player = new Player(input);
const bullets = new BulletPool();
const enemies = new EnemyManager();
const spawner = new Spawner(enemies);
const hud = new HUD();

// --- Core update ---
function update(dt) {
  if (gameOver) return;

  // Player movement
  player.update(dt);

  // Shooting
  if (input.isKeyDown('Space')) {
    const shot = player.shoot();
    if (shot) {
      bullets.spawn(shot.x, shot.y);
    }
  }

  // Move bullets & enemies
  bullets.update(dt);
  enemies.update(dt);

  // Spawn enemies
  spawner.update(dt);
  hud.setWave(spawner.getCurrentWave());

  // Collision detection
  const result = checkCollisions(bullets, enemies, player);

  if (result.kills > 0) {
    hud.addScore(result.kills * GAME.ENEMY_SCORE);
  }

  // Handle player hit (with brief invincibility)
  if (invincibleTimer > 0) {
    invincibleTimer -= dt;
  }

  if (result.playerHit && invincibleTimer <= 0) {
    hud.loseLife();
    invincibleTimer = 1.5; // 1.5s of invincibility

    if (hud.lives <= 0) {
      gameOver = true;
    }
  }
}

// --- Core render ---
function render() {
  // Clear canvas
  ctx.clearRect(0, 0, GAME.CANVAS_WIDTH, GAME.CANVAS_HEIGHT);

  if (gameOver) {
    renderGameOver();
    return;
  }

  // Draw entities (order matters: enemies behind bullets behind player)
  enemies.render(ctx);
  bullets.render(ctx);

  // Player blink during invincibility
  if (invincibleTimer > 0 && Math.floor(invincibleTimer * 10) % 2 === 0) {
    // skip rendering player on even frames = blinking effect
  } else {
    player.render(ctx);
  }

  // HUD on top
  hud.render(ctx);
}

// --- Game over screen ---
function renderGameOver() {
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GAME OVER', GAME.CANVAS_WIDTH / 2, GAME.CANVAS_HEIGHT / 2 - 30);

  ctx.font = '18px monospace';
  ctx.fillStyle = '#aaaaaa';
  ctx.fillText(`Final Score: ${hud.score}`, GAME.CANVAS_WIDTH / 2, GAME.CANVAS_HEIGHT / 2 + 15);

  ctx.font = '14px monospace';
  ctx.fillStyle = '#666666';
  ctx.fillText('Press R to restart', GAME.CANVAS_WIDTH / 2, GAME.CANVAS_HEIGHT / 2 + 50);
}

// --- Restart handler ---
window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyR' && gameOver) {
    restart();
  }
});

function restart() {
  gameOver = false;
  invincibleTimer = 0;

  // Reset player position
  player.x = GAME.CANVAS_WIDTH / 2;
  player.y = GAME.CANVAS_HEIGHT - GAME.PLAYER_SIZE * 1.5;
  player.lastFireTime = -Infinity;

  // Clear entities
  bullets.bullets.length = 0;
  enemies.enemies.length = 0;

  // Reset spawner
  spawner.spawnTimer = 1.5;
  spawner.totalEnemiesSpawned = 0;

  // Reset HUD
  hud.reset();
}

// --- Start the game ---
input.startListening();
const loop = new GameLoop(update, render);
loop.start();

console.log('🚀 Space Shooter — Phase 1 loaded! Use arrow keys/WASD to move, Space to shoot.');
