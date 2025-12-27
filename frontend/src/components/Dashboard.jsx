import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [rsvps, setRsvps] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [showPhotos, setShowPhotos] = useState(false);
    const navigate = useNavigate();

    const fetchPhotos = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch('http://localhost:8000/photos', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.status === 'success') {
                setPhotos(data.data);
            }
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };

    const togglePhotos = () => {
        if (!showPhotos) {
            fetchPhotos();
        }
        setShowPhotos(!showPhotos);
    };

    const handleDeleteRsvp = async (rowid) => {
        if (!window.confirm('¿Seguro que quieres eliminar esta confirmación?')) return;

        try {
            const response = await fetch(`http://localhost:8000/rsvp/${rowid}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.status === 'success') {
                setRsvps(rsvps.filter(r => r.rowid !== rowid));
            } else {
                alert('Error al eliminar');
            }
        } catch (error) {
            console.error('Error deleting RSVP:', error);
        }
    };

    const handleDeletePhoto = async (id) => {
        if (!window.confirm('¿Seguro que quieres eliminar esta foto?')) return;

        try {
            const response = await fetch(`http://localhost:8000/photos/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            if (data.status === 'success') {
                setPhotos(photos.filter(p => p.id !== id));
            } else {
                alert('Error al eliminar');
            }
        } catch (error) {
            console.error('Error deleting photo:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/balulero');
            return;
        }

        const fetchRsvps = async () => {
            try {
                const response = await fetch('http://localhost:8000/rsvps');
                const data = await response.json();
                if (data.status === 'success') {
                    setRsvps(data.data);
                }
            } catch (error) {
                console.error('Error fetching RSVPs:', error);
            }
        };

        fetchRsvps();
    }, [navigate]);

    return (
        <div style={{ padding: '2rem', backgroundColor: 'var(--color-background)', minHeight: '100vh' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '2rem' }}>Dashboard de confirmaciones</h2>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', fontFamily: 'var(--font-body)' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-text)' }}>
                            <th style={{ padding: '1rem', border: '1px solid #ddd' }}>Nombre</th>
                            <th style={{ padding: '1rem', border: '1px solid #ddd' }}>Acompañante</th>
                            <th style={{ padding: '1rem', border: '1px solid #ddd' }}>Transporte</th>
                            <th style={{ padding: '1rem', border: '1px solid #ddd' }}>Alergias</th>
                            <th style={{ padding: '1rem', border: '1px solid #ddd' }}>Canción</th>
                            <th style={{ padding: '1rem', border: '1px solid #ddd' }}>Mensaje</th>
                            <th style={{ padding: '1rem', border: '1px solid #ddd' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rsvps.map((rsvp, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem', border: '1px solid #ddd' }}>{rsvp.name}</td>
                                <td style={{ padding: '1rem', border: '1px solid #ddd' }}>{rsvp.companion}</td>
                                <td style={{ padding: '1rem', border: '1px solid #ddd' }}>{rsvp.transport}</td>
                                <td style={{ padding: '1rem', border: '1px solid #ddd' }}>{rsvp.allergies}</td>
                                <td style={{ padding: '1rem', border: '1px solid #ddd' }}>{rsvp.song || '-'}</td>
                                <td style={{ padding: '1rem', border: '1px solid #ddd' }}>{rsvp.message || '-'}</td>
                                <td style={{ padding: '1rem', border: '1px solid #ddd', textAlign: 'center' }}>
                                    <button
                                        onClick={() => handleDeleteRsvp(rsvp.rowid)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                        title="Eliminar"
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={() => { localStorage.removeItem('token'); navigate('/balulero'); }}
                style={{ marginTop: '2rem', padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px' }}
            >
                Cerrar sesión
            </button>

            <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #ddd' }} />

            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>Galería de fotos</h2>
            <button
                onClick={togglePhotos}
                className="submit-btn"
                style={{ marginBottom: '2rem', marginTop: 0 }}
            >
                {showPhotos ? 'Ocultar fotos' : 'Ver todas las fotos'}
            </button>

            {showPhotos && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '1rem',
                }}>
                    {photos.map((photo) => (
                        <div key={photo.id} style={{
                            borderRadius: '4px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            height: '200px',
                            position: 'relative'
                        }}>
                            <button
                                onClick={() => handleDeletePhoto(photo.id)}
                                style={{
                                    position: 'absolute',
                                    top: '5px',
                                    right: '5px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1rem',
                                    zIndex: 10
                                }}
                                title="Eliminar foto"
                            >
                                🗑️
                            </button>
                            <a href={`http://localhost:8000/static/${photo.filename}`} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`http://localhost:8000/static/${photo.filename}`}
                                    alt="Foto subida"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    loading="lazy"
                                    onError={(e) => { e.target.parentElement.parentElement.style.display = 'none'; }}
                                />
                            </a>
                        </div>
                    ))}
                    {photos.length === 0 && (
                        <p style={{ gridColumn: '1 / -1', color: '#666' }}>No hay fotos subidas aún.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
