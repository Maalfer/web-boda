# Web de Boda - Fátima & Mario 💍

Bienvenido al repositorio del sitio web para la boda de Fátima y Mario. Este proyecto consta de una aplicación web moderna con un frontend atractivo y un backend robusto para gestionar confirmaciones de asistencia (RSVP) y una galería de fotos compartida.

## 🚀 Tecnologías

- **Frontend**: React, Vite, CSS (Diseño personalizado), Canvas Confetti.
- **Backend**: FastAPI (Python), SQLite.
- **Base de Datos**: SQLite (`boda.db`).
- **Despliegue**: VPS con Nginx y CDN Cloudflare.

## 📂 Estructura del Proyecto

```
web-boda/
├── backend/            # API FastAPI
│   ├── app/            # Código fuente del backend
│   │   ├── models/     # Modelos Pydantic (schemas.py)
│   │   └── database.py # Conexión a SQLite
│   └── uploads/        # Directorio para fotos subidas
├── frontend/           # Aplicación React
│   ├── src/
│   │   ├── components/ # Componentes reutilizables (Modal, Navbar...)
│   │   ├── pages/      # Páginas (Home, Photos, Dashboard)
│   │   └── styles/     # Archivos CSS modulares
│   └── .env            # Variables de entorno (NO subir al repo)
├── Recursos/           # Activos de diseño y guía de despliegue
└── README.md           # Documentación
```

## 🛠️ Configuración y Despliegue

### 1. Backend (API)

El backend gestiona la base de datos de invitados y el almacenamiento de fotos.

1.  **Instalar dependencias**:
    ```bash
    cd backend
    pip install -r requirements.txt
    ```
    *(Ver imagen en `Recursos/repo/dependencias-backend.png`)*

2.  **Iniciar el servidor**:
    ```bash
    uvicorn main:app --reload
    ```
    El servidor correrá en `http://localhost:8000`.

3.  **Acceso al Dashboard**:
    Para ver las confirmaciones de asistencia ("lo que dice la gente") y gestionar las fotos, accede a:
    `http://localhost:5173/dashboard` (requiere login).

### 2. Frontend (Web)

1.  **Variables de Entorno**:
    Crea un archivo `.env` en la carpeta `frontend/` basándote en `.env.example`.
    **Importante**: Aquí es donde se configuran los números de teléfono para que no estén hardcodeados en el código.

    ```env
    VITE_API_URL=http://localhost:8000
    VITE_PHONE_FATIMA=346********
    VITE_PHONE_MARIO=346********
    ```
    *(Ver imágenes en `Recursos/repo/configurar-frontend*.png`)*

2.  **Instalar dependencias e iniciar**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

### 📸 Recursos de Despliegue

Para una guía visual sobre el despliegue y configuración, consulta las imágenes en la carpeta `Recursos/repo`:

- **Dependencias Backend**: `Recursos/repo/dependencias-backend.png`
- **Configuración Frontend**: `Recursos/repo/configurar-frontend*.png`

## ✨ Características Destacadas

- **RSVP Interactivo**: Formulario modal con confirmación visual (confeti).
- **Galería de Fotos**: Subida de imágenes drag & drop para los invitados.
- **Dashboard de Administración**: Panel privado para consultar asistencias, alergias, mensajes y moderar fotos.
- **Diseño Responsive**: Adaptado perfectamente a móviles y escritorio.

---
Hecho con ❤️ para la boda del año.
