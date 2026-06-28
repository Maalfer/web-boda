"""Punto de entrada principal de la aplicación FastAPI."""

from fastapi import FastAPI
from app.routes import rsvp, photos, auth, settings
from app.database import init_db

# Crear la aplicación FastAPI
app = FastAPI(
    title="Web de Boda API",
    description="API backend para la web de boda",
    version="1.0.0"
)

# Inicializar la base de datos
init_db()

# Incluir las rutas SIN prefix /api (nginx ya lo añade)
app.include_router(rsvp.router, tags=["rsvp"])
app.include_router(photos.router, tags=["photos"])
app.include_router(auth.router, tags=["auth"])
app.include_router(settings.router, tags=["settings"])

@app.get("/")
async def root():
    return {"message": "API de la web de boda funcionando"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
