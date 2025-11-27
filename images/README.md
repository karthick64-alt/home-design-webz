# Images Folder

This folder is for storing all website images.

## Recommended Image Sizes

### Hero Slider Images
- **Size**: 1920x1080px (Full HD)
- **Format**: JPG or WebP
- **Files**: 
  - `hero-slide-1.jpg` - First hero slide
  - `hero-slide-2.jpg` - Second hero slide
  - `hero-slide-3.jpg` - Third hero slide

### Newsletter Background
- **Size**: 1920x800px
- **Format**: JPG or WebP
- **File**: `newsletter-bg.jpg`

### Product Images
- **Size**: 800x800px (Square)
- **Format**: JPG or WebP
- **Naming**: `product-{id}.jpg`

### Category Icons
- **Size**: 200x200px
- **Format**: PNG (with transparency) or SVG

## How to Add Your Images

1. Place your images in this `images` folder
2. Update the image paths in:
   - `index.html` - Hero slider images
   - `css/style.css` - Newsletter background
   - `js/main.js` - Product images

## Example Path Updates

### In index.html:
```html
<div class="slide-image" style="background-image: url('images/hero-slide-1.jpg'); ..."></div>
```

### In css/style.css:
```css
.newsletter {
    background-image: url('../images/newsletter-bg.jpg');
}
```

### In js/main.js:
```javascript
image: 'images/product-1.jpg'
```

## Free Image Resources

- **Unsplash**: https://unsplash.com (Search: "interior design", "home decor")
- **Pexels**: https://www.pexels.com (Search: "living room", "furniture")
- **Pixabay**: https://pixabay.com (Free stock photos)

## Image Optimization Tips

1. Compress images before uploading (use TinyPNG or similar)
2. Use WebP format for better compression
3. Keep file sizes under 500KB for web performance
4. Use appropriate image dimensions (don't use oversized images)



