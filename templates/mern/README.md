# MERN Boilerplate

MongoDB + Express + React + Node, split into two independent apps — no root package.json,
no process orchestration. Run each yourself in its own terminal.

```
mern/
  server/   # Express API + mongoose, see server/README.md
  client/   # React + Vite (TypeScript), see client/README.md
```

## Setup
```
cd server && npm install && cp .env.example .env
cd ../client && npm install && cp .env.example .env
```
(Windows: `copy .env.example .env` instead of `cp`.)

## Run (2 terminals)
```
cd server && npm start      # http://localhost:3000
cd client && npm run dev    # http://localhost:5173
```

Mongo isn't installed or started automatically — see `server/README.md` for `MONGO_URI` setup
(local or Atlas).
