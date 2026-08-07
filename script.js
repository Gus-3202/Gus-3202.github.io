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

// Resalta el enlace de la página actual en el menú
const currentPage = location.pathname.split('/').pop() || 'index.html';
navLinks.querySelectorAll('a').forEach(a => {
  const linkPage = a.getAttribute('href');
  if (linkPage === currentPage) a.classList.add('active');
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
// Seleccionamos todas las imágenes del portafolio
const imagenes = document.querySelectorAll('.frame img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

if (lightbox && lightboxImg) {

  let indiceActual = 0;

  // 1. Abre el lightbox al hacer clic en una imagen
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
    
    // Primero verifica si el lightbox está abierto para no interferir con la página normal
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
}

// Seleccionamos los botones y las tarjetas
const botonesFiltro = document.querySelectorAll('.filter-btn');
const tarjetas = document.querySelectorAll('.card');

// Le agregamos la acción de clic a cada botón
botonesFiltro.forEach(boton => {
  boton.addEventListener('click', () => {
    
    // 1. Remueve el estilo 'activo' a todos los botones y lo coloca al que se clickea
    botonesFiltro.forEach(b => b.classList.remove('active'));
    boton.classList.add('active');

    // 2. Lee qué filtro eligió el usuario
    const filtroSeleccionado = boton.getAttribute('data-filter');

    // 3. Revisar tarjeta por tarjeta
    tarjetas.forEach(tarjeta => {
      const categoriaTarjeta = tarjeta.getAttribute('data-filter');
      // Convertimos el texto (ej. "bodas retratos") en una lista de palabras
      const listaCategorias = categoriaTarjeta.split(' ');
      // Quita la clase de animación inicial
      tarjeta.classList.remove('animar');
      if (filtroSeleccionado === 'todos' || listaCategorias.includes(filtroSeleccionado)) {
        // Si el filtro es "todos" o coincide con la foto, la muestra quitando la clase hidden
        tarjeta.classList.remove('hidden');
        // 3. Fuerza un pequeño retraso de 10 milisegundos para asegurar que la foto ya está en el sistema antes de animarla
        setTimeout(() => {
          tarjeta.classList.add('animar');
        }, 10);
        
      } else {
        // Si no coincide, se le asigna la clase hidden para ocultarla
        tarjeta.classList.add('hidden');
      }
    });
    
  });
});
