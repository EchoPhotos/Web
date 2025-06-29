# Echo Photos Web Application

This is a Next.js 15 web application for Echo Photos (echophotos.io), a photo sharing and album management platform.

## Tech Stack
- **Framework**: Next.js 15.1.2 with App Router
- **React**: 19.0.0
- **TypeScript**: Full TypeScript support
- **Styling**: Tailwind CSS 4.0.2
- **State Management**: Zustand
- **Backend**: Firebase
- **Build Tool**: Turbopack (in development)
- **Code Quality**: ESLint, Prettier
- **Internationalization**: Built-in i18n support with locales (en, de, fr)

## Key Features
- Photo album management
- User authentication
- File uploads with progress tracking
- Download management
- Invite system for album sharing
- Premium features
- Responsive design with mobile support
- MDX content support
- Image processing and optimization

## Development Commands
```bash
# Start development server with Turbopack on port 3006
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Format code with Prettier
npm run format
```

## Project Structure
```
app/
├── (app)/          # Main app routes (authenticated)
├── (invites)/      # Invite-specific routes
├── (unlocalized)/  # Routes without i18n
├── Models/         # TypeScript data models
└── [lang]/         # Internationalized routes

components/         # Reusable React components
├── Album/          # Album-related components
├── Authentication/ # Auth components
├── Download/       # Download management
├── Homepage/       # Public homepage components
├── UI/            # General UI components
└── Upload/        # File upload components

provider/          # React context providers
utils/            # Utility functions and configurations
locales/          # i18n translation files
public/           # Static assets
styles/           # Global CSS files
```

## Configuration Files
- `next.config.mjs`: Next.js configuration with MDX support
- `eslint.config.mjs`: ESLint configuration
- `prettier.config.mjs`: Prettier formatting rules
- `postcss.config.mjs`: PostCSS configuration for Tailwind
- `tsconfig.json`: TypeScript configuration
- `firebase.json`: Firebase hosting configuration

## Development Notes
- Uses Turbopack for faster development builds
- MDX support for content pages
- Image optimization with 20-year cache TTL
- Firebase integration for backend services
- Internationalization with multiple language support
- Custom authentication system
- Real-time features for album collaboration

## Build & Deploy
- Production builds use standard Next.js build process
- Deployed via Firebase hosting
- ESLint errors will fail production builds
- Image assets are heavily cached for performance
