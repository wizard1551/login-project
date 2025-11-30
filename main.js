document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const themeToggle = document.getElementById("themeToggle");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      window.location.href = "index.html";
    });
  }

  if (themeToggle) {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.classList.add(savedTheme);

    themeToggle.textContent = savedTheme === "dark" ? "برو به روشن" : "برو به تاریک";

    themeToggle.addEventListener("click", () => {
      if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "برو به تاریک";
      } else {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "برو به روشن";
      }
    });
  }
});


document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
});

if (localStorage.getItem("isLoggedIn") !== "true") {
  alert("ابتدا باید وارد شوید!");
  window.location.href = "login.html";
};

document.getElementById("logoutBtn").addEventListener("click", () => {
  alert("شما خارج شدید!");
  window.location.href = "index.html"; 
});
const savedUser = localStorage.getItem("registeredUser") || "admin";
document.getElementById("welcomeUser").textContent = `خوش آمدی، ${savedUser}!`;


const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
resizeCanvas();

let particles = [];
const PARTICLE_COUNT = 100;
const LINK_DISTANCE = 120;

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 1;
    this.vx = (Math.random() - 0.5) * 1.2;
    this.vy = (Math.random() - 0.5) * 1.2;
  }
  update() {
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

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
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
  particles.forEach(p => { p.update(); p.draw(); });
  drawLinks();
  requestAnimationFrame(animate);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

initParticles();
animate();
window.addEventListener("resize", () => { resizeCanvas(); initParticles(); });
