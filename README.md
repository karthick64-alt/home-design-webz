# 🏠 HomeDecor - Home Decor Website

A comprehensive, modern home decor e-commerce website built with HTML, CSS, and JavaScript. Features a complete shopping experience with product listings, cart functionality, user accounts, blog, gallery, and interior design services.

## ✨ Features

### 🏡 Main Modules

1. **Homepage**
   - Hero banner with image slider
   - Featured categories (Furniture, Lighting, Wall Art, Decor Items, Rugs, Planters)
   - Trending products section
   - Featured collections (Festive, Minimalist, Luxury)
   - Customer testimonials slider
   - Newsletter signup

2. **About Us**
   - Brand story and mission
   - Team section
   - Company achievements and certifications

3. **Shop / Products**
   - Category pages with filtering
   - Product listing with grid/list view
   - Advanced filters (price, category, collection)
   - Sorting options (price, popularity, rating)
   - Product detail pages with image gallery
   - Customer reviews and ratings
   - Add to cart and wishlist functionality

4. **Interior Design Services**
   - Service overview
   - Three package tiers (Basic, Premium, Luxury)
   - Booking/appointment form
   - Portfolio showcase

5. **Gallery / Portfolio**
   - High-quality interior photos
   - Category filters
   - Before/after transformation sections

6. **Blog**
   - Blog listing page
   - Blog detail pages with full content
   - Author information
   - Social sharing buttons
   - Related posts

7. **Cart & Checkout**
   - Shopping cart with quantity management
   - Coupon code support
   - Complete checkout process
   - Billing and shipping details
   - Multiple payment methods

8. **Wishlist**
   - Save products for later
   - Move items to cart
   - Easy product management

9. **User Account**
   - Login/Signup pages
   - User profile management
   - Order history
   - Address book
   - Wishlist integration

10. **Contact Us**
    - Contact form
    - Store location information
    - Map integration placeholder

## 🎨 Design Features

- **Modern UI/UX**: Clean, professional design with smooth animations
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Fully responsive for all devices
- **Sticky Header**: Navigation stays accessible while scrolling
- **Back-to-Top Button**: Easy navigation for long pages
- **Search Modal**: Quick product search functionality
- **Smooth Animations**: CSS transitions and hover effects

## 📁 Project Structure

```
home design/
├── index.html              # Homepage
├── about.html              # About Us page
├── shop.html               # Product listing page
├── product-detail.html     # Individual product page
├── services.html           # Interior design services
├── gallery.html            # Portfolio gallery
├── blog.html               # Blog listing
├── blog-detail.html        # Individual blog post
├── cart.html               # Shopping cart
├── checkout.html           # Checkout page
├── wishlist.html           # Wishlist page
├── login.html              # User login
├── signup.html             # User registration
├── profile.html            # User account dashboard
├── contact.html            # Contact page
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   ├── main.js             # Core functionality
│   ├── home.js             # Homepage scripts
│   ├── shop.js             # Shop page scripts
│   ├── product-detail.js   # Product detail scripts
│   ├── services.js         # Services page scripts
│   ├── gallery.js          # Gallery scripts
│   ├── blog.js             # Blog listing scripts
│   ├── blog-detail.js      # Blog detail scripts
│   ├── cart.js             # Cart functionality
│   ├── checkout.js         # Checkout scripts
│   ├── wishlist.js         # Wishlist scripts
│   ├── auth.js             # Authentication scripts
│   ├── profile.js          # Profile page scripts
│   └── contact.js          # Contact form scripts
└── README.md               # This file
```

## 🚀 Getting Started

1. **Clone or Download** the project files
2. **Open** `index.html` in a modern web browser
3. **No build process required** - it's pure HTML, CSS, and JavaScript!

## 💾 Data Storage

The website uses **localStorage** to store:
- Shopping cart items
- Wishlist items
- User accounts
- Orders
- Contact form submissions
- Newsletter subscriptions
- Service bookings

**Note**: Data is stored locally in your browser and will persist until cleared.

## 🎯 Key Functionality

### Shopping Features
- Add products to cart
- Update quantities
- Remove items
- Apply coupon codes
- Complete checkout process

### User Features
- Create account
- Login/Logout
- View order history
- Manage wishlist
- Update profile

### Interactive Features
- Image sliders
- Product filtering
- Search functionality
- Dark mode toggle
- Responsive navigation

## 🎨 Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* ... more variables */
}
```

### Products
Add or modify products in `js/main.js`:
```javascript
const products = [
    {
        id: 1,
        name: 'Product Name',
        category: 'furniture',
        price: 999,
        // ... more properties
    }
];
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and Variables
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons
- **LocalStorage API**: Data persistence

## 📝 Notes

- This is a front-end only project (no backend)
- All data is stored in browser localStorage
- Product images use placeholder gradients (replace with actual images)
- Map integration is a placeholder (add Google Maps API if needed)
- Payment processing is simulated (integrate real payment gateway for production)

## 🎉 Features Highlights

✅ Fully responsive design
✅ Dark/Light mode
✅ Shopping cart with localStorage
✅ User authentication system
✅ Product filtering and sorting
✅ Image sliders and carousels
✅ Blog system
✅ Contact forms
✅ Service booking system
✅ Order management
✅ Wishlist functionality

## 📄 License

This project is open source and available for personal and commercial use.

---

**Built with ❤️ for home decor enthusiasts**



