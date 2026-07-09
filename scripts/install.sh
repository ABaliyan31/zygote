#!/usr/bin/env bash
set -euo pipefail

REPO_URL="${1:-}"
SKILL_NAME="zygote"
TARGET_DIR="$HOME/.claude/skills/$SKILL_NAME"

if [ -z "$REPO_URL" ]; then
  echo "Usage: install.sh <git-repo-url>"
  exit 1
fi

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

git clone --depth 1 "$REPO_URL" "$TMP_DIR"

mkdir -p "$HOME/.claude/skills"
rm -rf "$TARGET_DIR"
mkdir -p "$TARGET_DIR"
cp "$TMP_DIR/SKILL.md" "$TARGET_DIR/"
cp -r "$TMP_DIR/templates" "$TARGET_DIR/"

echo "zygote skill installed to $TARGET_DIR"
