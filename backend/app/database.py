"""Gestión de conexiones y setup de la base de datos SQLite."""

import sqlite3
from .config import DATABASE_PATH


def get_connection():
    """Obtiene una conexión a la base de datos con row_factory configurado."""
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Inicializa las tablas de la base de datos si no existen."""
    conn = sqlite3.connect(DATABASE_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS rsvp
                 (name text, attendance text, companion text, transport text, allergies text, message text, song text)''')
    c.execute('''CREATE TABLE IF NOT EXISTS photos
                 (id text, filename text)''')
    c.execute('''CREATE TABLE IF NOT EXISTS settings
                 (key text PRIMARY KEY, value text)''')
    conn.commit()
    conn.close()
