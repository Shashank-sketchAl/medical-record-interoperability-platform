import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, User, Lock } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login(username, password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
            <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-teal-500/20 rounded-full blur-[50px] pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-[50px] pointer-events-none"></div>

                <div className="text-center mb-8 relative z-10">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-teal-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                        <LogIn size={32} className="text-slate-900" />
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-purple-200">Welcome Back</h2>
                    <p className="text-slate-400 mt-2">Sign in to access patient records</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-200 ml-1">Username</label>
                        <div className="relative">
                            <User size={18} className="absolute left-3 top-3 text-slate-400" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all placeholder:text-slate-500"
                                placeholder="Dr. Strange"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-200 ml-1">Password</label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-3 top-3 text-slate-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all placeholder:text-slate-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all"
                    >
                        Sign In
                    </motion.button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                    Don't have an account? <Link to="/signup" className="text-teal-400 hover:text-teal-300 font-medium hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
