from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Boda Fátima & Mario API")

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.staticfiles import StaticFiles
from fastapi import File, UploadFile
import shutil
import os
import uuid

# ... (Previous CORS setup)

app.mount("/static", StaticFiles(directory="uploads"), name="static")

import sqlite3
from pydantic import BaseModel
from typing import List

# Database Setup
def init_db():
    conn = sqlite3.connect('boda.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS rsvp
                 (name text, companion text, transport text, allergies text, song text, message text)''')
    c.execute('''CREATE TABLE IF NOT EXISTS photos
                 (id text, filename text)''')
    conn.commit()
    conn.close()

init_db()

# ... (RSVP Models)

@app.post("/upload")
async def upload_photos(files: List[UploadFile] = File(...)):
    saved_files = []
    conn = sqlite3.connect('boda.db')
    c = conn.cursor()
    
    for file in files:
        file_ext = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_ext}"
        file_path = f"uploads/{unique_filename}"
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        c.execute("INSERT INTO photos VALUES (?, ?)", (str(uuid.uuid4()), unique_filename))
        saved_files.append(unique_filename)
    
    conn.commit()
    conn.close()
    return {"status": "success", "files": saved_files}

from fastapi import Header, HTTPException

@app.get("/photos")
def get_photos(authorization: str | None = Header(default=None)):
    # Check for admin token
    is_admin = authorization == "Bearer fake-jwt-token-for-demo"
    
    if not is_admin:
        # If not admin, return empty list or 403. User asked to not show "common" photos.
        # Returning empty to not break frontend structure, or we could handle 403.
        return {"status": "success", "data": []}

    conn = sqlite3.connect('boda.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT * FROM photos")
    rows = c.fetchall()
    conn.close()
    return {"status": "success", "data": rows}

# ... (Existing RSVP endpoints)

class RSVP(BaseModel):
    name: str
    companion: str
    transport: str
    allergies: str
    song: str | None = None
    message: str | None = None

class Login(BaseModel):
    username: str
    password: str

@app.get("/")
def read_root():
    return {"message": "Welcome to Fátima & Mario's Wedding API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/rsvp")
def submit_rsvp(rsvp: RSVP):
    try:
        conn = sqlite3.connect('boda.db')
        c = conn.cursor()
        c.execute("INSERT INTO rsvp VALUES (?, ?, ?, ?, ?, ?)",
                  (rsvp.name, rsvp.companion, rsvp.transport, rsvp.allergies, rsvp.song, rsvp.message))
        conn.commit()
        conn.close()
        return {"status": "success", "message": "RSVP received", "data": rsvp}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.delete("/rsvp/{rowid}")
def delete_rsvp(rowid: int):
    try:
        conn = sqlite3.connect('boda.db')
        c = conn.cursor()
        c.execute("DELETE FROM rsvp WHERE rowid = ?", (rowid,))
        conn.commit()
        conn.close()
        return {"status": "success", "message": "RSVP deleted"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.delete("/photos/{photo_id}")
def delete_photo(photo_id: str):
    try:
        conn = sqlite3.connect('boda.db')
        conn.row_factory = sqlite3.Row
        c = conn.cursor()
        
        # Get filename first to delete file
        c.execute("SELECT filename FROM photos WHERE id = ?", (photo_id,))
        row = c.fetchone()
        
        if row:
            filename = row['filename']
            file_path = f"uploads/{filename}"
            if os.path.exists(file_path):
                os.remove(file_path)
        
        c.execute("DELETE FROM photos WHERE id = ?", (photo_id,))
        conn.commit()
        conn.close()
        return {"status": "success", "message": "Photo deleted"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/rsvps")
def get_rsvps():
    conn = sqlite3.connect('boda.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    # Explicitly select rowid to use as ID for deletion
    c.execute("SELECT rowid, * FROM rsvp")
    rows = c.fetchall()
    conn.close()
    return {"status": "success", "data": rows}

@app.post("/login")
def login(creds: Login):
    if creds.username == "balutin" and creds.password == "baluleroprecioso":
        return {"status": "success", "token": "fake-jwt-token-for-demo"}
    return {"status": "error", "message": "Invalid credentials"}
