import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import '../styles/Form.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(username, password);

            if (data.status === 'success') {
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                alert('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Error de conexión');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--color-background)' }}>
            <form className="rsvp-form" onSubmit={handleLogin} style={{ padding: '3rem', backgroundColor: 'white', borderRadius: 'var(--radius-md)', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>Acceso Privado</h2>
                <div className="form-group">
                    <label>Usuario</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="submit-btn" style={{ width: '100%' }}>Entrar</button>
            </form>
        </div>
    );
};

export default Login;
