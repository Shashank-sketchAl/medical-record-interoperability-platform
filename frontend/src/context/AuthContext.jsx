import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token && username) {
            setUser({ username, token });
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const res = await axios.post('http://localhost:5000/auth/login', { username, password });
            const { token, role } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            setUser({ username, token, role });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.error || "Login failed" };
        }
    };

    const signup = async (username, password, email, phone, full_name) => {
        try {
            await axios.post('http://localhost:5000/auth/signup', { username, password, email, phone, full_name });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.error || "Signup failed" };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
