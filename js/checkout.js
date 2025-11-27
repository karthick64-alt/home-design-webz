// Load checkout items and summary
function loadCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    const cartWithDetails = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        return { ...item, ...product };
    });
    
    // Load items
    const checkoutItems = document.getElementById('checkoutItems');
    checkoutItems.innerHTML = cartWithDetails.map(item => `
        <div class="checkout-item">
            <div class="checkout-item-image">
                ${item.image ? 
                    `<img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop'; this.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)';">` :
                    `<div class="checkout-placeholder" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>`
                }
            </div>
            <div class="checkout-item-details">
                <div class="checkout-item-title">${item.name}</div>
                <div class="checkout-item-price">Qty: ${item.quantity} × $${item.price}</div>
            </div>
        </div>
    `).join('');
    
    // Calculate totals
    const subtotal = cartWithDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 15;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutShipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
}

// Same as billing toggle
document.getElementById('sameAsBilling').addEventListener('change', (e) => {
    const shippingDetails = document.getElementById('shippingDetails');
    shippingDetails.style.display = e.target.checked ? 'none' : 'block';
});

// Payment method toggle
document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const cardDetails = document.getElementById('cardDetails');
        cardDetails.style.display = e.target.value === 'card' ? 'block' : 'none';
    });
});

// Format card number
document.querySelector('input[name="cardNumber"]')?.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
});

// Format expiry date
document.querySelector('input[name="expiry"]')?.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
});

// Handle form submission
const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(checkoutForm);
        const order = {
            id: Date.now(),
            items: JSON.parse(localStorage.getItem('cart')) || [],
            billing: {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                city: formData.get('city'),
                state: formData.get('state'),
                zip: formData.get('zip')
            },
            shipping: document.getElementById('sameAsBilling').checked ? null : {
                address: formData.get('shippingAddress'),
                city: formData.get('shippingCity'),
                state: formData.get('shippingState'),
                zip: formData.get('shippingZip')
            },
            paymentMethod: formData.get('paymentMethod'),
            date: new Date().toISOString(),
            status: 'pending'
        };
        
        // Save order
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Clear cart
        localStorage.removeItem('cart');
        updateCartCount();
        
        // Redirect to success page or show success message
        showNotification('Order placed successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 2000);
    });
}

// Load checkout on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCheckout);
} else {
    loadCheckout();
}



