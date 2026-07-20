# JourneyOS

**An Intelligent Travel Operating System**

JourneyOS is a comprehensive travel platform that helps travelers plan, organize, manage, and enjoy every stage of their journey through intelligent planning, budgeting, visa guidance, booking integrations, and personalized recommendations.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Server-rendered React with file-based routing |
| Language | **TypeScript 5** | Type-safe development across the stack |
| Styling | **Tailwind CSS 4** | Utility-first CSS with design tokens |
| Components | **shadcn/ui** | Composable, accessible UI primitives |
| State (Server) | **TanStack Query 5** | Server state management, caching, synchronization |
| State (Client) | **Zustand 5** | Lightweight global client state |
| Animation | **Framer Motion 12** | Production-grade motion and gestures |
| Icons | **Lucide React** | Consistent, lightweight icon set |
| Database | **Supabase** | PostgreSQL, auth, real-time, and storage |
| Linting | **ESLint** | Code quality and consistency |
| Formatting | **Prettier** | Automatic code formatting |

---

## Folder Structure

```
journeyos/
├── app/                    # Next.js App Router pages and layouts
├── components/
│   └── ui/                 # shadcn/ui primitives
├── features/               # Domain-specific feature modules
│   └── <feature>/          # Each feature: components, hooks, types
├── services/               # External API integrations (Supabase, etc.)
├── hooks/                  # Shared custom React hooks
├── lib/                    # Core libraries (stores, providers, utils)
├── utils/                  # Pure utility functions
├── types/                  # TypeScript type definitions
│   ├── api.ts              # API request/response types
│   ├── common.ts           # Shared utility types
│   └── database.ts         # Supabase-generated database types
├── constants/              # Application-wide constants
├── config/                 # Environment-based configuration
├── assets/
│   ├── icons/              # Custom SVG icons
│   └── fonts/              # Local font files
├── public/
│   └── icons/              # Static public assets
├── database/
│   ├── schema.sql          # Database schema definition
│   ├── migrations/         # Supabase migration files
│   ├── functions/          # Database functions (RPC)
│   └── policies/           # Row-level security policies
├── docs/                   # Project documentation
├── styles/                 # Global styles (typography, animations)
├── config/                 # Build and tool configuration
└── tests/
    ├── unit/               # Unit tests
    ├── integration/        # Integration tests
    └── e2e/                # End-to-end tests
```

---

## Development Philosophy

**1. Scalability First** — Every architectural decision is made with millions of users in mind. No shortcuts that create technical debt.

**2. Separation of Concerns** — Features are isolated in their own directories. Shared code lives in `lib/`, `hooks/`, `utils/`, and `types/`.

**3. Type Safety** — TypeScript strict mode is enforced. No `any` types. Every API response, database row, and component prop is typed.

**4. Composable UI** — shadcn/ui components are the foundation. Custom components extend them, never duplicate them.

**5. Server-First State** — Server state (data fetching, caching) is handled by TanStack Query. Client state (UI state, global app state) is handled by Zustand.

**6. Zero Duplication** — DRY principle enforced through linting, code reviews, and architectural patterns.

**7. Documentation Driven** — Every major decision is documented in `/docs` before implementation begins.

---

## Getting Started

### Prerequisites

- Node.js 22+ (recommended)
- npm 10+
- A Supabase project

### Installation

```bash
# Clone the repository
git clone <repository-url> journeyos
cd journeyos

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (hot reload) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting without changes |
| `npm run type-check` | Run TypeScript type checking |

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `NEXT_PUBLIC_API_BASE_URL` | No | API base URL (default: `/api`) |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | No | Enable analytics (default: `false`) |
| `NEXT_PUBLIC_ENABLE_AI` | No | Enable AI features (default: `false`) |

---

## Project Status

**Foundation Complete** — The project architecture, tooling, and development environment are ready. Feature implementation has not yet begun.

---

## License

Proprietary. All rights reserved.
