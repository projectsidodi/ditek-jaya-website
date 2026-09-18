# PT. Ditek Jaya — Company Website & CMS

A modern, bilingual company website for **PT. Ditek Jaya**, a distributor of analytical and laboratory instruments in Indonesia. Built with Next.js 14, featuring a public-facing website and a full-featured admin CMS panel.

## 🔧 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Storage:** JSON file-based (no external database required)
- **Bilingual:** English / Bahasa Indonesia toggle

## 🌐 Public Pages

| Page | Route |
|------|-------|
| Home | `/` |
| About | `/about` |
| Products | `/products` |
| Product Detail | `/products/[id]` |
| Services | `/services` |
| News | `/news` |
| News Detail | `/news/[slug]` |
| Contact | `/contact` |
| Brand Detail | `/brands/[slug]` |

## 🔐 Admin CMS (`/admin`)

Full CRUD management for:
- **Brands** — 7 brand partners: Shimadzu, Belec, Semplor, YMC, NiuMag, Preekem, LabNav
- **Sub-categories** — Per-brand product categorization
- **Products** — Product listings with images and specifications
- **Services** — Service offerings
- **News** — Company news and articles
- **Branches** — Office locations
- **Messages** — Contact form submissions

### Admin Credentials

- **Username:** `admin`
- **Password:** `admin123`

## 📁 Project Structure

```
├── data/                    # JSON data files (brands, products, services, news, etc.)
├── src/
│   ├── app/                 # Next.js App Router pages & API routes
│   │   ├── about/
│   │   ├── admin/           # CMS admin panel pages
│   │   ├── api/             # API routes for CRUD operations
│   │   ├── brands/[slug]/
│   │   ├── contact/
│   │   ├── news/
│   │   ├── products/
│   │   └── services/
│   ├── components/          # Reusable UI components
│   │   ├── admin/           # Admin sidebar
│   │   ├── home/            # Homepage sections
│   │   └── layout/          # Navbar & Footer
│   ├── contexts/            # React contexts (Locale, Admin Auth)
│   ├── lib/                 # Data utilities
│   └── types/               # TypeScript type definitions
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/projectsidodi/ditek-jaya-website.git
cd ditek-jaya-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.  
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the CMS.

### Build for Production

```bash
npm run build
npm start
```

## 📋 Features

- **Responsive Design** — Mobile-first, works on all screen sizes
- **Bilingual Support** — Toggle between English and Bahasa Indonesia
- **SEO Friendly** — Server-side rendering with Next.js
- **No External DB** — All data stored in JSON files, easy to deploy anywhere
- **28 Routes** — Comprehensive page coverage
- **Clean Build** — Zero build errors, production-ready

## 📄 License

Private — PT. Ditek Jaya
