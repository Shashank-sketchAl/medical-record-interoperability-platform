import React from 'react';
import { Activity, Heart, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';

const VitalCard = ({ title, value, unit, icon: Icon, color, trend }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative overflow-hidden bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center gap-4`}
        >
            <div className={`p-3 rounded-lg ${color} bg-opacity-20`}>
                <Icon size={24} className={color.replace('bg-', 'text-')} />
            </div>
            <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{title}</p>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white">{value}</span>
                    <span className="text-sm text-slate-500">{unit}</span>
                </div>
                <span className={`text-xs ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last visit
                </span>
            </div>
        </motion.div>
    );
};

const VitalsDashboard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <VitalCard
                title="Heart Rate"
                value="72"
                unit="bpm"
                icon={Heart}
                color="bg-rose-500"
                trend={-2}
            />
            <VitalCard
                title="Blood Pressure"
                value="120/80"
                unit="mmHg"
                icon={Activity}
                color="bg-cyan-500"
                trend={1}
            />
            <VitalCard
                title="Temperature"
                value="98.6"
                unit="°F"
                icon={Thermometer}
                color="bg-amber-500"
                trend={0}
            />
        </div>
    );
};

export default VitalsDashboard;
