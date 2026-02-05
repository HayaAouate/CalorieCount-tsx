import { useCalories } from '../hooks/useCalories';


export default function ListesApportsAll() {
    // On récupère la liste (apports) depuis le hook
    const { apports } = useCalories();

    return (
        <div className="w-full relative group h-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
            <div className="relative p-8 bg-slate-900/80 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-2xl h-full min-h-[400px]">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="bg-purple-500/20 p-2 rounded-lg text-purple-400">📜</span>
                    Historique
                </h2>

                {/* Si la liste est vide, on affiche message */}
                {apports.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                        <span className="text-4xl mb-4 opacity-30">🕸️</span>
                        <p className="italic">Aucun apport pour le moment</p>
                    </div>
                ) : (
                    <ul className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {/* On map sur la liste pour afficher chaque apport */}
                        {apports.map((apport) => (
                            <li key={apport.id} className="group/item flex justify-between items-center gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-700/30 hover:bg-slate-800/80 hover:border-purple-500/30 transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                                    <span className="font-medium text-slate-200 group-hover/item:text-white transition-colors">{apport.nom}</span>
                                </div>
                                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 shrink-0">
                                    {apport.calories} kcal
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
