# Ruby on Rails Boilerplate (full MVC)

Real Rails MVC, not just folders — a working `Note` resource (model + migration + controller +
views) backed by SQLite, plus a JSON `/health` route for consistency with the other zygote
stacks. SQLite is file-based, so there's no external DB service to install or run.

## Structure
```
app/
  models/note.rb            # ActiveRecord model
  controllers/
    notes_controller.rb     # full CRUD (index/show/new/create/edit/update/destroy)
    health_controller.rb    # GET /health -> {"status":"ok"}
  views/notes/               # index/show/new/edit/_form/_note templates (ERB)
db/
  migrate/                  # creates the notes table
  schema.rb
config/routes.rb            # resources :notes, root "notes#index", get "health"
Gemfile
.bundle/config              # pins gems to project-local vendor/bundle (not system-wide)
```

## Setup (macOS/Linux)
```
bundle install
bin/rails db:create db:migrate
bin/rails server
```

## Setup (Windows, PowerShell)
```
bundle install
bin/rails db:create db:migrate
bin/rails server
```

Server runs at `http://localhost:3000`. `/` lists notes (`notes#index`), `/health` returns JSON,
`/up` is Rails' own built-in health check.

## Notes
- Gems install into `./vendor/bundle` (see `.bundle/config`), not system-wide — keeps this
  project's dependencies isolated, same spirit as `venv`/`node_modules` in the other stacks.
- `config/master.key` and `config/credentials.yml.enc` are intentionally not included — run
  `bin/rails credentials:edit` if you need Rails credentials, it'll generate fresh ones.
- No automated tests included, matching the other zygote stacks — `test/` framework skeleton is
  there if you want to add your own.
