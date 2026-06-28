"""Rutas para gestión de confirmaciones de asistencia (RSVP)."""

from fastapi import APIRouter

from ..database import get_connection
from ..models.schemas import RSVP

router = APIRouter()


@router.post("/rsvp")
def submit_rsvp(rsvp: RSVP):
    try:
        conn = get_connection()
        c = conn.cursor()
        c.execute("INSERT INTO rsvp (name, attendance, companion, transport, allergies, message) VALUES (?, ?, ?, ?, ?, ?)",
                  (rsvp.name, rsvp.attendance, rsvp.companion, rsvp.transport, rsvp.allergies, rsvp.message))
        conn.commit()
        conn.close()
        return {"status": "success", "message": "RSVP received", "data": rsvp}
    except Exception as e:
        return {"status": "error", "message": str(e)}


@router.delete("/rsvp/{rowid}")
def delete_rsvp(rowid: int):
    try:
        conn = get_connection()
        c = conn.cursor()
        c.execute("DELETE FROM rsvp WHERE rowid = ?", (rowid,))
        conn.commit()
        conn.close()
        return {"status": "success", "message": "RSVP deleted"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


@router.get("/rsvps")
def get_rsvps():
    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT rowid, * FROM rsvp")
    rows = c.fetchall()
    conn.close()
    return {"status": "success", "data": rows}
