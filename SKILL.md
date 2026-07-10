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
/create-zygote react-vite     # scaffold React + Vite (TypeScript) frontend
/create-zygote mern           # scaffold MERN: server/ (Express+mongoose) + client/ (React+Vite) side by side
/create-zygote fastapi        # scaffold FastAPI (Python async) backend
/create-zygote rails          # scaffold Ruby on Rails, full MVC (Note resource + SQLite)
```

Supported stacks (v1): `sanic`, `express`, `express-mvc`, `react-vite`, `mern`, `fastapi`, `rails`. More stacks (django, nextjs, vue, vanilla-html) planned — not yet implemented. If the requested stack isn't in this list, tell the user it's unsupported and list what's available. Do not attempt to scaffold an unlisted stack.

`mern` is a composite stack, scaffolded differently from every other stack — see "Scaffold steps for `mern`" under step 6 below. It reuses the `express` and `react-vite` templates as a base plus a small overlay (`templates/mern/overlay/`), instead of duplicating their files. It intentionally has no root `package.json`/orchestration — the two apps are run independently, in separate terminals.

## Flow (follow in order, every invocation)

1. **Parse stack name** from the argument after `/create-zygote`.
2. **Unsupported stack** → stop, tell user supported list, do nothing else.
3. **Detect OS** from current session context (Darwin = macOS, or Linux, or Windows). Don't re-derive with extra commands if already known.
4. **Dependency check** for the requested stack (see table below). Run each check command via Bash.
5. **If anything missing**: show the user the exact list of missing tools + the exact install command(s) you intend to run for their OS, then **ask for explicit confirmation before running any install command**. Never install silently. This applies to system-wide/global tool installs (python, node, brew, homebrew itself, etc.) — not to project-local steps like `pip install -r requirements.txt` inside a venv, which are scoped to the new project dir and don't need a separate confirm beyond the overall scaffold going ahead.
6. **Scaffold**: copy the stack's template from `templates/<stack>/` (relative to this skill's own directory) into the current working directory. **Exception: `mern`** — do not just copy `templates/mern/`; follow "Scaffold steps for `mern`" (below the Flow list, before the Dependency table) instead.
7. **Local env setup** (venv/npm install/etc, per stack — see table). These are project-scoped and reversible, run without extra confirmation.
8. **Report**: print what was created, the exact next command the user runs to start the app, and a **Versions** block listing the runtime + key package versions actually installed (see per-stack "Version check" command below — run it after local env setup, inside the venv/node_modules just created, and print its output verbatim).

### Scaffold steps for `mern` (this is step 6, specifically for this stack — steps 1-5, 7, 8 above still apply as normal)
Run in order, every invocation of `/create-zygote mern`:
1. `mkdir server client`
2. Copy `templates/express/.` into `server/` (base — flat Express, no MVC).
3. Copy `templates/mern/overlay/server/.` into `server/`, **overwriting** any same-named file (`app.js`, `config.js`, `package.json`, `.env.example`, `README.md` get replaced; `db.js` and `models/User.js` are added).
4. Delete `server/models/index.js` — it's the plain-express placeholder ("no ORM wired by default") and is now stale/wrong since `models/User.js` wires a real one.
5. Copy `templates/react-vite/.` into `client/` (base, unchanged).
6. Copy `templates/mern/overlay/client/.` into `client/`, overwriting `.env.example` and `README.md` only.

Never overwrite an existing non-empty `server/` or `client/` without asking first (same rule as the general Notes section below).

## Dependency table

### sanic
| Requires | Check cmd | macOS install | Windows install (PowerShell) |
|---|---|---|---|
| python3 (>=3.8) | `python3 --version` | `brew install python3` (if `brew` missing, ask before installing Homebrew via its official install script first) | `winget install Python.Python.3` |
| pip | `python3 -m pip --version` | ships with python3 install above | ships with python install above |
| venv module | `python3 -m venv --help` | ships with python3 | ships with python install above |

### fastapi
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

### react-vite
| Requires | Check cmd | macOS install | Windows install (PowerShell) |
|---|---|---|---|
| node (>=18) | `node --version` | `brew install node` (if `brew` missing, ask before installing Homebrew via its official install script first) | `winget install OpenJS.NodeJS.LTS` |
| npm | `npm --version` | ships with node install above | ships with node install above |

### mern
| Requires | Check cmd | macOS install | Windows install (PowerShell) |
|---|---|---|---|
| node (>=18) | `node --version` | `brew install node` (if `brew` missing, ask before installing Homebrew via its official install script first) | `winget install OpenJS.NodeJS.LTS` |
| npm | `npm --version` | ships with node install above | ships with node install above |

MongoDB itself is **not** checked or installed — `server/db.js` connects non-blocking, and the
final report tells the user to point `MONGO_URI` at a running local Mongo or an Atlas connection
string. Don't attempt to install/start a local MongoDB service.

### rails
| Requires | Check cmd | macOS install | Windows install (PowerShell) |
|---|---|---|---|
| ruby (>=3.2) | `ruby --version` | `brew install ruby` (if `brew` missing, ask before installing Homebrew via its official install script first) | `winget install RubyInstallerTeam.RubyWithDevKit.3.4` (untested on Windows — verify `ruby --version` works after, RubyInstaller normally wires PATH itself) |
| rails gem | `rails --version` | `gem install rails` (after ruby install above) | `gem install rails` |

Homebrew's Ruby is keg-only for gem binaries: after `gem install rails`, the `rails` command may
not resolve on PATH yet. Before running any further ruby/rails/bundle command this session, run:
```
export PATH="$(ruby -e 'puts Gem.bindir'):$PATH"
```
Then re-check `rails --version`. Don't skip this — it's why `rails --version` can fail right after
a successful install.

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

### Local setup after scaffold (fastapi)
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
- Final run command to report to user: `python app.py` (after activating venv). Mention `/docs` for interactive API docs.
- Version check (run after local env setup, venv still active, before final report):
  ```
  python3 --version
  pip show fastapi | grep -i version
  pip show uvicorn | grep -i version
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

### Local setup after scaffold (react-vite)
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
- Final run command to report to user: `npm run dev`.
- Version check (run after `npm install`, before final report):
  ```
  node --version
  npm --version
  npm list react --depth=0
  npm list vite --depth=0
  ```
  Print these under a "Versions" heading in the final report.

### Local setup after scaffold (mern)
- macOS/Linux:
  ```
  cd server && npm install && cp .env.example .env && cd ..
  cd client && npm install && cp .env.example .env && cd ..
  ```
- Windows (PowerShell):
  ```
  cd server; npm install; copy .env.example .env; cd ..
  cd client; npm install; copy .env.example .env; cd ..
  ```
- Final run commands to report to user (two separate terminals, do not combine):
  ```
  cd server && npm start      # http://localhost:3000
  cd client && npm run dev    # http://localhost:5173
  ```
- Version check (run after both `npm install`s, before final report):
  ```
  node --version
  npm --version
  npm --prefix server list express --depth=0
  npm --prefix server list mongoose --depth=0
  npm --prefix client list react --depth=0
  npm --prefix client list vite --depth=0
  ```
  Print these under a "Versions" heading in the final report. Also remind the user Mongo isn't
  auto-installed — see `server/README.md`.

### Local setup after scaffold (rails)
- macOS/Linux:
  ```
  bundle install
  bin/rails db:create db:migrate
  ```
- Windows (PowerShell):
  ```
  bundle install
  bin/rails db:create db:migrate
  ```
- Gems install into `./vendor/bundle` (project-local, via the shipped `.bundle/config`) — not
  system-wide, no extra confirmation needed beyond the scaffold going ahead.
- Final run command to report to user: `bin/rails server`. Mention: `/` lists notes, `/health`
  returns JSON, `/up` is Rails' own built-in health check.
- Version check (run after `bundle install`, before final report):
  ```
  ruby --version
  rails --version
  bundle exec gem list sqlite3
  ```
  Print these under a "Versions" heading in the final report.

## Notes
- Never overwrite an existing non-empty target directory without asking first.
- Templates live in `templates/<stack>/` next to this file — copy their contents as-is (including dotfiles like `.gitignore`, `.env.example`) into the target dir.
