// === Toggle menu mobile ===
document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector("nav ul").classList.toggle("show");
});

// === Init AOS ===
AOS.init({duration: 1000, once: true});

// === Typing animation ===
const text = "Selamat Datang di HannKey";
let i = 0;
function typing() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typing, 100);
  }
}
typing();

// === Init EmailJS ===
(function(){
  emailjs.init("YOUR_PUBLIC_KEY"); // Ganti dengan Public Key dari EmailJS
})();

// === Handle form submit ===
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
    .then(() => {
      document.getElementById("status-message").innerText = "Pesan berhasil dikirim!";
      this.reset();
    }, (error) => {
      document.getElementById("status-message").innerText = "Gagal mengirim pesan!";
      console.error(error);
    });
});

// === Animasi Partikel Bintang + Shooting Star ===
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector(".hero").offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let stars = [];
for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.5 + 0.2
  });
}

// Shooting star
let shootingStars = [];
function createShootingStar() {
  shootingStars.push({
    x: Math.random() * canvas.width,
    y: 0,
    length: Math.random() * 80 + 50,
    speed: Math.random() * 6 + 4,
    opacity: 1
  });
  setTimeout(createShootingStar, Math.random() * 6000 + 4000);
}
createShootingStar();

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bintang kecil
  ctx.fillStyle = "white";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });

  // Shooting star
  shootingStars.forEach((s, i) => {
    ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.length, s.y + s.length);
    ctx.stroke();
    s.x += s.speed;
    s.y += s.speed;
    s.opacity -= 0.01;
    if (s.opacity <= 0) shootingStars.splice(i, 1);
  });

  requestAnimationFrame(animateStars);
}
animateStars();
