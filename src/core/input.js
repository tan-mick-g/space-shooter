const TRACKED_KEYS = new Set([
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'w',
  'a',
  's',
  'd',
  'Space',
]);

const CODE_TO_KEY = {
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  KeyW: 'w',
  KeyA: 'a',
  KeyS: 's',
  KeyD: 'd',
  Space: 'Space',
};

function normalizeKey(key) {
  if (!key) {
    return null;
  }

  if (key === ' ' || key === 'Spacebar') {
    return 'Space';
  }

  if (key.length === 1) {
    return key.toLowerCase();
  }

  return key;
}

export class Input {
  constructor() {
    this.pressedKeys = new Set();
    this.listening = false;

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  resolveTrackedKey(event) {
    const fromCode = CODE_TO_KEY[event.code];
    if (fromCode && TRACKED_KEYS.has(fromCode)) {
      return fromCode;
    }

    const normalizedKey = normalizeKey(event.key);
    if (normalizedKey && TRACKED_KEYS.has(normalizedKey)) {
      return normalizedKey;
    }

    return null;
  }

  handleKeyDown(event) {
    const key = this.resolveTrackedKey(event);
    if (!key) {
      return;
    }

    this.pressedKeys.add(key);

    if (key === 'Space') {
      event.preventDefault();
    }
  }

  handleKeyUp(event) {
    const key = this.resolveTrackedKey(event);
    if (!key) {
      return;
    }

    this.pressedKeys.delete(key);
  }

  isKeyDown(key) {
    const normalizedKey = normalizeKey(key);
    if (!normalizedKey) {
      return false;
    }

    return this.pressedKeys.has(normalizedKey);
  }

  startListening() {
    if (this.listening) {
      return;
    }

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    this.listening = true;
  }

  stopListening() {
    if (!this.listening) {
      return;
    }

    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    this.pressedKeys.clear();
    this.listening = false;
  }
}

