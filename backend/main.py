"""Punto de entrada de la aplicación.

La app FastAPI se crea en app/__init__.py.
Este fichero re-exporta la instancia para compatibilidad con uvicorn (main:app).
"""

from app import app  # noqa: F401
