#!/bin/bash

# Auto Quality Check Hook
# Automatically runs quality checks after code modifications

echo "🔍 Running automated quality checks..."

# Function to check if we're in a Next.js project
check_project_type() {
    if [ -f "package.json" ] && grep -q "next" package.json; then
        echo "✅ Next.js project detected"
        return 0
    fi
    return 1
}

# Function to run linting if files were modified
run_lint_check() {
    if command -v npm &> /dev/null; then
        echo "📝 Running ESLint check..."
        npm run lint --silent 2>/dev/null || {
            echo "⚠️  Linting issues found. Run 'npm run lint:fix' to auto-fix."
            return 1
        }
        echo "✅ Linting passed"
    fi
}

# Function to run TypeScript type checking
run_type_check() {
    if command -v npm &> /dev/null; then
        echo "🔧 Running TypeScript type check..."
        npm run check:types --silent 2>/dev/null || {
            echo "⚠️  Type errors found. Please review and fix TypeScript issues."
            return 1
        }
        echo "✅ Type checking passed"
    fi
}

# Function to check for unused dependencies
check_dependencies() {
    if command -v npm &> /dev/null; then
        echo "📦 Checking for unused dependencies..."
        npm run check:deps --silent 2>/dev/null || {
            echo "ℹ️  Some dependencies might be unused. Review with 'npm run check:deps'"
        }
    fi
}

# Function to validate internationalization
check_i18n() {
    if [ -d "src/locales" ]; then
        echo "🌍 Validating internationalization..."
        npm run check:i18n --silent 2>/dev/null || {
            echo "⚠️  i18n validation issues found. Check translation files."
        }
    fi
}

# Function to check bundle size impact
check_bundle_size() {
    if [ -d "node_modules" ]; then
        echo "📊 Analyzing potential bundle impact..."
        # This is a lightweight check - full analysis needs build
        echo "ℹ️  Run 'npm run build-stats' for detailed bundle analysis"
    fi
}

# Main execution
if check_project_type; then
    # Run quality checks in order of importance
    run_lint_check
    lint_status=$?
    
    run_type_check
    type_status=$?
    
    check_dependencies
    check_i18n
    check_bundle_size
    
    # Summary
    if [ $lint_status -eq 0 ] && [ $type_status -eq 0 ]; then
        echo "🎉 All automated quality checks passed!"
    else
        echo "❌ Some quality checks failed. Please address the issues above."
        exit 1
    fi
else
    echo "ℹ️  Not a Next.js project, skipping project-specific checks"
fi

echo "✅ Quality check hook completed"