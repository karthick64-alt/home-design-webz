// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: '10 Home Decor Tips for Small Spaces',
        category: 'Tips',
        excerpt: 'Discover how to make the most of your small living space with these expert tips and tricks.',
        date: '2024-01-15',
        author: 'Sarah Mitchell',
        image: 'https://images.pexels.com/photos/1457845/pexels-photo-1457845.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop'
    },
    {
        id: 2,
        title: 'DIY Wall Art Ideas on a Budget',
        category: 'DIY',
        excerpt: 'Create stunning wall art without breaking the bank with these creative DIY projects.',
        date: '2024-01-10',
        author: 'James Davis',
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop'
    },
    {
        id: 3,
        title: 'Seasonal Decorating: Spring Refresh',
        category: 'Seasonal',
        excerpt: 'Welcome spring into your home with fresh colors, textures, and seasonal accents.',
        date: '2024-01-05',
        author: 'Emily Wilson',
        image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop'
    },
    {
        id: 4,
        title: 'Minimalist Design: Less is More',
        category: 'Styling',
        excerpt: 'Learn the principles of minimalist design and how to create a serene, clutter-free home.',
        date: '2023-12-28',
        author: 'Sarah Mitchell',
        image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop'
    },
    {
        id: 5,
        title: 'Lighting Design: Illuminate Your Space',
        category: 'Tips',
        excerpt: 'Master the art of lighting design to create ambiance and enhance your home\'s atmosphere.',
        date: '2023-12-20',
        author: 'James Davis',
        image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop'
    },
    {
        id: 6,
        title: 'Color Psychology in Home Design',
        category: 'Styling',
        excerpt: 'Understand how colors affect mood and use color psychology to create the perfect atmosphere.',
        date: '2023-12-15',
        author: 'Emily Wilson',
        image: 'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop'
    }
];

// Load blog posts
function loadBlogPosts() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;
    
    blogGrid.innerHTML = blogPosts.map(post => `
        <article class="blog-card">
            <div class="blog-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
                <span class="blog-category">${post.category}</span>
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span><i class="far fa-calendar"></i> ${formatDate(post.date)}</span>
                    <span><i class="far fa-user"></i> ${post.author}</span>
                </div>
                <h2 class="blog-title">
                    <a href="blog-detail.html?id=${post.id}">${post.title}</a>
                </h2>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="blog-detail.html?id=${post.id}" class="blog-read-more">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Initialize blog
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBlogPosts);
} else {
    loadBlogPosts();
}

