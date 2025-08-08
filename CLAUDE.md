# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development
- `npm run dev` - Start development server with PGlite database and Next.js (uses Turbopack)
- `npm run dev:spotlight` - Start Sentry Spotlight for local error monitoring
- `npm start` - Start production server
- `npm run build` - Build for production (includes automatic database migrations)
- `npm run build-stats` - Build with bundle analyzer (opens browser with results)

### Code Quality & Validation
- `npm run lint` - Check for ESLint errors
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run check:types` - Type check with TypeScript
- `npm run check:deps` - Check for unused dependencies with Knip
- `npm run check:i18n` - Validate internationalization files and check for missing translations

### Testing
- `npm test` - Run unit tests with Vitest
- `npm run test:e2e` - Run end-to-end tests with Playwright
- `npm run storybook` - Start Storybook development server on http://localhost:6006
- `npm run storybook:test` - Run Storybook tests in headless mode

### Database
- `npm run db:generate` - Generate database migration after schema changes
- `npm run db:studio` - Open Drizzle Studio at https://local.drizzle.studio
- `npm run db-server:file` - Start PGlite server with file-based database (for development)
- `npm run db-server:memory` - Start PGlite server with in-memory database (for CI/builds)

### Git & Commits
- `npm run commit` - Interactive commit message creation with Commitizen (follows Conventional Commits)

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15+ with App Router and TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: Better Auth (supports email/password, email verification, password reset)
- **Database**: PostgreSQL with DrizzleORM, PGlite for local development
- **Security**: Arcjet (bot detection, WAF protection, rate limiting)
- **Internationalization**: next-intl with Crowdin integration
- **Testing**: Vitest (unit), Playwright (E2E), Storybook
- **Error Monitoring**: Sentry with Spotlight for development
- **Analytics**: PostHog
- **Form Handling**: React Hook Form with Zod validation
- **Email**: Nodemailer for authentication emails (verification, password reset)
- **Environment Variables**: T3 Env for type-safe environment validation

### Project Structure
- `src/app/[locale]/` - Next.js App Router with internationalization
  - `(auth)/` - Authentication pages and protected dashboard
  - `(marketing)/` - Public marketing pages
- `src/app/api/auth/[...all]/` - Better Auth API endpoints
- `src/components/` - Reusable React components
- `src/libs/` - Third-party library configurations (DB, I18n, Env, Auth, Email, Arcjet, Logger)
- `src/models/Schema.ts` - Database schema definitions (includes Better Auth tables: user, session, account, verification)
- `src/utils/AppConfig.ts` - Application configuration (name, locales, etc.)
- `src/validations/` - Zod validation schemas
- `migrations/` - Database migration files
- `tests/e2e/` - End-to-end tests (also includes monitoring-as-code)
- `tests/integration/` - Integration tests

### Key Configuration Files
- `next.config.ts` - Next.js configuration with Sentry, bundle analyzer, i18n
- `drizzle.config.ts` - Database configuration
- `vitest.config.mts` - Test configuration (separate projects for unit/UI tests)
- `playwright.config.ts` - E2E test configuration
- `lefthook.yml` - Git hooks (replaces Husky) with linting and type checking
- `src/middleware.ts` - Route protection with Better Auth, i18n routing, and Arcjet security

### Environment Variables
Required for development (add to `.env.local`):
- `BETTER_AUTH_SECRET` - Better Auth secret (min 32 characters)
- `BETTER_AUTH_URL` - Better Auth base URL (e.g., http://localhost:3000)
- `DATABASE_URL` - PostgreSQL connection string (optional for local dev with PGlite)
- `SMTP_HOST` - SMTP server host for email sending
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASSWORD` - SMTP password
- `SMTP_FROM` - Email address for sending emails
- `SMTP_SECURE` - Whether to use secure connection (true/false)

Optional:
- `NEXT_PUBLIC_APP_URL` - Application URL (for Better Auth client)
- `ARCJET_KEY` - Security and bot protection
- `BETTER_STACK_SOURCE_TOKEN` - Log management
- `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST` - Analytics

### Development Workflow
1. Database schema changes: Update `src/models/Schema.ts` → run `npm run db:generate`
2. Migrations are automatically applied during next database interaction
3. All commits must follow Conventional Commits format (use `npm run commit`)
4. Pre-commit hooks automatically run linting and type checking
5. Testing: Unit tests with `.test.ts/.tsx`, E2E tests with `.e2e.ts`, Integration tests with `.spec.ts`

### Important Notes
- TypeScript is configured with strict mode and advanced type safety checks
- Uses absolute imports with `@/` prefix for `src/` directory
- Bundle analyzer available via `npm run build-stats`
- Storybook stories should be placed alongside components with `.stories.ts/.tsx` extension
- Database migrations are automatically applied during builds - no manual intervention required
- The project uses Lefthook instead of Husky for Git hooks
- PostHog analytics and Sentry error monitoring are pre-configured but optional

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
