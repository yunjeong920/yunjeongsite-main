/* =====================================================
   YUN JEONG — Portfolio
   Modern vanilla + GSAP + Lenis
===================================================== */

(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Lenis 제거 — 네이티브 스크롤이 훨씬 가볍습니다 */
  const lenis = null;

  /* ---------- Header scroll ---------- */
  const header = $('.header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Smooth anchor scroll ---------- */
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -80 });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      closeMobileNav();
    });
  });

  /* ---------- Mobile nav ---------- */
  const toggle = $('.menu-toggle');
  const mNav = $('.mobile-nav');

  const openMobileNav = () => {
    if (!toggle || !mNav) return;
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', '메뉴 닫기');
    mNav.hidden = false;
    document.body.style.overflow = 'hidden';
  };
  const closeMobileNav = () => {
    if (!toggle || !mNav) return;
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '메뉴 열기');
    mNav.hidden = true;
    document.body.style.overflow = '';
  };

  if (toggle && mNav) {
    toggle.addEventListener('click', () => {
      toggle.classList.contains('is-open') ? closeMobileNav() : openMobileNav();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && toggle.classList.contains('is-open')) closeMobileNav();
    });
  }

  /* ---------- Reveal on scroll (인트로 제외) ---------- */
  const revealTargets = $$('[data-animate]').filter(el => !el.closest('.intro'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = [...entry.target.parentElement.children].indexOf(entry.target);
          entry.target.style.transitionDelay = `${Math.min(idx * 0.08, 0.4)}s`;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-in'));
  }

  /* ---------- Active nav link ---------- */
  const navLinks = $$('.gnb__link');
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(a => {
            a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* ---------- GSAP intro timeline (샥샥 순차 공개) ---------- */
  if (window.gsap && !prefersReducedMotion) {
    const badge    = $('.intro__badge');
    const lineIns  = $$('.intro__title .line-inner');
    const desc     = $('.intro__desc');
    const meta     = $('.intro__meta');
    const scroll   = $('.intro__scroll');
    const marquee  = $('.intro__marquee');

    const items = [badge, desc, meta, scroll, marquee].filter(Boolean);
    gsap.set(items, { y: 24, opacity: 0, clearProps: 'transition' });
    gsap.set(lineIns, { yPercent: 110 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (badge)   tl.to(badge,   { y: 0, opacity: 1, duration: 0.6 }, 0.1);
    if (lineIns.length) {
      tl.to(lineIns, { yPercent: 0, duration: 1, stagger: 0.1, ease: 'expo.out' }, 0.25);
    }
    if (desc)    tl.to(desc,    { y: 0, opacity: 1, duration: 0.6 }, '-=0.35');
    if (meta)    tl.to(meta,    { y: 0, opacity: 1, duration: 0.5 }, '-=0.4');
    if (scroll)  tl.to(scroll,  { y: 0, opacity: 1, duration: 0.5 }, '-=0.3');
    if (marquee) tl.to(marquee, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3');
  } else {
    $$('.intro [data-animate]').forEach(el => el.classList.add('is-in'));
  }

  /* 스크롤 parallax 제거 — 성능 이슈로 CSS 호버만 유지 */

  /* ---------- Current year (footer) ---------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
