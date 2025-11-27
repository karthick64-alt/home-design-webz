// Load cart items
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your cart is empty</h2>
                <p>Start shopping to add items to your cart</p>
                <a href="shop.html" class="btn btn-primary" style="margin-top: 1rem;">Continue Shopping</a>
            </div>
        `;
        updateSummary(0, 0);
        return;
    }
    
    // Get product details for cart items
    const cartWithDetails = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        return { ...item, ...product };
    });
    
    cartItemsContainer.innerHTML = cartWithDetails.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                ${item.image ? 
                    `<img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop'; this.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)';">` :
                    `<div class="cart-placeholder" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>`
                }
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.name}</h3>
                <div class="cart-item-price">$${item.price}</div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})" title="Remove item">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    updateSummary(cartWithDetails);
}

function updateQuantity(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        item.quantity = parseInt(newQuantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
        updateCartCount();
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
    showNotification('Item removed from cart');
}

function updateSummary(cartItems) {
    if (cartItems === 0 || (Array.isArray(cartItems) && cartItems.length === 0)) {
        document.getElementById('subtotal').textContent = '$0.00';
        document.getElementById('shipping').textContent = '$0.00';
        document.getElementById('tax').textContent = '$0.00';
        document.getElementById('total').textContent = '$0.00';
        return;
    }
    
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 15) : 0;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function applyCoupon() {
    const couponCode = document.getElementById('couponCode').value.toUpperCase();
    const validCoupons = {
        'SAVE10': 0.1,
        'WELCOME20': 0.2,
        'FREESHIP': 0
    };
    
    if (validCoupons[couponCode]) {
        showNotification('Coupon applied successfully!');
        // In a real app, you would apply the discount here
    } else {
        showNotification('Invalid coupon code', 'error');
    }
}

// Load cart on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCart);
} else {
    loadCart();
}



