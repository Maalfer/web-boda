import sqlite3
from app.config import DATABASE_PATH

def migrate_rsvp_table():
    conn = sqlite3.connect(DATABASE_PATH)
    c = conn.cursor()
    
    # Verificar si la columna attendance ya existe
    c.execute("PRAGMA table_info(rsvp)")
    columns = [column[1] for column in c.fetchall()]
    
    if 'attendance' not in columns:
        print("Añadiendo columna attendance...")
        # Añadir nueva columna attendance
        c.execute("ALTER TABLE rsvp ADD COLUMN attendance text")
        
        # Mover datos (si hay estructura vieja)
        c.execute("UPDATE rsvp SET attendance = companion WHERE attendance IS NULL")
        conn.commit()
        print("Migración completada")
    else:
        print("La columna attendance ya existe")
    
    conn.close()

if __name__ == "__main__":
    migrate_rsvp_table()
