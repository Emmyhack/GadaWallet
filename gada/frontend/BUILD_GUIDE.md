# GadaWallet Build Guide

## 🚀 Vite + React Project

This is a comprehensive Solana wallet application built with Vite, React, TypeScript, and Tailwind CSS.

## 📦 Project Structure

```
gada/frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts (WalletContext)
│   ├── lib/           # Utility libraries
│   ├── pages/         # Application pages
│   ├── App.tsx        # Main application component
│   ├── main.tsx       # Application entry point
│   └── index.css      # Global styles
├── dist/              # Production build output
├── package.json       # Dependencies and scripts
├── vite.config.ts     # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## 🛠️ Available Scripts

### Development
```bash
# Start development server
npm run dev

# Start development server with host access
npm run dev -- --host
```

### Building
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality
```bash
# Lint code
npm run lint

# Type checking
npm run type-check
```

## 🎯 Features Built

### Wallet Pages
- **`/wallet`** - Main wallet dashboard with tokens and transactions
- **`/send`** - Send tokens to other addresses
- **`/receive`** - Receive tokens with QR code
- **`/swap`** - Swap tokens with price quotes

### Legacy Features
- **`/dashboard`** - Original dashboard
- **`/add-heir`** - Add heirs to your wallet
- **`/claim-assets`** - Claim inherited assets
- **`/update-activity`** - Update wallet activity
- **`/batch-transfer`** - Batch transfer tokens

## 🎨 Design System

### Phantom Color Palette
- **Primary**: Phantom Blue (`#0ea5e9`)
- **Secondary**: Clean grays and whites
- **Success**: Green (`#22c55e`)
- **Warning**: Yellow (`#f59e0b`)
- **Error**: Red (`#ef4444`)

### Components
- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons
- `.glass-card` - Glass morphism cards
- `.gradient-text` - Gradient text effects

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd gada/frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

The production files will be in the `dist/` directory.

## 📱 Build Output

### Development Build
- **Entry Point**: `src/main.tsx`
- **Output**: Development server with hot reload
- **Port**: `5173` (default)

### Production Build
- **Entry Point**: `dist/index.html`
- **Assets**: 
  - `dist/assets/index-BzPgNdS6.js` (923KB) - Main bundle
  - `dist/assets/index-CNIuvMQU.js` (17KB) - Vendor bundle
  - `dist/assets/index-DZ6hI9iR.js` (34KB) - Runtime bundle
  - `dist/assets/index-CuhqgDVu.css` (4.7KB) - Styles

## 🔧 Configuration Files

### Vite Configuration (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Content-Security-Policy': '...'
    }
  }
})
```

### Tailwind Configuration (`tailwind.config.js`)
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        phantom: { /* Phantom color palette */ },
        primary: { /* Primary colors */ },
        secondary: { /* Secondary colors */ },
        // ... other color schemes
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
```

## 🌐 Deployment

### Vercel Deployment
The project is configured for Vercel deployment with:
- **Build Command**: `cd gada/frontend && npm install && npm run build`
- **Output Directory**: `gada/frontend/dist`
- **Framework**: Vite

### Static Hosting
The `dist/` folder contains all static files needed for deployment:
- HTML, CSS, and JavaScript files
- Optimized and minified for production
- Ready for any static hosting service

## 🔍 Troubleshooting

### Common Issues

1. **Tailwind CSS Warnings**
   - The `bg-phantom-600` warning is a false positive
   - Build completes successfully despite the warning

2. **Large Bundle Size**
   - Main bundle is ~944KB due to Solana dependencies
   - Consider code splitting for better performance

3. **TypeScript Errors**
   - Run `npm run type-check` to verify types
   - All TypeScript errors have been resolved

### Performance Optimization

1. **Code Splitting**
   ```typescript
   // Use dynamic imports for large components
   const Wallet = lazy(() => import('./pages/Wallet'))
   ```

2. **Bundle Analysis**
   ```bash
   npm install --save-dev vite-bundle-analyzer
   ```

3. **Tree Shaking**
   - Vite automatically tree-shakes unused code
   - Ensure proper ES module imports

## 📊 Build Statistics

- **Total Size**: ~944KB (main bundle)
- **CSS Size**: 4.7KB
- **JavaScript**: 923KB (main) + 51KB (vendor/runtime)
- **Build Time**: ~7 seconds
- **Modules Transformed**: 6,413

## 🎉 Success!

Your GadaWallet application is now built and ready for deployment! The build includes:

✅ **Complete wallet functionality**
✅ **Phantom-inspired design**
✅ **Responsive layout**
✅ **TypeScript support**
✅ **Production optimization**
✅ **Vercel deployment ready**

The application provides a comprehensive wallet experience with all the features users expect from a modern cryptocurrency wallet.