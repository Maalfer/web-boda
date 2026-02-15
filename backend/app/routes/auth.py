"""Rutas de autenticación."""

from fastapi import APIRouter

from ..config import ADMIN_USERNAME, ADMIN_PASSWORD, DEMO_TOKEN
from ..models.schemas import Login

router = APIRouter()


@router.post("/login")
def login(creds: Login):
    if creds.username == ADMIN_USERNAME and creds.password == ADMIN_PASSWORD:
        return {"status": "success", "token": DEMO_TOKEN}
    return {"status": "error", "message": "Invalid credentials"}
