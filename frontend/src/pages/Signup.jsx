import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, User, Lock, Mail } from 'lucide-react';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate phone number (must be 10 digits)
        if (phone.length !== 10) {
            setError("Phone number must be exactly 10 digits.");
            return;
        }
        const fullPhone = "+91" + phone;
        const res = await signup(username, password, email, fullPhone, fullName);
        if (res.success) {
            navigate('/login');
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
            <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute top-0 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-[50px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-teal-500/20 rounded-full blur-[50px] pointer-events-none"></div>

                <div className="text-center mb-8 relative z-10">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                        <UserPlus size={32} className="text-slate-900" />
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-indigo-200">Create Account</h2>
                    <p className="text-slate-400 mt-2">Join the interoperability network</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-200 ml-1">Full Name</label>
                        <div className="relative">
                            <User size={18} className="absolute left-3 top-3 text-slate-400" />
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder:text-slate-500"
                                placeholder="Dr. Rajesh Koothrappali"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-200 ml-1">Username</label>
                        <div className="relative">
                            <User size={18} className="absolute left-3 top-3 text-slate-400" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder:text-slate-500"
                                placeholder="rajesh_k"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-200 ml-1">Email</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-3 top-3 text-slate-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder:text-slate-500"
                                placeholder="doctor@hospital.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-200 ml-1">Phone Number (+91)</label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-slate-400 font-medium z-10 select-none">+91</span>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '');
                                    if (val.length <= 10) setPhone(val);
                                }}
                                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-2.5 pl-12 pr-4 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all tracking-widest placeholder:text-slate-500"
                                placeholder="9876543210"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-200 ml-1">Password</label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-3 top-3 text-slate-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder:text-slate-500"
                                placeholder="Create a password"
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all mt-2"
                    >
                        Start using platform
                    </motion.button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                    Already have an account? <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
