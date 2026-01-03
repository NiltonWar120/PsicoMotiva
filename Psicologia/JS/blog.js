document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // BUSCADOR DE ARTÍCULOS
  // ============================================
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.querySelector(".search-btn");
  const blogCards = document.querySelectorAll(".blog-card");

  // Función de búsqueda
  function searchArticles() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    blogCards.forEach((card) => {
      const title = card.querySelector(".card-title").textContent.toLowerCase();
      const excerpt = card
        .querySelector(".card-excerpt")
        .textContent.toLowerCase();
      const category = card
        .querySelector(".card-category")
        .textContent.toLowerCase();

      if (
        title.includes(searchTerm) ||
        excerpt.includes(searchTerm) ||
        category.includes(searchTerm)
      ) {
        card.style.display = "block";
        card.style.animation = "fadeInUp 0.5s ease";
      } else {
        card.style.display = "none";
      }
    });

    checkResults();
  }

  // Verificar si hay resultados
  function checkResults() {
    const visibleCards = Array.from(blogCards).filter(
      (card) => card.style.display !== "none"
    );

    const articlesGrid = document.querySelector(".articles-grid");
    let noResultsMsg = document.querySelector(".no-results-message");

    if (visibleCards.length === 0) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement("div");
        noResultsMsg.className = "no-results-message";
        noResultsMsg.innerHTML = `
                    <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                    <h3 style="color: #666; margin-bottom: 0.5rem;">No se encontraron artículos</h3>
                    <p style="color: #999;">Intenta con otros términos de búsqueda</p>
                `;
        noResultsMsg.style.cssText = `
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 60px 20px;
                `;
        articlesGrid.appendChild(noResultsMsg);
      }
    } else {
      if (noResultsMsg) {
        noResultsMsg.remove();
      }
    }
  }

  // Event listeners para el buscador
  searchBtn.addEventListener("click", searchArticles);

  searchInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      searchArticles();
    }
  });

  // Búsqueda en tiempo real
  searchInput.addEventListener("input", function () {
    if (searchInput.value === "") {
      blogCards.forEach((card) => {
        card.style.display = "block";
      });
      const noResultsMsg = document.querySelector(".no-results-message");
      if (noResultsMsg) {
        noResultsMsg.remove();
      }
    } else {
      searchArticles();
    }
  });

  // ============================================
  // FILTRO POR CATEGORÍA
  // ============================================
  window.filterByCategory = function (category) {
    const filterBtns = document.querySelectorAll(".filter-btn");

    // Actualizar botones activos
    filterBtns.forEach((btn) => {
      btn.classList.remove("active");
      if (
        btn.textContent.toLowerCase().includes(category.toLowerCase()) ||
        (category === "all" && btn.textContent.toLowerCase().includes("todos"))
      ) {
        btn.classList.add("active");
      }
    });

    // Filtrar tarjetas
    blogCards.forEach((card) => {
      const cardCategory = card
        .querySelector(".card-category")
        .textContent.toLowerCase();

      if (category === "all" || cardCategory.includes(category.toLowerCase())) {
        card.style.display = "block";
        card.style.animation = "fadeInUp 0.5s ease";
      } else {
        card.style.display = "none";
      }
    });

    checkResults();

    // Scroll suave a los artículos
    document.querySelector(".articles-section").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // ============================================
  // PAGINACIÓN
  // ============================================
  const paginationBtns = document.querySelectorAll(".pagination-btn");

  paginationBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      paginationBtns.forEach((b) => b.classList.remove("active"));

      if (!this.querySelector("i")) {
        this.classList.add("active");
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });

  // ============================================
  // CONTADOR DE ESTADÍSTICAS
  // ============================================
  const stats = document.querySelectorAll(".stat-number");
  let hasAnimated = false;

  function animateStats() {
    stats.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-target"));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCount = () => {
        current += increment;
        if (current < target) {
          stat.textContent = Math.floor(current);
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target;
        }
      };

      updateCount();
    });
  }

  // Observer para estadísticas
  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateStats();
            hasAnimated = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    statsObserver.observe(statsSection);
  }

  // ============================================
  // SMOOTH SCROLL PARA LINKS
  // ============================================
  const cardLinks = document.querySelectorAll(".card-link");

  // Simplifica tu JavaScript solo para el log
  cardLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      console.log("Artículo clickeado");
      // No necesitas preventDefault ni window.open
    });
  });

  // ============================================
  // ANIMACIÓN AL HACER SCROLL
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observar elementos animables
  const animatableElements = document.querySelectorAll(
    ".blog-card, .stat-item, .resource-card, .section-header"
  );

  animatableElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.6s ease";
    observer.observe(element);
  });

  // ============================================
  // EFECTO PARALLAX EN HERO - DESACTIVADO
  // ============================================
  // El efecto parallax ha sido desactivado para evitar que la imagen
  // tape el contenido de las siguientes secciones
});

// ============================================
// FUNCIÓN PARA COMPARTIR EN REDES SOCIALES
// ============================================
function shareArticle(platform, articleTitle) {
  const url = window.location.href;
  const text = `Mira este artículo: ${articleTitle}`;

  let shareUrl = "";

  switch (platform) {
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`;
      break;
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`;
      break;
    case "whatsapp":
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
      break;
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`;
      break;
  }

  if (shareUrl) {
    window.open(shareUrl, "_blank", "width=600,height=400");
  }
}
