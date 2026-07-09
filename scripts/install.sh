#!/usr/bin/env bash
set -euo pipefail

REPO_URL="${1:-}"
SKILL_NAME="zygote"
TARGET_DIR="$HOME/.claude/skills/$SKILL_NAME"

if [ -z "$REPO_URL" ]; then
  echo "Usage: install.sh <git-repo-url>"
  exit 1
fi

mkdir -p "$HOME/.claude/skills"

if [ -d "$TARGET_DIR" ]; then
  echo "Existing install found at $TARGET_DIR — updating."
  git -C "$TARGET_DIR" pull --ff-only
else
  git clone "$REPO_URL" "$TARGET_DIR"
fi

echo "my-boilerplate skill installed to $TARGET_DIR"
