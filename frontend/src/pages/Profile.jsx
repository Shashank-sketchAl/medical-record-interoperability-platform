import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Activity, AlertCircle, Save, CheckCircle } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState({
        age: '',
        weight: '',
        height: '',
        diseases: []
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);
    const [fullInfo, setFullInfo] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.username) return;
            try {
                const res = await axios.get(`http://localhost:5000/auth/profile/${user.username}`);
                setFullInfo(res.data);
                // Ensure profile fields exist
                const defaultProfile = { age: '', weight: '', height: '', diseases: [] };
                setProfile({ ...defaultProfile, ...res.data.profile });
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch profile", error);
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleDiseaseChange = (e) => {
        // Simple comma separated logic for prototype
        const list = e.target.value.split(',').map(item => item.trim());
        setProfile({ ...profile, diseases: list });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);
        try {
            await axios.put(`http://localhost:5000/auth/profile/${user.username}`, { profile });
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        }
        setSaving(false);
    };

    if (loading) return <div className="text-slate-400 p-8 text-center">Loading Profile...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl"
            >
                <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6">
                    <div className="w-16 h-16 bg-gradient-to-tr from-teal-400 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold text-slate-900 shadow-lg">
                        {fullInfo?.full_name?.charAt(0) || user?.username?.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">{fullInfo?.full_name || user?.username}</h1>
                        <p className="text-slate-300 flex items-center gap-2 font-medium">
                            User ID: {user?.username} <span className="text-slate-400">|</span> {fullInfo?.phone}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSave} className="space-y-8">
                    {/* Physical Stats Section */}
                    <div>
                        <h2 className="text-xl font-semibold text-teal-300 mb-4 flex items-center gap-2">
                            <Activity size={20} /> Physical Statistics
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-slate-200 font-medium">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={profile.age}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-teal-500 outline-none font-medium"
                                    placeholder="Years"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-slate-200 font-medium">Weight (kg)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={profile.weight}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-teal-500 outline-none font-medium"
                                    placeholder="kg"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-slate-200 font-medium">Height (cm)</label>
                                <input
                                    type="number"
                                    name="height"
                                    value={profile.height}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-teal-500 outline-none font-medium"
                                    placeholder="cm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Medical History Section */}
                    <div>
                        <h2 className="text-xl font-semibold text-rose-300 mb-4 flex items-center gap-2">
                            <AlertCircle size={20} /> Medical History
                        </h2>
                        <div className="space-y-2">
                            <label className="text-sm text-slate-200 font-medium">Known Conditions / Diseases</label>
                            <textarea
                                value={profile.diseases.join(', ')}
                                onChange={handleDiseaseChange}
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-rose-500 outline-none h-24 font-medium"
                                placeholder="E.g., Diabetes, Hypertension, Asthma (Separate with commas)"
                            />
                            <p className="text-xs text-slate-300">List any chronic conditions or important medical history notes here.</p>
                        </div>
                    </div>

                    {/* Status Message */}
                    {message && (
                        <div className={`p-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-teal-500/10 text-teal-400' : 'bg-red-500/10 text-red-400'}`}>
                            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                            {message.text}
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="flex justify-end pt-4 border-t border-slate-800">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={saving}
                            className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all flex items-center gap-2"
                        >
                            <Save size={20} />
                            {saving ? 'Saving...' : 'Save Profile'}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Profile;
