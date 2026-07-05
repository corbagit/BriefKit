#!/bin/bash
set -e
cd /home/team/shared/briefkit

# Git init if needed
if [ ! -d .git ]; then
  git init -b main
fi

# Configure git
git config user.email "team@briefkit.app"
git config user.name "CorbaBriefKit Team"

# Add and commit
git add -A
git add -f railway.json .env.example .gitignore

# Check if there's anything to commit
if git diff --cached --quiet; then
  echo "Nothing to commit - already clean"
else
  git commit -m "Initial commit: CorbaBriefKit AI content summarizer"
fi

echo "=== STATUS ==="
git log --oneline

echo "=== REMOTE ==="
git remote -v 2>/dev/null || echo "No remote configured"
