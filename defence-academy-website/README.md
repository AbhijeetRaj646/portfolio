# Defence Academy Website

A fast, mobile-friendly static website for a Defence Academy coaching institute (NDA, CDS, AFCAT, SSB).

## Quick start

- Serve locally: `python3 -m http.server 8080` and open http://localhost:8080/defence-academy-website/
- Update your contact/social links in `assets/js/config.js`.
- Edit homepage content in `index.html` and global styles in `assets/css/styles.css`.

## Notice Board / Announcements

- Data source: `assets/data/notices.json`
- Fields per item:
  - `message` (string)
  - `date` (ISO date string YYYY-MM-DD)
  - `link` (URL or `#`)
  - `urgent` (boolean) – urgent notices show in red with a subtle blink

## Pages

- Home: `index.html`
- About: `about.html`
- Courses & Fees: `courses.html`
- Gallery: `gallery.html`
- Blog/News: `blog.html`
- Contact: `contact.html`

## SEO

- Edit `robots.txt` and `sitemap.xml` with your production domain.
- Update meta descriptions/titles on each page.

## Deployment

Host these static files on Netlify, Vercel, GitHub Pages, or any web host.