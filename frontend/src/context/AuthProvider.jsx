import { useState } from 'react';
import { AuthContext } from './AuthContext';
import { getCurrentUser, logout as authLogout } from '../api/authService';

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(getCurrentUser());

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        authLogout(); 
        setUser(null); 
    };

    const value = {
        user,
        login,
        logout,
        isAdmin: user?.role === 'ADMIN'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};