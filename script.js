// Header: fondo sólido al hacer scroll
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

// Menú móvil
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Resaltar el enlace de la página actual en el menú
const currentPage = location.pathname.split('/').pop() || 'index.html';
navLinks.querySelectorAll('a').forEach(a => {
  const linkPage = a.getAttribute('href');
  if (linkPage === currentPage) a.classList.add('active');
});

// Filtro de portafolio (solo existe contenido si la página tiene #portfolioGrid)
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('#portfolioGrid .card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(card => {
      card.classList.toggle('hidden', f !== 'todos' && card.dataset.filter !== f);
    });
  });
});

// Scroll reveal
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal, .frame').forEach(el => io.observe(el));
} else {
  document.querySelectorAll('.reveal, .frame').forEach(el => el.classList.add('in'));
}
