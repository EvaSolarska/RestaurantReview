import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/Navbar.css'; 

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div>
                <Link to="/" className="navbar-brand">
                    🍕 FoodReview
                </Link>
            </div>
            <div className="navbar-links">
                {user ? (
                    <>
                        <span>Witaj, <strong>{user.username}</strong></span>
                        <button 
                            onClick={handleLogout} 
                            className="navbar-button"
                        >
                            Wyloguj
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="navbar-link">Logowanie</Link>
                        <span className="navbar-separator">|</span>
                        <Link to="/register" className="navbar-link navbar-link-register">Rejestracja</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
