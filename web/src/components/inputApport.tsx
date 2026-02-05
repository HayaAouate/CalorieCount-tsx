import { useState } from 'react';
import { useCalories } from '../hooks/useCalories';

export default function InputApport() {
    const { ajouterApport } = useCalories();

    // State for transaction type: 'apport' (intake) or 'depense' (expenditure)
    const [type, setType] = useState<'apport' | 'depense'>('apport');
    const [nom, setNom] = useState('');
    const [calories, setCalories] = useState('');

    const handleClick = () => {
        if (nom && calories) {
            let calValue = parseInt(calories);
            // If it's an expenditure, make the value negative
            if (type === 'depense') {
                calValue = -Math.abs(calValue);
            } else {
                calValue = Math.abs(calValue);
            }

            ajouterApport(nom, calValue, type);
            setNom('');
            setCalories('');
        }
    };

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
                        {isApport ? '🍎' : '🔥'}
                    </span>
                    {isApport ? 'Nouvel Apport' : 'Nouvelle Dépense'}
                </h2>

                {/* Type Toggle */}
                <div className="flex p-1 bg-slate-800/50 rounded-lg mb-6 border border-slate-700/50">
                    <button
                        onClick={() => setType('apport')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${isApport
                            ? 'bg-indigo-500/20 text-indigo-300 shadow-sm ring-1 ring-indigo-500/50'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
                            }`}
                    >
                        Apport (+)
                    </button>
                    <button
                        onClick={() => setType('depense')}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${!isApport
                            ? 'bg-emerald-500/20 text-emerald-300 shadow-sm ring-1 ring-emerald-500/50'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/30'
                            }`}
                    >
                        Dépense (-)
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="group/input">
                        <label className={`block text-sm font-medium text-slate-400 mb-1 ml-1 group-focus-within/input:text-${mainColor}-400 transition-colors`}>
                            {isApport ? "Nom de l'aliment" : "Activité"}
                        </label>
                        <input
                            type="text"
                            placeholder={isApport ? "ex: Pomme, Sandwich..." : "ex: Course à pied, Vélo..."}
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
                        {isApport ? 'Ajouter' : 'Déduire'}
                    </button>
                </div>
            </div>
        </div>
    );
}
