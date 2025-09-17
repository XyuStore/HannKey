// Toggle menu mobile
document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector("nav ul").classList.toggle("show");
});

// Init AOS
AOS.init({duration: 1000, once: true});

// Typing animation
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

// Init EmailJS
(function(){
  emailjs.init("YOUR_PUBLIC_KEY"); // Ganti dengan Public Key dari EmailJS
})();

// Handle form submit
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
