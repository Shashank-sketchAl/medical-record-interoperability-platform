import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';

const VoiceInput = ({ onTranscript }) => {
    const [isListening, setIsListening] = useState(false);

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Browser does not support speech recognition.");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onTranscript(transcript);
        };

        recognition.start();
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startListening}
            className={`absolute right-4 bottom-4 p-3 rounded-full shadow-lg transition-all ${isListening
                    ? 'bg-red-500 text-white shadow-red-500/50 animate-pulse'
                    : 'bg-slate-700 text-slate-300 hover:bg-teal-500 hover:text-white'
                }`}
            type="button"
            title="Dictate Note"
        >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </motion.button>
    );
};

export default VoiceInput;
