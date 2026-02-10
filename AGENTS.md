# Space Shooter

## Project Overview
A vertical-scrolling shoot-em-up browser game using HTML5 Canvas + vanilla JavaScript.
No frameworks, no build step — just open `index.html` in a browser.

## Tech Stack
- HTML5 Canvas for rendering
- Vanilla JavaScript (ES modules via `<script type="module">`)
- No external frameworks or dependencies

## File Structure
```
space-shooter/
├── AGENTS.md               # This file — context for AI agents
├── index.html              # Entry point, hosts the <canvas>
├── style.css               # Dark background, centered canvas
├── src/
│   ├── main.js             # Bootstrap — imports and wires all modules
│   ├── core/
│   │   ├── constants.js    # Game constants (canvas size, speeds, colors)
│   │   ├── game-loop.js    # requestAnimationFrame loop, deltaTime
│   │   └── input.js        # Keyboard input handler
│   ├── entities/
│   │   ├── player.js       # Player ship (movement + rendering)
│   │   ├── bullet.js       # Bullet pool/system
│   │   └── enemy.js        # Enemy types + behavior
│   ├── systems/
│   │   ├── collision.js    # Collision detection
│   │   ├── spawner.js      # Enemy wave spawner
│   │   └── score.js        # Score tracking + HUD
│   ├── effects/
│   │   ├── particles.js    # Explosion particles
│   │   ├── starfield.js    # Scrolling starfield background
│   │   └── screenshake.js  # Screen shake on hit
│   └── screens/
│       ├── title.js        # Title / start screen
│       └── gameover.js     # Game over screen
└── assets/
    ├── sprites/            # Sprite sheets (if used)
    └── audio/              # Sound effects + music
```

## Coding Conventions
- **ES modules**: Use `export` / `import` syntax. No CommonJS.
- **Classes**: Use classes for game entities (`Player`, `Bullet`, `Enemy`).
- **Naming**: `camelCase` for variables/functions, `PascalCase` for classes.
- **Canvas context**: Pass `ctx` as a parameter to `render()` methods — do NOT store it globally.
- **Constants**: All magic numbers go in `src/core/constants.js`.
- **No DOM manipulation** outside of `index.html` and `main.js`.

## Game Design
- **Canvas**: 480×720 pixels (portrait orientation)
- **Player**: Triangle ship at bottom, moves with arrow keys + WASD, shoots upward with Space
- **Enemies**: Spawn at top, move downward. Different types in later waves.
- **Collision**: Axis-aligned bounding box (AABB) for simplicity
- **Scoring**: +100 per enemy killed, displayed top-left
- **Lives**: 3 lives, displayed top-right

## Build & Run
```bash
# No build step needed. Just serve the files:
python3 -m http.server 8000
# Then open http://localhost:8000 in your browser
```

## Testing
- Open browser DevTools console — no errors should appear
- Player ship should render and respond to keyboard input
- Enemies should spawn and move downward
- Bullets should destroy enemies on contact
