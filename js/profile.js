// Check if user is logged in
if (!isLoggedIn()) {
    window.location.href = 'login.html';
}

// Load profile
function loadProfile() {
    const user = getCurrentUser();
    if (!user) return;
    
    document.getElementById('profileInfo').innerHTML = `
        <div class="form-group">
            <label>First Name</label>
            <input type="text" value="${user.firstName}" readonly>
        </div>
        <div class="form-group">
            <label>Last Name</label>
            <input type="text" value="${user.lastName}" readonly>
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" value="${user.email}" readonly>
        </div>
    `;
}

// Load orders
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersList = document.getElementById('ordersList');
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p>No orders found</p>';
        return;
    }
    
    ordersList.innerHTML = orders.map(order => {
        const total = order.items.reduce((sum, item) => {
            const product = products.find(p => p.id === item.id);
            return sum + (product ? product.price * item.quantity : 0);
        }, 0);
        
        return `
            <div class="order-card">
                <div class="order-header">
                    <div>
                        <h3>Order #${order.id}</h3>
                        <p style="color: var(--text-light);">${new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <span class="order-status" style="padding: 0.5rem 1rem; background: var(--primary-color); color: white; border-radius: 20px; font-size: 0.9rem;">${order.status}</span>
                </div>
                <div class="order-items">
                    ${order.items.map(item => {
                        const product = products.find(p => p.id === item.id);
                        return product ? `<p>${product.name} × ${item.quantity}</p>` : '';
                    }).join('')}
                </div>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                    <strong>Total: $${total.toFixed(2)}</strong>
                </div>
            </div>
        `;
    }).join('');
}

// Load addresses
function loadAddresses() {
    const addressesList = document.getElementById('addressesList');
    addressesList.innerHTML = '<p>No saved addresses</p>';
}

// Load wishlist
function loadWishlistProfile() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistList = document.getElementById('wishlistList');
    
    if (wishlist.length === 0) {
        wishlistList.innerHTML = '<p>Your wishlist is empty</p>';
        return;
    }
    
    wishlistList.innerHTML = wishlist.map(product => `
        <div style="display: flex; gap: 1rem; padding: 1rem; border: 1px solid var(--border-color); border-radius: 5px; margin-bottom: 1rem;">
            <div style="width: 100px; height: 100px; border-radius: 5px; background: ${product.image || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};"></div>
            <div style="flex: 1;">
                <h4>${product.name}</h4>
                <p style="color: var(--primary-color); font-weight: bold;">$${product.price}</p>
                <a href="product-detail.html?id=${product.id}" class="btn btn-primary" style="margin-top: 0.5rem;">View Product</a>
            </div>
        </div>
    `).join('');
}

// Tab switching
document.querySelectorAll('.profile-menu-item[data-tab]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = item.dataset.tab;
        
        // Update active menu item
        document.querySelectorAll('.profile-menu-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        // Update active tab
        document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
        document.getElementById(tab + 'Tab').classList.add('active');
        
        // Load tab content
        switch(tab) {
            case 'profile':
                loadProfile();
                break;
            case 'orders':
                loadOrders();
                break;
            case 'addresses':
                loadAddresses();
                break;
            case 'wishlist':
                loadWishlistProfile();
                break;
        }
    });
});

// Initialize
loadProfile();
loadOrders();



