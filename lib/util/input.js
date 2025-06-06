const input = {
  down: {},
  pressed: {},

  init() {
     $(window).on('keydown', (event) => {
    this.down[event.keyCode] = true;
  });

  $(window).on('keyup', (event) => {
    delete this.down[event.keyCode];
    delete this.pressed[event.keyCode];
  });

  // Controles táctiles y mouse
  const handleDown = (code) => {
    this.down[code] = true;
  };

  const handleUp = (code) => {
    delete this.down[code];
    delete this.pressed[code];
  };

  const setupControl = (id, code) => {
    const el = document.getElementById(id);
    el.addEventListener('touchstart', () => handleDown(code));
    el.addEventListener('touchend', () => handleUp(code));
    el.addEventListener('mousedown', () => handleDown(code));
    el.addEventListener('mouseup', () => handleUp(code));
  };

  setupControl('left-button', 37);
  setupControl('right-button', 39);
  setupControl('jump-button', 38);
  },

  update(data) {
    const mario = data.entities.mario;

    if (data.userControl) {
      // Move Left
      if (this.isDown(37) || this.isDown(65)) {
        if (mario.velY === 1.2) {
          mario.currentState = mario.bigMario ? mario.states.bigWalking : mario.states.walking;
        } else {
          mario.xPos -= mario.velX;
        }
        mario.direction = 'left';
      }

      // Move Right
      if (this.isDown(39) || this.isDown(68)) {
        if (mario.velY === 1.2) {
          mario.currentState = mario.bigMario ? mario.states.bigWalking : mario.states.walking;
        } else {
          mario.xPos += mario.velX;
        }
        mario.direction = 'right';
      }

      // Jump
      if (this.isPressed(38) || this.isPressed(32) || this.isPressed(87)) {
        mario.currentState = mario.bigMario ? mario.states.bigJumping : mario.states.jumping;
      }
    } else {
      mario.currentState = mario.states.dead;
    }
  },

  isDown(code) {
    return this.down[code];
  },

  isPressed(code) {
    if (this.pressed[code]) {
      return false;
    } else if (this.down[code]) {
      this.pressed[code] = true;
      return true;
    }
    return false;
  },
};

export { input as default };
