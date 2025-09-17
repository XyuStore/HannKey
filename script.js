// Simple interactivity: mobile nav toggle, form validation, dynamic year, smooth scroll
document.addEventListener('DOMContentLoaded', () => {
  const hambtn = document.getElementById('hambtn');
  const nav = document.getElementById('mainNav');

  hambtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    hambtn.classList.toggle('active');
    if (nav.classList.contains('open')) {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.right = '1rem';
      nav.style.top = '64px';
      nav.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))';
      nav.style.padding = '1rem';
      nav.style.borderRadius = '10px';
      nav.style.gap = '0.5rem';
    } else {
      nav.style.display = '';
      nav.style.position = '';
      nav.style.background = '';
    }
  });

  // Smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        // close nav on mobile
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          hambtn.classList.remove('active');
          nav.style.display = '';
        }
      }
    });
  });

  // Contact form simple validation & feedback (no backend)
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name').trim();
    const email = data.get('email').trim();
    const message = data.get('message').trim();

    if (!name || !email || !message) {
      formMsg.textContent = 'Semua kolom wajib diisi.';
      formMsg.style.color = '#f6d365';
      return;
    }
    // simulate sending
    formMsg.textContent = 'Mengirim...';
    formMsg.style.color = '#98a0b3';
    setTimeout(() => {
      formMsg.textContent = 'Terima kasih! Pesan Anda telah dikirim. Kami akan menghubungi secepatnya.';
      formMsg.style.color = '#aef1c0';
      form.reset();
    }, 900);
  });

  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // small parallax for hero device
  const hero = document.querySelector('.hero');
  hero.addEventListener('mousemove', (ev) => {
    const vx = (ev.clientX / window.innerWidth - 0.5) * 20;
    const vy = (ev.clientY / window.innerHeight - 0.5) * 10;
    const mock = document.querySelector('.device-mockup');
    if (mock) mock.style.transform = `translate3d(${vx}px, ${vy}px, 0) rotate(${vx/10}deg)`;
  });
});
