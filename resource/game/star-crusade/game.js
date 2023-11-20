const Game = {
  canvas: null,
  ctx: null,
  sound: true,
  player: null,
  enemies: [],
  bullets: [],
  score: 0,
  newMaxScore: false,
  gameOver: false,
  backgroundImage: new Image(),
  backgroundY: 0,
  interval: 0,
  font: 'Press Start 2P',
  playerImage: new Image(),
};

class Player {
  constructor() {
    this.width = 40;
    this.height = 40;
    this.x = Game.canvas.width / 2 - this.width / 2;
    this.y = Game.canvas.height - this.height - 10;
    this.speed = 6;
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isShooting = false;
  }

  update() {
    // Move the player
    if (this.isMovingLeft) this.x -= this.speed;
    if (this.isMovingRight) this.x += this.speed;

    // Ensure the player is inside the canvas
    if (this.x < 0) this.x = 0;
    if (this.x > Game.canvas.width - this.width)
      this.x = Game.canvas.width - this.width;

    // Shoot bullet
    if (this.isShooting) {
      this.isShooting = false;
      Game.bullets.push(new Bullet(this.x + this.width / 2, this.y));

      play('shoot');
    }
  }

  reset() {
    this.x = Game.canvas.width / 2 - this.width / 2;
    this.y = Game.canvas.height - this.height - 10;
    this.speed = 6; // 플레이어 속도 초기화
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isShooting = false;
  }

  render() {
    Game.ctx.drawImage(
      Game.playerImage,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class Enemy {
  constructor(speed, size = 50) {
    this.width = size;
    this.height = size;
    this.x = Math.random() * (Game.canvas.width - this.width);
    this.y = 0;
    this.speed = speed;
    this.color = randomColor();
  }

  update() {
    // Move the enemy
    this.y += this.speed;

    // Check if the enemy has reached the end of the canvas
    if (this.y > Game.canvas.height) {
      Game.enemies = Game.enemies.filter(enemy => enemy !== this);
    }
  }

  render() {
    Game.ctx.fillStyle = this.color;
    Game.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Bullet {
  constructor(x, y) {
    this.width = 5;
    this.height = 10;
    this.x = x - this.width / 2;
    this.y = y - this.height;
    this.speed = 10;
  }

  update() {
    // Move the bullet
    this.y -= this.speed;

    // Check if the bullet is outside canvas
    if (this.y < 0) {
      Game.bullets = Game.bullets.filter(bullet => bullet !== this);
    }

    // Check if the bullet has hit an enemy
    Game.enemies.forEach(enemy => {
      if (collision(this, enemy)) {
        Game.enemies = Game.enemies.filter(e => e !== enemy);
        Game.bullets = Game.bullets.filter(bullet => bullet !== this);
        Game.score += 10;
      }
    });
  }

  render() {
    Game.ctx.fillStyle = 'white';
    Game.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let gameLoopRunning = false; // 게임 루프 실행 여부를 확인하는 플래그
function gameLoop() {
  if (!Game.gameOver) {
    update();
    render();
    requestAnimationFrame(gameLoop);
  } else {
    gameLoopRunning = false; // 게임 오버 시 게임 루프 중단
  }
}

let enemySpawnTimer; // 적 생성 타이머 ID를 저장할 변수

function start() {
  Game.canvas = document.getElementById('game');
  Game.ctx = Game.canvas.getContext('2d');

  // Load images
  const assetPath = document.getElementById('assets_path').href;
  Game.backgroundImage.src = `${assetPath}/background.jpeg`;
  Game.playerImage.src = `${assetPath}/ship.png`;

  // Create player
  Game.player = new Player();

  // Each second, spawn new Enemies increasing difficulty
  enemySpawnTimer = setInterval(spawnEnemies, 1000);

  document.removeEventListener('keyup', restartGameHandler);
  document.addEventListener('keyup', restartGameHandler);

  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') Game.player.isMovingLeft = true;
    if (event.key === 'ArrowRight') Game.player.isMovingRight = true;
    if (event.key === ' ') Game.player.isShooting = true;
    if (event.key === 's') Game.sound = !Game.sound;

    // Prevent scroll when pressing the spacebar
    if (event.key === ' ' && event.target == document.body)
      event.preventDefault();

    play('soundtrack', 0.25);
  });

  document.addEventListener('keyup', event => {
    if (event.key === 'ArrowLeft') Game.player.isMovingLeft = false;
    if (event.key === 'ArrowRight') Game.player.isMovingRight = false;
  });

  if (!gameLoopRunning) {
    gameLoopRunning = true;
    requestAnimationFrame(gameLoop);
  }
}

function spawnEnemies() {
  Game.interval++;

  let maxEnemies = randomInt(2, Math.round(Game.interval / 5));
  let maxSpeed = maxEnemies + 1;
  let maxSize = (maxSpeed + 10) * 10;

  if (maxEnemies > 15) maxEnemies = 15;
  if (maxSpeed > 25) maxSpeed = 25;
  if (maxSize > 150) maxSize = 150;

  generateEnemies(maxEnemies, { maxSpeed: maxSpeed, maxSize: maxSize });
}

function generateEnemies(number, attributes) {
  for (let i = 0; i < number; i++) {
    const enemy = new Enemy(
      randomInt(2, attributes['maxSpeed']),
      randomInt(30, attributes['maxSize'])
    );
    Game.enemies.push(enemy);
  }
}

function randomInt(min, max) {
  let difference = max - min;
  let rand = Math.random();

  rand = Math.floor(rand * difference);
  rand = rand + min;

  return rand;
}

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function play(sound, volume = 0.2) {
  const audio = document.getElementById(sound);

  audio.volume = Game.sound ? volume : 0;
  if (!audio.loop) audio.currentTime = 0;

  audio.play();
}

function collision(obj1, obj2) {
  if (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  ) {
    return true;
  } else {
    return false;
  }
}

function update() {
  Game.player.update();
  Game.enemies.forEach(enemy => enemy.update());
  Game.bullets.forEach(bullet => bullet.update());

  // Check if the player was hit by any enemy
  Game.enemies.forEach(enemy => {
    if (collision(Game.player, enemy)) {
      Game.gameOver = true;
    }
  });
}

function render() {
  Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);

  renderBackground();

  Game.player.render();
  Game.enemies.forEach(enemy => enemy.render());
  Game.bullets.forEach(bullet => bullet.render());

  // Render score
  const maxScore = localStorage.getItem('gameScore') || 0;
  Game.ctx.fillStyle = 'white';
  Game.ctx.font = `20px '${Game.font}'`;
  Game.ctx.fillText(`Score ${Game.score} Record ${maxScore}`, 10, 30);

  // Notify new record achieved
  if (Game.score > maxScore && !Game.newMaxScore) {
    play('achievement');
    Game.newMaxScore = true;
  }

  // GAME OVER
  if (Game.gameOver) {
    play('explosion');

    Game.ctx.fillStyle = 'white';
    Game.ctx.font = `60px '${Game.font}'`;
    Game.ctx.fillText('GAME OVER', 130, 300);
    Game.ctx.font = `20px '${Game.font}'`;
    Game.ctx.fillText('Press R to restart', 220, 340);

    if (Game.score > maxScore) localStorage.setItem('gameScore', Game.score);

    document.addEventListener('keyup', event => {
      restartGameHandler(event);
    });
  }
}

function restartGameHandler(event) {
  if (event.key === 'r') {
    resetGame();
  }
}
function renderBackground() {
  Game.ctx.drawImage(Game.backgroundImage, 0, Game.backgroundY);
  Game.ctx.drawImage(
    Game.backgroundImage,
    0,
    Game.backgroundY - Game.canvas.height
  );

  Game.backgroundY += 0.5;
  if (Game.backgroundY >= Game.canvas.height) Game.backgroundY = 0;
}

function resetGame() {
  Game.gameOver = false;
  Game.score = 0;
  Game.newMaxScore = false;
  Game.interval = 0; // 인터벌 초기화

  // 플레이어 및 적 초기화
  Game.player.reset();
  Game.enemies = [];
  Game.bullets = [];

  // 기존 적 생성 타이머 정지
  clearInterval(enemySpawnTimer);
  // 새로운 적 생성 타이머 설정
  enemySpawnTimer = setInterval(spawnEnemies, 1000);

  // 배경 및 기타 설정 초기화 (필요한 경우)
  Game.backgroundY = 0;

  // 게임 루프 재시작
  if (!gameLoopRunning) {
    gameLoopRunning = true;
    requestAnimationFrame(gameLoop);
  }
}

start();
