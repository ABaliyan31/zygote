# Express MVC Boilerplate

Express app w/ full MVC layering (routes → controllers → models → views, EJS) + env config.

## Structure
```
app.js                    # entrypoint
config.js                 # env-based config
routes/
  index.js                # route -> controller wiring
controllers/
  indexController.js      # GET / (renders views/index.ejs)
  healthController.js     # GET /health (JSON, standard for health checks)
models/
  index.js                # no ORM wired by default, drop model files here
views/
  index.ejs                # rendered by indexController
public/
  css/style.css            # static assets, served at /css/style.css
package.json
.env.example               # copy to .env
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

Server runs at `http://localhost:3000` (renders `views/index.ejs`). Health check at `/health` (JSON).
