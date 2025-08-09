# Context Management Rules

## Priority Context Files
Always prioritize these files when building context for AI assistance:

1. **CLAUDE.md** - Project instructions and development commands
2. **src/models/Schema.ts** - Database schema and data models
3. **package.json** - Dependencies and available scripts
4. **src/utils/AppConfig.ts** - Application configuration
5. **src/libs/** - Core library configurations (Auth, DB, I18n)
6. **src/validations/** - Data validation schemas

## Context Optimization Strategies

### For Feature Development
- Include relevant existing components in `src/components/`
- Load related API routes in `src/app/api/`
- Include validation schemas for data handling
- Reference internationalization files for UI text

### For Bug Fixes
- Load error logs and stack traces
- Include failing test files
- Load related components and their dependencies
- Include recent git changes that might be related

### for Database Changes
- Always load current schema: `src/models/Schema.ts`
- Include existing migrations in `migrations/`
- Load related API routes that use affected tables
- Include validation schemas that might need updates

### For Testing
- Load the component or feature being tested
- Include related test files (unit, integration, e2e)
- Load mock data and test utilities
- Include Storybook stories if they exist

## File Exclusion Rules

### Always Exclude
- `node_modules/` - Too large, not relevant for development
- `local.db/` - Database files, not code
- `.next/` - Build artifacts
- `coverage/` - Test coverage reports
- Large binary files (images, videos)

### Conditionally Exclude
- `tests/e2e/` - Only include when working on E2E tests
- `public/assets/` - Only include when working on static assets
- Old migration files - Only include recent migrations unless specifically needed

## Context Truncation Strategy

### High Priority (Never Truncate)
- Current file being edited
- CLAUDE.md project instructions
- Package.json and configuration files
- Database schema
- Type definitions and interfaces

### Medium Priority (Truncate if Needed)
- Related components and utilities
- Test files
- API routes not directly involved
- Documentation files

### Low Priority (Truncate First)
- Unrelated components
- Old test files
- Build configuration
- Static assets

## Smart Context Loading

### For API Development
1. Load target API route file
2. Load related database schema sections
3. Load validation schemas
4. Load authentication middleware if needed
5. Load related test files

### For Component Development
1. Load target component file
2. Load parent/child components if applicable
3. Load related types and interfaces
4. Load styling dependencies (Tailwind components)
5. Load Storybook stories
6. Load component tests

### For Database Work
1. Load complete schema file
2. Load related migration files
3. Load API routes using affected tables
4. Load validation schemas
5. Load database configuration

## Context Freshness
- Prioritize recently modified files
- Include git diff information when relevant
- Load current branch context for feature work
- Include recent commit messages for understanding changes

## Error Context Enhancement
When errors occur:
- Load error logs and stack traces
- Include related source files from stack trace
- Load test files that might be failing
- Include configuration files that might affect the error
- Load recent changes that might have introduced the issue
