import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerService } from '../api/authService';
import { useAuth } from '../context/AuthContext';
import '../css/Register.css'; 

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [fieldErrors, setFieldErrors] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setFieldErrors({});
        setLoading(true);

        try {
            const userData = await registerService(
                formData.username, 
                formData.email, 
                formData.password
            );
            
            login(userData); 
            alert("Konto utworzone! Zalogowano automatycznie.");
            navigate('/');
            
        } catch (err) {
            const responseData = err.response?.data;
            if (responseData?.messages) {
                setFieldErrors(responseData.messages);
                setError(responseData.message);
            } else {
                setError(responseData?.message || "Błąd rejestracji");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-card">
            <h2 style={{ textAlign: 'center' }}>Załóż konto</h2>
            
            {/* Baner z głównym błędem */}
            {error && <div className="register-error-banner"><strong>{error}</strong></div>}

            <form onSubmit={handleSubmit} className="register-form">
                <div className="register-input-group">
                    <label>Nazwa użytkownika</label>
                    <input 
                        name="username" 
                        type="text"
                        value={formData.username} 
                        onChange={handleChange}
                        className={`register-input ${fieldErrors.username ? 'register-input-error' : ''}`}
                    />
                    {fieldErrors.username && <span className="register-error-text">{fieldErrors.username}</span>}
                </div>

                <div className="register-input-group">
                    <label>Email</label>
                    <input 
                        name="email" 
                        type="email"
                        value={formData.email} 
                        onChange={handleChange}
                        className={`register-input ${fieldErrors.email ? 'register-input-error' : ''}`}
                    />
                    {fieldErrors.email && <span className="register-error-text">{fieldErrors.email}</span>}
                </div>

                <div className="register-input-group">
                    <label>Hasło</label>
                    <input 
                        name="password" 
                        type="password"
                        value={formData.password} 
                        onChange={handleChange}
                        className={`register-input ${fieldErrors.password ? 'register-input-error' : ''}`}
                    />
                    {fieldErrors.password && <span className="register-error-text">{fieldErrors.password}</span>}
                </div>

                <button type="submit" disabled={loading} className="register-button">
                    {loading ? 'Przetwarzanie...' : 'Zarejestruj się'}
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '15px' }}>
                Masz już konto? <Link to="/login">Zaloguj się</Link>
            </p>
        </div>
    );
};

export default Register;