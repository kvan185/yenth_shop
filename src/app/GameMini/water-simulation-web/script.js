const canvas = document.getElementById('waterCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let ripples = [];
let bubbles = [];
let fishes = [];
let rainDrops = [];
let showFish = true;
let raining = true;
let themeIndex = 0;
let time = 0;

const themes = [
  ['#02142f', '#0077b6', '#48cae4'],
  ['#081c15', '#1b4332', '#74c69d'],
  ['#1d1b4f', '#5b2a86', '#b5179e'],
  ['#001219', '#005f73', '#94d2bd']
];

function resize() {
  width = canvas.width = window.innerWidth * devicePixelRatio;
  height = canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  width = window.innerWidth;
  height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function createRipple(x, y, power = 1) {
  ripples.push({ x, y, radius: 2, alpha: 0.9, power });
}

function init() {
  bubbles = Array.from({ length: 80 }, () => ({
    x: rand(0, width),
    y: rand(0, height),
    r: rand(1, 5),
    speed: rand(0.3, 1.8),
    drift: rand(-0.4, 0.4)
  }));

  fishes = Array.from({ length: 14 }, () => ({
    x: rand(-width, width),
    y: rand(130, height - 60),
    size: rand(10, 28),
    speed: rand(0.4, 1.8),
    color: `hsla(${rand(170, 210)}, 90%, ${rand(55, 75)}%, 0.85)`,
    wave: rand(0, Math.PI * 2)
  }));

  rainDrops = Array.from({ length: 120 }, () => ({
    x: rand(0, width),
    y: rand(-height, 0),
    speed: rand(8, 18),
    len: rand(8, 18)
  }));
}
init();

function drawBackground() {
  const [deep, mid, light] = themes[themeIndex];
  const g = ctx.createLinearGradient(0, 0, 0, height);
  g.addColorStop(0, deep);
  g.addColorStop(0.45, mid);
  g.addColorStop(1, light);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);

  ctx.globalAlpha = 0.2;
  for (let i = 0; i < 9; i++) {
    ctx.beginPath();
    const y = 80 + i * 65 + Math.sin(time * 0.015 + i) * 14;
    ctx.moveTo(0, y);
    for (let x = 0; x <= width; x += 24) {
      ctx.lineTo(x, y + Math.sin(x * 0.018 + time * 0.035 + i) * 14);
    }
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawLightRays() {
  ctx.save();
  ctx.globalAlpha = 0.12;
  for (let i = 0; i < 7; i++) {
    const x = i * width / 6 + Math.sin(time * 0.01 + i) * 45;
    const ray = ctx.createLinearGradient(x, 0, x + 120, height);
    ray.addColorStop(0, 'rgba(255,255,255,0.9)');
    ray.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 160, height);
    ctx.lineTo(x + 260, height);
    ctx.lineTo(x + 45, 0);
    ctx.closePath();
    ctx.fillStyle = ray;
    ctx.fill();
  }
  ctx.restore();
}

function drawBubbles() {
  for (const b of bubbles) {
    b.y -= b.speed;
    b.x += Math.sin(time * 0.02 + b.y * 0.02) * 0.25 + b.drift;
    if (b.y < -20) {
      b.y = height + 20;
      b.x = rand(0, width);
    }
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function drawFish() {
  if (!showFish) return;
  for (const f of fishes) {
    f.x += f.speed;
    f.y += Math.sin(time * 0.03 + f.wave) * 0.35;
    if (f.x > width + 80) {
      f.x = -80;
      f.y = rand(130, height - 70);
    }

    ctx.save();
    ctx.translate(f.x, f.y);
    ctx.fillStyle = f.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, f.size * 1.5, f.size * 0.75, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-f.size * 1.4, 0);
    ctx.lineTo(-f.size * 2.4, -f.size * 0.7);
    ctx.lineTo(-f.size * 2.4, f.size * 0.7);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(f.size * 0.8, -f.size * 0.15, f.size * 0.13, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawRipples() {
  ripples = ripples.filter(r => r.alpha > 0.02);
  for (const r of ripples) {
    r.radius += 1.8 + r.power;
    r.alpha *= 0.97;
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,255,${r.alpha})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(r.x, r.y, r.radius * 0.55, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(173,232,244,${r.alpha * 0.65})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function drawRain() {
  if (!raining) return;
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth = 1;
  for (const d of rainDrops) {
    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x - 3, d.y + d.len);
    ctx.stroke();
    d.y += d.speed;
    d.x -= 0.7;
    if (d.y > height) {
      createRipple(d.x, height - rand(20, 80), 0.4);
      d.y = rand(-200, 0);
      d.x = rand(0, width);
    }
  }
}

function animate() {
  time++;
  drawBackground();
  drawLightRays();
  drawRain();
  drawBubbles();
  drawFish();
  drawRipples();
  requestAnimationFrame(animate);
}
animate();

let dragging = false;
function pointer(e) {
  const p = e.touches ? e.touches[0] : e;
  createRipple(p.clientX, p.clientY, 1.5);
}

window.addEventListener('mousedown', e => { dragging = true; pointer(e); });
window.addEventListener('mousemove', e => { if (dragging) pointer(e); });
window.addEventListener('mouseup', () => dragging = false);
window.addEventListener('touchstart', pointer, { passive: true });
window.addEventListener('touchmove', pointer, { passive: true });

document.getElementById('toggleFish').onclick = () => showFish = !showFish;
document.getElementById('toggleRain').onclick = () => raining = !raining;
document.getElementById('themeBtn').onclick = () => themeIndex = (themeIndex + 1) % themes.length;

setInterval(() => createRipple(rand(0, width), rand(height * 0.15, height * 0.9), 0.8), 1200);
