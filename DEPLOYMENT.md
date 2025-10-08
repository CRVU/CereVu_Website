# CereVu Website Deployment Guide

## Quick Start

To view the website locally:

```bash
cd /Users/moeinrazavi/Documents/GitHub/CereVu_Website
python3 -m http.server 8000
```

Then open your browser to: `http://localhost:8000`

## Deployment Options

### Option 1: Netlify (Recommended)

1. **Sign up** for a free account at [netlify.com](https://netlify.com)
2. **Connect your repository**:
   - Click "New site from Git"
   - Connect to GitHub
   - Select the CereVu_Website repository
3. **Configure build settings**:
   - Build command: (leave empty)
   - Publish directory: `/`
4. **Deploy**: Click "Deploy site"
5. **Custom domain**: Add `cerevu.com` in Domain settings

### Option 2: Vercel

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Import project**:
   - Click "New Project"
   - Import from GitHub
   - Select CereVu_Website
3. **Deploy**: Click "Deploy"
4. **Custom domain**: Add `cerevu.com` in Settings > Domains

### Option 3: GitHub Pages

1. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to Pages section
   - Select main branch as source
2. **Access**: Your site will be at `username.github.io/CereVu_Website`
3. **Custom domain**: Add CNAME file with `cerevu.com`

### Option 4: Traditional Web Hosting

1. **Upload files** via FTP/SFTP to your web server
2. **Required files**:
   - index.html
   - styles.css
   - script.js
   - assets/ (entire folder)
   - robots.txt
   - sitemap.xml
3. **Configure** your domain to point to the hosting server

## Pre-Deployment Checklist

### Content
- [ ] Replace placeholder SVG images with actual CereVu branding
- [ ] Add actual product photos to assets/
- [ ] Review all text content for accuracy
- [ ] Update contact information if needed

### Assets
- [ ] Create high-quality app-icon.png (512x512px)
- [ ] Create favicon.png (32x32px or 64x64px)
- [ ] Create og-image.png (1200x630px)
- [ ] Optimize all images for web

### SEO
- [ ] Update meta descriptions with final copy
- [ ] Verify all links work correctly
- [ ] Test social media sharing (Twitter, Facebook, LinkedIn)
- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt is configured correctly

### Technical
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS, Android)
- [ ] Verify all animations work smoothly
- [ ] Check page load speed
- [ ] Ensure HTTPS is enabled
- [ ] Test contact form/email links

### Analytics (Optional)
- [ ] Add Google Analytics tracking code
- [ ] Add Facebook Pixel (if needed)
- [ ] Set up conversion tracking

## Domain Configuration

### DNS Settings for cerevu.com

**For Netlify/Vercel:**
1. Add A record: `@` → `<provider-ip>`
2. Add CNAME: `www` → `<your-site>.netlify.app` or `.vercel.app`

**For Traditional Hosting:**
1. Add A record: `@` → `<your-server-ip>`
2. Add CNAME: `www` → `cerevu.com`

## SSL Certificate

Most modern hosting providers (Netlify, Vercel, GitHub Pages) provide free SSL certificates automatically.

For traditional hosting:
- Use Let's Encrypt for free SSL
- Most hosting providers offer one-click SSL installation

## Performance Optimization

Already implemented:
- ✅ Minified CSS (can be further optimized)
- ✅ Optimized images (SVG placeholders)
- ✅ Lazy loading animations
- ✅ Efficient JavaScript

Additional recommendations:
- Enable gzip compression on server
- Use CDN for static assets
- Implement caching headers
- Consider converting SVGs to PNG for better compatibility

## Monitoring

After deployment:
1. Set up uptime monitoring (e.g., UptimeRobot)
2. Monitor page load times
3. Track user analytics
4. Review error logs regularly

## Updating Content

To update the website:
1. Edit the HTML/CSS/JS files locally
2. Test changes using local server
3. Push changes to GitHub
4. Hosting provider will auto-deploy (if configured)

## Support

For technical issues:
- Check browser console for JavaScript errors
- Verify all file paths are correct
- Ensure proper file permissions on server
- Test in incognito mode to rule out caching issues

## Security

- Keep all software updated
- Use strong passwords for hosting accounts
- Enable 2FA where available
- Regularly backup website files
- Monitor for suspicious activity

---

**Ready to deploy?** Follow one of the deployment options above and use the pre-deployment checklist to ensure everything is ready!

