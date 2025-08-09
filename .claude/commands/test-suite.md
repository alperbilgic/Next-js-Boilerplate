# Comprehensive Testing Automation Workflow

Automated test suite execution, analysis, and optimization for complete application coverage.

## Usage
```
/test-suite [scope] [--fix-failures]
```

## Workflow Steps

### 1. Test Environment Setup
- Verify test database configuration and migrations
- Ensure test environment variables are properly set
- Start necessary services (database, email server mocks)
- Clear any existing test artifacts and cache
- Validate test data setup and seed data

### 2. Unit Testing Execution
- Run unit tests with Vitest: `npm test`
- Test individual components, utilities, and services
- Validate TypeScript type definitions and interfaces
- Check code coverage and identify gaps
- Generate test reports and coverage analysis

### 3. Integration Testing
- Run integration tests for API endpoints
- Test database operations and schema validation
- Validate authentication and authorization flows
- Test email functionality with mock services
- Check external service integrations and error handling

### 4. Component Testing with Storybook
- Run Storybook tests: `npm run storybook:test`
- Validate component rendering and interactions
- Test component states and prop variations
- Check accessibility compliance for all components
- Validate responsive design across different viewports

### 5. End-to-End Testing
- Execute Playwright E2E tests: `npm run test:e2e`
- Test complete user workflows and journeys
- Validate authentication flows (sign-up, sign-in, password reset)
- Test internationalization across all supported locales
- Check performance and loading times

### 6. Visual Regression Testing
- Compare screenshots for UI consistency
- Validate component visual states
- Check responsive design across devices
- Test dark/light theme variations if applicable
- Document any intentional visual changes

### 7. Performance Testing
- Analyze bundle size and loading performance
- Test API response times and database query performance
- Check memory usage and potential leaks
- Validate lazy loading and code splitting effectiveness
- Run lighthouse audits for web vitals

### 8. Security Testing
- Run dependency vulnerability scans
- Test input validation and sanitization
- Validate authentication security measures
- Check for potential XSS and CSRF vulnerabilities
- Test rate limiting and bot protection features

### 9. Test Results Analysis
- Aggregate test results from all testing phases
- Identify failing tests and categorize by severity
- Generate comprehensive test reports
- Document performance metrics and trends
- Create actionable recommendations for improvements

### 10. Automated Fix Application (if --fix-failures flag used)
- Automatically fix linting and formatting issues
- Update snapshots for intentional UI changes
- Regenerate type definitions if schema changed
- Apply simple automated fixes for common test failures
- Create tickets for complex issues requiring manual intervention

## Coverage Requirements
- Unit tests: Minimum 80% code coverage
- Integration tests: All API endpoints covered
- E2E tests: Critical user paths validated
- Component tests: All public components tested
- Security tests: OWASP Top 10 vulnerabilities checked

## Reporting
- Generate HTML test reports with coverage details
- Create performance benchmarking reports
- Export test results to CI/CD pipeline
- Send notifications for critical test failures
- Update project health dashboard

This comprehensive testing workflow ensures high code quality, reliability, and performance across the entire application.
