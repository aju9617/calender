const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
console.log(ctx);
canvas.height = window.innerHeight - 5;
canvas.width = window.innerWidth;

window.addEventListener('resize', function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

let particleArray = [];
let pointers = [];
let hue = Math.random() * 255 + 1;

class Pointer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sx = Math.random() * 15 - 5;
    this.sy = Math.random() * 15 - 5;
  }

  update() {
    this.x += this.sx;
    this.y += this.sy;

    if (this.x > canvas.width) {
      this.sx = -(Math.random() * 15);
    }
    if (this.x < 0) {
      this.sx = Math.random() * 15;
    }

    if (this.y > canvas.height) {
      this.sy = -(Math.random() * 15);
    }
    if (this.y < 0) {
      this.sy = Math.random() * 15;
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 12 + 1;
    this.sx = Math.random() * 3 - 1.5; //speed x
    this.sy = Math.random() * 3 - 1.5; //speed y
    this.color = `hsl(${hue},100%, 50%)`;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    this.x += this.sx;
    this.y += this.sy;
    if (this.size > 0.2) this.size -= 0.1;
  }
}

function createPointer(x, y) {
  const p = new Pointer(x, y);
  pointers.push(p);
  console.log(pointers);
}

function init() {
  for (let j = 0; j < pointers.length; j++) {
    for (let i = 0; i < 10; i++) {
      const particle = new Particle(pointers[j].x, pointers[j].y);
      particleArray.push(particle);
    }
  }
}

function handleParticle() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
    if (particleArray[i].size <= 0.3) {
      particleArray.splice(i, 1);
      i--;
    }
  }
}

function handlePointers() {
  init();
  for (let i = 0; i < pointers.length; i++) {
    pointers[i].update();
  }
}

function animate() {
  handlePointers();
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticle();
  requestAnimationFrame(animate);
  // hue += Math.random() * 150 + 1;
  hue += 1;
}
init();

for (let i = 0; i < 2; i++) {
  createPointer(
    Math.random() * canvas.width + 1,
    Math.random() * canvas.height + 1
  );
}

animate();
