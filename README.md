# 🌟 Eyelitz Haute Optique — Full-Stack Web Application & Admin Panel

A full-stack, animated optical retail website and comprehensive Admin Management Panel built with **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**, **Node.js/Express**, and **MongoDB (Mongoose)**.

---

## 🎨 Aesthetic & Design Philosophy
- **Color Palette**: Luxury Gold (`#D4AF37`, `#FFD700`, `#B8860B`) and Deep Obsidian Black / Dark Charcoal (`#0B0B0B`, `#121212`, `#181818`) with crisp typography (`Cinzel` & `Plus Jakarta Sans`).
- **Feel**: Ultra-premium, bespoke craftsmanship, trustworthy clinical optics.
- **Micro-Interactions**: Fluid scroll-triggered entrance animations, zoom card hover states, glassmorphism panels, and slide-in shopping bag.

---

## 📁 Project Architecture & Repositories

```text
├── backend/                  # Node.js / Express REST API Server
│   ├── config/               # Database connection (MongoDB + Smart Memory Cache)
│   ├── data/                 # Rich Seed Data (Products, Appointments, Offers, Reviews, Blogs)
│   ├── models/               # Mongoose Schemas (Product, Appointment, Offer, Review, Blog, Admin)
│   ├── middleware/           # JWT Protection Middleware
│   ├── routes/               # Modular Express Route Handlers
│   ├── services/             # Smart In-Memory Datastore Fallback Layer
│   ├── seed.js               # Standalone Database Seeder Script
│   └── server.js             # Express Server Entrypoint (Port 5000)
│
└── frontend/                 # Next.js 14 (App Router) Client Application
    ├── src/
    │   ├── app/
    │   │   ├── page.jsx                    # Homepage (Hero, Categories, Slider, Face Guide)
    │   │   ├── shop/page.jsx               # Shop & Collection (Filters, Search, QuickView)
    │   │   ├── product/[id]/page.jsx       # Product Detail (Specs, Lens Package, WhatsApp)
    │   │   ├── book-appointment/page.jsx   # 3-Step Free Eye Exam Booking Wizard
    │   │   ├── services/page.jsx           # Lens Technologies & Clinical Services
    │   │   ├── about/page.jsx              # Heritage, Founder Story & Timeline
    │   │   ├── contact/page.jsx            # Store Locator, Satellite Maps & Contact Form
    │   │   ├── reviews/page.jsx            # Lookbook, Reviews & Submission Modal
    │   │   ├── blog/page.jsx               # Eye Care & Styling Journal
    │   │   ├── blog/[slug]/page.jsx        # Single Publication Page
    │   │   ├── offers/page.jsx             # Seasonal Privileges & Coupon Codes
    │   │   └── admin/                      # Complete Admin Management Portal
    │   │       ├── login/page.jsx          # Admin Authentication Portal
    │   │       ├── page.jsx                # Metrics Overview & Recent Bookings
    │   │       ├── appointments/page.jsx   # Booking Filter, Confirm, Cancel, Delete
    │   │       ├── products/page.jsx       # Modal-driven Add/Edit/Delete/Featured
    │   │       ├── offers/page.jsx         # Live Ticker & Coupon Management
    │   │       ├── reviews/page.jsx        # Testimonial Moderation
    │   │       └── blogs/page.jsx          # Article Creation & Publishing
    │   ├── components/                     # Reusable UI & Animations
    │   ├── context/                        # CartContext with WhatsApp Checkout
    │   └── lib/api.js                      # Centralized Backend API Client
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v18+ or v20+
- **MongoDB** running locally (or MongoDB Atlas URI in `.env`). *Note: The backend features an automatic smart memory fallback to ensure 100% operational uptime if MongoDB is offline.*

### 2. Backend API Setup
```bash
cd backend
npm install
npm run seed      # Populates MongoDB with luxury frames, offers, blogs & admin
npm start         # Starts API on http://localhost:5000
```

### 3. Frontend Application Setup
```bash
cd ../frontend
npm install
npm run build     # Compiles production build
npm start         # Starts Next.js on http://localhost:3000
```
*(Or use `npm run dev` for local hot-reloading)*

---

## 🔐 Administrative Access Credentials

- **Portal URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Username**: `admin`
- **Password**: `admin123`

---

## ✨ Key Features Implemented

1. **Cinematic Hero**:
   - Autoplaying cinematic background optical craft loop with layered gold-vignette dark overlay (`bg-black/75`).
   - Floating glassmorphic trust badges: "20-Point Digital Scan", "Pure Japanese Titanium", "1-Year Warranty".

2. **Interactive Face-Shape Frame Guide**:
   - Visual selector for Oval, Round, Square, Heart, and Diamond facial silhouettes.
   - Recommends optical proportions and links directly to filtered collections.

3. **Multi-Step Free Eye Exam Booking**:
   - Step 1: Service (In-Store, Doorstep Home Visit, Prescription Check, Contact Lens Consultation).
   - Step 2: Date & time slot picker.
   - Step 3: Guest details with instant reference code generation (`EY-XXXXXX`) and WhatsApp confirmation.

4. **Prescription Lens Customizer & WhatsApp Checkout**:
   - Add-on lens selection (Zeiss Blue-Cut Digital Shield, Transitions Gen S, Freeform Progressive).
   - Generates formatted WhatsApp order templates with item breakdown and direct boutique concierge links.

5. **Full Admin Control Panel**:
   - Real-time dashboard metrics (Total Appointments, Pending Bookings, Total Products, Active Offers).
   - Appointments table with one-click status transitions (`Pending` ➔ `Confirmed` ➔ `Completed` / `Cancelled`).
   - Modal-driven CRUD interface for Products, Promotional Offers, Reviews, and Blogs.
"# optical-website" 
