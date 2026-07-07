# 🧠 Synapsis Academy

### *The Next-Generation AI-Driven Educational Platform*

<div align="center">
  <br/>
  <img width="100%" alt="Synapsis Hero Banner" src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&h=500&fit=crop&q=80" style="border-radius: 24px;" />
  <br/><br/>

  [![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vitejs.dev)
  [![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://react.dev)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-0055FF?logo=framer&logoColor=white&style=for-the-badge)](https://www.framer.com/motion)
  [![Matter.js](https://img.shields.io/badge/Matter.js-0.20-FF6B35?style=for-the-badge)](https://brm.io/matter-js)
  [![Vercel](https://img.shields.io/badge/Vercel-Ready-000000?logo=vercel&logoColor=white&style=for-the-badge)](https://vercel.com)

  <br/>

  > A premium, fully responsive, bilingual (**English & Spanish**) landing page and interactive platform. Crafted with cutting-edge UI design patterns, custom canvas physics simulations, dynamic micro-interactions, and Vercel hosting integration.
  
  <br/>
  <strong>Developed by Felipe Londoño</strong>
</div>

---

## ✨ Features & Visual Interactions

- 🌐 **Instant Bilingual System (EN / ES)**: Toggle languages seamlessly using the pill switch in the header. The application updates all titles, paragraphs, buttons, custom marquee labels, and interactive physics shape texts live.
- 🔭 **Safari-Compatible Physics Canvas**: A customized canvas physics renderer using standard `requestAnimationFrame` and manual pixel ratio scaling to bypass `Matter.js` WebKit rendering bugs on Retina Displays.
- 🎨 **Dynamic Design Aesthetics**: Utilizing an electric color palette featuring Acid Lime, Raspberry Pink, and Lavender, coupled with custom typography using Oswald and Inter Google Fonts.
- 🎠 **Framer Motion Draggable Gallery**: A dynamic horizontal drag-to-explore showcase featuring custom jagged-edge clip-path frames and hover spring scales.
- 📈 **Animated Scroll Infographics**: Fall-down typography with heavy thud impacts and fade animations that trigger when entering the viewport.
- 💡 **Interactive Page Navigation**: Multi-view architecture supporting high-performance transitions between the Home, Platform, and Methodology views.
- ⚡ **Deploy-Ready for Vercel**: Complete single-page application router rewrites and security header policies configured.

---

## 🛠 Project Architecture

```
synapsis-academy/
├── components/
│   ├── Header.tsx              # Navigation bar + Bilingual Switch
│   ├── Hero.tsx                # Safari-safe interactive physics hero
│   ├── MenuOverlay.tsx         # Fullscreen interactive overlay navigation
│   ├── Marquee.tsx             # Dynamic text marquee
│   ├── VideoSection.tsx        # Educational promo video card
│   ├── InteractiveCarousel.tsx  # Draggable gallery with jagged cards
│   ├── NetworkInfographic.tsx   # Stat counts + falling numbers animation
│   ├── Testimonials.tsx        # Draggable parent & teacher testimonial cards
│   ├── Footer.tsx              # Interactive physics footer + quick links
│   ├── PlatformPage.tsx        # Platforms page featuring the giant physics X
│   └── MethodologyPage.tsx     # Methodology page with animated studies habits title
├── i18n/
│   ├── translations.ts         # Central EN & ES translation dictionary
│   └── LanguageContext.tsx     # i18n context provider & custom useLanguage() hook
├── vercel.json                 # Vercel deployment redirect & security settings
├── vite.config.ts              # Bundler configuration
├── App.tsx                     # React application entry node & Provider setup
└── index.html                  # HTML entry point, Tailwind CSS & Fonts CDN link
```

---

## 🌐 Dynamic Internationalization (i18n)

Synapsis Academy uses a lightweight React Context implementation to coordinate translation updates dynamically across all subpages:

```tsx
import { useLanguage } from './i18n/LanguageContext';

export const MyComponent = () => {
  const { lang, t } = useLanguage();
  return (
    <div>
      <h2>{t.hero.subtitle}</h2>
      <p>{lang === 'es' ? 'Texto en Español' : 'Text in English'}</p>
    </div>
  );
};
```

---

## 🎨 Typography & Tokens

- **Fonts**:
  - Headings: `Oswald`, Sans-serif
  - Body Copy: `Inter`, Sans-serif
  - Display Numbers: `Luckiest Guy`, Cursive

- **Colors**:
  - Lime Accent (`--color-primary-lime`): `#CCFF00`
  - Raspberry Pink (`--color-secondary-pink`): `#FF3366`
  - Electric Lavender (`--color-accent-purple`): `#C084FC`
  - Dark Deep Indigo (`--color-text-main`): `#1E1B4B`
  - Cream Background (`--color-bg-light`): `#FDFBF7`

---

## 🚀 Getting Started

### Installation

```bash
# 1. Install all standard package assets
npm install

# 2. Run the development build
npm run dev
```

### Production Build

To build the static application payload:

```bash
npm run build
```

This compiles a high-performance build to the `./dist` folder.

---

## ☁️ Deployment

Deploy the compiled dist folder to **Vercel** with a single command:

```bash
npx vercel --prod
```

The preloaded `vercel.json` provides:
- Single Page App (SPA) fallback rules.
- HTTP security headers (`X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`).
- Permanent caching configurations for output assets.

---

<div align="center">
  <br/>
  <strong>Designed and Built with 💛 by Felipe Londoño</strong>
  <br/>
  <sub>© 2026 Synapsis AI Academy. All rights reserved.</sub>
</div>
