# Deployment Preparation Workflow

Complete pre-deployment validation and optimization workflow ensuring production readiness.

## Usage
```
/deploy-prep [environment] [--auto-fix]
```

## Workflow Steps

### 1. Code Quality Validation
- Run comprehensive linting: `npm run lint`
- Perform TypeScript type checking: `npm run check:types`
- Check for unused dependencies: `npm run check:deps`
- Validate internationalization files: `npm run check:i18n`
- Review code for security vulnerabilities

### 2. Build Optimization
- Generate production build: `npm run build`
- Analyze bundle size: `npm run build-stats`
- Verify no build warnings or errors
- Check for optimal code splitting and lazy loading
- Validate static generation and ISR configuration

### 3. Test Suite Execution
- Run full unit test suite: `npm test`
- Execute E2E tests: `npm run test:e2e`
- Validate Storybook tests: `npm run storybook:test`
- Check test coverage meets minimum requirements
- Verify all critical user paths are tested

### 4. Database Migration Validation
- Generate any pending migrations: `npm run db:generate`
- Validate migration files for production safety
- Test migration rollback procedures
- Check for breaking schema changes
- Ensure data integrity during migration process

### 5. Security Assessment
- Run dependency vulnerability scan
- Validate environment variable configuration
- Check for exposed secrets or sensitive data
- Verify authentication and authorization flows
- Test rate limiting and bot protection

### 6. Performance Optimization
- Analyze Core Web Vitals metrics
- Validate image optimization and lazy loading
- Check API response times and caching strategies
- Verify CDN configuration and asset optimization
- Test performance across different network conditions

### 7. Environment Configuration
- Validate production environment variables
- Check database connection strings and credentials
- Verify third-party service integrations
- Test email service configuration
- Validate monitoring and logging setup

### 8. Documentation Updates
- Update deployment documentation
- Check API documentation is current
- Verify changelog and release notes
- Update environment setup instructions
- Document any new configuration requirements

### 9. Monitoring & Alerting Setup
- Configure error monitoring with Sentry
- Set up performance monitoring with PostHog
- Validate log aggregation and analysis
- Configure deployment health checks
- Set up alerting for critical metrics

### 10. Deployment Checklist Validation
- Verify all pre-deployment requirements met
- Check backup and rollback procedures
- Validate deployment scripts and automation
- Confirm maintenance window scheduling
- Prepare incident response procedures

## Automated Fixes (if --auto-fix flag used)
- Fix linting errors automatically: `npm run lint:fix`
- Update lockfile and dependencies
- Regenerate TypeScript declarations
- Update bundle analysis reports
- Apply security patches for non-breaking updates

## Pre-Deployment Checklist
- [ ] All tests passing
- [ ] Build successful with no warnings
- [ ] Bundle size within acceptable limits
- [ ] Database migrations tested
- [ ] Environment variables configured
- [ ] Security scan completed
- [ ] Performance benchmarks met
- [ ] Monitoring configured
- [ ] Rollback plan prepared
- [ ] Team notified of deployment

## Risk Assessment
- Evaluate change impact and rollback complexity
- Identify potential breaking changes
- Assess performance impact predictions
- Review security implications
- Consider user experience impact

This workflow ensures comprehensive deployment preparation with automated validation and optimization for production environments.
