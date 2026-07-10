# MERN Client (React + Vite, TypeScript)

Minimal React app scaffolded w/ Vite + TypeScript. `VITE_API_URL` defaults to `http://localhost:3000` — the MERN server in `../server`.

## Structure
```
index.html
vite.config.ts
tsconfig.json / tsconfig.app.json / tsconfig.node.json
src/
  main.tsx      # entrypoint
  App.tsx       # reads VITE_API_URL from env
  index.css
  vite-env.d.ts
package.json
.env.example    # copy to .env
```

## Setup (macOS/Linux)
```
npm install
cp .env.example .env
npm run dev
```

## Setup (Windows, PowerShell)
```
npm install
copy .env.example .env
npm run dev
```

Dev server runs at `http://localhost:5173`.

## Build
```
npm run build
npm run preview
```
