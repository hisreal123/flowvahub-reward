# FlowvaHub Rewards Platform (Assessment)

A React-based rewards platform that recreates the Rewards page from flowvahub.com with UI recreation, complete functionality, and robust data handling using Supabase.

## Project Overview

This project is a full-stack recreation of the FlowvaHub Rewards page featuring:
- User authentication and profile management
- Daily reward claiming system
- Points tracking and balance management
- Referral system with automatic point awards
- Responsive dashboard layout
- Reliable data synchronization using Supabase as the source of truth


## Assessment Criteria Mapping

- **Supabase Usage**: Auth, RLS-protected tables, constraints, triggers, and migrations are used as the primary backend.
- **React Fundamentals**: Feature-based component structure, custom hooks for business logic, and context for global auth state.
- **Product Logic**: Daily rewards, streaks, and referrals are implemented with deterministic, auditable logic.
- **State Handling**: Explicit loading, error, and empty states for all async flows.
- **Trade-offs**: Documented clearly in the Assumptions & Trade-offs section.

## Tech Stack

### Frontend
- **React (latest stable)** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - Authentication (Supabase Auth)
  - PostgreSQL Database
  - Row Level Security (RLS)
  - Real-time subscriptions

## Features

### Authentication
- User sign up with email/password
- User sign in
- Secure session management
- Protected routes
- Automatic referral code generation

### Rewards System
- **Daily Check-in**: Claim 5 points daily with cooldown system
- **Points Balance**: Track total points with progress visualization
- **Streak Tracking**: Monitor daily check-in streaks
- **Referral System**: Earn 25 points when someone signs up with your referral code

### User Interface
- Responsive dashboard layout
- Mobile-friendly sidebar navigation
- Loading states for all async operations
- Error handling with user-friendly messages
- Empty states
- Toast notifications for user feedback

### Additional Features
- Logout confirmation dialog
- Referral link sharing

## Prerequisites

- Node.js 18+ and npm
- A Supabase account and project
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/hisreal123/flowvahub-reward
cd flowvahub-reward
```

### 2. Install Dependencies

```bash
yarn/npm install
```

### 3. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Project Settings > API for credentials

### 4. Configure Environment Variables

Create  `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Set Up Database Schema

Run the migration files in your Supabase SQL Editor (in order):

1. `supabase/migrations/20251224125434_create_daily_activity_table.sql`
2. `supabase/migrations/20251225000000_create_referrals_table.sql`
3. `supabase/migrations/20251225000001_create_user_profiles_table.sql`
4. `supabase/migrations/20251225000002_remove_referral_code_column.sql`
5. `supabase/migrations/20251225000003_allow_referral_code_lookup.sql`
6. `supabase/migrations/20251225124558_ensure_cascade_delete_constraints.sql`

Alternatively, use the consolidated migration file:
- `supabase_migrations.sql`

### 6. Run the Development Server

```bash
npm run dev / yarn dev
```

Application runs on `http://localhost:5173`

### 7. Build for Production

```bash
npm run build or yarn build
```

Production build will be in the `dist` directory.

## 🗄️ Database Schema

### Tables

#### `user_profiles`
- Stores user profile information
- Auto-generates unique referral codes
- Linked to `auth.users` via `user_id`

#### `daily_activity`
- Tracks daily check-ins and points
- One record per user per day (enforced by UNIQUE constraint)
- Stores both stress points and reward points

#### `referrals`
- Tracks referral relationships
- Automatically awards 25 points to referrer via database trigger
- Prevents duplicate referrals (UNIQUE constraint on `referred_id`)

### Row Level Security (RLS)

All tables have RLS enabled with policies ensuring:
- Users can only view their own data
- Users can only insert/update/delete their own records
- Referral records are properly scoped

## Supabase Integration

### Authentication

The app uses Supabase Auth for all authentication operations:

- **Sign Up**: `supabase.auth.signUp()` with automatic profile creation
- **Sign In**: `supabase.auth.signInWithPassword()`
- **Sign Out**: `supabase.auth.signOut()`
- **Session Management**: Real-time session updates via `onAuthStateChange()`

**Location**: `src/context/AuthContext.tsx`

### Database Queries

All database operations use Supabase client directly:

- **User Profile**: `useUserProfile` hook queries `user_profiles` table
- **Daily Activity**: `useDailyClaim` hook manages `daily_activity` table
- **Points Calculation**: `useUserPoints` hook aggregates points from `daily_activity`
- **Referrals**: `useReferrals` hook queries `referrals` table

**Location**: `src/hooks/`

### Real-time Features

The app uses reliable data synchronization via Supabase (ready for future enhancements)
- Auth state changes are monitored in real-time
- Database triggers handle automatic point awards

## Project Structure

```
flowvahub-reward-/
├── src/
│   ├── components/          # React components
│   │   ├── Rewards/         # Rewards-specific components
│   │   ├── ui/              # Reusable UI components
│   │   └── ...              # Layout and modal components
│   ├── context/             # React context providers
│   │   └── AuthContext.tsx  # Authentication context
│   ├── hooks/                # Custom React hooks
│   │   ├── useDailyClaim.ts
│   │   ├── useReferrals.ts
│   │   ├── useUserPoints.ts
│   │   └── useUserProfile.ts
│   ├── pages/               # Page components
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   └── RewardsPage.tsx
│   ├── lib/                 # Utility functions
│   ├── supabaseClient.ts    # Supabase client configuration
│   └── App.tsx              # Main app component
├── supabase/
│   └── migrations/          # Database migration files
├── public/                  # Static assets
└── package.json
```

## Component Architecture

### Custom Hooks Pattern
Business logic is separated into reusable hooks:
- `useDailyClaim` - Daily reward claiming logic
- `useUserPoints` - Points calculation and aggregation
- `useReferrals` - Referral tracking
- `useUserProfile` - User profile management

### Context Pattern
- `AuthContext` - Centralized authentication state management

### Component Organization
- **Layout Components**: `DashboardLayout` - Main app structure
- **Feature Components**: Organized by feature (Rewards, UI, etc.)
- **Page Components**: Top-level route components

## State Management

### Loading States
All async operations show loading indicators:
- Daily claim button shows spinner during claim
- Profile loading shows full-screen loader
- Logout shows loading state in confirmation modal

### Error Handling
- Try-catch blocks around all Supabase operations
- User-friendly error messages via toast notifications
- Graceful fallbacks for missing data

### Empty States
- Empty notification list
- No rewards available states
- Zero points display

## Deployment

### Build Command
```bash
npm run build or yarn build
```

### Environment Variables for Production
Ensure your deployment platform has these environment variables set:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Deployed Platform
- **Vercel** - Optimized for Vite/React apps 
- **Auto-deploy** - Link vercel to github account of auto-deploy on commit


## Assumptions & Trade-offs

### Assumptions
1. **Referral System**: Assumes users sign up via referral links with `?ref=code` parameter
2. **Daily Rewards**: Assumes one claim per day per user (enforced by database constraint)
3. **Points System**: Points are stored as integers, no decimal values
4. **User Profiles**: First and last names are required during signup
5. **Cooldown System**: 5-minute cooldown for daily claims (stored in localStorage for client-side UX)

### Trade-offs
1. **Cooldown System**: Implemented client-side using localStorage strictly for UX feedback. The database UNIQUE constraint remains the authoritative guard against multiple daily claims
2. **No Real-time Notifications**: Notification system is prepared but not fully implemented (commented out)
3. **Client-side Routing**: Using React Router for SPA experience (no SSR)
4. **Toast Notifications**: Using Sonner for user feedback instead of custom notification system
5. **Referral Code Generation**: Client-side generation with uniqueness check (could be improved with database function)
6. **No Email Verification**: Supabase email verification is available but not enforced in current implementation

### Future Enhancements
- Real-time notification system
- Email verification flow
- Advanced analytics dashboard
- Reward redemption functionality
- Social sharing features
- Admin dashboard


## Author

Built as a demonstration of React + Supabase integration with clean architecture and proper data handling.

---

**Live Demo**: https://flowvahub-reward.vercel.app/

**GitHub Repository**: https://github.com/hisreal123/flowvahub-reward
