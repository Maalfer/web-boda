"""Configuración centralizada de la aplicación.

Las variables sensibles se cargan desde el fichero .env
"""

import os
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"))

# Título de la API
APP_TITLE = "Boda Fátima & Mario API"

# CORS
CORS_ORIGINS = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://localhost:3000"
).split(",")

# Database
DB_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "database")
os.makedirs(DB_DIR, exist_ok=True)
DATABASE_PATH = os.path.join(DB_DIR, "boda.db")

# Uploads
UPLOADS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")

# Auth
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "changeme")
DEMO_TOKEN = os.getenv("DEMO_TOKEN", "fake-jwt-token-for-demo")
