// Gallery data with images based on categories
const galleryItems = [
    { 
        id: 1, 
        category: 'living-room', 
        title: 'Modern Living Room',
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    { 
        id: 2, 
        category: 'kitchen', 
        title: 'Contemporary Kitchen',
        image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    { 
        id: 3, 
        category: 'bedroom', 
        title: 'Luxury Bedroom',
        image: 'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    { 
        id: 4, 
        category: 'bathroom', 
        title: 'Spa-like Bathroom',
        image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    { 
        id: 5, 
        category: 'office', 
        title: 'Home Office',
        image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    { 
        id: 6, 
        category: 'living-room', 
        title: 'Cozy Living Space',
        image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    { 
        id: 7, 
        category: 'kitchen', 
        title: 'Modern Kitchen Design',
        image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    { 
        id: 8, 
        category: 'bedroom', 
        title: 'Master Bedroom',
        image: 'https://images.pexels.com/photos/21345931/pexels-photo-21345931.png'
    },
    { 
        id: 9, 
        category: 'bathroom', 
        title: 'Modern Bathroom',
        image: 'https://images.pexels.com/photos/1457844/pexels-photo-1457844.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    { 
        id: 10, 
        category: 'office', 
        title: 'Productive Workspace',
        image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    { 
        id: 11, 
        category: 'living-room', 
        title: 'Elegant Living Room',
        image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    { 
        id: 12, 
        category: 'kitchen', 
        title: 'Gourmet Kitchen',
        image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    }
];

let currentFilter = 'all';

// Load gallery
function loadGallery(filter = 'all') {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    const filteredItems = filter === 'all' 
        ? galleryItems 
        : galleryItems.filter(item => item.category === filter);
    
    galleryGrid.innerHTML = filteredItems.map((item) => `
        <div class="gallery-item" data-category="${item.category}">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
                <h4>${item.title}</h4>
                <i class="fas fa-search-plus"></i>
            </div>
        </div>
    `).join('');
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        loadGallery(currentFilter);
    });
});

// Initialize gallery
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => loadGallery());
} else {
    loadGallery();
}

