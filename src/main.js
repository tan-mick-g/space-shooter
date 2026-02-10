/**
 * main.js — Bootstrap module
 *
 * This file imports all game modules and wires them together.
 * Currently a placeholder — will be updated as modules are created.
 */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Placeholder: draw a message so we know the canvas is working
ctx.fillStyle = '#00ff88';
ctx.font = '20px monospace';
ctx.textAlign = 'center';
ctx.fillText('Space Shooter', canvas.width / 2, canvas.height / 2 - 20);
ctx.fillStyle = '#666';
ctx.font = '14px monospace';
ctx.fillText('Ready for Phase 1 modules...', canvas.width / 2, canvas.height / 2 + 10);

console.log('🚀 Space Shooter — main.js loaded. Canvas:', canvas.width, 'x', canvas.height);
