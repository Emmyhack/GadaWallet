import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    'process.env': {},
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process',
      stream: 'stream-browserify',
      crypto: 'crypto-browserify',
    },
  },
  optimizeDeps: {
    include: ['buffer', 'process', 'stream-browserify', 'crypto-browserify'],
  },
  server: {
    headers: {
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self';
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data: https: https://drive.google.com https://lh3.googleusercontent.com;
        connect-src 'self' https://api.devnet.solana.com https://api.mainnet-beta.solana.com https://explorer.solana.com https://*.civic.com https://civic.com https://gatekeeper-api.civic.com;
        frame-src 'self' https://*.civic.com https://civic.com https://pass.civic.com https://passv2.civic.com;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
      `.replace(/\s+/g, ' ').trim()
    }
  }
})
