// Get blog post ID from URL
const urlParams = new URLSearchParams(window.location.search);
const postId = parseInt(urlParams.get('id'));

// Blog posts data (same as blog.js)
const blogPosts = [
    {
        id: 1,
        title: '10 Home Decor Tips for Small Spaces',
        category: 'Tips',
        excerpt: 'Discover how to make the most of your small living space with these expert tips and tricks.',
        date: '2024-01-15',
        author: 'Sarah Mitchell',
        image: 'https://images.pexels.com/photos/1457845/pexels-photo-1457845.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
        content: `
            <p>Living in a small space doesn't mean you have to sacrifice style or functionality. With the right design strategies, you can create a home that feels spacious, organized, and beautiful. Here are 10 expert tips to help you maximize your small space:</p>
            
            <h2>1. Use Multi-Functional Furniture</h2>
            <p>Invest in furniture that serves multiple purposes. A sofa bed, storage ottoman, or a coffee table with hidden storage can help you make the most of every square inch.</p>
            
            <h2>2. Maximize Vertical Space</h2>
            <p>Don't forget about your walls! Install floating shelves, wall-mounted storage, and tall bookcases to take advantage of vertical space.</p>
            
            <h2>3. Choose Light Colors</h2>
            <p>Light colors make spaces feel larger and more open. Opt for light walls, furniture, and accessories to create an airy atmosphere.</p>
            
            <h2>4. Use Mirrors Strategically</h2>
            <p>Mirrors reflect light and create the illusion of more space. Place them opposite windows or in narrow hallways to maximize their effect.</p>
            
            <h2>5. Keep It Minimal</h2>
            <p>Less is more in small spaces. Choose a few statement pieces rather than cluttering your space with too many items.</p>
            
            <h2>6. Opt for Furniture with Legs</h2>
            <p>Furniture with exposed legs creates a sense of openness and makes the room feel less cramped.</p>
            
            <h2>7. Use Curtains Strategically</h2>
            <p>Hang curtains high and wide to make windows appear larger and ceilings taller.</p>
            
            <h2>8. Create Zones</h2>
            <p>Define different areas in your space using rugs, lighting, or furniture arrangement to create distinct zones.</p>
            
            <h2>9. Declutter Regularly</h2>
            <p>Keep your space organized by regularly decluttering and finding homes for everything.</p>
            
            <h2>10. Think Big, Not Small</h2>
            <p>Contrary to popular belief, one large piece of furniture can work better than several small pieces in a small space.</p>
        `
    },
    {
        id: 2,
        title: 'DIY Wall Art Ideas on a Budget',
        category: 'DIY',
        excerpt: 'Create stunning wall art without breaking the bank with these creative DIY projects.',
        date: '2024-01-10',
        author: 'James Davis',
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
        content: '<p>Content for DIY Wall Art post...</p>'
    },
    {
        id: 3,
        title: 'Seasonal Decorating: Spring Refresh',
        category: 'Seasonal',
        excerpt: 'Welcome spring into your home with fresh colors, textures, and seasonal accents.',
        date: '2024-01-05',
        author: 'Emily Wilson',
        image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
        content: '<p>Content for Spring Refresh post...</p>'
    },
    {
        id: 4,
        title: 'Minimalist Design: Less is More',
        category: 'Styling',
        excerpt: 'Learn the principles of minimalist design and how to create a serene, clutter-free home.',
        date: '2023-12-28',
        author: 'Sarah Mitchell',
        image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
        content: '<p>Content for Minimalist Design post...</p>'
    },
    {
        id: 5,
        title: 'Lighting Design: Illuminate Your Space',
        category: 'Tips',
        excerpt: 'Master the art of lighting design to create ambiance and enhance your home\'s atmosphere.',
        date: '2023-12-20',
        author: 'James Davis',
        image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
        content: '<p>Content for Lighting Design post...</p>'
    },
    {
        id: 6,
        title: 'Color Psychology in Home Design',
        category: 'Styling',
        excerpt: 'Understand how colors affect mood and use color psychology to create the perfect atmosphere.',
        date: '2023-12-15',
        author: 'Emily Wilson',
        image: 'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
        content: '<p>Content for Color Psychology post...</p>'
    }
];

// Load blog detail
function loadBlogDetail() {
    if (!postId) {
        document.getElementById('blogDetailContent').innerHTML = '<h2>Post not found</h2>';
        return;
    }
    
    const post = blogPosts.find(p => p.id === postId);
    
    if (!post) {
        document.getElementById('blogDetailContent').innerHTML = '<h2>Post not found</h2>';
        return;
    }
    
    const authorInitials = post.author.split(' ').map(n => n[0]).join('');
    
    document.getElementById('blogDetailContent').innerHTML = `
        <article class="blog-detail">
            <div class="blog-detail-header">
                <span class="blog-detail-category">${post.category}</span>
                <h1 class="blog-detail-title">${post.title}</h1>
                <div class="blog-detail-meta">
                    <span><i class="far fa-calendar"></i> ${formatDate(post.date)}</span>
                    <span><i class="far fa-user"></i> ${post.author}</span>
                    <span><i class="far fa-clock"></i> 5 min read</span>
                </div>
            </div>
            <div class="blog-detail-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
            </div>
            <div class="blog-detail-content">
                ${post.content || '<p>' + post.excerpt + '</p>'}
            </div>
            <div class="blog-share">
                <span>Share this post:</span>
                <div class="share-buttons">
                    <a href="#" class="share-btn" title="Share on Facebook"><i class="fab fa-facebook"></i></a>
                    <a href="#" class="share-btn" title="Share on Twitter"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="share-btn" title="Share on Pinterest"><i class="fab fa-pinterest"></i></a>
                    <a href="#" class="share-btn" title="Copy link"><i class="fas fa-link"></i></a>
                </div>
            </div>
            <div class="author-box">
                <div class="author-avatar-large">${authorInitials}</div>
                <div class="author-info">
                    <h3>${post.author}</h3>
                    <p>Interior design expert with over 10 years of experience. Passionate about creating beautiful, functional spaces that reflect personal style.</p>
                </div>
            </div>
        </article>
    `;
    
    // Load related posts
    loadRelatedPosts();
}

function loadRelatedPosts() {
    if (!postId) return;
    
    const currentPost = blogPosts.find(p => p.id === postId);
    const related = blogPosts
        .filter(p => p.id !== postId && p.category === currentPost.category)
        .slice(0, 3);
    
    const relatedContainer = document.getElementById('relatedPosts');
    if (!relatedContainer) return;
    
    if (related.length === 0) {
        relatedContainer.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No related posts found</p>';
        return;
    }
    
    relatedContainer.innerHTML = related.map(post => `
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

// Load post on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBlogDetail);
} else {
    loadBlogDetail();
}

