'use strict';

document.addEventListener('DOMContentLoaded', function () {

  // ── Mobile nav toggle ────────────────────────────────────
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle) {
    toggle.addEventListener('click', function () {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Shrink header on scroll ───────────────────────────────
  window.addEventListener('scroll', function () {
    document.querySelector('.site-header').classList.toggle('scrolled', window.scrollY > 50);
  });

  // ── Scroll reveal ─────────────────────────────────────────
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.hidden.fade').forEach(function (el) {
    observer.observe(el);
  });

});