from sanic import Sanic
from sanic.response import json

import config
from routes.health import health_bp

app = Sanic("MyBoilerplateApp")
app.blueprint(health_bp)


@app.get("/")
async def index(request):
    return json({"message": "Sanic app up and running"})


if __name__ == "__main__":
    app.run(host=config.HOST, port=config.PORT, dev=config.DEBUG)
