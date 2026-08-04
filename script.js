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

//LightBox
// Seleccionamos todas las imágenes de tu portafolio
const imagenes = document.querySelectorAll('.frame img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

let indiceActual = 0;

// 1. Abrir el lightbox al hacer clic en una imagen
imagenes.forEach((img, index) => {
  img.addEventListener('click', () => {
    indiceActual = index;
    mostrarImagen(indiceActual);
    lightbox.classList.add('activo');
  });
});

// 2. Función para mostrar la imagen correcta
function mostrarImagen(index) {
  if (index < 0) indiceActual = imagenes.length - 1;
  else if (index >= imagenes.length) indiceActual = 0;
  
  lightboxImg.src = imagenes[indiceActual].src;
}

// 3. Botones de cerrar, siguiente y anterior
document.querySelector('.lightbox-cerrar').addEventListener('click', () => {
  lightbox.classList.remove('activo');
});

document.querySelector('.lightbox-prev').addEventListener('click', () => {
  mostrarImagen(--indiceActual);
});

document.querySelector('.lightbox-next').addEventListener('click', () => {
  mostrarImagen(++indiceActual);
});

// 4. Atajos de teclado (Esc, Flecha Izquierda, Flecha Derecha)
document.addEventListener('keydown', (evento) => {
  
  // Primero verificamos si el lightbox está abierto para no interferir con la página normal
  if (lightbox.classList.contains('activo')) {
    
    if (evento.key === 'Escape') {
      // Cerrar el lightbox con la tecla ESC
      lightbox.classList.remove('activo');
    } 
    else if (evento.key === 'ArrowLeft') {
      // Ir a la foto anterior con la flecha izquierda
      mostrarImagen(--indiceActual);
    } 
    else if (evento.key === 'ArrowRight') {
      // Ir a la foto siguiente con la flecha derecha
      mostrarImagen(++indiceActual);
    }
    
  }
});
