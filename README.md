# zygote

Claude Code skill: scaffold backend/frontend boilerplate repos on command. Detects OS, checks/installs missing dependencies (with confirmation), scaffolds the chosen stack, sets up local env.

## Install

**macOS / Linux:**
```
curl -fsSL https://raw.githubusercontent.com/<you>/zygote/main/scripts/install.sh | bash -s -- https://github.com/<you>/zygote.git
```

**Windows (PowerShell):**
```
iwr https://raw.githubusercontent.com/<you>/zygote/main/scripts/install.ps1 -UseBasicParsing | iex
```
(or download `install.ps1` and run `.\install.ps1 -RepoUrl https://github.com/<you>/zygote.git`)

Both drop this repo into `~/.claude/skills/zygote/`.

## Usage
```
/create-zygote sanic
```
Run inside the folder you want the project scaffolded into.

## Supported stacks (v1)
- `sanic` — Python async backend

More planned: express, fastapi, django, react-vite, nextjs, vue, vanilla-html.

## How it works
See `SKILL.md` for the full flow: stack routing → OS detection → dependency check → confirm before any system-wide install → scaffold from `templates/<stack>/` → local env setup (venv/npm/etc) → report next command to run.
