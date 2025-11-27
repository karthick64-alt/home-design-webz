// Load wishlist
function loadWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistContainer = document.getElementById('wishlistItems');
    
    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                <i class="far fa-heart" style="font-size: 4rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                <h2>Your wishlist is empty</h2>
                <p>Start adding products to your wishlist</p>
                <a href="shop.html" class="btn btn-primary" style="margin-top: 1rem;">Continue Shopping</a>
            </div>
        `;
        return;
    }
    
    wishlistContainer.innerHTML = wishlist.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.name}">
                <div class="product-actions">
                    <button onclick="removeFromWishlist(${product.id})" title="Remove from Wishlist" style="color: var(--primary-color);">
                        <i class="fas fa-heart"></i>
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
                <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;" onclick="moveToCart(${product.id})">
                    Move to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function removeFromWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    loadWishlist();
    showNotification('Product removed from wishlist');
}

function moveToCart(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const product = wishlist.find(item => item.id === productId);
    
    if (product) {
        addToCart(product);
        removeFromWishlist(productId);
        showNotification('Product moved to cart!');
    }
}

// Load wishlist on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWishlist);
} else {
    loadWishlist();
}



