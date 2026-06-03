// Get the button
const backToTopBtn = document.getElementById("backToTopBtn");

// Show button when user scrolls down 300px from top
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

// Smooth scroll to top when clicked
backToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Dark mode toggle
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
  }
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// Carousel functionality for WordPress project
function initCarousel(container) {
  const slides = container.querySelectorAll('.carousel-image');
  const prevBtn = container.querySelector('.carousel-prev');
  const nextBtn = container.querySelector('.carousel-next');
  const dots = container.querySelectorAll('.dot');
  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateCarousel(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentIndex = index;
  }

  function nextSlide() {
    let newIndex = currentIndex + 1;
    if (newIndex >= totalSlides) newIndex = 0;
    updateCarousel(newIndex);
  }

  function prevSlide() {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = totalSlides - 1;
    updateCarousel(newIndex);
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => updateCarousel(idx));
  });

  // Optional: auto-advance every 5 seconds (pause on hover)
  let interval = setInterval(nextSlide, 5000);
  container.addEventListener('mouseenter', () => clearInterval(interval));
  container.addEventListener('mouseleave', () => {
    interval = setInterval(nextSlide, 5000);
  });
}

// Find all carousels (in case you add more)
document.querySelectorAll('.carousel-container').forEach(initCarousel);