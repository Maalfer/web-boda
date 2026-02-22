"""Rutas de ajustes."""

from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel

from ..database import get_connection
from ..models.schemas import PinUpdate, PinVerify
from ..config import DEMO_TOKEN

router = APIRouter(prefix="/api/settings", tags=["settings"])

@router.get("/pin")
def get_pin():
    """Obtener el PIN (solo para saber si está configurado, no devuelve el valor por seguridad a menos que tenga token)."""
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT value FROM settings WHERE key='access_pin'")
    row = c.fetchone()
    conn.close()
    
    if row:
        return {"configured": True}
    return {"configured": False}

@router.post("/pin")
def update_pin(data: PinUpdate, authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer ") or authorization.split(" ")[1] != DEMO_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")

    conn = get_connection()
    c = conn.cursor()
    c.execute("INSERT OR REPLACE INTO settings (key, value) VALUES ('access_pin', ?)", (data.pin,))
    conn.commit()
    conn.close()
    return {"status": "success", "message": "PIN updated successfully"}

@router.post("/verify-pin")
def verify_pin(data: PinVerify):
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT value FROM settings WHERE key='access_pin'")
    row = c.fetchone()
    conn.close()

    if not row:
        # Si no hay PIN configurado, dejamos pasar siempre (o según se desee; aquí se permite acceso libre si no hay PIN)
        return {"valid": True}

    if row['value'] == data.pin:
        return {"valid": True}
    
    return {"valid": False}
