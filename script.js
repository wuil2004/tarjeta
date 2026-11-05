const $ = id => document.getElementById(id);
const members = [
  ["RM 🐨", "Eres tan brillante como un 'Wings' en el cielo. ¡Que tus sueños no tengan límites!"],
  ["Jin 🐹", "¡Worldwide handsome te desea un cumpleaños espectacular! 🌍"],
  ["SUGA 🐱", "Hoy descansa, disfruta y que todo salga como un buen beat. 🎹"],
  ["j-hope 🐿️", "¡Eres mi esperanza, mi ángel y hoy tu día brilla! ☀️"],
  ["Jimin 🐥", "Que tu día sea tan dulce como 'Serendipity'. 💛"],
  ["V 🐯", "Que la vida te regale un cumpleaños de ¡Sweet Night! 🌙"],
  ["Jung Kook 🐰", "¡Hoy eres el Golden Maknae de la fiesta! 🌟"]
];
const message = "Que este nuevo año sea tu 'Dynamite': lleno de luz, alegría y mucho amor. ¡Borahae 💜!";

// Fondo de partículas: estrellas moradas + confeti
const cv = $('fx'), ctx = cv.getContext('2d');
let parts = [];
const resize = () => { cv.width = innerWidth; cv.height = innerHeight; };
addEventListener('resize', resize); resize();
const colors = ['#c9a3ff', '#9b59ff', '#fff', '#ff9bf0', '#ffe27a'];

function addConfetti(n = 150, x, y) {
  for (let i = 0; i < n; i++) {
    parts.push({
      x: x ?? Math.random() * cv.width, y: y ?? -10,
      vx: (Math.random() - .5) * (x ? 10 : 3), vy: x ? (Math.random() - .8) * 10 : Math.random() * 3 + 2,
      s: Math.random() * 8 + 4, c: colors[Math.random() * colors.length | 0],
      r: Math.random() * 6, vr: Math.random() * .2, life: 260, heart: Math.random() < .35
    });
  }
}
const ambient = () => parts.push({ x: Math.random() * cv.width, y: cv.height + 10, vx: (Math.random() - .5), vy: -(Math.random() + .6),
  s: Math.random() * 10 + 8, c: '#d6b3ff88', r: 0, vr: 0, life: 400, heart: true });

(function loop() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  if (Math.random() < .08) ambient();
  parts = parts.filter(p => p.life-- > 0 && p.y < cv.height + 30);
  for (const p of parts) {
    p.x += p.vx; p.y += p.vy; p.r += p.vr;
    if (p.vy > 0 || p.life < 260) p.vy += .03;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
    ctx.fillStyle = p.c; ctx.globalAlpha = Math.min(1, p.life / 60);
    if (p.heart) { ctx.font = p.s * 1.6 + 'px serif'; ctx.fillText('💜', 0, 0); }
    else ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
    ctx.restore();
  }
  requestAnimationFrame(loop);
})();

function toast(t) {
  const el = $('toast'); el.textContent = t; el.classList.add('show');
  clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('show'), 3500);
}

// Máquina de escribir
let typeTimer;
function typeText(text) {
  clearTimeout(typeTimer); $('typed').textContent = '';
  let i = 0;
  (function step() { if (i <= text.length) { $('typed').textContent = text.slice(0, i++); typeTimer = setTimeout(step, 35); } })();
}

// Música sintetizada (Web Audio): melodía de cumpleaños
let actx, playing = false;
function playHB() {
  actx = actx || new (window.AudioContext || window.webkitAudioContext)();
  const n = { C: 261.6, D: 293.7, E: 329.6, F: 349.2, G: 392, A: 440, B: 493.9, c: 523.3 };
  const song = [['G', .4], ['G', .2], ['A', .6], ['G', .6], ['c', .6], ['B', 1.2],
    ['G', .4], ['G', .2], ['A', .6], ['G', .6], ['D', .6], ['c', 1.2]];
  let t = actx.currentTime + .05;
  for (const [k, d] of song) {
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = 'triangle'; o.frequency.value = n[k];
    g.gain.setValueAtTime(.2, t); g.gain.exponentialRampToValueAtTime(.001, t + d);
    o.connect(g).connect(actx.destination); o.start(t); o.stop(t + d); t += d;
  }
}

// Eventos
function openCard() {
  const name = $('nameInput').value.trim() || 'ARMY';
  $('name').textContent = name;
  $('intro').classList.remove('active'); $('card').classList.add('active');
  addConfetti(200); typeText(message);
  document.title = `¡Feliz cumpleaños ${name}! 💜`;
}
$('openBtn').onclick = openCard;
$('nameInput').onkeydown = e => e.key === 'Enter' && openCard();

members.forEach(([n, msg]) => {
  const b = document.createElement('span'); b.className = 'm'; b.textContent = n;
  b.onclick = e => { toast(`${n}: ${msg}`); addConfetti(40, e.clientX, e.clientY); };
  $('members').appendChild(b);
});

$('confBtn').onclick = () => { addConfetti(250); addConfetti(60, innerWidth * .2, innerHeight * .7); addConfetti(60, innerWidth * .8, innerHeight * .7); };
$('cakeBtn').onclick = () => {
  const off = $('cake').classList.toggle('off');
  $('cakeBtn').textContent = off ? '🕯️ Encender velas' : '🎂 Soplar velas';
  if (off) { toast('¡Pide un deseo! ✨'); addConfetti(200); }
};
$('musicBtn').onclick = playHB;

// Efecto 3D con el mouse
const box = document.querySelector('.front');
addEventListener('mousemove', e => {
  if (!$('card').classList.contains('active')) return;
  const x = (e.clientX / innerWidth - .5) * 10, y = (e.clientY / innerHeight - .5) * -10;
  box.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
});
