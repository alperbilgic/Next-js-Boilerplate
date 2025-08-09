#!/bin/bash

# Commit Optimization Hook
# Enhances git commit process with automatic checks and conventional commit formatting

echo "📝 Optimizing commit process..."

# Function to validate conventional commit format
validate_commit_format() {
    local message="$1"
    local pattern="^(feat|fix|docs|style|refactor|perf|test|chore|ci|build)(\(.+\))?: .{1,50}"
    
    if [[ "$message" =~ $pattern ]]; then
        echo "✅ Commit message follows conventional commits format"
        return 0
    else
        echo "⚠️  Consider using conventional commits format: type(scope): description"
        echo "   Examples: feat(auth): add password reset functionality"
        echo "            fix(ui): resolve button alignment issue"
        return 1
    fi
}

# Function to suggest commit type based on file changes
suggest_commit_type() {
    local changes=$(git diff --cached --name-only 2>/dev/null || echo "")
    
    if [[ -z "$changes" ]]; then
        echo "No staged changes found"
        return 1
    fi
    
    echo "📂 Analyzing staged changes:"
    echo "$changes" | head -5
    
    # Analyze file types to suggest commit type
    if echo "$changes" | grep -q "test\|spec\|\.test\.\|\.spec\."; then
        echo "🧪 Test files detected - consider commit type: test"
    fi
    
    if echo "$changes" | grep -q "\.md$\|README\|CHANGELOG"; then
        echo "📚 Documentation files detected - consider commit type: docs"
    fi
    
    if echo "$changes" | grep -q "package\.json\|package-lock\.json"; then
        echo "📦 Dependency changes detected - consider commit type: chore or feat"
    fi
    
    if echo "$changes" | grep -q "\.css\|\.scss\|tailwind"; then
        echo "🎨 Style changes detected - consider commit type: style or feat"
    fi
    
    if echo "$changes" | grep -q "src/app/api\|route\.ts"; then
        echo "🔌 API changes detected - consider commit type: feat or fix"
    fi
    
    if echo "$changes" | grep -q "src/components"; then
        echo "🧩 Component changes detected - consider commit type: feat or fix"
    fi
}

# Function to run pre-commit checks
run_pre_commit_checks() {
    echo "🔍 Running pre-commit validations..."
    
    # Check for large files that shouldn't be committed
    local large_files=$(git diff --cached --name-only | xargs ls -la 2>/dev/null | awk '$5 > 1048576 {print $9 " (" $5/1048576 "MB)"}')
    if [ -n "$large_files" ]; then
        echo "⚠️  Large files detected in commit:"
        echo "$large_files"
        echo "Consider adding to .gitignore or using Git LFS"
    fi
    
    # Check for potential secrets (basic patterns)
    if git diff --cached | grep -i "password\|secret\|key\|token" | grep -v "PASSWORD_HASH\|PUBLIC_KEY"; then
        echo "⚠️  Potential secrets detected in commit. Please review carefully."
    fi
    
    # Run quality checks if available
    if [ -f "package.json" ] && command -v npm &> /dev/null; then
        if npm run lint --silent 2>/dev/null; then
            echo "✅ Linting passed"
        else
            echo "❌ Linting failed - consider running 'npm run lint:fix'"
        fi
        
        if npm run check:types --silent 2>/dev/null; then
            echo "✅ Type checking passed"
        else
            echo "❌ Type errors found - please fix before committing"
        fi
    fi
}

# Function to enhance commit message with context
enhance_commit_message() {
    local original_message="$1"
    local enhanced_message="$original_message"
    
    # Add Claude Code signature if not already present
    if ! echo "$original_message" | grep -q "Claude Code"; then
        enhanced_message="$enhanced_message

🤖 Generated with Claude Code (https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
    fi
    
    echo "$enhanced_message"
}

# Main execution based on arguments
case "${1:-}" in
    "validate")
        shift
        validate_commit_format "$*"
        ;;
    "suggest")
        suggest_commit_type
        ;;
    "pre-check")
        run_pre_commit_checks
        ;;
    "enhance")
        shift
        enhance_commit_message "$*"
        ;;
    *)
        echo "Usage: $0 {validate|suggest|pre-check|enhance} [message]"
        echo "  validate [message] - Check if commit message follows conventions"
        echo "  suggest           - Suggest commit type based on staged files"
        echo "  pre-check         - Run pre-commit validation checks"
        echo "  enhance [message] - Add Claude Code signature to commit message"
        ;;
esac

echo "✅ Commit optimization hook completed"