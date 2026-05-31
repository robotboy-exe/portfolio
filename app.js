// Get the button
const backToTopBtn = document.getElementById("backToTopBtn");

// Show button when user scrolls down 300px from top
window.addEventListener("scroll", function() {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

// Smooth scroll to top when clicked
backToTopBtn.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});