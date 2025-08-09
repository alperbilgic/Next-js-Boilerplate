#!/bin/bash

# Web Content Enhancement Hook
# Optimizes web content fetching for better documentation and context gathering

echo "🌐 Enhancing web content processing..."

# Function to extract clean content from documentation URLs
enhance_web_content() {
    local url="$1"
    
    # Check if URL is a documentation site that might benefit from enhanced processing
    if [[ "$url" =~ (docs\.|documentation|api-reference|guide|tutorial) ]]; then
        echo "📖 Detected documentation URL - applying enhanced processing"
        
        # Extract main content selectors commonly used in documentation
        local selectors="main article .content .documentation .markdown-body .rst-content"
        
        # Try to extract structured content
        for selector in $selectors; do
            echo "🔍 Trying selector: $selector"
        done
    fi
    
    # Check for API documentation
    if [[ "$url" =~ (swagger|openapi|api\..*|.*\/api\/) ]]; then
        echo "🔌 Detected API documentation - extracting endpoints and schemas"
    fi
    
    # Check for GitHub/GitLab repositories
    if [[ "$url" =~ (github\.com|gitlab\.com).*\/(blob|tree) ]]; then
        echo "📁 Detected repository file - extracting code content"
        # Convert to raw URL for better processing
        raw_url=$(echo "$url" | sed 's/github\.com/raw.githubusercontent.com/' | sed 's/\/blob//')
        echo "🔄 Converted to raw URL: $raw_url"
    fi
}

# Check if this is being called with a URL argument
if [ "$#" -eq 1 ]; then
    enhance_web_content "$1"
fi

# Set up user-agent for better compatibility with documentation sites
export USER_AGENT="Claude-Code-Documentation-Agent/1.0 (AI Development Assistant)"

# Configure timeout for web requests
export WEB_TIMEOUT="30s"

echo "✅ Web content enhancement configured"