import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Timeline = ({ refreshTrigger }) => {
    const [events, setEvents] = useState([]);

    const fetchTimeline = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/patients/patient-001/timeline');
            setEvents(res.data);
        } catch (error) {
            console.error("Error fetching timeline", error);
        }
    };

    useEffect(() => {
        fetchTimeline();
    }, [refreshTrigger]);

    const downloadReport = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/patients/patient-001/report');
            const blob = new Blob([res.data.report], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'patient_report.txt';
            a.click();
        } catch (error) {
            console.error("Error downloading report", error);
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-purple-300">🩺 Patient Timeline</h2>
                <button
                    onClick={downloadReport}
                    className="text-xs bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 px-3 py-1 rounded-full border border-purple-500/50 transition-all"
                >
                    Download Report
                </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                {events.length === 0 ? (
                    <p className="text-slate-500 text-center py-10">No records found. Upload some data to begin.</p>
                ) : (
                    events.map((event) => (
                        <div key={event.id} className="relative pl-8 border-l-2 border-slate-700 hover:border-purple-500 transition-colors group">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-600 group-hover:border-purple-500 group-hover:bg-purple-500 transition-all"></div>
                            <div className="mb-1 text-xs text-slate-400 font-mono">{new Date(event.date).toLocaleString()}</div>
                            <h3 className="text-lg font-medium text-white mb-1 group-hover:text-purple-300 transition-colors">{event.description}</h3>
                            {event.extracted_entities && event.extracted_entities.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {event.extracted_entities.map((ent, i) => (
                                        <span key={i} className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-xs text-cyan-300">
                                            {ent.text} <span className="opacity-50">({ent.label})</span>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Timeline;
