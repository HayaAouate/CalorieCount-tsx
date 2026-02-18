import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import TemplateForm, { type TemplateFormData } from '../component/TemplateForm';
import TemplateList from '../component/TemplateList';

type Template = {
    _id: string;
    nom: string;
    calories: number;
    type: 'apport' | 'depense';
};

export default function AdminTemplates() {
    const { token, user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const [templates, setTemplates] = useState<Template[]>([]);
    const [message, setMessage] = useState('');

    // Rediriger si pas admin
    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
        }
    }, [isAdmin, navigate]);

    // Charger les templates
    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const res = await fetch('http://localhost:3000/templates');
            const data = await res.json();
            setTemplates(data);
        } catch (err) {
            console.error('Error fetching templates:', err);
        }
    };

    // Utilise le composant réutilisable TemplateForm
    const handleCreate = async (data: TemplateFormData) => {
        try {
            const res = await fetch('http://localhost:3000/templates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                setMessage('✅ Template créé !');
                fetchTemplates();
                setTimeout(() => setMessage(''), 3000);
            } else {
                const responseData = await res.json();
                setMessage(`❌ ${responseData.message}`);
            }
        } catch (err) {
            setMessage('❌ Erreur de connexion');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:3000/templates/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                fetchTemplates(); 
            }
        } catch (err) {
            console.error('Error deleting template:', err);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const apports = templates.filter(t => t.type === 'apport');
    const depenses = templates.filter(t => t.type === 'depense');

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            {/* Header */}
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                        🛠️ Administration des Templates
                    </h1>
                    <div className="flex gap-4 items-center">
                        <Link to="/" className="text-slate-400 hover:text-white transition">
                            ← Dashboard
                        </Link>
                        <span className="text-sm text-slate-400">Admin: <span className="text-amber-400 font-bold">{user}</span></span>
                        <button onClick={handleLogout} className="px-3 py-1 text-xs font-bold bg-slate-800 rounded hover:bg-slate-700">
                            Déconnexion
                        </button>
                    </div>
                </div>

                {/* Formulaire de création - Composant réutilisable */}
                <div className="bg-slate-900/80 rounded-xl p-6 mb-8 border border-slate-700/50">
                    <h2 className="text-xl font-bold mb-4">Créer un nouveau template</h2>

                    {message && (
                        <div className="mb-4 p-3 rounded-lg bg-slate-800 text-sm">
                            {message}
                        </div>
                    )}

                    <TemplateForm onSubmit={handleCreate} buttonText="+ Créer" />
                </div>

                {/* Listes des templates - Composants réutilisables */}
                <div className="grid md:grid-cols-2 gap-6">
                    <TemplateList
                        templates={apports}
                        onDelete={handleDelete}
                        title="Templates Apports"
                        emoji="🍎"
                        colorClass="text-indigo-400"
                    />
                    <TemplateList
                        templates={depenses}
                        onDelete={handleDelete}
                        title="Templates Dépenses"
                        emoji="🏃"
                        colorClass="text-emerald-400"
                    />
                </div>
            </div>
        </div>
    );
}
