import { useState, useEffect } from 'react';
import { useCalories } from '../hooks/useCalories';

type Template = {
    _id: string;
    nom: string;
    calories: number;
    type: 'apport' | 'depense';
};

export default function InputApport() {
    const { ajouterApport } = useCalories();

    // State for transaction type
    const [type, setType] = useState<'apport' | 'depense'>('apport');
    const [nom, setNom] = useState('');
    const [calories, setCalories] = useState('');
    const [templates, setTemplates] = useState<Template[]>([]);

    // Fetch templates on mount
    useEffect(() => {
        fetch('http://localhost:3000/templates')
            .then(res => res.json())
            .then(data => setTemplates(data))
            .catch(err => console.error('Error fetching templates:', err));
    }, []);

    const handleClick = () => {
        if (nom && calories) {
            let calValue = parseInt(calories);
            ajouterApport(nom, calValue, type);
            setNom('');
            setCalories('');
        }
    };

    const handleTemplateSelect = (templateId: string) => {
        const template = templates.find(t => t._id === templateId);
        if (template) {
            setNom(template.nom);
            setCalories(template.calories.toString());
            setType(template.type);
        }
    };

    const filteredTemplates = templates.filter(t => t.type === type);
    const isApport = type === 'apport';
    const mainColor = isApport ? 'indigo' : 'emerald';
    const gradient = isApport
        ? 'from-indigo-600 to-purple-600'
        : 'from-emerald-600 to-teal-600';
    const bgGradient = isApport
        ? 'from-indigo-500 to-purple-600'
        : 'from-emerald-500 to-teal-600';

    return (
        <div className="w-full relative group">
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${bgGradient} rounded-2xl opacity-30 group-hover:opacity-60 transition duration-500 blur`}></div>
            <div className="relative p-8 bg-slate-900/80 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className={`bg-${mainColor}-500/20 p-2 rounded-lg text-${mainColor}-400`}>
                        {isApport ? '🍎' : '🏃'}
                    </span>
                    {isApport ? 'Nouvel Apport' : 'Nouvelle Dépense'}
                </h2>

                {/* Type Toggle */}
                <div className="flex p-1 bg-slate-800/50 rounded-lg mb-4 border border-slate-700/50">
                    <button
                        onClick={() => setType('apport')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${isApport ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        Apport
                    </button>
                    <button
                        onClick={() => setType('depense')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${!isApport ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        Dépense
                    </button>
                </div>

                {/* Template Dropdown */}
                {filteredTemplates.length > 0 && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-400 mb-1 ml-1">
                            📋 Sélection rapide
                        </label>
                        <select
                            onChange={(e) => handleTemplateSelect(e.target.value)}
                            className={`w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:border-${mainColor}-500 focus:ring-2 focus:ring-${mainColor}-500/20 outline-none transition-all cursor-pointer`}
                            defaultValue=""
                        >
                            <option value="" disabled>Choisir un template...</option>
                            {filteredTemplates.map(t => (
                                <option key={t._id} value={t._id}>
                                    {t.nom} ({t.calories} kcal)
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="space-y-4">
                    <div className="group/input">
                        <label className={`block text-sm font-medium text-slate-400 mb-1 ml-1 group-focus-within/input:text-${mainColor}-400 transition-colors`}>
                            Nom de l'aliment
                        </label>
                        <input
                            type="text"
                            placeholder="ex: Pomme, Sandwich..."
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            className={`w-full p-3 rounded-lg bg-slate-800/50 text-white placeholder-slate-500 border border-slate-700 focus:border-${mainColor}-500 focus:ring-2 focus:ring-${mainColor}-500/20 outline-none transition-all`}
                        />
                    </div>

                    <div className="group/input">
                        <label className={`block text-sm font-medium text-slate-400 mb-1 ml-1 group-focus-within/input:text-${mainColor}-400 transition-colors`}>
                            Calories (kcal)
                        </label>
                        <input
                            type="number"
                            placeholder="0"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            min="0"
                            className={`w-full p-3 rounded-lg bg-slate-800/50 text-white placeholder-slate-500 border border-slate-700 focus:border-${mainColor}-500 focus:ring-2 focus:ring-${mainColor}-500/20 outline-none transition-all`}
                        />
                    </div>

                    <button
                        onClick={handleClick}
                        disabled={!nom || !calories}
                        className={`w-full mt-2 py-3.5 px-6 rounded-lg font-bold text-white bg-gradient-to-r ${gradient} hover:opacity-90 shadow-lg shadow-${mainColor}-500/20 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0`}
                    >
                        Ajouter
                    </button>
                </div>
            </div>
        </div>
    );
}

