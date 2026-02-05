import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import InputApport from './components/inputApport';
import ListesApportsAll from './components/listesApportsAll';
import BilanCalories from './components/bilanCalories';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminTemplates from './components/admin/AdminTemplates';
import { CaloriesProvider } from './contexts/calorieContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function Dashboard() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <CaloriesProvider>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
        {/* Background Gradients */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
          <header className="mb-12 text-center relative">
            <div className="absolute right-0 top-0 z-50 flex items-center gap-3">
              {isAdmin && (
                <Link to="/admin" className="text-amber-400 hover:text-amber-300 text-sm font-medium">
                  🛠️ Admin
                </Link>
              )}
              <span className="text-sm text-slate-400">Bonjour, <span className="text-white font-bold">{user}</span></span>
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1 text-xs font-bold text-slate-300 bg-slate-800 rounded hover:bg-slate-700 transition cursor-pointer"
              >
                Déconnexion
              </button>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-4 drop-shadow-sm">
              Mon Suivi Calories
            </h1>
            <p className="text-slate-400 text-lg">Suivez votre nutrition simplement et efficacement</p>
          </header>

          <div className="flex flex-col lg:flex-row gap-8 justify-center items-start pb-32">
            <div className="w-full lg:w-5/12">
              <InputApport />
            </div>

            <div className="w-full lg:w-5/12">
              <ListesApportsAll />
            </div>
          </div>
        </div>

        <BilanCalories />
      </div>
    </CaloriesProvider>
  );
}

import React from 'react';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminTemplates />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

