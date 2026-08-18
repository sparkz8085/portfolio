import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const baseSecurityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'accelerometer=(), autoplay=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
}

const devHeaders = {
  ...baseSecurityHeaders,
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
}

const previewHeaders = devHeaders

const contentSecurityPolicyPreview =
  "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob:; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://api.emailjs.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests"

// Dev needs websocket (HMR) and inline styles (CSS injection). We intentionally
// allow inline scripts because Vite can inject an inline module preamble.
const contentSecurityPolicyDev =
  "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob:; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' ws: wss: https://api.emailjs.com; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'"

export default defineConfig({
  plugins: [react({ fastRefresh: false })],
  server: {
    headers: {
      ...devHeaders,
      'Content-Security-Policy': contentSecurityPolicyDev,
    },
  },
  preview: {
    headers: {
      ...previewHeaders,
      'Content-Security-Policy': contentSecurityPolicyPreview,
    },
  },
})
