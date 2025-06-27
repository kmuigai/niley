# Niley - Personal Kids Book Tracker

A beautiful web application for parents to track, analyze, and optimize their children's reading journey. Built with Next.js 14, Supabase, and designed with love.

## ✨ Features

- **30-Second Book Logging**: Quick scan or search to log books after bedtime stories
- **Reading Streak Tracking**: GitHub-style contribution grid showing daily reading habits
- **Child Profiles**: Track multiple children with age-appropriate insights
- **Smart Analytics**: Monthly summaries and "Rewind" style reports
- **Book Library**: Comprehensive database with Google Books integration
- **Family Collaboration**: Both parents can log and track readings
- **PWA Ready**: Works offline and installs like a native app

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with Google OAuth
- **APIs**: Google Books API, Open Library API
- **State Management**: Zustand
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account
- Google OAuth credentials

### Installation

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Set up environment variables**
   Create `.env.local` based on `.env.example`:
   ```bash
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_key

   # External APIs
   GOOGLE_BOOKS_API_KEY=your_google_books_api_key
   ```

3. **Set up Supabase**
   
   a. Create a new Supabase project at [supabase.com](https://supabase.com)
   
   b. Run the database migration:
   ```bash
   # Install Supabase CLI if you haven't
   npm install -g supabase
   
   # Initialize Supabase (if needed)
   supabase init
   
   # Link to your project
   supabase link --project-ref your-project-ref
   
   # Apply the database schema
   supabase db push
   ```
   
   c. Generate TypeScript types:
   ```bash
   pnpm run db:generate-types
   ```

4. **Configure Google OAuth**
   
   a. Go to [Google Cloud Console](https://console.cloud.google.com/)
   
   b. Create a new project or select existing
   
   c. Enable Google+ API
   
   d. Create OAuth 2.0 credentials:
   - Authorized origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/auth/callback/google`
   
   e. Add the OAuth provider in Supabase Dashboard → Authentication → Providers

5. **Start development server**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                      # Next.js 14 app router
│   ├── api/                  # API routes
│   ├── auth/                 # Authentication pages
│   ├── books/                # Books pages
│   ├── discover/             # Discovery/recommendations
│   ├── rewind/               # Analytics & reports
│   └── children/             # Child profiles
├── components/               # React components
│   ├── ui/                   # Shadcn/ui components
│   ├── features/             # Feature-specific components
│   ├── layout/               # Layout components
│   └── common/               # Shared components
├── lib/                      # Utilities & configurations
│   ├── supabase/             # Supabase setup
│   ├── auth/                 # Authentication helpers
│   ├── database/             # Database operations
│   └── api/                  # External API clients
├── hooks/                    # Custom React hooks
├── types/                    # TypeScript definitions
└── stores/                   # State management
```

## 🗄️ Database Schema

The app uses the following main tables:

- **users**: User profiles (extends Supabase auth)
- **children**: Child profiles with birth dates
- **books**: Book information from external APIs
- **readings**: Individual reading sessions

All tables include Row Level Security (RLS) policies for data privacy.

## 🎨 Design System

### Colors
- **Primary**: Sage Green (#87A96B) - calm, nature-inspired
- **Background**: Warm Cream (#FAF9F6) - soft, welcoming
- **Accent**: Dusty Rose (#D4A5A5) - gentle highlight
- **Text**: Charcoal Gray (#36454F) - readable contrast

### Typography
- **Font**: Yrsa - elegant serif for warmth and readability

## 🚧 Development Roadmap

### Phase 1: Core MVP (Weeks 1-4)
- [x] Project setup and database schema
- [x] Authentication with Google OAuth
- [x] Homepage with reading streak
- [ ] Book scanning and search
- [ ] Basic reading logging
- [ ] Child profile management

### Phase 2: Enhanced Features (Weeks 5-8)
- [ ] Reading analytics dashboard
- [ ] Book recommendations
- [ ] Monthly reports
- [ ] Offline PWA capabilities

### Phase 3: Advanced Features (Weeks 9-12)
- [ ] Family sharing
- [ ] Curated collections
- [ ] AI-powered insights
- [ ] Annual "Rewind" reports

## 🔧 Key Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production  
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate-types` - Generate Supabase types
- `supabase start` - Start local Supabase
- `supabase db push` - Push schema changes

## 🤝 Contributing

This is currently a personal project, but we welcome suggestions and feedback!

## 📄 License

Private project - All rights reserved.

---

**Built with ❤️ for Nile and families everywhere who love reading together.** 