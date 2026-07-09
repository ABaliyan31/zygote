---
name: create-zygote
description: "scaffold backend/frontend boilerplate repos (node, python, react, etc.) - dependency check - confirm - install - scaffold"
trigger: /create-zygote
---

# /create-zygote

Scaffolds a boilerplate project for a given stack in the current working directory.

## Usage
```
/create-zygote sanic          # scaffold Sanic (Python async) backend
/create-zygote express        # scaffold Express (flat, no MVC layering) backend
/create-zygote express-mvc    # scaffold Express w/ routes -> controllers -> models layering
```

Supported stacks (v1): `sanic`, `express`, `express-mvc`. More stacks (fastapi, django, react-vite, nextjs, vue, vanilla-html) planned — not yet implemented. If the requested stack isn't in this list, tell the user it's unsupported and list what's available. Do not attempt to scaffold an unlisted stack.

## Flow (follow in order, every invocation)

1. **Parse stack name** from the argument after `/create-zygote`.
2. **Unsupported stack** → stop, tell user supported list, do nothing else.
3. **Detect OS** from current session context (Darwin = macOS, or Linux, or Windows). Don't re-derive with extra commands if already known.
4. **Dependency check** for the requested stack (see table below). Run each check command via Bash.
5. **If anything missing**: show the user the exact list of missing tools + the exact install command(s) you intend to run for their OS, then **ask for explicit confirmation before running any install command**. Never install silently. This applies to system-wide/global tool installs (python, node, brew, homebrew itself, etc.) — not to project-local steps like `pip install -r requirements.txt` inside a venv, which are scoped to the new project dir and don't need a separate confirm beyond the overall scaffold going ahead.
6. **Scaffold**: copy the stack's template from `templates/<stack>/` (relative to this skill's own directory) into the current working directory.
7. **Local env setup** (venv/npm install/etc, per stack — see table). These are project-scoped and reversible, run without extra confirmation.
8. **Report**: print what was created, the exact next command the user runs to start the app, and a **Versions** block listing the runtime + key package versions actually installed (see per-stack "Version check" command below — run it after local env setup, inside the venv/node_modules just created, and print its output verbatim).

## Dependency table

### sanic
| Requires | Check cmd | macOS install | Windows install (PowerShell) |
|---|---|---|---|
| python3 (>=3.8) | `python3 --version` | `brew install python3` (if `brew` missing, ask before installing Homebrew via its official install script first) | `winget install Python.Python.3` |
| pip | `python3 -m pip --version` | ships with python3 install above | ships with python install above |
| venv module | `python3 -m venv --help` | ships with python3 | ships with python install above |

### express / express-mvc
| Requires | Check cmd | macOS install | Windows install (PowerShell) |
|---|---|---|---|
| node (>=18) | `node --version` | `brew install node` (if `brew` missing, ask before installing Homebrew via its official install script first) | `winget install OpenJS.NodeJS.LTS` |
| npm | `npm --version` | ships with node install above | ships with node install above |

### Local setup after scaffold (sanic)
- macOS/Linux:
  ```
  python3 -m venv venv
  source venv/bin/activate
  pip install -r requirements.txt
  cp .env.example .env
  ```
- Windows (PowerShell):
  ```
  python -m venv venv
  venv\Scripts\Activate.ps1
  pip install -r requirements.txt
  copy .env.example .env
  ```
- Final run command to report to user: `python app.py` (after activating venv).
- Version check (run after local env setup, venv still active, before final report):
  ```
  python3 --version
  pip show sanic | grep -i version
  pip show python-dotenv | grep -i version
  ```
  Print these under a "Versions" heading in the final report.

### Local setup after scaffold (express / express-mvc)
- macOS/Linux:
  ```
  npm install
  cp .env.example .env
  ```
- Windows (PowerShell):
  ```
  npm install
  copy .env.example .env
  ```
- Final run command to report to user: `npm start`.
- Version check (run after `npm install`, before final report):
  ```
  node --version
  npm --version
  npm list express --depth=0
  ```
  For `express-mvc` also run `npm list ejs --depth=0`.
  Print these under a "Versions" heading in the final report.

## Notes
- Never overwrite an existing non-empty target directory without asking first.
- Templates live in `templates/<stack>/` next to this file — copy their contents as-is (including dotfiles like `.gitignore`, `.env.example`) into the target dir.
