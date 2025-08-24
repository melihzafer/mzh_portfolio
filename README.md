# Portfolio - Melih Zafer Hyusein

A modern, production-ready personal portfolio built with Next.js 15, featuring advanced animations, accessibility, and exceptional user experience.

## ✨ Features

### 🎨 Signature UX
- **Hero Typewriter Effect**: Cycles through roles with optional glitch animation
- **Magnetic CTAs**: Buttons follow cursor with smooth spring animations  
- **3D Tilt Cards**: Project cards with perspective transforms (desktop only)
- **Code Editor About**: VS Code-inspired layout with tabs and line numbers
- **Animated Skill Bars**: Progress animations triggered by scroll intersection
- **Command Palette**: ⌘K navigation for quick access to pages and actions

### 🚀 Performance & Accessibility
- **Core Web Vitals**: LCP <1.5s, CLS <0.1, optimized bundle size
- **Reduced Motion**: Respects `prefers-reduced-motion` with graceful fallbacks
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Readers**: Semantic HTML and proper ARIA labels
- **Mobile Optimized**: Touch-friendly interactions and responsive design

### 🛠 Technical Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4 + SCSS modules
- **Animation**: Framer Motion 12
- **UI Kit**: Custom shadcn/ui components
- **Icons**: Lucide React
- **Content**: MDX for case studies
- **Form Handling**: React Hook Form + Zod validation

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 20+ 
- npm/pnpm/yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:3000 (or the port shown in your terminal) to view your portfolio.

### Environment

Copy `.env.example` to `.env.local` and fill in values:

- GH_USER: your GitHub username (for Works auto-sync)
- GITHUB_TOKEN: optional token to raise GitHub API rate limits
- REVALIDATE_SECRET: secret to call the revalidation endpoint

Revalidate cached works after changing topics/releases:

```
GET /api/revalidate?secret=YOUR_SECRET
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # Code editor about page
│   ├── works/             # Filterable project grid
│   └── contact/           # Contact form
├── components/
│   ├── atoms/             # Button, SkillBar, TiltCard, etc.
│   ├── molecules/         # WorkCard, TypewriterEffect, etc.
│   ├── organisms/         # Header, Footer
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── projects.ts        # Project data and utilities
│   └── utils.ts           # Helper functions
└── styles/
    ├── globals.scss       # Global styles and animations
    └── tokens.scss        # Design system tokens
```

## 🎯 Key Components

### TypewriterEffect
```tsx
<TypewriterEffect
  phrases={["Full-Stack Dev", "React Expert", "Design-Driven"]}
  enableGlitch={true}
  className="text-4xl font-bold"
/>
```

### Button with Magnetic Effect
```tsx
<Button variant="magnetic" size="lg">
  Get In Touch
</Button>
```

### Command Palette
Press `⌘K` (Mac) or `Ctrl+K` (Windows/Linux) to open the command palette for quick navigation.

## 🎨 Design System

### Color Tokens
```scss
:root {
  --bg: #0A0F0F;           // Primary background
  --surface: #121A1A;      // Card/elevated surfaces  
  --text: #E8F2F2;         // Primary text
  --accent: #0f8555;       // Brand accent (customizable)
  --border: #1F2929;       // Subtle borders
}
```

### Typography
- **Display**: Inter (headings, 600-900 weights)
- **Body**: Inter (UI text, 400-600 weights)  
- **Code**: JetBrains Mono (400-700 weights)

### Spacing Scale
Based on 4px grid: `4px, 8px, 12px, 16px, 24px, 32px, 48px`

## 🧪 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🚀 Deployment

### Vercel (Recommended)
The portfolio is optimized for Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### GitHub webhook (auto-revalidate on releases)

To automatically refresh portfolio data when you publish a GitHub release, configure a webhook for your GitHub repo that targets the deployed endpoint:

- URL: https://<YOUR_SITE_DOMAIN>/api/github/webhook
- Content type: application/json
- Secret: set to the same value as `GITHUB_WEBHOOK_SECRET` in your deployment environment
- Events: choose the "Release" event (or select "Let me select individual events" and enable `release`)

After deploying the site and setting `GITHUB_WEBHOOK_SECRET` in your deployment platform (Netlify/Vercel), create or re-publish a release to test. The webhook handler verifies the signature and calls Next's `revalidateTag('github')` to refresh cached repo data.


## 📊 Performance Budget

- **JavaScript Bundle**: ≤220kB gzipped
- **Largest Contentful Paint**: <1.5s
- **Cumulative Layout Shift**: <0.1
- **First Input Delay**: <100ms

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ by [Melih Zafer Hyusein](https://github.com/mzh)**
