# Express Boilerplate

Minimal Express app w/ health route + env config. Flat structure, no MVC layering.

## Structure
```
app.js          # entrypoint
config.js       # env-based config
routes/
  health.js     # /health route
models/
  index.js      # no ORM/DB wired by default, drop model files here
package.json
.env.example    # copy to .env
```

## Setup (macOS/Linux)
```
npm install
cp .env.example .env
npm start
```

## Setup (Windows, PowerShell)
```
npm install
copy .env.example .env
npm start
```

Server runs at `http://localhost:3000`. Health check at `/health`.
