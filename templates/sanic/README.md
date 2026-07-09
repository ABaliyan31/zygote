# Sanic Boilerplate

Minimal async Sanic app w/ health blueprint + env config.

## Structure
```
app.py          # entrypoint
config.py       # env-based config
routes/
  health.py     # /health blueprint
requirements.txt
.env.example    # copy to .env
```

## Setup (macOS/Linux)
```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python app.py
```

## Setup (Windows, PowerShell)
```
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
python app.py
```

Server runs at `http://localhost:8000`. Health check at `/health/`.
