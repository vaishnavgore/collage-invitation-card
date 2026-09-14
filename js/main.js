/* ============================================================
   main.js — Engineering Day 2026
   Samarth College of Engineering & Management, Belhe
   Interactive Logic, Animations, Calendar & RSVP System
   ============================================================ */
(function () {
  'use strict';

  /* ── 1. CONFIGURATION & STATE ────────────────────────────── */
  const EVENT_DATE = new Date('2026-09-15T13:00:00+05:30');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const DEPTS = {
    ce: {
      name: 'Computer Engineering',
      code: 'CE',
      hod: 'Prof. Shegar S.R.',
      salutation: 'Dear Shegar Mam, Respected Faculty & Students of Computer Engineering,',
      message: 'The Departments of AIML & Data Science warmly invite you to join us in celebrating Engineering Day 2026. From foundational algorithms to modern architectures, your department continues to inspire. Let us unite to code, collaborate, and celebrate the spirit of engineering!',
      tagline: 'Code the future, together.'
    },
    entc: {
      name: 'Electronics & Telecomm. Engineering',
      code: 'E&TC',
      hod: 'Prof. Kothari N.S.',
      salutation: 'Dear Prof. Kothari N.S., Respected Faculty & Students of E&TC Engineering,',
      message: 'The Departments of AIML & Data Science extend a heartfelt invitation to Engineering Day 2026. Your contributions in communication, signal processing, and embedded systems drive modern connected worlds. Let us amplify innovation together!',
      tagline: 'Tuning into collaborative innovation.'
    },
    ee: {
      name: 'Electrical Engineering',
      code: 'EE',
      hod: 'Prof. Nagare N.',
      salutation: 'Dear Prof. Nagare N., Respected Faculty & Students of Electrical Engineering,',
      message: 'The Departments of AIML & Data Science cordially invite you to celebrate Engineering Day 2026 with us. Powering industries and illuminating society, your discipline forms the bedrock of modern civilization. Join us as we energize this special celebration!',
      tagline: 'Powering the spark of tomorrow.'
    },
    me: {
      name: 'Mechanical Engineering',
      code: 'ME',
      hod: 'Prof. Khatode A.L.',
      salutation: 'Dear Prof. Khatode A.L., Respected Faculty & Students of Mechanical Engineering,',
      message: 'The Departments of AIML & Data Science are honored to invite you to Engineering Day 2026. The timeless principles of mechanics, design, and thermodynamics continue to build our world. Let us join gears and build unforgettable memories!',
      tagline: 'Precision, strength, and innovation.'
    },
    civil: {
      name: 'Civil Engineering',
      code: 'CIVIL',
      hod: 'Prof. Navale R.B.',
      salutation: 'Dear Prof. Navale R.B., Respected Faculty & Students of Civil Engineering,',
      message: 'The Departments of AIML & Data Science warmly invite you to Engineering Day 2026. As the creators of sustainable infrastructure and iconic structures, you build the foundation of human progress. Join us as we build bridges across disciplines!',
      tagline: 'Constructing visions into reality.'
    },
    auto: {
      name: 'Automobile Engineering',
      code: 'AUTO',
      hod: 'Prof. Khatode A.L.',
      salutation: 'Dear Prof. Khatode A.L., Respected Faculty & Students of Automobile Engineering,',
      message: 'The Departments of AIML & Data Science take immense joy in inviting you to Engineering Day 2026. From mobility engineering to next-gen propulsion, you drive modern society forward. Accelerate your enthusiasm and join the celebration!',
      tagline: 'Driving engineering excellence.'
    },
    mca: {
      name: 'Master of Computer Applications (MCA)',
      code: 'MCA',
      hod: 'Prof. Gopale P.J.',
      salutation: 'Dear Prof. Gopale P.J., Respected Faculty & Students of MCA,',
      message: 'The Departments of AIML & Data Science cordially invite you to celebrate Engineering Day 2026 with us. Empowering technology with advanced application development, software craft, and enterprise platforms, your department plays an integral role in driving digital transformation. Join us as we code, create, and celebrate together!',
      tagline: 'Bridging logic, enterprise, and future applications.'
    },
    fe: {
      name: 'First Year Engineering (Applied Science)',
      code: 'FE',
      hod: 'Prof. Ghule S.',
      salutation: 'Dear Prof. Ghule S., Respected Faculty & Students of Applied Science & First Year Engineering,',
      message: 'The Departments of AIML & Data Science warmly welcome and invite you to celebrate Engineering Day 2026. As the foundation stones and fresh minds igniting our campus with boundless curiosity and energy, your journey begins here. Step boldly into the inspiring world of engineering excellence!',
      tagline: 'Where the engineering journey begins.'
    }
  };

  /* ── 2. PRELOADER & INITIAL ANIMATIONS ────────────────────── */
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('hidden');
        preloader.addEventListener('transitionend', () => preloader.remove(), { once: true });
        initEntranceAnimations();
      }, prefersReduced ? 0 : 500);
    } else {
      initEntranceAnimations();
    }
  });

  function initEntranceAnimations() {
    if (prefersReduced || typeof gsap === 'undefined') return;

    gsap.from('#hero-college', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' });
    gsap.from('#hero-title', { opacity: 0, y: 25, duration: 0.8, ease: 'power3.out', delay: 0.15 });
    gsap.from('#hero-sub', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', delay: 0.3 });
    gsap.from('#hero-countdown', { opacity: 0, scale: 0.95, y: 15, duration: 0.8, ease: 'power3.out', delay: 0.45 });
    gsap.from('#hero-cta', { opacity: 0, y: 15, duration: 0.7, ease: 'power3.out', delay: 0.6 });

    // ScrollTrigger reveals
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray('.reveal-up').forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 35,
          duration: 0.75,
          ease: 'power3.out'
        });
      });
    }
  }

  /* ── 3. INTERACTIVE SPOTLIGHT & 3D TILT CARDS ─────────────── */
  function initSpotlightAndTiltCards() {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        if (!prefersReduced) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -3.5;
          const rotateY = ((x - centerX) / centerX) * 3.5;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        if (!prefersReduced) {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        }
      });
    });

    // Keyboard accessibility for department cards
    document.querySelectorAll('.dept-card').forEach((card) => {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }
  initSpotlightAndTiltCards();

  /* ── 3B. MAGNETIC BUTTONS ─────────────────────────────────── */
  function initMagneticButtons() {
    if (prefersReduced || typeof gsap === 'undefined') return;
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-nav-rsvp, .btn-modal-rsvp');
    buttons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        gsap.to(btn, { x: x * 0.22, y: y * 0.22, duration: 0.25, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }
  initMagneticButtons();

  /* ── 3C. STATS NUMBER COUNT-UP ────────────────────────────── */
  function initStatsCounters() {
    if (typeof ScrollTrigger === 'undefined' || typeof gsap === 'undefined' || prefersReduced) return;
    const counters = document.querySelectorAll('.counter-num');
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
      const suffix = target > 1 ? '+' : '';
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              counter.textContent = Math.floor(obj.val) + suffix;
            }
          });
        }
      });
    });
  }
  initStatsCounters();

  /* ── 4. NAVBAR SCROLL & PROGRESS BAR ──────────────────────── */
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progress-bar');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    if (progressBar && maxScroll > 0) {
      progressBar.style.width = `${(scrolled / maxScroll) * 100}%`;
    }

    if (navbar) {
      if (scrolled > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  /* ── 5. MOBILE MENU ───────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileMenu.querySelectorAll('.mob-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu on outside tap
    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('open') && navbar && !navbar.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── 6. COUNTDOWN TIMER ───────────────────────────────────── */
  const dEl = document.getElementById('cnt-days');
  const hEl = document.getElementById('cnt-hours');
  const mEl = document.getElementById('cnt-mins');
  const sEl = document.getElementById('cnt-secs');

  function updateCountdown() {
    const now = new Date();
    const diff = EVENT_DATE - now;

    if (diff <= 0) {
      if (dEl) dEl.textContent = '00';
      if (hEl) hEl.textContent = '00';
      if (mEl) mEl.textContent = '00';
      if (sEl) sEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    const pad = (n) => String(n).padStart(2, '0');

    if (dEl) dEl.textContent = pad(days);
    if (hEl) hEl.textContent = pad(hours);
    if (mEl) mEl.textContent = pad(mins);
    if (sEl) sEl.textContent = pad(secs);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ── 7. SCHEDULE FILTER TABS ──────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const timelineEntries = document.querySelectorAll('.timeline-entry');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      timelineEntries.forEach((entry) => {
        const category = entry.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          entry.classList.remove('hidden-item');
          if (!prefersReduced && typeof gsap !== 'undefined') {
            gsap.fromTo(entry, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
          }
        } else {
          entry.classList.add('hidden-item');
        }
      });
    });
  });

  /* ── 8. DEPARTMENT INVITATION MODAL & CELEBRATION EFFECTS ── */
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalDeptTitle = document.getElementById('modal-dept-title');
  const modalDeptHod = document.getElementById('modal-dept-hod');
  const modalDeptSalutation = document.getElementById('modal-dept-salutation');
  const modalDeptMessage = document.getElementById('modal-dept-message');
  const modalBtnRsvp = document.getElementById('modal-btn-rsvp');
  const modalBtnCopy = document.getElementById('modal-btn-copy');

  let currentDeptKey = null;

  function playInvitationChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      // Regal harp arpeggio: E5, G#5, B5, E6
      const notes = [659.25, 830.61, 987.77, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.85);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.85);
      });
    } catch (e) {}
  }

  function triggerInvitationCelebration() {
    // Play harp chime
    playInvitationChime();

    // Confetti celebration burst (Royal Gold & Champagne Foil)
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 55,
        spread: 80,
        origin: { y: 0.45 },
        colors: ['#D4AF37', '#C5A059', '#FBF5B7', '#F5E6BE', '#AA771C'],
        ticks: 240,
        gravity: 0.72,
        scalar: 1.2
      });

      setTimeout(() => {
        confetti({
          particleCount: 30,
          angle: 60,
          spread: 50,
          origin: { x: 0.25, y: 0.4 },
          colors: ['#D4AF37', '#FBF5B7', '#FFF8DC'],
          scalar: 1.0
        });
        confetti({
          particleCount: 30,
          angle: 120,
          spread: 50,
          origin: { x: 0.75, y: 0.4 },
          colors: ['#D4AF37', '#FBF5B7', '#FFF8DC'],
          scalar: 1.0
        });
      }, 120);
    }
  }

  window.openDeptModal = function (deptKey) {
    const data = DEPTS[deptKey];
    if (!data || !modalOverlay) return;
    currentDeptKey = deptKey;

    if (modalDeptTitle) modalDeptTitle.textContent = data.name;
    if (modalDeptHod) {
      if (data.hod) {
        modalDeptHod.innerHTML = `<span class="modal-hod-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><span class="hod-label">Head of Department:</span> <span class="hod-val">${data.hod}</span></span>`;
        modalDeptHod.style.display = 'block';
      } else {
        modalDeptHod.style.display = 'none';
      }
    }
    if (modalDeptSalutation) modalDeptSalutation.textContent = data.salutation;
    if (modalDeptMessage) modalDeptMessage.textContent = data.message;

    // Trigger celebration audio & visuals
    triggerInvitationCelebration();

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay || e.target.id === 'modal-backdrop') {
        closeModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  if (modalBtnRsvp) {
    modalBtnRsvp.addEventListener('click', () => {
      closeModal();
      const rsvpSection = document.getElementById('rsvp');
      const deptSelect = document.getElementById('f-dept');
      if (rsvpSection) {
        rsvpSection.scrollIntoView({ behavior: 'smooth' });
      }
      if (deptSelect && currentDeptKey) {
        deptSelect.value = currentDeptKey;
      }
    });
  }

  if (modalBtnCopy) {
    modalBtnCopy.addEventListener('click', () => {
      const data = DEPTS[currentDeptKey];
      if (!data) return;
      const textToCopy = `🏛️ Invitation to ${data.name} · Engineering Day 2026\n\n${data.salutation}\n\n${data.message}\n\n🗓️ Date: September 15, 2026 | 01:00 PM – 03:40 PM\n📍 Venue: Seminar Hall, Samarth College of Engineering & Management, Belhe\n🔗 Register: https://engineering-day-2026.netlify.app`;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = modalBtnCopy.innerHTML;
        modalBtnCopy.innerHTML = '<span>Copied! ✓</span>';
        setTimeout(() => {
          modalBtnCopy.innerHTML = originalText;
        }, 2000);
      });
    });
  }

  /* ── 9. ADD TO CALENDAR (GOOGLE CALENDAR & ICAL) ───────────── */
  window.addToGoogleCalendar = function () {
    const title = encodeURIComponent('Engineering Day 2026 · Samarth College of Engineering');
    const details = encodeURIComponent('Jointly hosted by the Departments of AIML & Data Science at Samarth College of Engineering & Management, Belhe. Celebrating innovation, collaboration, and engineering excellence.');
    const location = encodeURIComponent('Seminar Hall, Samarth College of Engineering & Management, Belhe, Maharashtra 412410');
    // 2026-09-15 13:00 to 15:40 IST (UTC: 07:30 to 10:10)
    const dates = '20260915T073000Z/20260915T101000Z';
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  window.downloadIcsCalendar = function () {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Samarth College//Engineering Day 2026//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:enggday-2026-samarth@college.edu',
      'DTSTAMP:20260911T000000Z',
      'DTSTART:20260915T073000Z',
      'DTEND:20260915T101000Z',
      'SUMMARY:Engineering Day 2026 — Samarth College of Engineering',
      'DESCRIPTION:Jointly hosted by the Departments of AIML & Data Science at Samarth College of Engineering & Management, Belhe.',
      'LOCATION:Seminar Hall, Samarth College of Engg. & Mgmt., Belhe',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Engineering_Day_2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ── 10. SYNTHESIZED AUDIO CHIME (WEB AUDIO API) ───────────── */
  function playCelebrationChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.1 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.6);
      });
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  /* ── 11. RSVP FORM VALIDATION & SUBMISSION ─────────────────── */
  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpSuccess = document.getElementById('rsvp-success');

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('f-name');
      const deptSelect = document.getElementById('f-dept');
      const desigSelect = document.getElementById('f-desig');
      const contactInput = document.getElementById('f-contact');
      const countInput = document.getElementById('f-attendees');

      let isValid = true;

      function checkField(input, validCondition) {
        const wrap = input.closest('.field-container');
        if (!validCondition) {
          wrap.classList.add('has-error');
          isValid = false;
        } else {
          wrap.classList.remove('has-error');
        }
      }

      checkField(nameInput, nameInput.value.trim().length >= 2);
      checkField(deptSelect, deptSelect.value !== '');
      checkField(desigSelect, desigSelect.value !== '');
      checkField(contactInput, contactInput.value.trim().length >= 5);
      checkField(countInput, parseInt(countInput.value, 10) >= 1);

      if (!isValid) return;

      // Loading state
      rsvpForm.classList.add('is-loading');

      setTimeout(() => {
        rsvpForm.classList.remove('is-loading');
        rsvpForm.style.display = 'none';
        
        if (rsvpSuccess) {
          rsvpSuccess.classList.add('active');
          const guestNameSpan = document.getElementById('success-guest-name');
          if (guestNameSpan) guestNameSpan.textContent = nameInput.value.trim();
        }

        // Sound chime
        playCelebrationChime();

        // Confetti burst
        if (typeof confetti === 'function') {
          const end = Date.now() + 2 * 1000;
          const colors = ['#D4AF37', '#C5A059', '#FBF5B7', '#F5E6BE', '#AA771C'];

          (function frame() {
            confetti({
              particleCount: 4,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors: colors
            });
            confetti({
              particleCount: 4,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors: colors
            });

            if (Date.now() < end) {
              requestAnimationFrame(frame);
            }
          })();
        }
      }, 700);
    });
  }

})();
