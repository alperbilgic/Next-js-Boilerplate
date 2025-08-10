# Feature Development Workflow

This workflow coordinates multiple agents to implement complex features end-to-end.

## Workflow Steps

### Phase 1: Architecture & Design (Sequential)
1. **backend-architect** - Design API endpoints, database schema, and server-side logic
2. **product-design-expert** - Create UX/UI design specifications and user flows
3. **security-auditor** - Review architectural security implications and requirements

### Phase 2: Implementation (Parallel)
1. **migration-specialist** - Implement database schema changes and migrations
2. **frontend-developer** - Build UI components and client-side functionality
3. **backend-architect** - Implement API endpoints and server-side logic

### Phase 3: Quality Assurance (Sequential)
1. **test-engineer** - Create comprehensive test suite (unit, integration, E2E)
2. **code-reviewer** - Review all code for quality, performance, and maintainability
3. **security-auditor** - Conduct security audit of implementation

### Phase 4: Deployment (Sequential)
1. **deployment-orchestrator** - Prepare deployment pipeline and production setup
2. **test-engineer** - Run full test suite and validate deployment readiness
3. **deployment-orchestrator** - Execute deployment with monitoring

## Coordination Rules

- Each agent receives context from previous agents' work
- Parallel agents coordinate through shared specifications
- Critical issues trigger workflow pause for resolution
- Each phase has exit criteria that must be met before proceeding

## Usage

```
Please implement [feature description] using the feature-development workflow
```
