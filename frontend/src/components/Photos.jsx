import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Form.css';
import './Photos.css';

const Photos = () => {
    const [serverPhotos, setServerPhotos] = useState([]);
    const [localPhotos, setLocalPhotos] = useState([]); // Photos uploaded in this session
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        const token = localStorage.getItem('token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

        try {
            const response = await fetch('http://localhost:8000/photos', { headers });
            const data = await response.json();
            if (data.status === 'success') {
                setServerPhotos(data.data);
            }
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFiles) return;

        setUploading(true);
        const formData = new FormData();
        const newLocalPhotos = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
            // Create local URL for immediate preview
            newLocalPhotos.push({
                id: `local-${Date.now()}-${i}`,
                url: URL.createObjectURL(selectedFiles[i])
            });
        }

        try {
            const response = await fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('¡Fotos subidas con éxito!');
                const data = await response.json();

                // Add to local state to show immediately to the uploader
                setLocalPhotos([...localPhotos, ...newLocalPhotos]);

                setSelectedFiles(null);

                // Clear the input value
                const fileInput = document.getElementById('file-upload');
                if (fileInput) fileInput.value = '';

                // Also try to fetch server photos 
                fetchPhotos();
            } else {
                alert('Error al subir las fotos.');
            }
        } catch (error) {
            console.error('Error uploading:', error);
            alert('Error de conexión.');
        } finally {
            setUploading(false);
        }
    };

    // Use server photos if available, otherwise local ones
    const displayPhotos = serverPhotos.length > 0 ? serverPhotos : localPhotos;

    return (
        <div className="photos-page">
            <Navbar />

            {/* Upload Section */}
            <section className="upload-section">
                <h2 className="upload-title">Sube tus recuerdos</h2>
                <p className="upload-desc">Comparte tus fotos de la boda con nosotros.</p>

                <form onSubmit={handleUpload} className="rsvp-form" style={{ alignItems: 'center' }}>
                    <div className="file-drop-zone">
                        <input
                            type="file"
                            id="file-upload"
                            className="file-input"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <div className="drop-zone-text">
                            {selectedFiles && selectedFiles.length > 0 ? (
                                <p style={{ color: 'var(--color-primary-dark)', fontWeight: 'bold' }}>
                                    {selectedFiles.length} archivos seleccionados
                                </p>
                            ) : (
                                <>
                                    <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📷</p>
                                    <p>Haz clic o arrastra tus fotos aquí</p>
                                </>
                            )}
                        </div>
                    </div>

                    <button type="submit" className="submit-btn" disabled={uploading} style={{ marginTop: '2rem' }}>
                        {uploading ? 'Subiendo...' : 'Subir fotos'}
                    </button>
                </form>
            </section>

            {/* Gallery Grid */}
            <h2 className="gallery-title">Galería de momentos</h2>

            {displayPhotos.length > 0 ? (
                <div className="gallery-grid">
                    {displayPhotos.map((photo) => (
                        <div key={photo.id} className="photo-card">
                            <img
                                src={photo.url || `http://localhost:8000/static/${photo.filename}`}
                                alt="Recuerdo de boda"
                                className="photo-img"
                                loading="lazy"
                                onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <p>Aún no has subido fotos en esta sesión.</p>
                </div>
            )}

            <Footer fixed={true} />
        </div>
    );
};

export default Photos;
