# FarmSphere Frontend

Agricultural brand website and ordering platform for FarmSphere (PRD + POSTAL).

## Structure

- **index.html** – Homepage (template: home1)
- **about.html** – About Us (template: about-us)
- **products.html** – Product catalog (template: shop-products)
- **partnership.html** – Partnership (template: our-services)
- **contact.html** – Contact & inquiry forms (template: contact-us)
- **blog.html** – Blog / updates (template: blog-right-sidebar)
- **assets/** – CSS, JS, images, fonts, icons (from template)
- **assets/css/style.css** – FarmSphere custom styles
- **php/** – Form handlers: `send-inquiry.php`, `send-partner.php`

## Run locally

- **Static:** Open `index.html` in a browser or serve the `frontend` folder with any static server (e.g. `npx serve frontend`).
- **Forms:** Use a PHP-enabled server (e.g. `php -S localhost:8000 -t frontend`) so contact/partnership forms post to `php/send-inquiry.php` and `php/send-partner.php`.

## Brand

- **Tagline:** Cultivating Quality. Sustaining the Future.
- **Location:** Lagos, Nigeria
- **Contact:** info@farmsphere.ng, +234 800 FARMSPHERE
