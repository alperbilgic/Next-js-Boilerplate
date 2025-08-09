# Code Refactoring Workflow

Systematic approach to code refactoring with safety checks, testing, and performance validation.

## Usage
```
/refactor [target] [refactor-type] [--scope=component|module|app]
```

## Workflow Steps

### 1. Refactoring Analysis & Planning
- Identify code smells and improvement opportunities
- Analyze dependencies and impact scope
- Review existing tests and coverage for target code
- Plan refactoring strategy with minimal risk
- Document current behavior for validation

### 2. Pre-Refactoring Safety Measures
- Create comprehensive test coverage for existing functionality
- Document current API contracts and behavior
- Take performance baseline measurements
- Identify all consumers of the code being refactored
- Create rollback plan and checkpoints

### 3. Code Structure Analysis
- Review architectural patterns and design principles
- Identify opportunities for better separation of concerns
- Analyze component composition and prop drilling issues
- Check for code duplication and reusability opportunities
- Evaluate TypeScript type definitions for improvement

### 4. Incremental Refactoring Implementation
- Apply single responsibility principle improvements
- Extract reusable components and utilities
- Improve type definitions and interfaces
- Enhance error handling and edge case management
- Optimize performance bottlenecks

### 5. API Design Improvements
- Refactor API routes for better RESTful design
- Improve request/response schemas and validation
- Enhance error handling and status codes
- Optimize database queries and reduce N+1 problems
- Implement proper caching strategies

### 6. Component Architecture Refinement
- Improve component composition and reusability
- Optimize prop interfaces and default values
- Enhance accessibility and internationalization support
- Implement proper loading and error states
- Optimize rendering performance and memoization

### 7. Database Schema Optimization
- Review and optimize table structures
- Add proper indexes for query performance
- Implement data normalization where beneficial
- Optimize foreign key relationships
- Plan migration strategy for schema changes

### 8. Testing & Validation
- Update existing tests to match refactored code
- Add new tests for improved functionality
- Run full test suite to ensure no regressions
- Validate performance improvements or maintenance
- Test edge cases and error conditions

### 9. Performance Impact Assessment
- Measure performance before and after changes
- Analyze bundle size impact
- Check runtime performance and memory usage
- Validate database query performance improvements
- Test loading times and user experience metrics

### 10. Documentation & Code Review
- Update code documentation and comments
- Review TypeScript interfaces and type exports
- Update Storybook stories for refactored components
- Prepare detailed refactoring summary
- Schedule code review with team members

## Refactoring Types

### Component Refactoring
- Extract custom hooks for reusable logic
- Improve prop interfaces and component composition
- Optimize rendering performance with React.memo
- Enhance accessibility and keyboard navigation
- Implement better error boundaries

### API Refactoring
- Improve route organization and naming
- Optimize database queries and transactions
- Enhance input validation and error responses
- Implement proper authentication middleware
- Add comprehensive logging and monitoring

### Database Refactoring
- Normalize data structures for better performance
- Add indexes for frequently queried fields
- Optimize foreign key relationships
- Implement proper constraints and validations
- Plan data migration strategies

### Architecture Refactoring
- Improve module organization and imports
- Implement better separation of concerns
- Optimize dependency injection and service layer
- Enhance configuration management
- Improve testing architecture and mocks

## Safety Protocols
- Never refactor without comprehensive test coverage
- Always maintain backward compatibility when possible
- Implement changes incrementally with validation points
- Keep detailed change logs for rollback procedures
- Validate performance impact at each step

## Quality Metrics
- Code complexity reduction (cyclomatic complexity)
- Test coverage maintenance or improvement
- Performance metrics (loading time, bundle size)
- Code maintainability index improvement
- Developer experience enhancement

This workflow ensures safe, systematic code refactoring that improves code quality while maintaining functionality and performance.
