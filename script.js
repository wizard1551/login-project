document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const message = document.getElementById("message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "1234") {
      message.style.color = "#00ffc6";
      message.textContent = "✅ Login successful!";
    } else {
      message.style.color = "#ff6b6b";
      message.textContent = "❌ Invalid username or password!";
    }
  });
});

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
resizeCanvas();

let particles = [];
const PARTICLE_COUNT = 130;
const LINK_DISTANCE = 120;
const MOUSE_INFLUENCE = 0.02;   
const CLICK_REPEL_FORCE = 4;    
const mouse = { x: null, y: null, active: false };
const MAX_SPEED = 2;

this.vx = Math.max(Math.min(this.vx, MAX_SPEED), -MAX_SPEED);
this.vy = Math.max(Math.min(this.vy, MAX_SPEED), -MAX_SPEED);


class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 1;
    this.vx = (Math.random() - 0.5) * 1.2;
    this.vy = (Math.random() - 0.5) * 1.2;
  }
  update() {
    if (mouse.active && mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      this.vx += dx * MOUSE_INFLUENCE / 1000;
      this.vy += dy * MOUSE_INFLUENCE / 1000;
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.fillStyle = "#00ffc6";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}


canvas.addEventListener("click", (e) => {
  const cx = e.clientX;
  const cy = e.clientY;
  particles.forEach(p => {
    const dx = p.x - cx;
    const dy = p.y - cy;
    const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);
    p.vx += (dx / dist) * CLICK_REPEL_FORCE * 0.2;
    p.vy += (dy / dist) * CLICK_REPEL_FORCE * 0.2;
  });
});


function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
}

function drawLinks() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < LINK_DISTANCE) {
        const alpha = 1 - dist / LINK_DISTANCE;
        ctx.strokeStyle = `rgba(0,255,198,${alpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  drawLinks();
  requestAnimationFrame(animate);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

initParticles();
animate();

window.addEventListener("resize", () => {
  resizeCanvas();
  initParticles();
});

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.active = true;
});

canvas.addEventListener("mouseleave", () => {
  mouse.active = false;
  mouse.x = null;
  mouse.y = null;
});

canvas.addEventListener("click", (e) => {
  const cx = e.clientX;
  const cy = e.clientY;
  particles.forEach(p => {
    const dx = p.x - cx;
    const dy = p.y - cy;
    const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);
    p.vx += (dx / dist) * CLICK_REPEL_FORCE * 0.2;
    p.vy += (dy / dist) * CLICK_REPEL_FORCE * 0.2;
  });
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.active = true;
});
canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  const cx = touch.clientX;
  const cy = touch.clientY;

  particles.forEach(p => {
    const dx = p.x - cx;
    const dy = p.y - cy;
    const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);
    p.vx += (dx / dist) * CLICK_REPEL_FORCE * 0.2;
    p.vy += (dy / dist) * CLICK_REPEL_FORCE * 0.2;
  });
});
