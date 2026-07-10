# MERN Server (Express + Mongoose)

Minimal Express API w/ MongoDB wired via mongoose. Flat structure, JSON only (no views — React owns the UI).

## Structure
```
app.js          # entrypoint, connects to Mongo via db.js
config.js       # env-based config, incl. MONGO_URI
db.js           # mongoose.connect(), non-blocking — server still starts if Mongo isn't reachable
models/
  User.js       # reference schema, not wired to any route
routes/
  health.js     # /health route
package.json
.env.example    # copy to .env
```

## Mongo
Not installed or started automatically. `MONGO_URI` in `.env` defaults to a local Mongo instance
(`mongodb://localhost:27017/mern-app`) — point it at a running local `mongod`, or swap in a
MongoDB Atlas connection string. If Mongo isn't reachable, the server still starts and non-DB
routes (like `/health`) still work — you'll just see a connection warning in the log.

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
