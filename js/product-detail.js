// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

let currentProduct = null;
let quantity = 1;

// Load product detail
function loadProductDetail() {
    if (!productId) {
        document.getElementById('productDetailContent').innerHTML = '<h2>Product not found</h2>';
        return;
    }
    
    currentProduct = products.find(p => p.id === productId);
    
    if (!currentProduct) {
        document.getElementById('productDetailContent').innerHTML = '<h2>Product not found</h2>';
        return;
    }
    
    const inWishlist = isInWishlist(currentProduct.id);
    
    document.getElementById('productDetailContent').innerHTML = `
        <div class="product-detail">
            <div class="product-images">
                <div class="main-image">
                    <img src="${currentProduct.image}" alt="${currentProduct.name}" id="mainImage">
                </div>
                <div class="thumbnail-images">
                    <div class="thumbnail active" onclick="changeImage('${currentProduct.image}')">
                        <img src="${currentProduct.image}" alt="Thumbnail 1">
                    </div>
                    <div class="thumbnail" onclick="changeImage('${currentProduct.image}')">
                        <img src="${currentProduct.image}" alt="Thumbnail 2">
                    </div>
                    <div class="thumbnail" onclick="changeImage('${currentProduct.image}')">
                        <img src="${currentProduct.image}" alt="Thumbnail 3">
                    </div>
                </div>
            </div>
            <div class="product-info">
                <h1>${currentProduct.name}</h1>
                <div class="product-meta">
                    <div class="product-rating-large">
                        <div class="stars">
                            ${'<i class="fas fa-star"></i>'.repeat(Math.floor(currentProduct.rating))}
                            ${currentProduct.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                        </div>
                        <span>${currentProduct.rating} (24 reviews)</span>
                    </div>
                    <span>SKU: HD-${currentProduct.id.toString().padStart(4, '0')}</span>
                </div>
                <div class="product-price-large">
                    $${currentProduct.price}
                    ${currentProduct.oldPrice ? `<span class="old-price-large">$${currentProduct.oldPrice}</span>` : ''}
                </div>
                <div class="product-description">
                    <p>${getProductDescription(currentProduct)}</p>
                </div>
                <div class="product-specs">
                    <h3>Specifications</h3>
                    <div class="spec-item">
                        <span class="spec-label">Category:</span>
                        <span>${currentProduct.category}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Material:</span>
                        <span>${getMaterial(currentProduct.category)}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Dimensions:</span>
                        <span>${getDimensions(currentProduct.category)}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Weight:</span>
                        <span>${getWeight(currentProduct.category)}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Collection:</span>
                        <span>${currentProduct.collection}</span>
                    </div>
                </div>
                <div class="product-actions-detail">
                    <div class="quantity-selector">
                        <button onclick="decreaseQuantity()">-</button>
                        <input type="number" id="quantityInput" value="1" min="1" onchange="updateQuantity()">
                        <button onclick="increaseQuantity()">+</button>
                    </div>
                    <button class="btn btn-primary btn-large" onclick="addToCartWithQuantity()">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-white btn-large" onclick="toggleWishlist()" style="border: 2px solid var(--primary-color);">
                        <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="reviews-section">
            <h2>Customer Reviews</h2>
            <div class="review-card">
                <div class="review-header">
                    <div class="reviewer">
                        <div class="reviewer-avatar">JD</div>
                        <div>
                            <h4>John Doe</h4>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                    <span style="color: var(--text-light);">2 days ago</span>
                </div>
                <p>Absolutely love this product! The quality is exceptional and it looks even better in person. Highly recommend!</p>
            </div>
            <div class="review-card">
                <div class="review-header">
                    <div class="reviewer">
                        <div class="reviewer-avatar">SM</div>
                        <div>
                            <h4>Sarah Miller</h4>
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                            </div>
                        </div>
                    </div>
                    <span style="color: var(--text-light);">1 week ago</span>
                </div>
                <p>Great product, fast shipping. The only minor issue was the assembly instructions could be clearer, but overall very satisfied.</p>
            </div>
        </div>
    `;
    
    // Load related products
    loadRelatedProducts();
}

function changeImage(imageSrc) {
    document.getElementById('mainImage').src = imageSrc;
    document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
    event.target.closest('.thumbnail').classList.add('active');
}

function increaseQuantity() {
    quantity++;
    document.getElementById('quantityInput').value = quantity;
}

function decreaseQuantity() {
    if (quantity > 1) {
        quantity--;
        document.getElementById('quantityInput').value = quantity;
    }
}

function updateQuantity() {
    quantity = parseInt(document.getElementById('quantityInput').value) || 1;
    if (quantity < 1) quantity = 1;
    document.getElementById('quantityInput').value = quantity;
}

function addToCartWithQuantity() {
    if (!currentProduct) return;
    for (let i = 0; i < quantity; i++) {
        addToCart(currentProduct);
    }
    showNotification(`${quantity} item(s) added to cart!`);
}

function toggleWishlist() {
    if (!currentProduct) return;
    addToWishlist(currentProduct);
    // Reload to update wishlist icon
    setTimeout(() => loadProductDetail(), 100);
}

function loadRelatedProducts() {
    if (!currentProduct) return;
    
    const related = products
        .filter(p => p.id !== currentProduct.id && (p.category === currentProduct.category || p.collection === currentProduct.collection))
        .slice(0, 4);
    
    const relatedContainer = document.getElementById('relatedProducts');
    if (!relatedContainer) return;
    
    if (related.length === 0) {
        relatedContainer.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No related products found</p>';
        return;
    }
    
    relatedContainer.innerHTML = related.map(product => `
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
    `).join('');
}

function getProductDescription(product) {
    const descriptions = {
        furniture: 'Premium quality furniture designed for comfort and style. Made with sustainable materials and expert craftsmanship.',
        lighting: 'Elegant lighting solutions to illuminate and enhance your living space. Energy-efficient and beautifully designed.',
        'wall-art': 'Stunning artwork to transform your walls. High-quality prints on premium materials.',
        decor: 'Beautiful decorative items to add the perfect finishing touches to your home.',
        rugs: 'Luxurious rugs and carpets for comfort and style. Soft, durable, and easy to maintain.',
        planters: 'Stylish planters to bring nature indoors. Perfect for any plant lover.'
    };
    return descriptions[product.category] || 'A beautiful addition to your home decor collection.';
}

function getMaterial(category) {
    const materials = {
        furniture: 'Solid Wood, Metal',
        lighting: 'Metal, Glass',
        'wall-art': 'Canvas, Premium Paper',
        decor: 'Ceramic, Metal, Glass',
        rugs: 'Wool, Synthetic Blend',
        planters: 'Ceramic, Terracotta'
    };
    return materials[category] || 'Various';
}

function getDimensions(category) {
    const dimensions = {
        furniture: 'Varies by item',
        lighting: 'Varies by item',
        'wall-art': '24" x 36"',
        decor: 'Varies by item',
        rugs: 'Varies by size',
        planters: '8" x 8" x 10"'
    };
    return dimensions[category] || 'Varies';
}

function getWeight(category) {
    const weights = {
        furniture: 'Varies by item',
        lighting: '5-15 lbs',
        'wall-art': '2-5 lbs',
        decor: '1-3 lbs',
        rugs: 'Varies by size',
        planters: '3-8 lbs'
    };
    return weights[category] || 'Varies';
}

// Load product on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProductDetail);
} else {
    loadProductDetail();
}



