# Image Setup Guide

## Quick Setup - Using Local Images

### Step 1: Create Images Folder
The `images` folder has been created. Place your images there.

### Step 2: Download Sample Images

You can download free interior design images from:
- **Unsplash**: https://unsplash.com/s/photos/interior-design
- **Pexels**: https://www.pexels.com/search/interior%20design/
- **Pixabay**: https://pixabay.com/images/search/interior%20design/

### Step 3: Name Your Images

Save images with these names in the `images` folder:
- `hero-1.jpg` - First hero slide (1920x1080px recommended)
- `hero-2.jpg` - Second hero slide (1920x1080px recommended)
- `hero-3.jpg` - Third hero slide (1920x1080px recommended)
- `newsletter-bg.jpg` - Newsletter background (1920x800px recommended)

### Step 4: Update Image Paths

Once you have the images, update the paths in:
1. `index.html` - Lines 57, 65, 73 (hero slider)
2. `css/style.css` - Line 690 (newsletter background)

## Current Setup (Using Placeholder Service)

Currently, the website uses **Picsum Photos** (https://picsum.photos) which provides random placeholder images. These will work immediately but are not interior design specific.

## Alternative: Use Direct Image URLs

If you have image URLs, you can directly replace them in:
- `index.html` - Hero slider background-image URLs
- `css/style.css` - Newsletter background-image URL

## Image Requirements

- **Format**: JPG, PNG, or WebP
- **Hero Images**: 1920x1080px (16:9 aspect ratio)
- **Newsletter**: 1920x800px (wide format)
- **File Size**: Keep under 500KB for fast loading
- **Optimization**: Compress images before use

## Quick Test

To test if images are loading:
1. Open browser Developer Tools (F12)
2. Go to Network tab
3. Refresh the page
4. Check if images are loading (look for 200 status)

## Troubleshooting

**Images not showing?**
- Check file paths are correct
- Ensure images are in the `images` folder
- Check browser console for errors
- Verify image file names match exactly (case-sensitive)

**Images loading slowly?**
- Compress images using TinyPNG.com
- Use WebP format for better compression
- Reduce image dimensions if too large



