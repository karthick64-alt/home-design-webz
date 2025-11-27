// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on a menu link
    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu on window resize if it's larger than mobile
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== Search Modal =====
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const closeSearch = document.getElementById('closeSearch');

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        searchModal.classList.add('active');
        document.getElementById('searchInput').focus();
    });
}

if (closeSearch) {
    closeSearch.addEventListener('click', () => {
        searchModal.classList.remove('active');
    });
}

if (searchModal) {
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
        }
    });
}

// ===== Back to Top Button =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Sticky Header =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// ===== Cart & Wishlist Count =====
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.querySelector('.cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = cartCount;
        cartCountEl.style.display = cartCount > 0 ? 'flex' : 'none';
    }
}

function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistCountEl = document.querySelector('.wishlist-count');
    if (wishlistCountEl) {
        wishlistCountEl.textContent = wishlist.length;
        wishlistCountEl.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
}

// Initialize counts on page load
updateCartCount();
updateWishlistCount();

// ===== Add to Cart Function =====
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Product added to cart!');
}

// ===== Add to Wishlist Function =====
function addToWishlist(product) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (wishlist.find(item => item.id === product.id)) {
        wishlist = wishlist.filter(item => item.id !== product.id);
        showNotification('Product removed from wishlist');
    } else {
        wishlist.push(product);
        showNotification('Product added to wishlist!');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
}

// ===== Check if Product is in Wishlist =====
function isInWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    return wishlist.some(item => item.id === productId);
}

// ===== Notification System =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : '#f56565'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Newsletter Form =====
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
        
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
            showNotification('Thank you for subscribing!');
            newsletterForm.reset();
        } else {
            showNotification('You are already subscribed!', 'error');
        }
    });
}

// ===== Product Data =====
const products = [
    {
        id: 1,
        name: 'Modern Sofa Set',
        category: 'furniture',
        price: 1299,
        oldPrice: 1599,
        image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        rating: 4.5,
        badge: 'New',
        collection: 'minimalist'
    },
    {
        id: 2,
        name: 'Crystal Chandelier',
        category: 'lighting',
        price: 599,
        image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        rating: 4.8,
        badge: 'Sale',
        collection: 'luxury'
    },
    {
        id: 3,
        name: 'Abstract Wall Art',
        category: 'wall-art',
        price: 199,
        oldPrice: 249,
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        rating: 4.3,
        collection: 'minimalist'
    },
    {
        id: 4,
        name: 'Decorative Vase Set',
        category: 'decor',
        price: 89,
        image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        rating: 4.6,
        badge: 'New',
        collection: 'festive'
    },
    {
        id: 5,
        name: 'Persian Rug',
        category: 'rugs',
        price: 799,
        oldPrice: 999,
        image: 'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        rating: 4.7,
        badge: 'Sale',
        collection: 'luxury'
    },
    {
        id: 6,
        name: 'Ceramic Planter',
        category: 'planters',
        price: 49,
        image: 'https://images.pexels.com/photos/1070535/pexels-photo-1070535.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        rating: 4.4,
        collection: 'minimalist'
    },
    {
        id: 7,
        name: 'Dining Table Set',
        category: 'furniture',
        price: 1899,
        image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        rating: 4.9,
        badge: 'New',
        collection: 'luxury'
    },
    {
        id: 8,
        name: 'Floor Lamp',
        category: 'lighting',
        price: 299,
        oldPrice: 349,
        image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        rating: 4.5,
        badge: 'Sale',
        collection: 'minimalist'
    },
    {
        id: 9,
        name: 'Elegant Wall Mirror',
        category: 'mirrors',
        price: 249,
        oldPrice: 299,
        image: 'https://images.pexels.com/photos/1457844/pexels-photo-1457844.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        rating: 4.6,
        badge: 'Sale',
        collection: 'luxury'
    }
];

// Export products for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products };
}

