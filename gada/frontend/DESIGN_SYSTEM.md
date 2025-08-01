# Gada Wallet Design System

## Overview

Gada Wallet features a modern, professional design system built with Tailwind CSS and React. The design emphasizes security, trust, and ease of use while maintaining a sophisticated aesthetic suitable for a financial application.

## Design Principles

### 1. Security-First
- Dark theme to reduce eye strain and convey security
- High contrast elements for accessibility
- Clear visual hierarchy for important actions

### 2. Professional Aesthetic
- Gradient accents for visual interest
- Glass morphism effects for modern appeal
- Consistent spacing and typography

### 3. User Experience
- Intuitive navigation with clear call-to-actions
- Responsive design for all devices
- Smooth animations and transitions

## Color Palette

### Primary Colors
- **Primary Blue**: `#0ea5e9` - Main brand color, used for primary actions
- **Secondary Purple**: `#d946ef` - Secondary brand color, used for accents
- **Accent Yellow**: `#eab308` - Warning and highlight color

### Status Colors
- **Success**: `#22c55e` - Positive actions and confirmations
- **Warning**: `#f59e0b` - Caution and pending states
- **Error**: `#ef4444` - Errors and destructive actions

### Neutral Colors
- **Dark 950**: `#020617` - Background
- **Dark 900**: `#0f172a` - Secondary background
- **Dark 800**: `#1e293b` - Card backgrounds
- **Neutral 700**: `#404040` - Borders and dividers
- **Neutral 400**: `#a3a3a3` - Secondary text
- **Neutral 100**: `#f5f5f5` - Primary text

## Typography

### Font Family
- **Primary**: Inter (Sans-serif)
- **Monospace**: JetBrains Mono (for addresses and code)

### Font Sizes
- **Display**: 3xl-6xl (Hero text)
- **Headings**: xl-3xl (Page titles)
- **Body**: base-lg (Main content)
- **Small**: sm-xs (Captions and metadata)

## Component Library

### Buttons

#### Primary Button
```tsx
<button className="btn-primary">
  <Icon className="w-4 h-4" />
  Action
</button>
```

#### Secondary Button
```tsx
<button className="btn-secondary">
  <Icon className="w-4 h-4" />
  Action
</button>
```

#### Outline Button
```tsx
<button className="btn-outline">
  <Icon className="w-4 h-4" />
  Action
</button>
```

### Cards

#### Standard Card
```tsx
<div className="card p-6">
  Card content
</div>
```

#### Elevated Card
```tsx
<div className="card-elevated p-6">
  Card content with hover effect
</div>
```

#### Glass Card
```tsx
<div className="card-glass p-6">
  Card with glass morphism effect
</div>
```

### Forms

#### Input Field
```tsx
<input className="input" placeholder="Enter value" />
```

#### Form Group
```tsx
<div className="form-group">
  <label className="form-label">Label</label>
  <input className="input" />
  <p className="form-help">Help text</p>
</div>
```

### Status Indicators

#### Badges
```tsx
<span className="badge-success">Success</span>
<span className="badge-warning">Warning</span>
<span className="badge-error">Error</span>
```

#### Status Dots
```tsx
<div className="status-dot-online"></div>
<div className="status-dot-offline"></div>
<div className="status-dot-warning"></div>
```

## Layout Components

### Container
```tsx
<div className="container-custom">
  Content with responsive padding
</div>
```

### Section Padding
```tsx
<section className="section-padding">
  Section with consistent vertical spacing
</section>
```

## Animations

### Fade In
```tsx
<div className="animate-fade-in">
  Content that fades in
</div>
```

### Slide Up
```tsx
<div className="animate-fade-in-up">
  Content that slides up and fades in
</div>
```

### Float
```tsx
<div className="animate-float">
  Floating animation
</div>
```

### Glow
```tsx
<div className="animate-glow">
  Glowing effect
</div>
```

## Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Responsive Utilities
```tsx
<div className="responsive-text">Adaptive text size</div>
<div className="responsive-padding">Adaptive padding</div>
```

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- High contrast mode support
- Focus indicators on interactive elements

### Keyboard Navigation
- Tab order follows logical flow
- Escape key closes modals
- Enter/Space activates buttons

### Screen Reader Support
- Semantic HTML structure
- ARIA labels where needed
- Alt text for images

## Usage Guidelines

### 1. Consistency
- Use predefined components and classes
- Maintain consistent spacing (4px grid)
- Follow established color usage patterns

### 2. Hierarchy
- Use size and weight to establish importance
- Group related elements together
- Use whitespace effectively

### 3. Feedback
- Provide immediate visual feedback for actions
- Use appropriate status colors
- Include loading states for async operations

### 4. Mobile First
- Design for mobile devices first
- Ensure touch targets are at least 44px
- Test on various screen sizes

## File Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Main navigation
│   ├── Footer.tsx          # Site footer
│   ├── LoadingSpinner.tsx  # Loading indicator
│   └── Toast.tsx           # Notification system
├── pages/
│   ├── LandingPageStitch.tsx  # Homepage
│   ├── Dashboard.tsx          # Main dashboard
│   ├── AddHeir.tsx            # Add heir form
│   └── ...                    # Other pages
├── index.css                 # Global styles and utilities
└── tailwind.config.js        # Tailwind configuration
```

## Customization

### Adding New Colors
1. Add color to `tailwind.config.js` under `colors`
2. Use semantic naming (e.g., `brand`, `accent`)
3. Include all shades (50-950)

### Creating New Components
1. Follow existing naming conventions
2. Use TypeScript interfaces
3. Include proper accessibility attributes
4. Add to this documentation

### Modifying Animations
1. Add keyframes to `tailwind.config.js`
2. Create utility classes in `index.css`
3. Test performance on mobile devices

## Performance Considerations

### CSS Optimization
- Use Tailwind's purge feature
- Minimize custom CSS
- Leverage CSS custom properties

### Animation Performance
- Use `transform` and `opacity` for animations
- Avoid animating layout properties
- Use `will-change` sparingly

### Bundle Size
- Import only needed icons
- Use dynamic imports for large components
- Optimize images and assets

## Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## Contributing

When contributing to the design system:

1. Follow established patterns
2. Test across different devices
3. Ensure accessibility compliance
4. Update this documentation
5. Get design review for major changes

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Inter Font](https://rsms.me/inter/)
- [Lucide Icons](https://lucide.dev/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)