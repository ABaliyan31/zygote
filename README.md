# zygote

Claude Code skill: scaffold backend/frontend boilerplate repos on command. Detects OS, checks/installs missing dependencies (with confirmation), scaffolds the chosen stack, sets up local env.

## Install

Works on macOS, Linux, and Windows — same command:
```
npx create-zygote
```

Drops this skill into `~/.claude/skills/zygote/`.

## Usage
```
/create-zygote sanic
/create-zygote express
/create-zygote express-mvc
/create-zygote react-vite
/create-zygote mern
/create-zygote fastapi
```
Run inside the folder you want the project scaffolded into.

## Supported stacks (v1)
- `sanic` — Python async backend
- `express` — Node/Express backend, flat structure (no MVC layering)
- `express-mvc` — Node/Express backend, routes → controllers → models layering
- `react-vite` — React + Vite frontend (TypeScript)
- `mern` — MongoDB + Express + React + Node, scaffolds `server/` + `client/` side by side, run independently (no root package.json/orchestration)
- `fastapi` — Python async backend, w/ auto-generated interactive docs at `/docs`

More planned: django, nextjs, vue, vanilla-html.

## How it works
See `SKILL.md` for the full flow: stack routing → OS detection → dependency check → confirm before any system-wide install → scaffold from `templates/<stack>/` → local env setup (venv/npm/etc) → report next command to run.
