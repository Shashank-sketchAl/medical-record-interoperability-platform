import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle2, Circle } from 'lucide-react';

const growthData = [
    { month: '0', weight: 3.5, height: 50 },
    { month: '2', weight: 5.5, height: 58 },
    { month: '4', weight: 7.0, height: 64 },
    { month: '6', weight: 8.2, height: 68 },
    { month: '9', weight: 9.5, height: 72 },
    { month: '12', weight: 10.5, height: 76 },
];

const vaccinations = [
    { name: 'HepB (Birth)', completed: true },
    { name: 'DTaP (2 Mo)', completed: true },
    { name: 'Rotavirus (2 Mo)', completed: true },
    { name: 'Hib (2 Mo)', completed: true },
    { name: 'IPV (2 Mo)', completed: true },
    { name: 'PCV13 (4 Mo)', completed: false },
    { name: 'DTaP (4 Mo)', completed: false },
];

const PediatricDashboard = () => {
    return (
        <div className="space-y-6">
            {/* Growth Charts */}
            <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-teal-300 mb-4">👶 Growth Analysis</h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={growthData}>
                            <defs>
                                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="month" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="weight" stroke="#2dd4bf" fillOpacity={1} fill="url(#colorWeight)" name="Weight (kg)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Vaccination Tracker */}
            <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">💉 Immunization Tracker</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {vaccinations.map((vac, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                            {vac.completed ? (
                                <CheckCircle2 className="text-green-500" size={20} />
                            ) : (
                                <Circle className="text-slate-500" size={20} />
                            )}
                            <span className={`text-sm ${vac.completed ? 'text-slate-200' : 'text-slate-500'}`}>
                                {vac.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PediatricDashboard;
