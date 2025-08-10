# Bug Fix Workflow

Coordinates multiple agents to diagnose and fix bugs systematically.

## Workflow Steps

### Phase 1: Investigation (Parallel)
1. **code-reviewer** - Analyze code for potential issues and root causes
2. **test-engineer** - Review test coverage and identify missing test scenarios
3. **security-auditor** - Check if bug has security implications

### Phase 2: Root Cause Analysis (Sequential)
1. **[specialized-agent]** - Primary agent based on bug domain (frontend/backend/database)
2. **code-reviewer** - Validate root cause analysis and proposed solution

### Phase 3: Implementation (Sequential)
1. **[specialized-agent]** - Implement the fix
2. **test-engineer** - Add tests to prevent regression
3. **code-reviewer** - Review fix implementation

### Phase 4: Validation (Parallel)
1. **test-engineer** - Run comprehensive test suite
2. **security-auditor** - Validate security implications of fix
3. **deployment-orchestrator** - Prepare hotfix deployment if critical

## Agent Selection Logic

- **Frontend bugs**: frontend-developer + code-reviewer
- **Backend bugs**: backend-architect + security-auditor
- **Database bugs**: migration-specialist + code-reviewer
- **Performance bugs**: All agents for comprehensive analysis
- **Security bugs**: security-auditor leads with support from others

## Usage

```
Please fix [bug description] using the bug-fix workflow
```
