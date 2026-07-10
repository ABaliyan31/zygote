# zygote

A Claude Code skill that scaffolds boilerplate projects for you, on command. Tired of typing out the same `mkdir`, `npm init`, health-check route, `.env.example`, and `.gitignore` every time you start a new backend or frontend? Just tell Claude `/create-zygote <stack>` and it handles the rest — checks if you've got the right tools installed, asks before installing anything system-wide, copies over a clean working project, sets up the local environment, and tells you the exact command to run to see it live.

Think of it as `npm create vite@latest`, but for a growing list of stacks, and living inside Claude Code as a skill instead of a standalone CLI.

## Why this exists

Every new side project starts the same way — spin up a backend, wire a basic health check, set up env vars, `.gitignore` the right things, maybe hook up a frontend too. It's not hard, it's just repetitive, and doing it by hand (or copy-pasting from your last project) is a great way to carry forward stale config or forget something small. `zygote` exists so that part's a single command, and what you get back is something that's actually been tested end-to-end, not just generated and hoped for.

## Prerequisites

- [Claude Code](https://claude.com/claude-code) installed and working
- [git](https://git-scm.com/) installed (used to fetch the skill itself)

That's it at the install stage. Each individual stack has its own runtime requirements (Python, Node, Ruby, etc) — the skill checks for those itself when you actually scaffold something, and asks before installing anything missing.

## Install

Same command everywhere — macOS, Linux, Windows:
```
npx create-zygote
```

This drops the skill into `~/.claude/skills/zygote/`, which is where Claude Code looks for skills globally.

## Usage

Open Claude Code in whatever empty (or new) folder you want the project scaffolded into, then run one of:

```
/create-zygote sanic
/create-zygote fastapi
/create-zygote express
/create-zygote express-mvc
/create-zygote react-vite
/create-zygote mern
/create-zygote rails
```

Claude will:
1. Figure out what your stack needs (Python? Node? Ruby?) and check if it's already installed.
2. If something's missing, show you exactly what it wants to install and how — and wait for you to say yes before touching anything system-wide.
3. Copy the actual project files into your current folder.
4. Run whatever local setup that stack needs (`pip install`, `npm install`, `bundle install`, etc — all scoped to the new project, no extra confirmation needed for that part).
5. Print out what got created, the exact command to run it, and the installed versions of the key tools/packages — so you know exactly what you're working with.

## What's in the box (v1)

- **`sanic`** — minimal Python async backend. Health check, env-based config, nothing you don't need.
- **`fastapi`** — same idea as sanic, but FastAPI, and you get free interactive API docs at `/docs`.
- **`express`** — flat Node/Express backend. No MVC ceremony, just routes and a config file.
- **`express-mvc`** — Express, but properly layered: routes → controllers → models → views (EJS). Real MVC, not just folders with nothing in them.
- **`react-vite`** — React + Vite, TypeScript, env vars wired through `VITE_` prefixes. Fast dev server, clean starting point.
- **`mern`** — Mongo + Express + React + Node. Scaffolds a `server/` and a `client/` side by side, no root `package.json` or process orchestration — you run each one yourself, in its own terminal. Mongo itself isn't auto-installed; the server just needs a `MONGO_URI` pointed at something running (local or Atlas), and it starts up fine either way — you'll just see a warning in the logs if it can't connect.
- **`rails`** — actual full MVC Rails, not a stripped-down version. Comes with a real working `Note` resource (model, migration, controller, all the CRUD views) backed by SQLite, so there's no external database service to install or manage — it's just a file. Gems install locally into the project (not system-wide), same spirit as a Python `venv` or a `node_modules` folder.

More on the way: `django`, `nextjs`, `vue`, `vanilla-html`. Wasn't trying to cover everything on day one — wanted the ones that exist to actually work well first.

## Why static templates instead of generating code live

Every stack here is a real, pre-built, pre-tested set of files — not something Claude writes fresh each time you run the command. That's on purpose. Boilerplate is supposed to be the same every time; if it were generated live, you'd get slightly different output (and potentially slightly different bugs) on every single run, with no way to durably fix something once and have that fix apply to everyone going forward. This way, when a bug gets caught and fixed in a template, every future scaffold benefits from it automatically. It's also just faster — copying files is instant, regenerating boilerplate from scratch isn't.

## A few honest notes

- Everything's been tested hands-on on macOS — installed, ran, hit the actual endpoints, checked the output. Windows and Linux *should* work (every stack uses cross-platform tooling, and the skill has separate install commands for each OS), but nobody's actually run this on those platforms yet. If you do, and something breaks, that's genuinely useful to know about.
- No stack auto-installs or manages an external database service (Mongo, Postgres, etc) for you — where a stack needs one, it's designed to fail gracefully and tell you what to point it at, not silently hang or crash.
- No tests are scaffolded by default in any stack right now. If that's something you want, it's easy enough to add to your own project after scaffolding.

## How it works, in more detail

The whole flow lives in `SKILL.md` — that's the actual instructions Claude follows, if you want to read exactly what happens under the hood: parse the stack name → detect your OS → check dependencies → confirm before any system-wide install → copy the right template out of `templates/<stack>/` → run local setup → report back what got created and how to run it.

`mern` is the one exception — instead of duplicating `express` and `react-vite`'s files, it reuses them as a base and layers a small set of Mongo/`cors`-specific files on top at scaffold time (see `templates/mern/overlay/`). That way, a fix to the base `express` template automatically carries into `mern` too, instead of needing to be applied twice.
