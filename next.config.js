/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow LAN access to dev server (prevents cross-origin warnings in dev)
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://192.168.11.241:3000',
  ],
  eslint: {
    // Netlify: don't fail the build on lint errors; handle separately in CI
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Optional: unblock builds if type errors exist (you can enforce in CI)
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
}

module.exports = nextConfig
