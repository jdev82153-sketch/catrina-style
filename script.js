/* ============================================================
   CATRINA STYLE — script.js
   Animações, interações e funcionalidades
   ============================================================ */

'use strict';

/* ---- LOADER ---- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    initAnimations();
  }, 1800);
});

// Bloqueia scroll durante loader
document.body.style.overflow = 'hidden';

/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ---- MOBILE MENU ---- */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose= document.getElementById('mobileClose');
const mobileLinks= document.querySelectorAll('.mobile-link');

function openMenu() {
  mobileMenu.classList.add('open');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
mobileLinks.forEach(l => l.addEventListener('click', closeMenu));

/* ---- SCROLL REVEAL (Intersection Observer) ---- */
function initAnimations() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));

  /* ---- GSAP (se disponível) ---- */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero parallax leve
    gsap.to('.hero-bg', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Hero deco parallax
    gsap.to('.hero-deco-1', {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Ticker pause on hover
    const ticker = document.querySelector('.ticker');
    if (ticker) {
      ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
      ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
    }
  }
}

/* ---- SMOOTH ANCHOR SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- WHATSAPP HELPER ---- */
function openWhatsApp(msg = '') {
  const phone = '5517996623922';
  const text  = encodeURIComponent(msg || 'Olá! Vi o site da Catrina Style e quero saber mais sobre os produtos.');
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}

/* ---- ACTIVE NAV LINK ON SCROLL ---- */
const sections  = document.querySelectorAll('section[id]');
const navLinkEls= document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < bottom) {
      navLinkEls.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { passive: true });

/* ---- PRODUCT CARD HOVER TILT (opcional, sutil) ---- */
document.querySelectorAll('.prod-card, .cat-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = (e.clientX - rect.left) / rect.width  - 0.5;
    const y      = (e.clientY - rect.top)  / rect.height - 0.5;
    const tiltX  = y * -6;
    const tiltY  = x *  6;
    card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ---- DARK/LIGHT MODE TOGGLE (base para expansão futura) ---- */
// O site já nasce dark — deixar preparado para toggle
const savedTheme = localStorage.getItem('catrina-theme');
if (savedTheme === 'light') document.body.setAttribute('data-theme', 'light');

/* ---- GOOGLE ANALYTICS placeholder ---- */
// Descomentar e substituir pelo ID real quando disponível:
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'G-XXXXXXXXXX');

console.log('%c Catrina Style 🛍️', 'font-size:1.4rem; font-weight:bold; color:#C9A84C; background:#0D0D0D; padding:8px 16px; border-radius:4px;');
console.log('%c Desenvolvido com ❤️ para a Catrina Style · Jales-SP', 'color:#888; font-size:0.8rem;');
