# Product Images Setup

## ✅ Product Images Configured

All product images have been updated with real images from **Pexels** (free stock photos).

### Current Product Images:

1. **Modern Sofa Set** (ID: 1)
   - Category: Furniture
   - Image: Modern living room sofa
   - URL: Pexels interior design photo

2. **Crystal Chandelier** (ID: 2)
   - Category: Lighting
   - Image: Luxury chandelier/lighting
   - URL: Pexels lighting photo

3. **Abstract Wall Art** (ID: 3)
   - Category: Wall Art
   - Image: Interior wall decoration
   - URL: Pexels wall art photo

4. **Decorative Vase Set** (ID: 4)
   - Category: Decor Items
   - Image: Home decor accessories
   - URL: Pexels decor photo

5. **Persian Rug** (ID: 5)
   - Category: Rugs & Carpets
   - Image: Luxury rug/carpet
   - URL: Pexels rug photo

6. **Ceramic Planter** (ID: 6)
   - Category: Planters
   - Image: Plant pot/planter
   - URL: Pexels planter photo

7. **Dining Table Set** (ID: 7)
   - Category: Furniture
   - Image: Dining room furniture
   - URL: Pexels dining furniture photo

8. **Floor Lamp** (ID: 8)
   - Category: Lighting
   - Image: Modern floor lamp
   - URL: Pexels lamp photo

## Where Product Images Appear:

✅ **Homepage** - Trending Products section
✅ **Shop Page** - Product listings (grid/list view)
✅ **Product Detail Pages** - Main product image and gallery
✅ **Cart Page** - Product thumbnails
✅ **Wishlist Page** - Product cards
✅ **Checkout Page** - Order summary items

## Image Configuration:

- **File**: `js/main.js`
- **Array**: `products[]`
- **Property**: `image` (URL string)
- **Size**: 800x800px (square format, auto-cropped by Pexels)

## Using Local Product Images:

If you want to use local images instead:

1. **Save images** in the `images` folder:
   - `product-1.jpg` (Modern Sofa Set)
   - `product-2.jpg` (Crystal Chandelier)
   - `product-3.jpg` (Abstract Wall Art)
   - `product-4.jpg` (Decorative Vase Set)
   - `product-5.jpg` (Persian Rug)
   - `product-6.jpg` (Ceramic Planter)
   - `product-7.jpg` (Dining Table Set)
   - `product-8.jpg` (Floor Lamp)

2. **Update paths** in `js/main.js`:
   ```javascript
   image: 'images/product-1.jpg'
   ```

## Image Requirements:

- **Format**: JPG, PNG, or WebP
- **Size**: 800x800px (square) recommended
- **File Size**: Under 200KB for fast loading
- **Aspect Ratio**: 1:1 (square) works best

## Current Status:

✅ All product images are **active and working**
✅ Images load from Pexels CDN (reliable and fast)
✅ Images display on all product pages
✅ Fallback gradient shows if image fails to load

## Testing:

1. Open `index.html` in your browser
2. Scroll to "Trending Products" section
3. You should see product images displayed
4. Click on any product to see the detail page with images
5. Check the Shop page to see all products with images

## Troubleshooting:

**Images not showing?**
- Check internet connection (images load from Pexels CDN)
- Open browser console (F12) to check for errors
- Verify the image URLs in `js/main.js` are correct
- Try refreshing the page (Ctrl+F5 for hard refresh)

**Images loading slowly?**
- This is normal for first load (images are cached after)
- Consider downloading and using local images for faster loading
- Compress images before using locally

---

**Note**: Product images are automatically used throughout the website wherever products are displayed. No additional configuration needed!



