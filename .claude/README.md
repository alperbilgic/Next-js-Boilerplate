# Claude Code AI Development Environment

This directory contains a comprehensive AI development environment setup for Claude Code, specifically optimized for this Next.js boilerplate project.

## 🚀 Quick Start

1. **Install Claude Code** (if not already installed)
2. **Setup Environment Variables** (see Environment Setup below)
3. **Test the Setup**: Run `/feature test-feature "Testing Claude setup"`
4. **Start Developing**: Use slash commands and let Claude handle the automation!

## 📁 Directory Structure

```
.claude/
├── settings.json           # Core Claude configuration
├── agents/                 # Specialized AI subagents
│   ├── backend-architect.md
│   ├── frontend-developer.md
│   ├── test-engineer.md
│   ├── code-reviewer.md
│   ├── migration-specialist.md
│   ├── deployment-orchestrator.md
│   └── security-auditor.md
├── commands/              # Automated workflow commands
│   ├── feature.md
│   ├── bugfix.md
│   ├── test-suite.md
│   ├── deploy-prep.md
│   ├── refactor.md
│   └── db-update.md
├── hooks/                 # Automation enhancement hooks
│   ├── context-optimization.sh
│   ├── web-content-enhancement.sh
│   ├── auto-quality-check.sh
│   └── commit-optimization.sh
├── workflows/             # Development pattern templates
│   ├── authentication-flow.md
│   └── database-development.md
├── project-config.json    # Project-specific configuration
├── context-rules.md       # Context management optimization
├── environment-config.json # Environment-specific settings
└── README.md             # This file
```

## ⚙️ Environment Setup

### Required Environment Variables

Create a `.env.local` file with:

```bash
# Core Authentication
BETTER_AUTH_SECRET="your-32-character-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# Database (optional for local development)
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Email Service
SMTP_HOST="your-smtp-host"
SMTP_PORT="587"
SMTP_USER="your-smtp-username"
SMTP_PASSWORD="your-smtp-password"
SMTP_FROM="noreply@yourdomain.com"

# GitHub Integration (for MCP)
GITHUB_PERSONAL_ACCESS_TOKEN="your-github-token"

# Optional Services
ARCJET_KEY="your-arcjet-key"
NEXT_PUBLIC_POSTHOG_KEY="your-posthog-key"
SENTRY_DSN="your-sentry-dsn"
```

### MCP Server Setup

The `.mcp.json` configuration will automatically set up these essential MCP servers:
- **GitHub**: Repository management and PR automation
- **PostgreSQL**: Database operations and query assistance
- **File System**: Enhanced file operations
- **Puppeteer**: Browser automation for testing
- **TypeScript**: Advanced TypeScript assistance
- **Git**: Repository operations

## 🤖 Available Subagents

### Backend Architect
- API route design and implementation
- Database schema design with Drizzle ORM
- Server-side authentication with Better Auth
- Performance optimization for backend operations

### Frontend Developer
- React component development
- UI/UX implementation with Tailwind CSS
- Form handling with React Hook Form and Zod
- Internationalization support

### Test Engineer
- Unit testing with Vitest
- E2E testing with Playwright
- Integration testing for APIs
- Test automation and CI/CD integration

### Code Reviewer
- Code quality assessment
- Security vulnerability detection
- Performance optimization analysis
- Best practices validation

### Migration Specialist
- Database schema changes
- Migration generation and validation
- Data integrity management
- Rollback procedures

### Deployment Orchestrator
- Build optimization and bundle analysis
- CI/CD pipeline design
- Environment configuration management
- Deployment strategy planning

### Security Auditor
- Security vulnerability assessment
- Authentication flow reviews
- Input validation implementation
- Compliance requirement validation

## 📋 Available Slash Commands

### `/feature [name] [description]`
Complete feature development workflow from planning to testing.

### `/bugfix [description] [severity]`
Systematic bug investigation, reproduction, and resolution.

### `/test-suite [scope] [--fix-failures]`
Comprehensive testing automation with coverage analysis.

### `/deploy-prep [environment] [--auto-fix]`
Pre-deployment validation and optimization workflow.

### `/refactor [target] [type] [--scope]`
Safe code refactoring with performance validation.

### `/db-update [changes] [--dry-run]`
Database schema and migration management workflow.

## 🔧 Automation Features

### Context Optimization
- Automatic cleanup of temporary files
- Smart context loading based on task type
- Ripgrep integration for faster searches

### Quality Assurance
- Automatic linting and type checking
- Bundle size analysis
- Security vulnerability scanning
- Performance impact assessment

### Commit Enhancement
- Conventional commit format validation
- Automatic commit message enhancement
- Pre-commit quality checks
- Change analysis and suggestion

### Web Content Enhancement
- Optimized documentation scraping
- GitHub repository content extraction
- API documentation processing

## 🎯 Usage Examples

### Developing a New Feature
```bash
# Claude automatically handles the full workflow
/feature user-profile "Add user profile management with avatar upload"
```

### Fixing a Critical Bug
```bash
# Comprehensive bug investigation and resolution
/bugfix "Authentication fails after password reset" high
```

### Preparing for Deployment
```bash
# Complete pre-deployment validation
/deploy-prep production --auto-fix
```

### Database Schema Updates
```bash
# Safe database schema changes
/db-update "Add user preferences table with foreign key to users" --dry-run
```

## 🚨 Important Notes

### No Human Intervention Mode
This setup is optimized for automated code generation without human intervention:
- All quality checks are automated
- Error detection and resolution patterns are built-in
- Self-healing code quality mechanisms
- Proactive performance optimization

### Safety Measures
- Always runs tests before considering tasks complete
- Validates code quality with linting and type checking
- Includes rollback procedures for database changes
- Security scanning for vulnerabilities

### Performance Optimization
- Smart context management to reduce token usage
- Prioritized file loading for relevant information
- Efficient search patterns with ripgrep
- Bundle size monitoring and optimization

## 🔄 Integration with Project Stack

This setup is specifically tailored for:
- **Next.js 15+** with App Router
- **TypeScript** with strict mode
- **Tailwind CSS 4** for styling
- **Better Auth** for authentication
- **Drizzle ORM** with PostgreSQL
- **Vitest** for unit testing
- **Playwright** for E2E testing
- **Sentry** for error monitoring
- **PostHog** for analytics

## 📚 Further Reading

- [Project Development Commands](../CLAUDE.md) - Available npm scripts and commands
- [Authentication Workflow](workflows/authentication-flow.md) - Better Auth integration patterns
- [Database Development](workflows/database-development.md) - Drizzle ORM best practices
- [Context Management](context-rules.md) - AI context optimization strategies

## 🆘 Troubleshooting

### Common Issues
1. **MCP servers not connecting**: Check environment variables and permissions
2. **Hooks not executing**: Ensure hook files are executable (`chmod +x`)
3. **Context too large**: Review context-rules.md for optimization strategies
4. **Tests failing**: Run quality checks manually first

### Getting Help
- Check the project's CLAUDE.md for specific commands
- Review hook logs for automation issues
- Use the code-reviewer agent for quality issues
- Consult the security-auditor for security concerns

---

This AI development environment transforms your development workflow with intelligent automation, comprehensive quality assurance, and seamless integration with the project's technology stack.
