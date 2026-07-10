from fastapi import FastAPI
import uvicorn

import config
from routes.health import health_router

app = FastAPI(title="MyBoilerplateApp")
app.include_router(health_router, prefix="/health")


@app.get("/")
async def index():
    return {"message": "FastAPI app up and running"}


if __name__ == "__main__":
    uvicorn.run("app:app", host=config.HOST, port=config.PORT, reload=config.DEBUG)
