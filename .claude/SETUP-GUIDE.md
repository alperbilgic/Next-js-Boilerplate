# Claude Code AI Development Environment Setup Guide

This guide walks you through setting up and using the comprehensive AI development environment for automated code generation without human intervention.

## 🎯 Overview

This setup provides:
- **7 Specialized AI Subagents** for different development tasks
- **6 Automated Workflow Commands** for common development scenarios
- **4 Enhancement Hooks** for optimized AI performance
- **Project-Specific Integrations** tailored to this Next.js stack
- **Zero Human Intervention** automation for most development tasks

## 📋 Prerequisites

1. **Claude Code CLI** installed and authenticated
2. **Node.js 18+** and npm
3. **Git** configured with proper credentials
4. **PostgreSQL** (for production) or PGlite (for development)

## 🚀 Installation Steps

### Step 1: Verify Claude Code Installation

```bash
# Check Claude Code is installed
claude --version

# Check authentication
claude auth status
```

### Step 2: Environment Variables Setup

Create `.env.local` file in project root:

```bash
# Copy the example and fill in your values
cp .env.example .env.local

# Edit the file with your configuration
nano .env.local
```

**Required Variables:**
```bash
BETTER_AUTH_SECRET="your-32-character-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"
```

**Optional but Recommended:**
```bash
# GitHub integration (for MCP server)
GITHUB_PERSONAL_ACCESS_TOKEN="ghp_your_token_here"

# Database (if not using local PGlite)
DATABASE_URL="postgresql://user:pass@localhost:5432/dbname"

# Email service (for authentication)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="noreply@yourapp.com"
```

### Step 3: MCP Server Configuration

The MCP servers will be automatically configured. To test:

```bash
# Verify MCP servers are accessible
claude --mcp-debug
```

### Step 4: Make Hooks Executable

```bash
# Ensure all hooks are executable
chmod +x .claude/hooks/*.sh
```

### Step 5: Test the Setup

```bash
# Start development server
npm run dev

# In another terminal, test Claude Code integration
claude --dangerously-skip-permissions
> /feature test-setup "Testing the AI development environment setup"
```

## 🧪 Testing Your Setup

### Basic Functionality Test

```bash
# Test context optimization
.claude/hooks/context-optimization.sh

# Test quality checks
.claude/hooks/auto-quality-check.sh

# Test commit optimization
.claude/hooks/commit-optimization.sh suggest
```

### MCP Server Test

```bash
# Start Claude Code with debug mode
claude --mcp-debug

# Try using different MCP tools
> Use the GitHub MCP server to list repositories
> Use the PostgreSQL MCP server to describe the database schema
> Use the file system MCP server to read the project structure
```

### Subagent Activation Test

```bash
# Test different subagents by asking relevant questions
claude

> "Review this component for security issues" (should activate security-auditor)
> "Help me design an API for user management" (should activate backend-architect)
> "Create tests for the authentication flow" (should activate test-engineer)
> "Optimize this component's performance" (should activate code-reviewer)
```

## 🔄 Workflow Examples

### Example 1: Complete Feature Development

```bash
claude
> /feature user-dashboard "Create a user dashboard with profile editing and activity history"
```

**What happens automatically:**
1. Backend-architect designs API endpoints
2. Migration-specialist creates database schema
3. Frontend-developer builds React components
4. Test-engineer creates comprehensive tests
5. Code-reviewer validates code quality
6. Quality checks run automatically
7. Documentation is updated

### Example 2: Bug Investigation and Fix

```bash
claude
> /bugfix "Users can't upload avatars, getting 500 error" critical
```

**What happens automatically:**
1. Error investigation with logs analysis
2. Code review of related components
3. Test creation to reproduce the bug
4. Implementation of the fix
5. Regression test creation
6. Quality validation
7. Security review of the fix

### Example 3: Database Schema Update

```bash
claude
> /db-update "Add user preferences table with settings for notifications and theme"
```

**What happens automatically:**
1. Schema design with proper relationships
2. Migration generation with rollback plan
3. API endpoints for CRUD operations
4. Validation schema creation
5. Test coverage for new functionality
6. Performance impact analysis
7. Documentation updates

## 🎛️ Configuration Customization

### Adjusting Automation Level

Edit `.claude/settings.json`:

```json
{
  "automation": {
    "autoLint": true, // Auto-run linting
    "autoTest": false, // Don't auto-run all tests (can be slow)
    "autoCommit": false, // Don't auto-commit changes
    "skipPromptOnSafeOperations": true // Skip confirmations for safe ops
  }
}
```

### Customizing Subagent Behavior

Edit individual agent files in `.claude/agents/`:

```markdown
## Activation Patterns
This agent is automatically invoked for tasks involving:
- Your custom activation patterns here
```

### Adding Custom Slash Commands

Create new command files in `.claude/commands/`:

```markdown
# Custom Workflow Name

Description of your custom workflow.

## Usage
```
/custom-command [parameters]
```

## Workflow Steps
1. Step one
2. Step two
...
```

## 🛠️ Advanced Configuration

### Performance Tuning

Edit `.claude/settings.json` for performance:

```json
{
  "context": {
    "maxContextLength": 200000, // Adjust based on usage
    "smartTruncation": true, // Enable intelligent context trimming
    "prioritizeRecent": true // Focus on recent changes
  },
  "tools": {
    "bash": {
      "timeoutMs": 300000 // 5 minutes for long operations
    }
  }
}
```

### Security Configuration

Review `.claude/agents/security-auditor.md` and customize:

```markdown
## Security Standards
- Your organization's security requirements
- Specific compliance requirements (GDPR, HIPAA, etc.)
- Custom vulnerability patterns to check
```

### Environment-Specific Settings

Edit `.claude/environment-config.json`:

```json
{
  "environments": {
    "yourCustomEnv": {
      "database": {
        "type": "YourDatabase",
        "customSettings": true
      }
    }
  }
}
```

## 📊 Monitoring and Analytics

### Setup Monitoring

1. **Error Tracking**: Sentry integration is pre-configured
2. **Analytics**: PostHog integration available
3. **Performance**: Built-in bundle analysis
4. **Code Quality**: Automated quality reports

### Viewing Reports

```bash
# Bundle analysis
npm run build-stats

# Test coverage
npm test -- --coverage

# Dependency analysis
npm run check:deps

# Security audit
npm audit
```

## 🚨 Troubleshooting

### Common Issues

**Issue: MCP servers not connecting**
```bash
# Check environment variables
echo $GITHUB_PERSONAL_ACCESS_TOKEN

# Test MCP configuration
claude --mcp-debug
```

**Issue: Hooks not executing**
```bash
# Check permissions
ls -la .claude/hooks/

# Fix permissions
chmod +x .claude/hooks/*.sh
```

**Issue: Context too large warnings**
```bash
# Review context rules
cat .claude/context-rules.md

# Clean up large files
.claude/hooks/context-optimization.sh
```

**Issue: Quality checks failing**
```bash
# Run manual quality checks
npm run lint
npm run check:types
npm test

# Fix issues automatically where possible
npm run lint:fix
```

### Debug Mode

Run Claude Code with debug information:

```bash
# Enable debug mode
claude --mcp-debug --verbose

# Check hook execution logs
tail -f ~/.claude/hooks.log
```

### Getting Help

1. **Check Documentation**: Review all `.md` files in `.claude/`
2. **Test Individual Components**: Run hooks and commands manually
3. **Review Project Documentation**: Check `CLAUDE.md` for project-specific info
4. **Validate Environment**: Ensure all required environment variables are set

## 🎉 Success Indicators

You'll know your setup is working when:

- ✅ Slash commands execute complete workflows automatically
- ✅ Subagents are activated based on task context
- ✅ Quality checks run automatically after code changes
- ✅ MCP servers provide enhanced functionality
- ✅ Code generation follows project conventions
- ✅ Tests are automatically created and pass
- ✅ Documentation is updated automatically

## 🔄 Next Steps

Once setup is complete:

1. **Practice with Simple Tasks**: Try `/feature` command with a simple feature
2. **Customize for Your Needs**: Adjust agent behaviors and add custom workflows
3. **Monitor Performance**: Use the built-in analytics and monitoring
4. **Iterate and Improve**: Refine the configuration based on your development patterns

---

This comprehensive setup enables truly automated development workflows while maintaining high code quality and following best practices. The AI agents will handle the complexity, allowing you to focus on high-level feature design and business logic.
