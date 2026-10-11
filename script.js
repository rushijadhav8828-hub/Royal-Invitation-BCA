/* ==========================================================================
   IGNITE 2026 - INVITATION CARD INTERACTIVE JAVASCRIPT
   Dr. Pranita Chitnis (HOD Commerce & Management)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initEnvelopeOpener();
  init3DCardTilt();
  initEmojiStream();
  initCountdown();
  initAudioSynthesizer();
  initBlessingModal();
  initConfettiCannon();
});

/* --------------------------------------------------------------------------
   1. Canvas Particle Background (Golden Fire Embers & Sparkles)
   -------------------------------------------------------------------------- */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const PARTICLE_COUNT = 65;

  const colors = [
    'rgba(255, 215, 0, ',    // Gold
    'rgba(255, 140, 0, ',    // Orange flame
    'rgba(255, 69, 0, ',     // Red-orange
    'rgba(180, 100, 255, ',  // Purple violet
    'rgba(255, 255, 220, '   // Starlight
  ];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.8 + 1,
      speedY: -(Math.random() * 0.9 + 0.3),
      speedX: (Math.random() - 0.5) * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * 0.03 + 0.01
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.y += p.speedY;
      p.x += p.speedX;
      p.alpha += Math.sin(Date.now() * 0.002) * 0.005;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${Math.max(0.15, Math.min(0.9, p.alpha))})`;
      ctx.shadowBlur = p.size * 5;
      ctx.shadowColor = '#ffd700';
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* --------------------------------------------------------------------------
   2. Envelope Opening Ceremony
   -------------------------------------------------------------------------- */
function initEnvelopeOpener() {
  const curtain = document.getElementById('intro-curtain');
  const openBtn = document.getElementById('open-envelope-btn');

  if (!openBtn || !curtain) return;

  openBtn.addEventListener('click', () => {
    // Play celebratory sound
    playFanfareAudio();
    // Fire confetti
    fireBurstConfetti();
    // Smooth curtain reveal
    curtain.classList.add('hidden');
    
    // Auto-scroll slightly if needed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   3. 3D Perspective Card Tilt on Mouse Move
   -------------------------------------------------------------------------- */
function init3DCardTilt() {
  const card = document.getElementById('invitation-card');
  const container = document.querySelector('.card-perspective-container');
  if (!card || !container) return;

  // Only enable on desktop/mouse devices
  if (window.matchMedia('(hover: hover)').matches) {
    container.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5.5;
      const rotateY = ((x - centerX) / centerX) * 5.5;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    container.addEventListener('mouseleave', () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
  }
}

/* --------------------------------------------------------------------------
   4. Floating Emojis Stream
   -------------------------------------------------------------------------- */
function initEmojiStream() {
  const container = document.getElementById('emoji-container');
  if (!container) return;

  const emojis = ['🔥', '✨', '🎉', '🎓', '💼', '💃', '🎶', '🥂', '🌟', '💖', '👑', '⭐'];

  function spawnEmoji() {
    const el = document.createElement('span');
    el.className = 'floating-emoji';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const posX = Math.random() * 95; // 0 to 95vw
    const duration = Math.random() * 7 + 8; // 8 to 15 seconds
    const size = Math.random() * 1.3 + 1.2; // 1.2rem to 2.5rem

    el.style.left = `${posX}vw`;
    el.style.fontSize = `${size}rem`;
    el.style.animationDuration = `${duration}s`;

    container.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, duration * 1000);
  }

  // Spawn initial few
  for (let i = 0; i < 6; i++) {
    setTimeout(spawnEmoji, i * 600);
  }

  // Continuous spawn
  setInterval(spawnEmoji, 1600);
}

/* --------------------------------------------------------------------------
   5. Countdown Timer
   -------------------------------------------------------------------------- */
function initCountdown() {
  // Target: October 24, 2026, 10:30 AM
  const targetDate = new Date('2026-10-24T10:30:00+05:30').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('mins');
  const secsEl = document.getElementById('secs');

  function updateTimer() {
    const now = new Date().getTime();
    let diff = targetDate - now;

    if (diff <= 0) {
      diff = 0;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* --------------------------------------------------------------------------
   6. Audio Synthesizer (Zero-Dependency Web Audio API)
   -------------------------------------------------------------------------- */
let audioCtx = null;
let musicInterval = null;
let isMusicPlaying = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playNote(freq, type = 'sine', duration = 0.3, volume = 0.15) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + duration);
}

function playFanfareAudio() {
  const notes = [
    { f: 523.25, d: 0.15 }, // C5
    { f: 659.25, d: 0.15 }, // E5
    { f: 783.99, d: 0.2 },  // G5
    { f: 1046.50, d: 0.5 }  // C6
  ];

  notes.forEach((note, idx) => {
    setTimeout(() => {
      playNote(note.f, 'triangle', note.d, 0.22);
    }, idx * 140);
  });
}

function initAudioSynthesizer() {
  const musicBtn = document.getElementById('music-btn');
  const musicLabel = document.getElementById('music-label');
  const musicIcon = document.getElementById('music-icon');
  if (!musicBtn) return;

  // Upbeat festive chord progression loop (C, G, Am, F)
  const progression = [
    [523.25, 659.25, 783.99], // C major
    [392.00, 493.88, 587.33], // G major
    [440.00, 523.25, 659.25], // A minor
    [349.23, 440.00, 523.25]  // F major
  ];

  let chordIndex = 0;

  function playAmbientPartyBeat() {
    const chord = progression[chordIndex % progression.length];
    chord.forEach((note, i) => {
      setTimeout(() => {
        playNote(note, 'sine', 0.6, 0.08);
      }, i * 90);
    });
    chordIndex++;
  }

  musicBtn.addEventListener('click', () => {
    isMusicPlaying = !isMusicPlaying;

    if (isMusicPlaying) {
      getAudioContext();
      musicLabel.textContent = 'Party Music: ON 🎶';
      musicIcon.textContent = '🔊';
      musicBtn.classList.add('fire-glow');
      playFanfareAudio();
      musicInterval = setInterval(playAmbientPartyBeat, 750);
    } else {
      musicLabel.textContent = 'Party Music: Off';
      musicIcon.textContent = '🎵';
      musicBtn.classList.remove('fire-glow');
      if (musicInterval) {
        clearInterval(musicInterval);
        musicInterval = null;
      }
    }
  });
}

/* --------------------------------------------------------------------------
   7. Blessing & RSVP Modal Interaction
   -------------------------------------------------------------------------- */
function initBlessingModal() {
  const acceptBtn = document.getElementById('accept-invitation-btn');
  const modal = document.getElementById('blessing-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!acceptBtn || !modal) return;

  acceptBtn.addEventListener('click', () => {
    playFanfareAudio();
    fireBurstConfetti();
    modal.classList.add('active');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      fireBurstConfetti();
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   8. Confetti Cannon Fireworks
   -------------------------------------------------------------------------- */
function initConfettiCannon() {
  const confettiBtn = document.getElementById('confetti-btn');
  if (confettiBtn) {
    confettiBtn.addEventListener('click', () => {
      playFanfareAudio();
      fireBurstConfetti();
    });
  }
}

function fireBurstConfetti() {
  const confettiContainer = document.createElement('div');
  confettiContainer.style.position = 'fixed';
  confettiContainer.style.inset = '0';
  confettiContainer.style.pointerEvents = 'none';
  confettiContainer.style.zIndex = '999';
  document.body.appendChild(confettiContainer);

  const colors = ['#ffd700', '#ff3b30', '#ff9500', '#ff2d55', '#af52de', '#5856d6', '#34c759'];
  const emojis = ['✨', '🎉', '🔥', '👑', '💖', '⭐'];
  const count = 75;

  for (let i = 0; i < count; i++) {
    const isEmoji = Math.random() > 0.65;
    const piece = document.createElement('div');

    if (isEmoji) {
      piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      piece.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
    } else {
      piece.style.width = `${Math.random() * 12 + 6}px`;
      piece.style.height = `${Math.random() * 16 + 8}px`;
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
    }

    piece.style.position = 'absolute';
    piece.style.left = '50%';
    piece.style.top = '45%';
    piece.style.userSelect = 'none';

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 600 + 300;
    const destX = Math.cos(angle) * velocity;
    const destY = Math.sin(angle) * velocity + Math.random() * 250;
    const rot = Math.random() * 720 - 360;

    piece.animate([
      { transform: 'translate(-50%, -50%) rotate(0deg) scale(0)', opacity: 1 },
      { transform: `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) rotate(${rot}deg) scale(1.2)`, opacity: 0 }
    ], {
      duration: Math.random() * 1200 + 1200,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      fill: 'forwards'
    });

    confettiContainer.appendChild(piece);
  }

  setTimeout(() => {
    confettiContainer.remove();
  }, 2600);
}
