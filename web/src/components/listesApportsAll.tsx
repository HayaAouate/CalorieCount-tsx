import { useState } from 'react';
import { useCalories } from '../hooks/useCalories';

export default function ListesApportsAll() {
    // On récupère la liste des apports depuis le hook
    const { apports, supprimerApport } = useCalories();
    const [trieDate, setTrieDate] = useState(true);

    const sortedApports = [...apports].sort((a, b) => {
        const dateA = new Date(a.date || 0).getTime();
        const dateB = new Date(b.date || 0).getTime();
        return trieDate ? //si Vrai 
        //Du plus recent au plus ancien
        dateB - dateA :
        //Si faux du plus anxien au plus recent
         dateA - dateB; 
    });

    return (
        <div className="w-full relative group h-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
            <div className="relative p-8 bg-slate-900/80 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-2xl h-full min-h-[400px]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <span className="bg-purple-500/20 p-2 rounded-lg text-purple-400">📜</span>
                        Historique
                    </h2>
                    <button
                        onClick={() => setTrieDate(!trieDate)}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                        title={trieDate ? "Plus ancien en premier" : "Plus récent en premier"}
                    >
                        {trieDate ? '⬇️ Ancien' : '⬆️ Récent'}
                    </button>
                </div>

                {/* Si la liste est vide, on affiche message */}
                {sortedApports.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                        <span className="text-4xl mb-4 opacity-30">🕸️</span>
                        <p className="italic">Aucun apport pour le moment</p>
                    </div>
                ) : (
                    <ul className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {/* On map sur la liste pour afficher chaque apport */}
                        {sortedApports.map((apport) => (
                            <li key={apport.id} className="group/item flex justify-between items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-700/30 hover:bg-slate-800/80 hover:border-purple-500/30 transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)] ${apport.type === 'depense' ? 'bg-emerald-500' : 'bg-indigo-500'}`}></div>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-200 group-hover/item:text-white transition-colors">{apport.nom}</span>
                                        <span className="text-xs text-slate-500">
                                            {apport.date ? new Date(apport.date).toLocaleDateString() : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`font-bold text-transparent bg-clip-text shrink-0 ${apport.type === 'depense' ? 'bg-gradient-to-r from-emerald-400 to-teal-400' : 'bg-gradient-to-r from-indigo-400 to-purple-400'}`}>
                                        {apport.type === 'depense' ? '-' : '+'}{apport.calories} kcal
                                    </span>
                                    <button
                                        onClick={() => supprimerApport && supprimerApport(apport.id)}
                                        className="opacity-0 group-hover/item:opacity-100 p-2 text-slate-500 hover:text-red-400 transition-all"
                                        title="Supprimer"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
