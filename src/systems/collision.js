import { GAME } from '../core/constants.js';

function overlaps(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function asList(collection, property) {
  if (Array.isArray(collection)) {
    return collection;
  }

  if (collection && Array.isArray(collection[property])) {
    return collection[property];
  }

  return [];
}

export function checkCollisions(bullets, enemies, player) {
  const bulletList = asList(bullets, 'bullets');
  const enemyList = asList(enemies, 'enemies');

  let kills = 0;
  let playerHit = false;

  for (const bullet of bulletList) {
    if (bullet.alive === false) {
      continue;
    }

    for (const enemy of enemyList) {
      if (enemy.alive === false) {
        continue;
      }

      const enemyBox = {
        x: enemy.x,
        y: enemy.y,
        width: enemy.size,
        height: enemy.size,
      };

      if (!overlaps(bullet, enemyBox)) {
        continue;
      }

      bullet.alive = false;
      enemy.alive = false;
      kills += 1;
      break;
    }
  }

  const playerHalf = GAME.PLAYER_SIZE / 2;
  const playerBox = {
    x: player.x - playerHalf,
    y: player.y - playerHalf,
    width: GAME.PLAYER_SIZE,
    height: GAME.PLAYER_SIZE,
  };

  for (const enemy of enemyList) {
    if (enemy.alive === false) {
      continue;
    }

    const enemyBox = {
      x: enemy.x,
      y: enemy.y,
      width: enemy.size,
      height: enemy.size,
    };

    if (!overlaps(playerBox, enemyBox)) {
      continue;
    }

    enemy.alive = false;
    playerHit = true;
  }

  return { kills, playerHit };
}

