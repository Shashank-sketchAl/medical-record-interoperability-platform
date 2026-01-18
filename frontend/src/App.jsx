import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import UploadForm from './components/UploadForm';
import Timeline from './components/Timeline';
import VitalsDashboard from './components/VitalsDashboard';
import PediatricDashboard from './components/PediatricDashboard';
import { LayoutDashboard, Baby, Stethoscope, LogOut, UserCircle } from 'lucide-react';

const Dashboard = () => {
  const [refreshTimeline, setRefreshTimeline] = useState(0);
  const [mode, setMode] = useState('adult'); // 'adult' | 'pediatric'
  const { user, logout } = useAuth();

  const handleUploadSuccess = () => {
    setRefreshTimeline(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-teal-500/30 font-sans">

      {/* Navbar */}
      <nav className="border-b border-white/5 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-400 to-purple-500 flex items-center justify-center text-slate-900 font-bold shadow-lg shadow-teal-500/20">A</div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-purple-200">
                AthenaHealth Interop
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex bg-slate-800 p-1 rounded-lg">
                <button
                  onClick={() => setMode('adult')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${mode === 'adult' ? 'bg-teal-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  <LayoutDashboard size={16} /> Adult
                </button>
                <button
                  onClick={() => setMode('pediatric')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${mode === 'pediatric' ? 'bg-purple-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  <Baby size={16} /> Pediatric
                </button>
              </div>

              <div className="h-6 w-px bg-slate-800"></div>

              <div className="flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors">
                  <UserCircle size={20} />
                  <span className="text-sm hidden md:block">{user?.username}</span>
                </Link>
                <button onClick={logout} className="text-slate-400 hover:text-red-400 transition-colors" title="Logout">
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Vitals Section (Always Visible) */}
        <section>
          <h2 className="text-xl font-semibold text-slate-300 mb-4 flex items-center gap-2">
            <Stethoscope size={20} className="text-rose-400" /> Vitals Overview
          </h2>
          <VitalsDashboard />
        </section>

        {mode === 'adult' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-6">
              <UploadForm onUploadSuccess={handleUploadSuccess} />
            </div>
            <div className="lg:col-span-8 h-[calc(100vh-25rem)] min-h-[500px]">
              <Timeline refreshTrigger={refreshTimeline} />
            </div>
          </div>
        ) : (
          <PediatricDashboard />
        )}

      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
