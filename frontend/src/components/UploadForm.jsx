import React, { useState } from 'react';
import axios from 'axios';
import { ClipboardList, Sparkles } from 'lucide-react';
import VoiceInput from './VoiceInput';

const UploadForm = ({ onUploadSuccess }) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            await axios.post('http://localhost:5000/api/upload', {
                text,
                patientId: 'patient-001'
            });
            setMessage({ type: 'success', text: 'Record processed successfully!' });
            setText('');
            onUploadSuccess();
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to process record.' });
        } finally {
            setLoading(false);
        }
    };

    const handleVoiceTranscript = (transcript) => {
        setText((prev) => prev + " " + transcript);
    };

    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles size={64} className="text-teal-400" />
            </div>

            <h2 className="text-xl font-semibold mb-4 text-teal-300 flex items-center gap-2">
                <ClipboardList size={20} /> Clinical Notes
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 relative">
                <div className="relative">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Note Content</label>
                    <textarea
                        className="w-full h-40 bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all resize-none text-slate-200"
                        placeholder="Type or dictate clinical findings..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                    <VoiceInput onTranscript={handleVoiceTranscript} />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-500/20 flex justify-center items-center gap-2"
                >
                    {loading ? (
                        <span className="flex items-center gap-2"><Sparkles className="animate-spin" size={16} /> Processing AI...</span>
                    ) : (
                        'Process and Extract Entities'
                    )}
                </button>

                {message && (
                    <div className={`p-3 rounded-lg text-sm border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-300' : 'bg-red-500/10 border-red-500/20 text-red-300'}`}>
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    );
};

export default UploadForm;
