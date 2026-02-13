
# POSTAL.md

## Personal Operational & Technical Action Log

### Project: FarmSphere Website

---

## 1. Purpose of This Document

This document explains **how to build the FarmSphere website step-by-step**, translating the PRD into practical development tasks. It is intended for developers and technical collaborators.

---

## 2. Development Approach

* Marketing-focused agricultural brand website
* No payments or user accounts
* Inquiry-based ordering system
* Simple PHP backend for email handling
* Scalable structure for future upgrades

---

## 3. Project Setup

### Folder Structure

```
farmsphere/
│
├── index.html
├── about.html
├── products.html
├── partnership.html
├── blog.html
├── contact.html
│
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│
├── php/
│   ├── send-inquiry.php
│   └── send-partner.php
│
├── PRD.md
├── POSTAL.md
└── README.md
```

---

## 4. Global Implementation Steps

### HTML

* Use semantic HTML elements
* Shared header and footer across pages
* SEO-friendly meta tags

### CSS

* Green, brown, and white color palette
* Mobile-first layout
* Flexbox and grid-based sections
* Consistent typography and spacing

---

## 5. Page-by-Page Build Guide

### Homepage

* Build hero section with CTA buttons
* Add overview and why-choose-us sections
* Display featured product categories
* Add testimonials section

### About Page

* Write brand story
* Highlight mission, vision, and values

### Products Page

* Create product cards by category
* Add CTA buttons linking to contact page

### Partnership Page

* Explain partnership opportunities
* Add partnership inquiry form

### Blog Page

* Static blog posts
* Clean reading layout

### Contact Page

* Display contact info
* Build inquiry forms
* Add embedded map

---

## 6. JavaScript Responsibilities

* Mobile navigation toggle
* Basic form validation
* UI interactions

---

## 7. PHP Form Handling

### send-inquiry.php

* Collect POST data
* Sanitize inputs
* Send email to FarmSphere business email
* Return success or error response

---

## 8. Testing & Deployment

* Test responsiveness on all devices
* Test all forms and email delivery
* Deploy on PHP-enabled hosting
* Enable SSL

---

## 9. Phase 2 Considerations

* Online payments
* Subscription systems
* Inventory dashboards
* Partner portals

---

## 10. Final Notes

This POSTAL serves as a reusable development guide for agricultural, food supply, and agribusiness platforms.
