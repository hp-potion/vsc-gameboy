import { FRUITS_BASE } from './fruits.js';
const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const assetPath = document.getElementById('resource-path').href;
const scoreBoard = document.getElementById('score');

const initGame = (world, engine, walls) => {
  World.clear(world);
  Engine.clear(engine);
  Engine.update(engine);
  World.add(world, walls);
  scoreBoard.innerText = 0;
};

const engine = Engine.create();
const render = Render.create({
  engine,
  element: document.body,
  options: {
    wireframe: false,
    width: 520,
    height: 600,
    background: '#F7F4C7',
    wireframes: false,
  },
});

const world = engine.world;

const leftWall = Bodies.rectangle(15, 400, 30, 800, {
  isStatic: true,
  render: { fillStyle: '#E6B143' },
});

const rightWall = Bodies.rectangle(505, 400, 30, 800, {
  isStatic: true,
  render: { fillStyle: '#E6B143' },
});

const ground = Bodies.rectangle(260, 600, 520, 100, {
  isStatic: true,
  render: { fillStyle: '#E6B143' },
});

const topLine = Bodies.rectangle(260, 120, 520, 2, {
  name: 'topLine',
  isStatic: true,
  isSensor: true,
  render: { fillStyle: '#E6B143' },
});

const walls = [leftWall, rightWall, ground, topLine];

World.add(world, walls);

Render.run(render);
Runner.run(engine);

let currentBody = null;
let currentFruit = null;
let disableAction = false;
let interval = null;
let dropPosition = {
  x: 300,
  y: 50,
};

let score = 0;

function addFruit() {
  const index = Math.floor(Math.random() * 5);
  const fruit = FRUITS_BASE[index];

  const body = Bodies.circle(dropPosition.x, dropPosition.y, fruit.radius, {
    index: index,
    isSleeping: true,
    render: {
      sprite: {
        texture: `${assetPath}/${fruit.name}.png`,
      },
    },
    restitution: 0.3,
  });

  currentBody = body;
  currentFruit = fruit;

  World.add(world, body);
}

window.onkeydown = function (e) {
  if (disableAction) {
    return;
  }
  switch (e.code) {
    case 'KeyA':
      if (interval) {
        return;
      }
      interval = setInterval(() => {
        if (currentBody.position.x - currentFruit.radius > 30) {
          Body.setPosition(currentBody, {
            x: currentBody.position.x - 1,
            y: currentBody.position.y,
          });
        }
      }, 2);
      break;
    case 'KeyD':
      if (interval) {
        return;
      }
      interval = setInterval(() => {
        if (currentBody.position.x + currentFruit.radius < 490) {
          Body.setPosition(currentBody, {
            x: currentBody.position.x + 1,
            y: currentBody.position.y,
          });
        }
      }, 2);
      break;
    case 'KeyS':
      currentBody.isSleeping = false;
      disableAction = true;
      dropPosition.x = currentBody.position.x;
      clearInterval(interval);
      setTimeout(() => {
        addFruit();
        disableAction = false;
      }, 500);
      break;
  }
};

window.onkeyup = function (e) {
  switch (e.code) {
    case 'KeyA':
      clearInterval(interval);
      interval = null;
      break;
    case 'KeyD':
      clearInterval(interval);
      interval = null;
      break;
  }
};

Events.on(engine, 'collisionStart', e => {
  e.pairs.forEach(collision => {
    if (collision.bodyA.index === collision.bodyB.index) {
      World.remove(world, [collision.bodyA, collision.bodyB]);
      const index = collision.bodyA.index;

      const newFruit = FRUITS_BASE[index + 1];
      const newBody = Bodies.circle(
        collision.collision.supports[0].x,
        collision.collision.supports[0].y,
        newFruit.radius,
        {
          index: index + 1,
          render: {
            sprite: {
              texture: `${assetPath}/${newFruit.name}.png`,
            },
          },
        }
      );

      score += index ** 2 * 10;
      scoreBoard.innerText = score;

      World.add(world, newBody);
    }

    if (
      !disableAction &&
      (collision.bodyA.name === 'topLine' || collision.bodyB.name === 'topLine')
    ) {
      openModal();
      initGame(world, engine, walls);
    }
  });
});

addFruit();

function openModal() {
  const score = scoreBoard.innerText;
  document.getElementById('game-status').innerText = `${
    document.getElementById('game-status').innerText
  } YOUR SCORE : ${score}`;
  document.getElementById('myModal').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('game-over-btn').onclick = closeModal;
}

function closeModal() {
  document.getElementById('myModal').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}
