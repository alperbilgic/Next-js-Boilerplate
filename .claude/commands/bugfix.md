# Bug Investigation & Resolution Workflow

Systematic approach to bug investigation, reproduction, and resolution with comprehensive testing.

## Usage
```
/bugfix [bug-description] [severity-level]
```

## Workflow Steps

### 1. Bug Investigation & Analysis
- Analyze bug report and gather reproduction steps
- Review error logs and stack traces in Sentry
- Identify affected components, APIs, or database operations
- Determine potential root causes and scope of impact
- Check if issue affects multiple environments or user groups

### 2. Reproduction & Validation
- Create minimal reproduction case
- Write failing test cases that demonstrate the bug
- Validate bug exists in current codebase
- Document exact conditions that trigger the issue
- Assess severity and priority for fix

### 3. Root Cause Analysis
- Trace execution flow to identify the source
- Review recent changes that might have introduced the bug
- Check for related issues in dependencies
- Analyze database queries and data integrity
- Review authentication and authorization flows if applicable

### 4. Fix Implementation
- Implement targeted fix with minimal side effects
- Ensure fix follows existing code patterns and conventions
- Add proper error handling and logging
- Update type definitions if necessary
- Consider edge cases and potential regression scenarios

### 5. Testing & Validation
- Update or create unit tests to cover the fix
- Add regression tests to prevent future occurrences
- Run full test suite: `npm test` and `npm run test:e2e`
- Test fix across different browsers and devices
- Validate fix doesn't break existing functionality

### 6. Quality Assurance
- Run `npm run lint` and `npm run check:types`
- Check performance impact of the fix
- Verify accessibility is maintained
- Test internationalization if UI changes are involved
- Review fix with security considerations

### 7. Documentation & Monitoring
- Document fix in commit message following conventional commits
- Add code comments explaining complex fix logic
- Update relevant documentation if behavior changes
- Set up monitoring to detect similar issues in the future
- Consider if fix suggests broader architectural improvements

## Automated Validation
- Regression test execution
- Performance impact analysis
- Security vulnerability check
- Code quality validation
- Cross-browser compatibility testing

## Escalation Criteria
- Critical security vulnerabilities
- Data integrity issues
- Performance degradation > 20%
- Breaking changes to public APIs
- Issues affecting user authentication

This workflow ensures thorough bug resolution while maintaining code quality and preventing regressions.
