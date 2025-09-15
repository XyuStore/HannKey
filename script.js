document.addEventListener('DOMContentLoaded', () => {
    // --- STATE APLIKASI ---
    let cart = [];

    // --- PEMILIH ELEMEN DOM ---
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartToggle = document.getElementById('cart-toggle');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCheckoutBtn = document.getElementById('cart-checkout-btn');

    // === LOGIKA KERANJANG BELANJA (CART) ===
    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="cart-items-empty">Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <p>${item.name}</p>
                        <p>${formatCurrency(item.price)}</p>
                        <div class="quantity-controls" data-id="${item.id}">
                            <button class="quantity-btn minus">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}">&times;</button>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
        }
        updateCartCount();
        updateCartSubtotal();
    };

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        renderCart();
        cartSidebar.classList.add('open');
    };

    const updateQuantity = (productId, change) => {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(productId);
            } else {
                renderCart();
            }
        }
    };

    const removeFromCart = (productId) => {
        cart = cart.filter(item => item.id !== productId);
        renderCart();
    };

    const updateCartCount = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    };

    const updateCartSubtotal = () => {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartSubtotal.textContent = formatCurrency(subtotal);
    };
    
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.product-card');
            const product = {
                id: card.dataset.id,
                name: card.dataset.name,
                price: parseInt(card.dataset.price),
                image: card.dataset.image,
            };
            addToCart(product);
        });
    });

    cartItemsContainer.addEventListener('click', (e) => {
        const target = e.target;
        const parentControls = target.closest('.quantity-controls');
        const removeButton = target.closest('.remove-item-btn');
        if (parentControls) {
            const productId = parentControls.dataset.id;
            if (target.classList.contains('plus')) updateQuantity(productId, 1);
            if (target.classList.contains('minus')) updateQuantity(productId, -1);
        }
        if (removeButton) {
            const productId = removeButton.dataset.id;
            removeFromCart(productId);
        }
    });

    cartToggle.addEventListener('click', (e) => { e.preventDefault(); cartSidebar.classList.toggle('open'); });
    closeCartBtn.addEventListener('click', () => cartSidebar.classList.remove('open'));

    // === LOGIKA MODAL CHECKOUT ===
    const checkoutModal = document.getElementById('checkout-modal');
    const closeModalBtn = checkoutModal.querySelector('.close-button');
    const steps = checkoutModal.querySelectorAll('.step');
    const stepIndicators = checkoutModal.querySelectorAll('.step-indicator');
    const nextButtons = checkoutModal.querySelectorAll('.next-btn');
    const prevButtons = checkoutModal.querySelectorAll('.prev-btn');
    let currentStep = 1;

    const showStep = (stepNumber) => {
        steps.forEach(step => step.classList.remove('active'));
        checkoutModal.querySelector(`#step-${stepNumber}`).classList.add('active');
        stepIndicators.forEach(indicator => {
            indicator.classList.remove('active');
            if (indicator.dataset.step <= stepNumber) indicator.classList.add('active');
        });
        currentStep = stepNumber;
    };
    
    const populateOrderSummary = () => {
        const summaryContainer = document.getElementById('final-order-summary');
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shippingCost = 50000; 
        const total = subtotal + shippingCost;
        summaryContainer.innerHTML = `
            <h4>Ringkasan:</h4>
            ${cart.map(item => `<p>${item.name} (x${item.quantity}) <span>${formatCurrency(item.price * item.quantity)}</span></p>`).join('')}
            <p>Ongkos Kirim <span>${formatCurrency(shippingCost)}</span></p>
            <hr>
            <p class="total"><strong>Total Bayar</strong> <span><strong>${formatCurrency(total)}</strong></span></p>
        `;
    };

    cartCheckoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            cartSidebar.classList.remove('open');
            populateOrderSummary();
            checkoutModal.style.display = 'block';
            showStep(1);
        } else {
            alert('Your cart is empty!');
        }
    });

    closeModalBtn.addEventListener('click', () => checkoutModal.style.display = 'none');
    window.addEventListener('click', (e) => { if (e.target == checkoutModal) checkoutModal.style.display = 'none'; });
    nextButtons.forEach(button => button.addEventListener('click', () => { if (currentStep < 3) showStep(currentStep + 1); }));
    prevButtons.forEach(button => button.addEventListener('click', () => { if (currentStep > 1) showStep(currentStep - 1); }));
    checkoutModal.querySelector('.confirm-btn').addEventListener('click', () => {
        alert('Terima kasih! Proses pembayaran akan disimulasikan di sini.');
        checkoutModal.style.display = 'none';
        cart = [];
        renderCart();
    });

    renderCart();

    // === LOGIKA ANIMASI SCROLL ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});
