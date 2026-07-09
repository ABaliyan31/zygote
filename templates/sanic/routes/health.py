from sanic import Blueprint
from sanic.response import json

health_bp = Blueprint("health", url_prefix="/health")


@health_bp.get("/")
async def health_check(request):
    return json({"status": "ok"})
