class Game {
  static #collision({ position }, dash, upperLimit, dashWidth, dashHeight) {
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
      position.yp === upperLimit - dashHeight &&
      position.xp <= dash.position.left + dashWidth + padding &&
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
  static moveBall(ball, dash) {
    let ballVelocity = [2, -1];
    const gameArea = document.getElementById("main-area");
    const gameAreaWidth = parseFloat(window.getComputedStyle(gameArea).width);
    const dashWidth = parseFloat(window.getComputedStyle(dash.element).width);
    const dashHeight = parseFloat(window.getComputedStyle(dash.element).height);
    const ballWidth = parseFloat(window.getComputedStyle(ball.element).width);
    const upperLimit = gameAreaWidth - ballWidth;
    setInterval(() => {
      ballVelocity =
        Game.#collision(ball, dash, upperLimit, dashWidth, dashHeight) ||
        ballVelocity;
      [ball.velocity.xv, ball.velocity.yv] = ballVelocity;

      if (ball.position.yp === 550) {
        clearInterval(intervalId);
        outer.insertAdjacentHTML(
          "afterbegin",
          `<p id="game-over">GAME OVER</p>`
        );
      }
      ball.position.xp += ball.velocity.xv;
      ball.position.yp += ball.velocity.yv;
      ball.render();
    }, 1);
  }
  static moveDash(dash) {
    dash.element.addEventListener("keydown", (e) => {
      if (e.key === "a") {
        if (dash.position.left !== 0) dash.moveLeft();
      }
      if (e.key === "d") {
        if (dash.position.left !== 500) dash.moveRight();
      }
    });
  }
}

class Dash {
  constructor(width, left, moveStep) {
    this.position = { left };
    this.width = width;
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
  constructor(yp, xp, xv, yv) {
    this.position = { yp, xp };
    this.velocity = { xv, yv };
    this.element = Ball.makeBall();
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
  const ball = new Ball(300, 280, 2, -1);
  ball.render();
  const dash = new Dash(100, 250, 50);
  dash.render();
  dash.element.focus();
  Game.moveBall(ball, dash);
  Game.moveDash(dash);
};

main();
