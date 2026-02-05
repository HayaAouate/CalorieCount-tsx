type Template = {
    _id: string;
    nom: string;
    calories: number;
    type: 'apport' | 'depense';
};

type TemplateListProps = {
    templates: Template[];
    onDelete?: (id: string) => void;
    title: string;
    emoji: string;
    colorClass: string;
};

// Composant réutilisable pour afficher une liste de templates
export default function TemplateList({ templates, onDelete, title, emoji, colorClass }: TemplateListProps) {
    return (
        <div className="bg-slate-900/80 rounded-xl p-6 border border-slate-700/50">
            <h3 className={`text-lg font-bold ${colorClass} mb-4`}>{emoji} {title}</h3>
            <ul className="space-y-2">
                {templates.map(t => (
                    <li key={t._id} className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                        <span className="text-white">
                            {t.nom} <span className="text-slate-400">({t.calories} kcal)</span>
                        </span>
                        {onDelete && (
                            <button
                                onClick={() => onDelete(t._id)}
                                className="text-red-400 hover:text-red-300 text-sm"
                            >
                                🗑️
                            </button>
                        )}
                    </li>
                ))}
                {templates.length === 0 && <li className="text-slate-500">Aucun template</li>}
            </ul>
        </div>
    );
}
