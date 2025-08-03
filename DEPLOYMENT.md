# GadaWallet Deployment Guide

## Vercel Deployment

This project is configured to deploy the React/Vite frontend to Vercel.

### Configuration Files

- `vercel.json` - Vercel deployment configuration
- `.vercelignore` - Files to exclude from deployment
- `package.json` - Root package.json with build scripts

### Build Process

1. **Install Dependencies**: `npm ci` (root level)
2. **Build Application**: `npm run build` (runs `cd gada/frontend && npm ci && npm run build`)
3. **Output Directory**: `gada/frontend/dist`

### Key Configuration

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `gada/frontend/dist`
- **SPA Routing**: Configured with rewrites for client-side routing

### Troubleshooting

If you encounter the "vite: command not found" error:
- This happens when Vercel is configured for VitePress instead of Vite
- The `vercel.json` file fixes this by specifying the correct build commands
- Ensure the `vercel.json` file is in the root directory
- The root `package.json` provides the build script that Vercel uses

### Project Structure

```
/
├── package.json              # Root package.json with build scripts
├── vercel.json              # Vercel configuration
├── .vercelignore            # Files to exclude from deployment
├── gada/
│   ├── frontend/            # React/Vite application
│   │   ├── package.json     # Frontend dependencies
│   │   ├── src/            # Source code
│   │   └── dist/           # Build output
│   └── ...                 # Rust/Solana backend (excluded)
└── frontend/               # Empty directory (ignored)
```

### Local Testing

To test the build locally:

```bash
# Install dependencies
npm ci

# Build the project
npm run build

# Preview the build
npm run preview
```

The build should complete successfully with the output in `gada/frontend/dist/`.

### Vercel Configuration Details

The `vercel.json` file contains:
- **buildCommand**: `npm run build` (uses root package.json script)
- **outputDirectory**: `gada/frontend/dist` (where the built files are)
- **installCommand**: `npm ci` (installs root dependencies)
- **framework**: `vite` (tells Vercel this is a Vite project)
- **rewrites**: SPA routing configuration

### Common Issues and Solutions

1. **"vite: command not found"**
   - Solution: Use the root package.json build script
   - The build script navigates to the correct directory

2. **"Build command failed"**
   - Check that all dependencies are installed
   - Ensure the frontend directory exists
   - Verify the build script in root package.json

3. **"Output directory not found"**
   - The build creates `gada/frontend/dist/`
   - Make sure the path is correct in vercel.json

### Environment Variables

If you need to add environment variables:
1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add any required variables for your application

### Custom Domain

To add a custom domain:
1. Go to your Vercel project dashboard
2. Navigate to Settings > Domains
3. Add your custom domain
4. Configure DNS settings as instructed

### Performance Optimization

The build includes:
- **Code Splitting**: Automatic chunk splitting by Vite
- **Tree Shaking**: Unused code removal
- **Minification**: JavaScript and CSS minification
- **Compression**: Gzip compression for assets

### Monitoring

After deployment:
- Check the Vercel dashboard for build logs
- Monitor performance in the Analytics tab
- Set up error tracking if needed

The deployment should now work correctly with the updated configuration! 🚀