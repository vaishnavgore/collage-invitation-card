/* ============================================================
   hero-network.js — Ambient Constellation & Particle Canvas
   Theme: Champagne & Ivory Stardust with Gentle Physics
   ============================================================ */
(function () {
  'use strict';

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  /* ── Configuration ── */
  const CONFIG = {
    particleCount: 75,
    maxDistance: 155,
    baseSpeed: 0.32,
    mouseRadius: 190,
    colors: [
      'rgba(212, 175, 55, ',   // Imperial Metallic Gold
      'rgba(197, 160, 89, ',   // Antique Brass Gold
      'rgba(245, 230, 190, ',  // Stardust Warm Gold
      'rgba(251, 245, 183, '   // Radiant Light Gold
    ]
  };

  let width, height, dpr = window.devicePixelRatio || 1;
  let particles = [];
  let mouse = { x: -1000, y: -1000, active: false };

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = initial ? Math.random() * width : (Math.random() > 0.5 ? 0 : width);
      this.y = initial ? Math.random() * height : Math.random() * height;
      
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.2 + Math.random() * 0.5) * CONFIG.baseSpeed;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      
      this.radius = 1.2 + Math.random() * 1.8;
      this.baseAlpha = 0.2 + Math.random() * 0.5;
      this.alpha = this.baseAlpha;
      this.colorBase = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
      this.pulseSpeed = 0.02 + Math.random() * 0.03;
      this.pulseAngle = Math.random() * Math.PI * 2;
    }

    update() {
      this.pulseAngle += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.15;

      // Mouse repulsion interaction
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.mouseRadius && dist > 0) {
          const force = (1 - dist / CONFIG.mouseRadius) * 1.5;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }
      }

      this.x += this.vx;
      this.y += this.vy;

      // Screen wrapping
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
      if (this.y < -10) this.y = height + 10;
      if (this.y > height + 10) this.y = -10;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.colorBase + this.alpha + ')';
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = [];
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 36 : CONFIG.particleCount;
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Connect near particles with delicate threads
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.maxDistance) {
          const lineAlpha = (1 - dist / CONFIG.maxDistance) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', resize, { passive: true });

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
      mouse.active = true;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.active = false;
    mouse.x = -1000;
    mouse.y = -1000;
  }, { passive: true });

  init();
  animate();
})();
