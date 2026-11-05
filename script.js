// ========================================================
// DATOS EXCLUSIVOS DE BTS PARA YOSS
// ========================================================
const membersData = [
  {
    name: "RM",
    realName: "Kim Namjoon",
    emoji: "🐨",
    role: "Líder & Rapero",
    color: "#a855f7",
    quote: "“Yoss, eres una estrella brillante en nuestra galaxia. Recuerda siempre amarte a ti misma y que eres el arte de tu propia vida. ¡Feliz cumpleaños!”",
    song: "Trivia 轉 : Seesaw / Persona"
  },
  {
    name: "Jin",
    realName: "Kim Seokjin",
    emoji: "🐹",
    role: "Vocalista & Visual",
    color: "#f472b6",
    quote: "“¡Worldwide Handsome te desea el día más radiante, Yoss! Que la vida te regale tanta felicidad como tú regalas con tu sola sonrisa. ¡Y a comer pastel!”",
    song: "The Astronaut / Epiphany"
  },
  {
    name: "SUGA",
    realName: "Min Yoongi",
    emoji: "🐱",
    role: "Rapero & Productor",
    color: "#c084fc",
    quote: "“Yoss, que la música, la calma y el éxito te acompañen en cada proyecto de este nuevo año. Tómate hoy un respiro y disfruta tu momento.”",
    song: "Daechwita / Snooze"
  },
  {
    name: "j-hope",
    realName: "Jung Hoseok",
    emoji: "🐿️",
    role: "Bailarín Principal & Rap",
    color: "#fbbf24",
    quote: "“¡I'm your hope, you're my hope! Yoss, eres una persona llena de luz y energía positiva. ¡Hoy es tu día para brillar al máximo y bailar!”",
    song: "Arson / Daydream"
  },
  {
    name: "Jimin",
    realName: "Park Jimin",
    emoji: "🐥",
    role: "Vocalista & Bailarín",
    color: "#e879f9",
    quote: "“Querida Yoss, que este nuevo año de vida sea tan dulce y mágico como un momento de Serendipity. ¡Te envío un abrazo muy cálido y morado!”",
    song: "Like Crazy / Serendipity"
  },
  {
    name: "V",
    realName: "Kim Taehyung",
    emoji: "🐯",
    role: "Vocalista & Visual",
    color: "#818cf8",
    quote: "“Yoss, en este universo de millones de luces, tu existencia tiene un brillo único y precioso. Borahae con todo mi corazón hoy y siempre.”",
    song: "Slow Dancing / Winter Bear"
  },
  {
    name: "Jung Kook",
    realName: "Jeon Jungkook",
    emoji: "🐰",
    role: "Vocalista Principal & Maknae",
    color: "#9333ea",
    quote: "“¡Feliz cumpleaños, Yoss! Eres nuestra Golden ARMY. Nunca dejes de perseguir tus sueños con la pasión que tienes. ¡A celebrar en grande!”",
    song: "Standing Next to You / Euphoria"
  }
];

const birthdayLetter = "Hoy celebramos la existencia de alguien muy especial: ¡tú, Yoss! Los 7 chicos de BTS y todo el universo ARMY se unen para desearte 365 nuevos días llenos de salud, proyectos cumplidos, risas y amor infinito. Gracias por brillar con tanta fuerza en nuestra galaxia. ¡Borahae, Yoss! 💜✨";

// ========================================================
// MOTOR DE PARTÍCULAS: GALAXIA MIKROKOSMOS & CONFETI
// ========================================================
const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
}
window.addEventListener('resize', resizeCanvas);

function initStars() {
  stars = [];
  const starCount = Math.floor((canvas.width * canvas.height) / 7000);
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1
    });
  }
}
resizeCanvas();

const purplePalette = ['#e0aaff', '#c77dff', '#9d4edd', '#7b2cbf', '#ffd166', '#ffffff', '#f472b6'];

function spawnConfetti(count = 120, originX, originY) {
  const x = originX ?? canvas.width / 2;
  const y = originY ?? canvas.height / 3;

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 12 + 3;
    particles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity - 3,
      size: Math.random() * 9 + 4,
      color: purplePalette[Math.floor(Math.random() * purplePalette.length)],
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.25,
      life: 280,
      maxLife: 280,
      isHeart: Math.random() < 0.4
    });
  }
}

// Spawner de corazones flotantes de fondo
function spawnFloatingHeart() {
  if (particles.length > 250) return;
  particles.push({
    x: Math.random() * canvas.width,
    y: canvas.height + 20,
    vx: (Math.random() - 0.5) * 0.8,
    vy: -(Math.random() * 1.2 + 0.6),
    size: Math.random() * 14 + 10,
    color: '#d6b3ff',
    rotation: (Math.random() - 0.5) * 0.4,
    vRot: (Math.random() - 0.5) * 0.02,
    life: 350,
    maxLife: 350,
    isHeart: true
  });
}

// Bucle de renderizado del Canvas
function animateGalaxy() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar estrellas titilantes
  for (const s of stars) {
    s.alpha += s.speed * s.direction;
    if (s.alpha > 0.95 || s.alpha < 0.2) s.direction *= -1;
    ctx.fillStyle = `rgba(224, 170, 255, ${s.alpha})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Generar corazones flotantes continuos
  if (Math.random() < 0.08) spawnFloatingHeart();

  // Actualizar y dibujar partículas
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life--;
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.vRot;

    // Gravedad leve para el confeti convencional
    if (!p.isHeart || p.vy > 0) {
      p.vy += 0.06;
    }

    if (p.life <= 0 || p.y > canvas.height + 40) {
      particles.splice(i, 1);
      continue;
    }

    const alpha = Math.min(1, p.life / 50);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = alpha;

    if (p.isHeart) {
      ctx.font = `${p.size}px serif`;
      ctx.fillText('💜', -p.size / 2, p.size / 2);
    } else {
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.7);
    }
    ctx.restore();
  }

  requestAnimationFrame(animateGalaxy);
}
animateGalaxy();

// ========================================================
// EFECTO TOUCH / CLICK SPARKS
// ========================================================
window.addEventListener('pointerdown', (e) => {
  // Evitar disparar sobre botones para no saturar
  if (e.target.closest('button')) return;
  spawnConfetti(15, e.clientX, e.clientY);
});

// ========================================================
// MÁQUINA DE ESCRIBIR PARA LA CARTA A YOSS
// ========================================================
let typewriterInterval;
function startTypewriter(text) {
  const container = document.getElementById('typewriterText');
  container.textContent = '';
  let index = 0;
  clearInterval(typewriterInterval);

  typewriterInterval = setInterval(() => {
    if (index < text.length) {
      container.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(typewriterInterval);
    }
  }, 32);
}

// ========================================================
// GENERADOR DINÁMICO DE PHOTOCARDS (7 MIEMBROS)
// ========================================================
const grid = document.getElementById('photocardsGrid');

membersData.forEach((m) => {
  const card = document.createElement('div');
  card.className = 'photocard';

  card.innerHTML = `
    <div class="photocard-inner">
      <!-- FRENTE DE LA PHOTOCARD -->
      <div class="card-front">
        <span class="member-badge">${m.role}</span>
        <div class="member-avatar">${m.emoji}</div>
        <div class="member-info">
          <div class="member-name">${m.name}</div>
          <div class="member-role">${m.realName}</div>
        </div>
        <div class="flip-hint">✨ Toca para leer el mensaje de ${m.name}</div>
      </div>

      <!-- REVERSO DE LA PHOTOCARD -->
      <div class="card-back">
        <div class="back-header">MENSAJE PARA YOSS 💜</div>
        <p class="member-message-text">${m.quote}</p>
        <div class="member-sign">— Con amor, ${m.name} (${m.emoji})</div>
      </div>
    </div>
  `;

  // Voltear tarjeta al hacer clic
  card.addEventListener('click', (e) => {
    card.classList.toggle('flipped');
    playChimeSound(660);
    spawnConfetti(25, e.clientX, e.clientY);
  });

  grid.appendChild(card);
});

// ========================================================
// AUDIO SINTETIZADO (WEB AUDIO API: MIKROKOSMOS & CUMPLEAÑOS)
// ========================================================
let audioCtx = null;
let isMusicActive = false;
let musicLoopTimeout = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Tono campana / caja de música
function playNote(freq, startTime, duration, volume = 0.18) {
  const ctx = getAudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine'; // Tono dulce y suave como caja de música
  osc.frequency.setValueAtTime(freq, startTime);

  // Envolvente de volumen de campana
  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

// Sonido de clic sutil
function playChimeSound(freq = 520) {
  try {
    const ctx = getAudioContext();
    playNote(freq, ctx.currentTime, 0.4, 0.12);
  } catch (err) {
    // Silencio si el usuario no ha interactuado
  }
}

// Melodía: Dulce Feliz Cumpleaños + Motivo de Mikrokosmos
function playBirthdayMelody() {
  if (!isMusicActive) return;
  const ctx = getAudioContext();
  const now = ctx.currentTime + 0.05;

  const N = {
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00
  };

  // Secuencia de notas: [Nota, Duración]
  const melody = [
    // Happy Birthday part
    [N.G4, 0.35], [N.G4, 0.2], [N.A4, 0.55], [N.G4, 0.55], [N.C5, 0.55], [N.B4, 1.1],
    [N.G4, 0.35], [N.G4, 0.2], [N.A4, 0.55], [N.G4, 0.55], [N.D5, 0.55], [N.C5, 1.1],
    [N.G4, 0.35], [N.G4, 0.2], [N.G5, 0.55], [N.E5, 0.55], [N.C5, 0.55], [N.B4, 0.55], [N.A4, 0.9],
    [N.F5, 0.35], [N.F5, 0.2], [N.E5, 0.55], [N.C5, 0.55], [N.D5, 0.55], [N.C5, 1.3],
    
    // Mikrokosmos arpeggio chimes (brillo estelar)
    [N.E5, 0.4], [N.G5, 0.4], [N.C5, 0.4], [N.D5, 0.6], [N.E5, 0.8], [N.G5, 1.2]
  ];

  let currentT = now;
  melody.forEach(([freq, dur]) => {
    playNote(freq, currentT, dur * 1.3, 0.16);
    currentT += dur;
  });

  // Repetir suavemente en loop
  const totalLengthMs = (currentT - now + 1.5) * 1000;
  clearTimeout(musicLoopTimeout);
  musicLoopTimeout = setTimeout(() => {
    if (isMusicActive) playBirthdayMelody();
  }, totalLengthMs);
}

// Botón de Música
const musicBtn = document.getElementById('musicToggleBtn');
const musicLabel = document.getElementById('musicLabel');

musicBtn.addEventListener('click', () => {
  isMusicActive = !isMusicActive;
  if (isMusicActive) {
    musicBtn.classList.add('playing-music');
    musicLabel.textContent = 'Música: ON';
    showToast('🎵 Reproduciendo melodía de cumpleaños & Mikrokosmos');
    playBirthdayMelody();
  } else {
    musicBtn.classList.remove('playing-music');
    musicLabel.textContent = 'Música: OFF';
    clearTimeout(musicLoopTimeout);
    showToast('Música pausada');
  }
});

// ========================================================
// PASTEL INTERACTIVO & SOPLAR VELAS
// ========================================================
const cake = document.getElementById('interactiveCake');
const blowBtn = document.getElementById('blowCandlesBtn');
const blowText = document.getElementById('blowText');
const cakeStatus = document.getElementById('cakeStatus');
const wishModal = document.getElementById('wishModal');
const closeModalBtn = document.getElementById('closeModalBtn');

let candlesBlown = false;

blowBtn.addEventListener('click', () => {
  candlesBlown = !candlesBlown;

  if (candlesBlown) {
    cake.classList.add('extinguished');
    blowText.textContent = 'Encender Velas de Nuevo';
    cakeStatus.textContent = '¡Pide tu más grande deseo para este año, Yoss! ✨';
    
    // Explosión de confeti y sonido festivo
    spawnConfetti(260);
    playChimeSound(880);

    setTimeout(() => {
      wishModal.classList.add('active');
    }, 700);
  } else {
    cake.classList.remove('extinguished');
    blowText.textContent = 'Soplar las Velitas';
    cakeStatus.textContent = '¡Velas encendidas de nuevo para celebrar!';
    playChimeSound(520);
  }
});

closeModalBtn.addEventListener('click', () => {
  wishModal.classList.remove('active');
  spawnConfetti(100);
});

// Botón Lluvia Púrpura
document.getElementById('fireConfettiBtn').addEventListener('click', (e) => {
  spawnConfetti(220, e.clientX, e.clientY);
  showToast('💜 ¡Lluvia de confeti y amor para Yoss!');
  playChimeSound(780);
});

// ========================================================
// MODO ARMY BOMB (CONCERT OCEAN)
// ========================================================
const armyBombBtn = document.getElementById('armyBombBtn');
const lightBeams = document.getElementById('lightBeams');

let armyBombOn = false;

armyBombBtn.addEventListener('click', () => {
  armyBombOn = !armyBombOn;
  armyBombBtn.classList.toggle('active', armyBombOn);
  lightBeams.classList.toggle('active', armyBombOn);

  if (armyBombOn) {
    showToast('💣 ¡Modo Concierto ARMY Bomb activado!');
    spawnConfetti(180);
    playChimeSound(980);
  } else {
    showToast('Modo Concierto apagado');
  }
});

// ========================================================
// TRANSICIÓN DEL TICKET A LA TARJETA PRINCIPAL
// ========================================================
const openTicketBtn = document.getElementById('openTicketBtn');
const welcomeScreen = document.getElementById('welcomeScreen');
const cardScreen = document.getElementById('cardScreen');

openTicketBtn.addEventListener('click', () => {
  welcomeScreen.classList.remove('active');
  cardScreen.classList.add('active');

  // Activar música de fondo
  isMusicActive = true;
  musicBtn.classList.add('playing-music');
  musicLabel.textContent = 'Música: ON';
  playBirthdayMelody();

  // Animaciones iniciales
  spawnConfetti(250);
  startTypewriter(birthdayLetter);
  showToast('🎉 ¡Bienvenida a tu BTS Festa de Cumpleaños, Yoss!');
  
  // Scroll suave arriba
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================================================
// SISTEMA DE TOAST NOTIFICATIONS
// ========================================================
const toast = document.getElementById('toastNotification');
let toastTimer;

function showToast(msg) {
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.classList.add('show');
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
