// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get('category');
const collectionParam = urlParams.get('collection');
const filterParam = urlParams.get('filter');

let filteredProducts = [...products];
let currentView = 'grid';

// Initialize shop page
function initShop() {
    // Apply URL filters
    if (categoryParam) {
        document.querySelector(`input[data-filter="category"][value="${categoryParam}"]`).checked = true;
    }
    if (collectionParam) {
        document.querySelector(`input[data-filter="collection"][value="${collectionParam}"]`).checked = true;
    }
    
    // Load products
    applyFilters();
    
    // Setup event listeners
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    // Filter checkboxes
    document.querySelectorAll('input[data-filter]').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Price range
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        priceRange.addEventListener('input', (e) => {
            document.getElementById('maxPrice').textContent = e.target.value;
            applyFilters();
        });
    }
    
    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', applyFilters);
    }
    
    // View toggle
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            e.target.closest('.view-btn').classList.add('active');
            currentView = e.target.closest('.view-btn').dataset.view;
            renderProducts();
        });
    });
    
    // Clear filters
    const clearFilters = document.getElementById('clearFilters');
    if (clearFilters) {
        clearFilters.addEventListener('click', () => {
            document.querySelectorAll('input[data-filter]').forEach(cb => cb.checked = false);
            document.getElementById('priceRange').value = 2000;
            document.getElementById('maxPrice').textContent = '2000';
            document.getElementById('sortSelect').value = 'default';
            applyFilters();
        });
    }
}

// Apply filters
function applyFilters() {
    filteredProducts = [...products];
    
    // Category filter
    const selectedCategories = Array.from(document.querySelectorAll('input[data-filter="category"]:checked'))
        .map(cb => cb.value);
    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(p => selectedCategories.includes(p.category));
    }
    
    // Collection filter
    const selectedCollections = Array.from(document.querySelectorAll('input[data-filter="collection"]:checked'))
        .map(cb => cb.value);
    if (selectedCollections.length > 0) {
        filteredProducts = filteredProducts.filter(p => selectedCollections.includes(p.collection));
    }
    
    // Price filter
    const maxPrice = parseInt(document.getElementById('priceRange').value);
    filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
    
    // Sort
    const sortValue = document.getElementById('sortSelect').value;
    switch(sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'popularity':
            filteredProducts.sort((a, b) => (b.rating * 10 + b.id) - (a.rating * 10 + a.id));
            break;
    }
    
    // Update results count
    document.getElementById('resultsCount').textContent = filteredProducts.length;
    
    // Render products
    renderProducts();
}

// Render products
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.className = currentView === 'list' ? 'products-grid list-view' : 'products-grid';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 4rem;"><h3>No products found</h3><p>Try adjusting your filters</p></div>';
        return;
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => {
        const inWishlist = isInWishlist(product.id);
        return `
            <div class="product-card">
                <div class="product-image">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-actions">
                        <button onclick="addToWishlist(${JSON.stringify(product).replace(/"/g, '&quot;')})" title="Add to Wishlist" style="color: ${inWishlist ? 'var(--primary-color)' : ''}">
                            <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                        <button onclick="window.location.href='product-detail.html?id=${product.id}'" title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <p class="product-category">${product.category}</p>
                    <h3 class="product-title"><a href="product-detail.html?id=${product.id}" style="text-decoration: none; color: inherit;">${product.name}</a></h3>
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
        `;
    }).join('');
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShop);
} else {
    initShop();
}



