/* =========================================================
   BOOKROOM — interacciones del sitio informativo
   Todo el código está comentado a propósito para que sea
   fácil de entender y explicar (nivel principiante).
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------------------------------------------------------
     1) Año automático en el footer
  --------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ---------------------------------------------------------
     2) Navbar: se encoge y oscurece un poco al hacer scroll
  --------------------------------------------------------- */
  var navbar = document.getElementById("navbar");
  function actualizarNavbar() {
    if (window.scrollY > 40) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  }
  actualizarNavbar();
  window.addEventListener("scroll", actualizarNavbar);


  /* ---------------------------------------------------------
     3) Menú de hamburguesa en móvil
  --------------------------------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var navLinksList = document.querySelectorAll("#navLinks a");

  navToggle.addEventListener("click", function () {
    navbar.classList.toggle("menu-open");
    navToggle.classList.toggle("is-open");
  });

  // Si la persona toca un link del menú móvil, el menú se cierra solo
  navLinksList.forEach(function (link) {
    link.addEventListener("click", function () {
      navbar.classList.remove("menu-open");
      navToggle.classList.remove("is-open");
    });
  });


  /* ---------------------------------------------------------
     4) Resaltar el link del menú según la sección visible
  --------------------------------------------------------- */
  var secciones = document.querySelectorAll("section[id]");
  function marcarLinkActivo() {
    var posicionActual = window.scrollY + 140;
    secciones.forEach(function (seccion) {
      var inicio = seccion.offsetTop;
      var fin = inicio + seccion.offsetHeight;
      var link = document.querySelector('#navLinks a[href="#' + seccion.id + '"]');
      if (!link) return;
      if (posicionActual >= inicio && posicionActual < fin) {
        navLinksList.forEach(function (l) { l.classList.remove("is-active"); });
        link.classList.add("is-active");
      }
    });
  }
  window.addEventListener("scroll", marcarLinkActivo);


  /* ---------------------------------------------------------
     5) Secuencia de entrada del hero (un solo momento animado
        al cargar la página, no en cada scroll)
  --------------------------------------------------------- */
  var heroCopy = document.getElementById("heroCopy");
  setTimeout(function () {
    heroCopy.classList.add("is-ready");
  }, 150);


  /* ---------------------------------------------------------
     6) Slider automático de fotos en el hero
  --------------------------------------------------------- */
  var slides = document.querySelectorAll("#heroVisual .slide");
  var dotsContainer = document.getElementById("heroDots");
  var indiceActual = 0;
  var intervaloSlider;

  // Crea un punto (bolita) por cada foto, para poder saltar a ella
  slides.forEach(function (_, i) {
    var punto = document.createElement("button");
    if (i === 0) punto.classList.add("is-active");
    punto.setAttribute("aria-label", "Ir a la imagen " + (i + 1));
    punto.addEventListener("click", function () {
      mostrarSlide(i);
      reiniciarIntervalo();
    });
    dotsContainer.appendChild(punto);
  });
  var puntos = dotsContainer.querySelectorAll("button");

  function mostrarSlide(indice) {
    slides[indiceActual].classList.remove("is-active");
    puntos[indiceActual].classList.remove("is-active");
    indiceActual = indice;
    slides[indiceActual].classList.add("is-active");
    puntos[indiceActual].classList.add("is-active");
  }

  function siguienteSlide() {
    var siguiente = (indiceActual + 1) % slides.length;
    mostrarSlide(siguiente);
  }

  function reiniciarIntervalo() {
    clearInterval(intervaloSlider);
    intervaloSlider = setInterval(siguienteSlide, 6000);
  }
  reiniciarIntervalo();


  /* ---------------------------------------------------------
     7) Galería con "lightbox" (ver la foto en grande)
  --------------------------------------------------------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCaption = document.getElementById("lightboxCaption");
  var lightboxClose = document.getElementById("lightboxClose");
  var botonesGaleria = document.querySelectorAll("#galleryGrid button");

  botonesGaleria.forEach(function (boton) {
    boton.addEventListener("click", function () {
      var ruta = boton.getAttribute("data-full");
      var texto = boton.getAttribute("data-caption");
      lightboxImg.setAttribute("src", ruta);
      lightboxImg.setAttribute("alt", texto);
      lightboxCaption.textContent = texto;
      lightbox.classList.add("is-open");
    });
  });

  function cerrarLightbox() {
    lightbox.classList.remove("is-open");
  }
  lightboxClose.addEventListener("click", cerrarLightbox);
  lightbox.addEventListener("click", function (evento) {
    if (evento.target === lightbox) cerrarLightbox();
  });
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") cerrarLightbox();
  });


  /* ---------------------------------------------------------
     8) Carrusel de testimonios
  --------------------------------------------------------- */
  var testimonios = document.querySelectorAll(".testimonial");
  var indiceTestimonio = 0;

  function mostrarTestimonio(indice) {
    testimonios[indiceTestimonio].classList.remove("is-active");
    indiceTestimonio = (indice + testimonios.length) % testimonios.length;
    testimonios[indiceTestimonio].classList.add("is-active");
  }

  document.getElementById("testimonialNext").addEventListener("click", function () {
    mostrarTestimonio(indiceTestimonio + 1);
  });
  document.getElementById("testimonialPrev").addEventListener("click", function () {
    mostrarTestimonio(indiceTestimonio - 1);
  });


  /* ---------------------------------------------------------
     9) Botón "volver arriba"
  --------------------------------------------------------- */
  var backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 600) {
      backToTop.classList.add("is-visible");
    } else {
      backToTop.classList.remove("is-visible");
    }
  });
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

});
