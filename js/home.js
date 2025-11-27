// ===== Hero Slider =====
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dots .dot');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// Auto-play slider
setInterval(nextSlide, 5000);

// ===== Testimonials Slider =====
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
    
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentTestimonial = index;
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
});

// Auto-play testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}, 6000);

// ===== Load Trending Products =====
function loadTrendingProducts() {
    const trendingProductsContainer = document.getElementById('trendingProducts');
    if (!trendingProductsContainer) return;
    
    // Get first 4 products as trending
    const trendingProducts = products.slice(0, 4);
    
    trendingProductsContainer.innerHTML = trendingProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.name}">
                <div class="product-actions">
                    <button onclick="addToWishlist(${JSON.stringify(product).replace(/"/g, '&quot;')})" title="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                    <button onclick="window.location.href='product-detail.html?id=${product.id}'" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">
                        ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                        ${product.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                    </div>
                    <span>(${product.rating})</span>
                </div>
                <div class="product-price">
                    <div>
                        <span class="price">$${product.price}</span>
                        ${product.oldPrice ? `<span class="old-price">$${product.oldPrice}</span>` : ''}
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Load products when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTrendingProducts);
} else {
    loadTrendingProducts();
}



