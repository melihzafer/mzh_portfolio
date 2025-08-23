# Portfolio AI Master Prompt

**Role**: You are a Senior UI/UX + Frontend Engineer. Build a production-ready personal portfolio for a full-stack dev/designer (web, mobile, AI).

**Stack**: Next.js 14+ (App Router) + TypeScript + TailwindCSS + Framer Motion + Shadcn UI + Lucide icons.

**Running server on**: http://localhost:3000


**Running on server constraints**: Optimize for low latency and high concurrency. Use edge functions where possible.

**Brand**: Dark-first, clean, confident. Primary accent: `#0f8555` (replace with hex). Fonts: Inter (UI) + JetBrains Mono (code). Spacing scale: 4/8/12/16/24/32/48. Max text width: 75ch.

## Design Tokens (Copy-Paste Ready)

```scss
// /src/styles/tokens.scss
:root {
  --bg: #0A0F0F;
  --surface: #121A1A; 
  --text: #E8F2F2;
  --accent: #0f8555; /* PRIMARY BRAND COLOR */
  --border: #1F2929;
}
```

```ts
// tailwind.config.ts theme.extend
colors: {
  bg: "var(--bg)",
  surface: "var(--surface)", 
  text: "var(--text)",
  accent: "var(--accent)",
  border: "var(--border)"
},
boxShadow: {
  lift: "0 10px 20px -10px rgba(0,0,0,.35)"
}

## MVP Page Structure (Ship First)

**Priority 1**: `/` (Home) - Hero + Featured Work + CTA
**Priority 2**: `/works` - Filterable project grid + case study pages  
**Priority 3**: `/about` - Code-editor UI + animated skills
**Priority 4**: `/contact` - Form + validation + success states

## Signature UX Features (What Makes It Special)

### 1. Hero: Typewriter + Glitch Effect
```tsx
// Cycles: "Full-Stack Dev" → "React/Next.js" → "Mobile (RN)" → "Design-Driven"
// Glitch: CSS clip-path animation every ~10s + on hover (250ms)
// Fallback: Static text if prefers-reduced-motion
```

### 2. About: Code Editor Layout  
```tsx
// Tabs: about.tsx | stack.json | timeline.md
// JetBrains Mono + line numbers + copy buttons + faux minimap
```

### 3. Skills: Animated Progress Bars
```tsx
// IntersectionObserver → width animates + counter ticks up
// Accessibility: aria-live for screen readers
```

### 4. Works Grid: Staggered + Tilt + Filters
```tsx
// Framer staggerChildren: 0.06s
// 3D tilt on hover (4-6deg, desktop only)
// AND/OR tag filters → URL params + localStorage
```

### 5. Magnetic Primary CTAs
```tsx
// Button follows cursor 6-8px, springs back on leave
// Apply ONLY to primary actions (avoid overload)
```

### 6. Enhanced Button Hovers
```tsx
// All buttons: lift 3px + ring-accent/30 + shadow-lift
// Secondary: underlined gradient text on hover
```

## Content Model (MDX)

Case studies use this structure in `/content/works/[slug].mdx`:
```yaml
---
title: string
tagline: string
role: string[]          # ["Front-end Developer"]
context: string         # "Website Redesign" 
period: string          # "2025"
heroImage: string
colorTokens?: string[]  # ["--accent:#2E7A73"] for per-case theming
gallery: { src: string; alt: string; caption?: string }[]
results?: { metric: string; value: string; note?: string }[]
tech: string[]
---
```

## Component Architecture

**Atoms**: Button, IconButton, Tag/Chip, Input, Textarea, ColorSwatch
**Molecules**: WorkCard, ExperimentCard, CaseStudyHeader, ImageReveal, Lightbox
**Organisms**: WorksGrid (with filters), ContactForm, Header (sticky nav), Footer
**Global**: Theme provider supporting per-case page theming via data attributes

## Motion & Performance Standards

**Page Transitions**: 200-250ms fade + 8px translateY in, 150ms out
**Hero Animations**: Stagger heading lines, portrait scale-in, parallax overlays
**Performance Budget**: ≤220kB gzipped JS on `/`, LCP <1.5s, CLS <0.1
**Accessibility**: AA contrast (4.5:1), keyboard navigation, semantic landmarks

## Critical Developer Workflows

**Build**: `npm run build` - validates MDX content and generates static pages
**Dev**: `npm run dev` - runs on http://localhost:3000 (or next available port)
**Content**: Add new case studies to `/content/works/` - automatic slug generation from filename
**Theming**: Per-case color tokens in frontmatter become CSS variables scoped to that page

## Key Integration Points

**Email**: Server actions in `/src/app/actions/` handle contact form via Resend API
**Images**: All assets in `/public/` with next/image optimization and blur data URLs
**Analytics**: Configured for Plausible/Vercel Analytics with sitemap generation
**Filters**: Works page uses URL search params + localStorage for filter persistence

## Testing & QA Requirements

- Renders 3+ sample case studies with all sections and color swatches
- Works filters survive page reload and update URL state  
- Reduced motion disables parallax/stagger animations
- Contact form validates emails and shows success UX
- Lighthouse scores: Performance ≥90, Accessibility ≥95

## Responsive Behavior

**Breakpoints**: `sm=480px`, `md=768px`, `lg=1024px`, `xl=1280px`, `2xl=1536px`
**Hero Layout**: Collapses to vertical stack on `md-`, central rule becomes horizontal
**Contact Sheet**: Mobile renders as slide-over overlay with close button

## Project Status

✅ **Completed Setup**:
- Next.js 15+ with TypeScript and App Router
- Tailwind CSS with custom design system
- Framer Motion animations with reduced motion support
- SCSS modules for global styles and tokens
- Sample MDX case studies with proper frontmatter structure
- Production-ready homepage with hero section and works teaser

When working on this codebase, prioritize pixel-perfect Figma matching for hero and key sections, maintain the design system hierarchy, and ensure all animations respect accessibility preferences.
Here’s a tightened, production-ready set of **AI Coding Instructions** that bakes in your ideas: code-editor About page, hero typing+glitch, animated skill bars, staggered portfolio, magnetic CTAs, accent headings, and richer button hovers. Copy-paste.
## Component Architecture

**Atoms**: Button, IconButton, Tag/Chip, Input, Textarea, ColorSwatch
**Molecules**: WorkCard, ExperimentCard, CaseStudyHeader, ImageReveal, Lightbox
**Organisms**: WorksGrid (with filters), ContactForm, Header (sticky nav), Footer
**Global**: Theme provider supporting per-case page theming via data attributes

## Motion & Performance Standards

**Page Transitions**: 200-250ms fade + 8px translateY in, 150ms out
**Hero Animations**: Stagger heading lines, portrait scale-in, parallax overlays
**Performance Budget**: ≤220kB gzipped JS on `/`, LCP <1.5s, CLS <0.1
**Accessibility**: AA contrast (4.5:1), keyboard navigation, semantic landmarks

## Critical Developer Workflows

**Build**: `npm run build` - validates MDX content and generates static pages
**Dev**: `npm run dev` - runs on http://localhost:3000 (or next available port)
**Content**: Add new case studies to `/content/works/` - automatic slug generation from filename
**Theming**: Per-case color tokens in frontmatter become CSS variables scoped to that page

## Key Integration Points

**Email**: Server actions in `/src/app/actions/` handle contact form via Resend API
**Images**: All assets in `/public/` with next/image optimization and blur data URLs
**Analytics**: Configured for Plausible/Vercel Analytics with sitemap generation
**Filters**: Works page uses URL search params + localStorage for filter persistence

## Testing & QA Requirements

- Renders 3+ sample case studies with all sections and color swatches
- Works filters survive page reload and update URL state  
- Reduced motion disables parallax/stagger animations
- Contact form validates emails and shows success UX
- Lighthouse scores: Performance ≥90, Accessibility ≥95

## Responsive Behavior

**Breakpoints**: `sm=480px`, `md=768px`, `lg=1024px`, `xl=1280px`, `2xl=1536px`
**Hero Layout**: Collapses to vertical stack on `md-`, central rule becomes horizontal
**Contact Sheet**: Mobile renders as slide-over overlay with close button

## Project Status

✅ **Completed Setup**:
- Next.js 15+ with TypeScript and App Router
- Tailwind CSS with custom design system
- Framer Motion animations with reduced motion support
- SCSS modules for global styles and tokens
- Sample MDX case studies with proper frontmatter structure
- Production-ready homepage with hero section and works teaser

When working on this codebase, prioritize pixel-perfect Figma matching for hero and key sections, maintain the design system hierarchy, and ensure all animations respect accessibility preferences.


Here’s a tightened, production-ready set of **AI Coding Instructions** that bakes in your ideas: code-editor About page, hero typing+glitch, animated skill bars, staggered portfolio, magnetic CTAs, accent headings, and richer button hovers. Copy-paste.

## Architecture & Tech Stack

* **Framework:** Next.js 15+ (App Router), TypeScript, **React Server Components by default**
* **Styling:** Tailwind CSS + **SCSS Modules**

  * Global tokens: `/src/styles/tokens.scss`
  * Global overrides: `/src/styles/globals.scss`
* **UI Kit:** **shadcn/ui** (Button, Card, Tabs, Badge, Dialog, Input), **lucide-react** icons
* **Motion:** Framer Motion (respect `prefers-reduced-motion`)
* **Content:** MDX case studies in `/content/works/`
* **Forms:** react-hook-form + zod; Next **Server Actions**; Resend for email
* **Images:** `next/image` with AVIF/WebP, responsive sizes, blur placeholders
* **Optional UX:** Command Palette (⌘K) via lightweight custom or `kbar`, top scroll-progress bar

