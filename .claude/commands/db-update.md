# Database Schema & Migration Management Workflow

Comprehensive workflow for database schema updates, migration generation, and data integrity validation.

## Usage
```
/db-update [schema-changes] [--dry-run] [--rollback-plan]
```

## Workflow Steps

### 1. Schema Analysis & Planning
- Review current database schema in `src/models/Schema.ts`
- Analyze proposed changes and their impact
- Identify potential breaking changes and dependencies
- Plan migration strategy with minimal downtime
- Document expected data transformation requirements

### 2. Schema Design & Validation
- Update schema definitions in `src/models/Schema.ts`
- Ensure proper TypeScript type definitions
- Validate foreign key relationships and constraints
- Check for proper indexing on frequently queried fields
- Review data types and column constraints

### 3. Migration Generation
- Generate migration files: `npm run db:generate`
- Review generated SQL for correctness and safety
- Validate migration includes proper rollback procedures
- Check for potential data loss or corruption risks
- Ensure migration is idempotent and rerunnable

### 4. Development Environment Testing
- Apply migration to development database
- Test schema changes with existing application code
- Validate all database operations continue to work
- Check performance impact of schema changes
- Test data integrity and constraint validation

### 5. Data Migration Planning (if applicable)
- Plan data transformation scripts for existing records
- Identify records that need updating or restructuring
- Create data validation scripts to verify transformations
- Plan for handling of invalid or corrupted data
- Estimate migration time for production datasets

### 6. Application Code Updates
- Update database queries to work with new schema
- Modify API endpoints to handle schema changes
- Update validation schemas in `src/validations/`
- Adjust TypeScript interfaces and types
- Update component logic that interacts with changed data

### 7. Comprehensive Testing
- Run unit tests to ensure database operations work
- Test integration scenarios with new schema
- Validate API endpoints with updated data structures
- Run E2E tests to ensure user workflows continue working
- Test error handling for edge cases and constraints

### 8. Performance Impact Assessment
- Analyze query performance with new schema
- Validate indexes are properly utilized
- Check for N+1 query issues with new relationships
- Measure migration execution time estimate
- Test database backup and restore procedures

### 9. Staging Environment Validation
- Apply migration to staging environment
- Test with production-like data volumes
- Validate application performance with real data
- Test rollback procedures thoroughly
- Verify monitoring and alerting work properly

### 10. Production Migration Planning
- Schedule maintenance window if required
- Prepare detailed migration execution plan
- Set up monitoring for migration progress
- Prepare rollback procedures and triggers
- Notify stakeholders of planned changes

## Safety Protocols

### Pre-Migration Checklist
- [ ] Complete database backup created
- [ ] Migration tested in development and staging
- [ ] Rollback procedures validated
- [ ] Application code updated and tested
- [ ] Performance impact assessed
- [ ] Team approval obtained
- [ ] Monitoring and alerting configured

### Migration Execution
- Monitor migration progress and performance
- Watch for lock contention and blocking queries
- Validate data integrity during migration
- Check application health and error rates
- Be ready to halt migration if issues arise

### Post-Migration Validation
- Verify all data migrated correctly
- Test application functionality end-to-end
- Monitor performance metrics and query times
- Validate backup and restore procedures
- Document lessons learned and improvements

## Common Migration Patterns

### Adding Columns
- Add columns as nullable initially
- Populate data in separate transaction
- Add constraints after data population
- Update application code to use new columns

### Removing Columns
- Stop using column in application code first
- Deploy application changes before migration
- Remove column in separate migration
- Clean up related indexes and constraints

### Changing Data Types
- Add new column with desired type
- Populate new column with converted data
- Update application to use new column
- Remove old column in separate migration

### Table Restructuring
- Create new table structure
- Migrate data with validation
- Update application to use new table
- Remove old table after validation

## Rollback Procedures
- Always have automated rollback scripts ready
- Test rollback procedures in staging environment
- Document rollback decision criteria
- Prepare data recovery procedures
- Keep migration logs for troubleshooting

This workflow ensures safe, reliable database schema updates with comprehensive testing and validation procedures.
