"""Factoría de la aplicación FastAPI."""

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .config import APP_TITLE, CORS_ORIGINS, UPLOADS_DIR
from .database import init_db
from .routes import rsvp, photos, auth, settings

# Crear la instancia de la aplicación
app = FastAPI(title=APP_TITLE)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Asegurar que el directorio de uploads existe
os.makedirs(UPLOADS_DIR, exist_ok=True)

# Montar archivos estáticos
app.mount("/static", StaticFiles(directory=UPLOADS_DIR), name="static")

# Inicializar la base de datos
init_db()

# Registrar routers
app.include_router(rsvp.router)
app.include_router(photos.router)
app.include_router(auth.router)
app.include_router(settings.router)


# Rutas raíz
@app.get("/")
def read_root():
    return {"message": "Welcome to Fátima & Mario's Wedding API"}


@app.get("/health")
def health_check():
    return {"status": "ok"}
