// Navbar toggle
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}

// Scroll animation
const elements = document.querySelectorAll("[data-animate]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));
