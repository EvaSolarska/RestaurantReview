import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../api/authService';
import { useAuth } from '../context/AuthContext';
import '../css/Login.css'; 

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({}); 

    const { login } = useAuth();
    const navigate = useNavigate();

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
            const userData = await loginService(formData.email, formData.password);
            login(userData); 
            navigate('/');
        } catch (err) {
            const responseData = err.response?.data;
            if (responseData?.messages) {
                setFieldErrors(responseData.messages);
                setError(responseData.message);
            } else {
                setError(responseData?.message || "Wystąpił nieoczekiwany błąd");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2 style={{ textAlign: 'center' }}>Logowanie</h2>

            {error && <div className="error-banner"><strong>{error}</strong></div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Użytkownik</label>
                    <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${fieldErrors.email ? 'input-error' : ''}`}
                    />
                    {fieldErrors.email && (
                    <span className="error-text">{fieldErrors.email}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Hasło</label>
                    <input 
                        name="password" 
                        type="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        className={`form-input ${fieldErrors.password ? 'input-error' : ''}`}
                    />
                    {fieldErrors.password && <span className="error-text">{fieldErrors.password}</span>}
                </div>

                <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? 'Logowanie...' : 'Zaloguj się'}
                </button>
            </form>
        </div>
    );
};

export default Login;