console.log("Welcome to HannKey Store!");

// Contoh: Menangani klik tombol "Add to Cart" di halaman utama
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        alert('Produk ditambahkan ke keranjang! (Fungsi keranjang belum dibuat, silakan klik Checkout untuk demo)');
    });
});


// === LOGIKA UNTUK MODAL CHECKOUT ===

// 1. Ambil semua elemen yang dibutuhkan dari HTML
const modal = document.getElementById('checkout-modal');
const checkoutTrigger = document.getElementById('checkout-trigger');
const closeButton = document.querySelector('.close-button');

const steps = document.querySelectorAll('.step');
const stepIndicators = document.querySelectorAll('.step-indicator');
const nextButtons = document.querySelectorAll('.next-btn');
const prevButtons = document.querySelectorAll('.prev-btn');

// 2. State untuk melacak slide saat ini
let currentStep = 1;

// 3. Fungsi untuk menampilkan slide/step
const showStep = (stepNumber) => {
    // Sembunyikan semua step terlebih dahulu
    steps.forEach(step => step.classList.remove('active'));
    // Tampilkan step yang sesuai dengan nomornya
    document.getElementById(`step-${stepNumber}`).classList.add('active');

    // Update progress bar
    stepIndicators.forEach(indicator => {
        indicator.classList.remove('active');
        if (indicator.dataset.step <= stepNumber) {
            indicator.classList.add('active');
        }
    });

    // Update state
    currentStep = stepNumber;
};

// 4. Event Listeners untuk tombol navigasi
nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentStep < steps.length) {
            showStep(currentStep + 1);
        }
    });
});

prevButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    });
});

// 5. Event Listeners untuk membuka dan menutup modal
checkoutTrigger.addEventListener('click', (e) => {
    e.preventDefault(); // Mencegah link pindah halaman
    modal.style.display = 'block';
    showStep(1); // Selalu mulai dari step 1 saat modal dibuka
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Menutup modal jika user klik di luar area modal content
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});

// Menangani tombol "Bayar Sekarang"
document.querySelector('.confirm-btn').addEventListener('click', () => {
    alert('Terima kasih! Proses pembayaran akan disimulasikan di sini. Hubungkan dengan API Payment Gateway.');
    modal.style.display = 'none';
});
