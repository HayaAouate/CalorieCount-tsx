import { useCalories } from '../hooks/useCalories';

export default function BilanCalories() {
    // On récupère le total depuis le hook 
    const { totalCalories } = useCalories();

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-lg">
            <div className="relative group">
                <div className={`absolute -inset-1 rounded-full opacity-40 blur transition duration-500 ${totalCalories > 2000 ? 'bg-gradient-to-r from-red-600 to-orange-600' : 'bg-gradient-to-r from-green-600 to-teal-600'}`}></div>
                <div className="relative flex justify-between items-center px-8 py-4 bg-slate-900/90 backdrop-blur-xl rounded-full border border-slate-700/50 shadow-2xl">
                    <span className="text-lg font-medium text-slate-300">Total Calories</span>
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">
                            {totalCalories > 2000 ? '🔥' : '🥗'}
                        </span>
                        <span className={`text-3xl font-extrabold text-transparent bg-clip-text ${totalCalories > 2000
                            ? 'bg-gradient-to-r from-red-400 to-orange-400'
                            : 'bg-gradient-to-r from-green-400 to-teal-400'
                            }`}>
                            {totalCalories} <span className="text-lg font-bold text-slate-500">kcal</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
