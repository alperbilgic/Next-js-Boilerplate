#!/bin/bash

# Context Optimization Hook
# Automatically optimizes context and cleans up unnecessary content before tool execution

echo "🧠 Optimizing context for better AI performance..."

# Clean up temporary files that might pollute context
find . -name "*.tmp" -type f -delete 2>/dev/null || true
find . -name "*.log" -type f -not -path "./node_modules/*" -size +1M -delete 2>/dev/null || true

# Ensure we're using ripgrep instead of traditional grep for faster searches
if ! command -v rg &> /dev/null; then
    echo "⚠️  Ripgrep not found. Installing for optimal search performance..."
    if command -v npm &> /dev/null; then
        npm install -g @vscode/ripgrep 2>/dev/null || true
    fi
fi

# Clear node_modules cache if it's getting too large (>1GB)
if [ -d "node_modules" ]; then
    size=$(du -s node_modules 2>/dev/null | cut -f1)
    if [ "$size" -gt 1048576 ]; then  # 1GB in KB
        echo "🧹 Large node_modules detected. Consider running 'npm ci' for cleaner dependencies"
    fi
fi

# Optimize git status for faster context loading
git config --local status.showUntrackedFiles normal 2>/dev/null || true
git config --local diff.renames true 2>/dev/null || true

echo "✅ Context optimization completed"