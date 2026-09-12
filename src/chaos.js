// Chaos mode utilities — fake cursor, chaotic scroll, elusive elements

// Windows-style default arrow — used for every rendered cursor so they match exactly
const CURSOR_SVG = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">' +
    '<path fill="#000" stroke="#fff" stroke-width="1.2" d="M4 2 L4 26 L11 19 L15 30 L18 28 L14 17 L24 17 Z"/>' +
  '</svg>'
);

const CURSOR_URL = `url("data:image/svg+xml,${CURSOR_SVG}")`;

let fakeCursorCleanup = null;
let chaoticScrollCleanup = null;
let elusiveLikeCleanup = null;

function applyIdenticalCursorStyle(el) {
  el.className = 'fake-cursor';
  el.style.backgroundImage = CURSOR_URL;
  el.style.width = '32px';
  el.style.height = '32px';
}

function createFakeCursor(id) {
  const el = document.createElement('div');
  el.id = id;
  applyIdenticalCursorStyle(el);
  document.body.appendChild(el);
  return { el, x: 0, y: 0 };
}

function enableHiddenSystemCursor() {
  document.documentElement.classList.add('chaos-cursor-hidden');
}

function disableHiddenSystemCursor() {
  document.documentElement.classList.remove('chaos-cursor-hidden');
}

// 1. FAKE CURSORS — hide system cursor; render two identical arrows (one exact, one decoy)
export function initFakeCursor() {
  if (fakeCursorCleanup) return fakeCursorCleanup;

  enableHiddenSystemCursor();

  const primary = createFakeCursor('fake-cursor-primary');
  const decoy = createFakeCursor('fake-cursor-decoy');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let offsetX = 160;
  let offsetY = 50;
  let rafId = null;

  const onMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (Math.random() < 0.012) {
      offsetX = (Math.random() > 0.5 ? 1 : -1) * (100 + Math.random() * 180);
      offsetY = (Math.random() - 0.5) * 100;
    }
  };

  const tick = () => {
    // Primary tracks the real pointer exactly — looks like the "real" cursor
    primary.x = mouseX;
    primary.y = mouseY;
    primary.el.style.left = `${primary.x}px`;
    primary.el.style.top = `${primary.y}px`;

    // Decoy uses identical sprite but lags and offsets
    decoy.x += (mouseX + offsetX - decoy.x) * 0.14;
    decoy.y += (mouseY + offsetY - decoy.y) * 0.14;
    decoy.el.style.left = `${decoy.x}px`;
    decoy.el.style.top = `${decoy.y}px`;

    rafId = requestAnimationFrame(tick);
  };

  document.addEventListener('mousemove', onMove);
  rafId = requestAnimationFrame(tick);

  fakeCursorCleanup = () => {
    document.removeEventListener('mousemove', onMove);
    cancelAnimationFrame(rafId);
    primary.el.remove();
    decoy.el.remove();
    disableHiddenSystemCursor();
    fakeCursorCleanup = null;
  };

  return fakeCursorCleanup;
}

function getScrollTarget() {
  return document.scrollingElement || document.documentElement;
}

function clampScroll(value) {
  const el = getScrollTarget();
  const max = Math.max(0, el.scrollHeight - el.clientHeight);
  return Math.min(Math.max(0, value), max);
}

// 2. CHAOTIC SCROLL
export function initChaoticScroll() {
  if (chaoticScrollCleanup) return chaoticScrollCleanup;

  let scrollPos = window.scrollY;
  let animating = false;

  const applyChaos = (deltaY) => {
    const roll = Math.random();
    if (roll < 0.28) return -deltaY * (1.5 + Math.random());
    if (roll < 0.52) return deltaY * (2.5 + Math.random() * 2);
    if (roll < 0.76) return deltaY * (0.1 + Math.random() * 0.25);
    return (Math.random() > 0.5 ? 1 : -1) * (120 + Math.random() * 280);
  };

  const onWheel = (e) => {
    e.preventDefault();
    if (animating) return;

    scrollPos = clampScroll(scrollPos + applyChaos(e.deltaY));
    animating = true;
    window.scrollTo({ top: scrollPos, behavior: 'smooth' });

    setTimeout(() => {
      scrollPos = window.scrollY;
      animating = false;
    }, 280);
  };

  const onScroll = () => {
    if (!animating) scrollPos = window.scrollY;
  };

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('scroll', onScroll, { passive: true });

  chaoticScrollCleanup = () => {
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('scroll', onScroll);
    chaoticScrollCleanup = null;
  };

  return chaoticScrollCleanup;
}

function pickBackgroundColor(el) {
  let node = el;
  while (node && node !== document.body) {
    const bg = window.getComputedStyle(node).backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg;
    node = node.parentElement;
  }
  return '#ffffff';
}

function pickEscapeMode() {
  const roll = Math.random();
  if (roll < 0.38) return 'teleport';
  if (roll < 0.72) return 'shrink';
  return 'camouflage';
}

// Reusable elusive-element behavior
export function initElusiveElement(el, { onEscape, approachRadius = 100 } = {}) {
  if (!el) return null;

  let resetTimer = null;
  let isEscaped = false;
  let originalParent = el.parentElement;
  const camouflageColor = pickBackgroundColor(el);

  const reset = () => {
    el.classList.remove('elusive--escaped', 'elusive--shrunk', 'elusive--hidden');
    el.style.position = '';
    el.style.left = '';
    el.style.top = '';
    el.style.right = '';
    el.style.transform = '';
    el.style.opacity = '';
    el.style.backgroundColor = '';
    el.style.color = '';
    el.style.borderColor = '';
    el.style.boxShadow = '';
    el.style.zIndex = '';
    el.style.transition = '';
    isEscaped = false;

    if (el.parentElement === document.body && originalParent) {
      originalParent.appendChild(el);
    }
  };

  const escape = (mode) => {
    clearTimeout(resetTimer);
    isEscaped = true;
    onEscape?.(mode);

    if (mode === 'teleport') {
      document.body.appendChild(el);
      el.classList.add('elusive--escaped');
      el.style.position = 'fixed';
      el.style.left = `${24 + Math.random() * (window.innerWidth - 80)}px`;
      el.style.top = `${60 + Math.random() * (window.innerHeight - 120)}px`;
      el.style.zIndex = '10001';
      el.style.transform = 'scale(1)';
      el.style.opacity = '1';
    } else if (mode === 'shrink') {
      el.classList.add('elusive--shrunk');
      el.style.transform = 'scale(0.12)';
      el.style.opacity = '0.5';
    } else {
      el.classList.add('elusive--hidden');
      el.style.backgroundColor = camouflageColor;
      el.style.color = camouflageColor;
      el.style.borderColor = camouflageColor;
      el.style.boxShadow = 'none';
      el.style.opacity = '0.2';
      el.style.transform = 'scale(0.7)';
    }

    resetTimer = setTimeout(reset, 2000);
  };

  const onApproach = (e) => {
    if (isEscaped) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    if (Math.hypot(e.clientX - cx, e.clientY - cy) > approachRadius) return;
    escape(pickEscapeMode());
  };

  const onEnter = () => {
    if (!isEscaped) escape(pickEscapeMode());
  };

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    escape('teleport');
  };

  document.addEventListener('mousemove', onApproach);
  el.addEventListener('mouseenter', onEnter);
  el.addEventListener('click', onClick, true);

  return () => {
    clearTimeout(resetTimer);
    document.removeEventListener('mousemove', onApproach);
    el.removeEventListener('mouseenter', onEnter);
    el.removeEventListener('click', onClick, true);
    reset();
  };
}

// 3. ELUSIVE LIKE BUTTON
export function initElusiveLikeButton() {
  if (elusiveLikeCleanup) elusiveLikeCleanup();
  const likeBtn = document.querySelector('.like-button');
  if (!likeBtn) return null;

  elusiveLikeCleanup = initElusiveElement(likeBtn, { approachRadius: 110 });
  return elusiveLikeCleanup;
}

export function initGlobalChaos() {
  initFakeCursor();
  initChaoticScroll();
}

export function cleanupGlobalChaos() {
  fakeCursorCleanup?.();
  chaoticScrollCleanup?.();
}

export function cleanupElusiveLike() {
  elusiveLikeCleanup?.();
  elusiveLikeCleanup = null;
}
