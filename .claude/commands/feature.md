# Feature Development Workflow

Complete feature development workflow from planning to deployment-ready implementation.

## Usage
```
/feature [feature-name] [description]
```

## Workflow Steps

### 1. Feature Planning & Analysis
- Analyze feature requirements and acceptance criteria
- Review existing codebase for integration points
- Identify required database schema changes
- Plan component architecture and API endpoints
- Estimate testing requirements

### 2. Backend Implementation
- Design and implement API routes in `src/app/api/`
- Create or modify database schemas in `src/models/Schema.ts`
- Generate database migrations with `npm run db:generate`
- Implement authentication and authorization logic if needed
- Create validation schemas in `src/validations/`

### 3. Frontend Implementation
- Create React components in `src/components/`
- Implement forms with React Hook Form and Zod validation
- Add proper TypeScript types in `src/types/`
- Implement responsive design with Tailwind CSS
- Add internationalization support with proper locale files

### 4. Testing Implementation
- Write unit tests for new components and utilities
- Create integration tests for API endpoints
- Implement E2E test scenarios with Playwright
- Add Storybook stories for components
- Ensure test coverage meets project standards

### 5. Quality Assurance
- Run `npm run lint` and fix any linting issues
- Run `npm run check:types` and resolve type errors
- Run `npm test` and ensure all tests pass
- Run `npm run test:e2e` for end-to-end validation
- Check bundle size impact with `npm run build-stats`

### 6. Documentation & Finalization
- Update component documentation and JSDoc comments
- Add feature to Storybook if applicable
- Update internationalization files for all supported locales
- Verify accessibility compliance
- Prepare feature for code review

## Automated Checks
- Lint and type checking via Lefthook pre-commit hooks
- Automated test execution
- Bundle size analysis
- Security vulnerability scanning
- Performance impact assessment

## Integration Points
- Database: Automatic migration application
- Authentication: Better Auth integration validation
- UI: Shadcn/ui component consistency
- i18n: Multi-locale support verification
- Testing: Comprehensive coverage validation

This workflow ensures consistent, high-quality feature development following all project conventions and best practices.
