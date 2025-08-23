import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design system tokens mapped to CSS variables
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        text: "var(--text)",
        muted: "var(--muted)",
        accent: "var(--accent)", // Primary brand color
        "accent-600": "var(--accent-600)",
        "accent-dark": "var(--accent-dark)", // New darker green
        border: "var(--border)",
        success: "var(--success)",
        error: "var(--error)",
        
        // Matrix/Hacking theme colors
        "matrix-green": "var(--matrix-green)",
        "matrix-dark": "var(--matrix-dark)",
        coffee: "var(--coffee)",
        "coffee-light": "var(--coffee-light)",
        "terminal-green": "var(--terminal-green)",
        warning: "var(--warning)",
        danger: "var(--danger)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"],
      },
      spacing: {
        // 4/8px rhythm based on design tokens
        "0.5": "0.125rem", // 2px
        "1": "var(--space-1)",    // 4px
        "2": "var(--space-2)",    // 8px
        "3": "var(--space-3)",    // 12px
        "4": "var(--space-4)",    // 16px
        "6": "var(--space-6)",    // 24px
        "8": "var(--space-8)",    // 32px
        "12": "var(--space-12)",  // 48px
        "16": "4rem",      // 64px
      },
      maxWidth: {
        'text': 'var(--max-text-width)', // 75ch
      },
      boxShadow: {
        panel: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "panel-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        lift: "0 10px 20px -10px rgba(0,0,0,.35)", // Enhanced button hover
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      animation: {
        "fade-in": "fadeIn 200ms ease-out",
        "slide-up": "slideUp 250ms ease-out",
        "typewriter": "typewriter 3s steps(40) infinite",
        "glitch": "glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        typewriter: {
          "from": { width: "0" },
          "to": { width: "100%" },
        },
        glitch: {
          "0%, 74%, 100%": {
            transform: "translate3d(0, 0, 0)",
            filter: "contrast(1)",
          },
          "15%": {
            transform: "translate3d(-2px, 0, 0)",
            filter: "contrast(1.2)",
          },
          "25%": {
            transform: "translate3d(2px, 0, 0)",
            filter: "contrast(1.2)",
          },
          "49%": {
            transform: "translate3d(-1px, 0, 0)",
            filter: "contrast(1)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
