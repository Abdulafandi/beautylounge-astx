/* Tipa Wellness — shared behaviour, loaded by every page.
   Page-specific behaviour (e.g. the ingredient spotlight) stays inline on its page. */

// scroll reveals
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      const el = e.target;
      el.classList.add('in');
      // drop the reveal stagger once it has played, so later transitions
      // (spotlight border, hover) respond instantly
      const d = parseFloat(el.style.transitionDelay);
      if (d) setTimeout(() => { el.style.transitionDelay = ''; }, d + 800);
      io.unobserve(el);
    }
  }
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.rv').forEach((el) => io.observe(el));

// stagger grids: delay children within the same parent
document.querySelectorAll('.proc-grid, .rec-grid, .ledger').forEach(grid => {
  [...grid.children].forEach((el, i) => { el.style.transitionDelay = (i * 70) + 'ms'; });
});
