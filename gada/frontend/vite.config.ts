import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process',
    },
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          crypto: ['@solana/web3.js', '@solana/wallet-adapter-base']
        }
      }
    }
  },
  server: {
    headers: {
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-inline';
        style-src 'self' 'unsafe-inline';
        img-src 'self' data: https: https://drive.google.com https://lh3.googleusercontent.com;
        connect-src 'self' https://api.devnet.solana.com https://api.mainnet-beta.solana.com https://explorer.solana.com https://*.civic.com https://civic.com https://gatekeeper-api.civic.com wss://api.devnet.solana.com wss://api.mainnet-beta.solana.com;
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