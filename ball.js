class Game {
  constructor(gameAreaWidth, ball, dash) {
    this.gameAreaWidth = gameAreaWidth;
    this.dashWidth = dash.width;
    this.dashHeight = dash.height;
    this.ballWidth = ball.size;
  }
  #collision({ position }, dash, upperLimit) {
    // V = V - 2 ( V ⋅ N ) N
    const padding = 50;
    if (position.xp === upperLimit) {
      return [-1, -1];
    }
    if (position.yp === 0) {
      return [-1, 1];
    }
    if (position.xp === 0) {
      return [1, 1];
    }
    if (
      position.yp === upperLimit - this.dashHeight &&
      position.xp <= dash.position.left + this.dashWidth + padding &&
      position.xp >= dash.position.left - padding
    ) {
      const velocities = [
        [-1, -1],
        [0, -1],
        [1, -1],
      ];
      return velocities[Math.floor(Math.random() * velocities.length)];
    }
  }
  moveBall(ball, dash) {
    let ballVelocity = [2, -1];
    const upperLimit = this.gameAreaWidth - this.ballWidth;
    setInterval(() => {
      ballVelocity = this.#collision(ball, dash, upperLimit) || ballVelocity;
      [ball.velocity.xv, ball.velocity.yv] = ballVelocity;

      if (ball.position.yp === upperLimit) {
        clearInterval(intervalId);
      }
      ball.position.xp += ball.velocity.xv;
      ball.position.yp += ball.velocity.yv;
      ball.render();
    }, 1);
  }
  moveDash(dash) {
    dash.element.addEventListener("keydown", (e) => {
      if (e.key === "a") {
        if (dash.position.left !== 0) dash.moveLeft();
      }
      if (e.key === "d") {
        if (dash.position.left !== this.gameAreaWidth - this.dashWidth)
          dash.moveRight();
      }
    });
  }
}

class Dash {
  constructor(width, height, left, moveStep) {
    this.position = { left };
    this.width = width;
    this.height = height;
    this.moveStep = moveStep;
    this.element = Dash.makeDash(width);
  }

  static makeDash(width) {
    const gameArea = document.getElementById("main-area");
    const dash = document.createElement("div");
    dash.id = "dash";
    dash.tabIndex = 0;
    dash.style.width = `${width}px`;
    gameArea.appendChild(dash);
    return dash;
  }

  moveLeft() {
    this.position.left -= this.moveStep;
    this.element.style.left = `${this.position.left}px`;
  }

  moveRight() {
    this.position.left += this.moveStep;
    this.element.style.left = `${this.position.left}px`;
  }

  render() {
    this.element.style.left = `${this.position.left}px`;
  }
}

class Ball {
  constructor(yp, xp, xv, yv, size) {
    this.position = { yp, xp };
    this.velocity = { xv, yv };
    this.element = Ball.makeBall();
    this.size = size;
  }

  static makeBall() {
    const gameArea = document.getElementById("main-area");
    const ball = document.createElement("div");
    ball.id = "ball";
    gameArea.appendChild(ball);
    return ball;
  }

  render() {
    this.element.style.top = `${this.position.yp}px`;
    this.element.style.left = `${this.position.xp}px`;
  }
}

const main = () => {
  const ball = new Ball(300, 280, 2, -1, 50);
  const dash = new Dash(100, 20, 250, 50);
  dash.element.focus();
  const gameArea = document.getElementById("main-area");
  const gameAreaWidth = parseFloat(window.getComputedStyle(gameArea).width);
  const game = new Game(gameAreaWidth, ball, dash);
  game.moveBall(ball, dash);
  game.moveDash(dash);
};

main();
