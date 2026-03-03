'use strict';

// Scroll reveal — fade in sections as they enter the viewport
document.addEventListener('DOMContentLoaded', function () {
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