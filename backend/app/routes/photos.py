"""Rutas para gestión de fotos."""

import os
import shutil
import uuid

from fastapi import APIRouter, File, Header, UploadFile
from typing import List

from ..config import UPLOADS_DIR, DEMO_TOKEN
from ..database import get_connection

router = APIRouter()


@router.post("/upload")
async def upload_photos(files: List[UploadFile] = File(...)):
    saved_files = []
    conn = get_connection()
    c = conn.cursor()

    for file in files:
        file_ext = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_ext}"
        file_path = os.path.join(UPLOADS_DIR, unique_filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        c.execute("INSERT INTO photos VALUES (?, ?)", (str(uuid.uuid4()), unique_filename))
        saved_files.append(unique_filename)

    conn.commit()
    conn.close()
    return {"status": "success", "files": saved_files}


@router.get("/photos")
def get_photos(authorization: str | None = Header(default=None)):
    is_admin = authorization == f"Bearer {DEMO_TOKEN}"

    if not is_admin:
        return {"status": "success", "data": []}

    conn = get_connection()
    c = conn.cursor()
    c.execute("SELECT * FROM photos")
    rows = c.fetchall()
    conn.close()
    return {"status": "success", "data": rows}


@router.delete("/photos/{photo_id}")
def delete_photo(photo_id: str):
    try:
        conn = get_connection()
        c = conn.cursor()

        c.execute("SELECT filename FROM photos WHERE id = ?", (photo_id,))
        row = c.fetchone()

        if row:
            filename = row['filename']
            file_path = os.path.join(UPLOADS_DIR, filename)
            if os.path.exists(file_path):
                os.remove(file_path)

        c.execute("DELETE FROM photos WHERE id = ?", (photo_id,))
        conn.commit()
        conn.close()
        return {"status": "success", "message": "Photo deleted"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
