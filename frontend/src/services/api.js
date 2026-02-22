/**
 * Servicio centralizado para las llamadas al backend.
 * Todas las URLs del backend se gestionan desde aquí.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Construye la URL completa de un recurso estático del backend.
 */
export const getStaticUrl = (filename) => `${API_BASE_URL}/static/${filename}`;

/**
 * Envía una confirmación de asistencia (RSVP).
 */
export const submitRsvp = async (rsvpData) => {
    const response = await fetch(`${API_BASE_URL}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rsvpData),
    });
    return response;
};

/**
 * Inicia sesión con credenciales.
 */
export const login = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
};

/**
 * Obtiene la lista de fotos.
 */
export const getPhotos = async (token = null) => {
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    const response = await fetch(`${API_BASE_URL}/photos`, { headers });
    return response.json();
};

/**
 * Sube fotos al servidor.
 */
export const uploadPhotos = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
    });
    return response;
};

/**
 * Obtiene la lista de RSVPs (admin).
 */
export const getRsvps = async () => {
    const response = await fetch(`${API_BASE_URL}/rsvps`);
    return response.json();
};

/**
 * Elimina un RSVP por su ID de fila.
 */
export const deleteRsvp = async (rowid) => {
    const response = await fetch(`${API_BASE_URL}/rsvp/${rowid}`, {
        method: 'DELETE',
    });
    return response.json();
};

/**
 * Elimina una foto por su ID.
 */
export const deletePhoto = async (photoId) => {
    const response = await fetch(`${API_BASE_URL}/photos/${photoId}`, {
        method: 'DELETE',
    });
    return response.json();
};

/**
 * Actualiza el PIN de acceso a la web.
 */
export const updatePin = async (pin, token) => {
    const response = await fetch(`${API_BASE_URL}/api/settings/pin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ pin }),
    });
    return response.json();
};

/**
 * Verifica si un PIN de acceso es correcto.
 */
export const verifyPin = async (pin) => {
    const response = await fetch(`${API_BASE_URL}/api/settings/verify-pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
    });
    return response.json();
};

/**
 * Comprueba si hay un PIN configurado.
 */
export const checkPinConfigured = async () => {
    const response = await fetch(`${API_BASE_URL}/api/settings/pin`, {
        method: 'GET'
    });
    return response.json();
};
