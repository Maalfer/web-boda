import React, { useState, useEffect } from 'react';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import { getPhotos, uploadPhotos, getStaticUrl } from '../services/api';
import './Photos.css';

const Photos = () => {
    const [serverPhotos, setServerPhotos] = useState([]);
    const [localPhotos, setLocalPhotos] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        const token = localStorage.getItem('token');

        try {
            const data = await getPhotos(token);
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

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setSelectedFiles(e.dataTransfer.files);
            // Also need to set these files to the input for the form submission to work
            // or modify handleUpload to use selectedFiles state directly, which it does.
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFiles) return;

        setUploading(true);
        const formData = new FormData();
        const newLocalPhotos = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
            newLocalPhotos.push({
                id: `local-${Date.now()}-${i}`,
                url: URL.createObjectURL(selectedFiles[i])
            });
        }

        try {
            const response = await uploadPhotos(formData);

            if (response.ok) {
                alert('¡Fotos subidas con éxito!');

                setLocalPhotos([...localPhotos, ...newLocalPhotos]);
                setSelectedFiles(null);

                const fileInput = document.getElementById('file-upload');
                if (fileInput) fileInput.value = '';

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

    const displayPhotos = serverPhotos.length > 0 ? serverPhotos : localPhotos;

    return (
        <div className="photos-page">
            <Navbar />

            <main className="photos-content">
                {/* Upload Section */}
                <section className="upload-section">
                    <h2 className="upload-title">Sube tus recuerdos</h2>
                    <p className="upload-desc">Comparte tus fotos de la boda con nosotros. Arrastra y suelta tus imágenes o haz clic para seleccionar.</p>

                    <form onSubmit={handleUpload} className="rsvp-form" style={{ alignItems: 'center', width: '100%' }}>
                        <div
                            className={`file-drop-zone ${dragActive ? 'drag-active' : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
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
                                    <div style={{ animation: 'bounce 0.5s ease' }}>
                                        <p style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✨</p>
                                        <p style={{ color: 'var(--color-primary-dark)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                            {selectedFiles.length} foto{selectedFiles.length !== 1 ? 's' : ''} seleccionada{selectedFiles.length !== 1 ? 's' : ''}
                                        </p>
                                        <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.5rem' }}>¡Listas para subir!</p>
                                    </div>
                                ) : (
                                    <>
                                        <span className="drop-icon">📷</span>
                                        <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--color-text)' }}>Arrastra tus fotos aquí</p>
                                        <p style={{ fontSize: '1rem', color: '#888', marginTop: '0.5rem' }}>o haz clic para explorar</p>
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
                                    src={photo.url || getStaticUrl(photo.filename)}
                                    alt="Recuerdo de boda"
                                    className="photo-img"
                                    loading="lazy"
                                    decoding="async"
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
            </main>

            <Footer fixed={false} />
        </div>
    );
};

export default Photos;
