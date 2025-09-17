// Toggle Navbar
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('nav ul');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Portfolio Zoom
const portfolioItems = document.querySelectorAll('.portfolio-item img');
portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    const win = window.open(item.src, "_blank");
    win.focus();
  });
});

// Contact Form to WhatsApp
document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const whatsappNumber = "6281234567890"; // Ganti dengan nomor WhatsApp kamu
  const url = `https://wa.me/${whatsappNumber}?text=Halo%20saya%20${name}%20(${email}),%0A%0A${message}`;

  window.open(url, "_blank");
});
