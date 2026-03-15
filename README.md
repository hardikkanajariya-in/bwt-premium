# 💧 BANCO Water Tank — Premium Website

**BANCO** by **Neomech (T) Ltd.** — Tanzania's leading manufacturer of **FRP Panel Type Water Tanks** since 1965. Designed for Safety. Built to Last.

A premium, fully static single-page website showcasing BANCO's modular, corrosion-free, UV-stabilized FRP water storage solutions.

🔗 [Live Demo](https://banco-watertank.com)

---

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-E83FB8?logo=framer&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r168-000000?logo=three.js)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)

---

## Features

### 10 Sections

| # | Section | Highlights |
|---|---------|------------|
| 1 | **Hero** | 3D particle field & wireframe globe (Three.js), per-letter reveal animation |
| 2 | **Who We Are** | Animated count-up stats, conic gradient background, wipe-reveal heading |
| 3 | **Product Overview** | GSAP ScrollTrigger pinned section, SVG tank diagram with assembly labels |
| 4 | **Key Benefits** | Scroll-linked water-fill SVG tank, 12 animated benefit cards |
| 5 | **Applications** | GSAP horizontal scroll carousel (desktop), vertical card grid (mobile) |
| 6 | **Panel Design** | Interactive SVG exploded view with 10 tank parts, hover tooltips |
| 7 | **Technical Specs** | Animated progress bars, spec badges, slide-in rows |
| 8 | **FRP Advantages** | Side-by-side battle cards — FRP vs Traditional, animated checkmarks/crosses |
| 9 | **Assembly** | GSAP-driven 4-phase build sequence with animated SVG tank construction |
| 10 | **Contact** | EmailJS form, floating labels, Google Maps embed, wave background |

### Creative Elements

- **Custom cursor** — dot + ring with hover states (pointer, text) on desktop
- **Magnetic buttons** — spring-physics hover effect on all CTAs
- **Dark/Light theme** — View Transitions API ripple toggle, full CSS variable system
- **LazyMotion** — tree-shaken Framer Motion (`domAnimation`) for smaller bundles
- **Three.js on-demand rendering** — `frameloop="demand"` with `invalidate()` for zero idle GPU usage
- **Mobile-first** — GSAP sections gracefully degrade, all tap targets ≥ 44px, SSR-safe `matchMedia`
- **Accessibility** — `prefers-reduced-motion` respected, skip-to-content link, ARIA live regions
- **WhatsApp floating button** — pulse rings, tooltip, delayed entrance
- **Footer watermark** — click-to-ripple BANCO text

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build (static export)
npm run build
```

The static output is generated in the `out/` directory.

---

## EmailJS Setup

The contact form uses [EmailJS](https://www.emailjs.com/) to send emails directly from the browser.

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Create an **Email Service** (e.g. Gmail, Outlook) and note the **Service ID**
3. Create an **Email Template** with variables: `{{name}}`, `{{email}}`, `{{phone}}`, `{{message}}`
4. Copy your **Public Key** from Account → API Keys
5. Add the values to `.env.local` (see below)

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## Deployment

This project uses `output: "export"` for fully static HTML — no server required.

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Vercel auto-detects Next.js and handles static export. Add environment variables in **Project Settings → Environment Variables**.

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build & deploy
npm run build
netlify deploy --prod --dir=out
```

Or connect your Git repo and set:
- **Build command:** `npm run build`
- **Publish directory:** `out`

Add environment variables in **Site Settings → Environment Variables**.

---

## Project Structure

```
premium/
├── app/
│   ├── globals.css          # CSS variables, animations, theme styles
│   ├── layout.tsx           # Root layout, metadata, ThemeProvider, LazyMotion
│   ├── page.tsx             # Home page composing all sections
│   └── sitemap.ts           # Static sitemap generation
├── components/
│   ├── Navbar.tsx            # Frosted glass navbar, scroll hide/show, mobile overlay
│   ├── Hero.tsx              # Hero section with letter animation, CTAs
│   ├── HeroParticles.tsx     # Three.js Canvas — floating particles + wireframe globe
│   ├── WhoWeAre.tsx          # Company story, count-up stats
│   ├── ProductOverview.tsx   # GSAP pinned tank diagram section
│   ├── KeyBenefits.tsx       # 12 benefit cards with water-fill SVG
│   ├── Applications.tsx      # Horizontal scroll carousel / mobile grid
│   ├── PanelDesign.tsx       # Interactive SVG exploded tank view
│   ├── TechnicalSpecs.tsx    # Spec table with animated bars
│   ├── FRPAdvantages.tsx     # FRP vs Traditional comparison cards
│   ├── FeaturesAssembly.tsx  # 4-phase assembly animation
│   ├── ContactUs.tsx         # EmailJS contact form + Google Maps
│   ├── Footer.tsx            # Footer with watermark ripple
│   ├── WhatsAppButton.tsx    # Floating WhatsApp CTA
│   ├── CustomCursor.tsx      # Desktop custom cursor (dot + ring)
│   ├── MagneticButton.tsx    # Spring-physics magnetic hover button
│   ├── ThemeToggle.tsx       # Dark/light toggle with View Transitions
│   └── Providers.tsx         # Client-side LazyMotion + CustomCursor wrapper
├── lib/
│   ├── animations.ts         # Framer Motion variant presets
│   └── constants.ts          # Nav links, stats, benefits, specs, contacts
├── next.config.ts            # Next.js config (static export)
├── tailwind.config.ts        # Tailwind v4 theme extensions
├── three-jsx.d.ts            # R3F + React 19 JSX type bridge
├── tsconfig.json
└── package.json
```

---

## License

All rights reserved. This project is proprietary to Neomech (T) Ltd.

---

<sub>Developed by **Hardik Kanajariya** for **Nifty Solutions**</sub>
