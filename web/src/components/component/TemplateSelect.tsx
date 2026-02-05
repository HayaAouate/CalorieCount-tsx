type Template = {
    _id: string;
    nom: string;
    calories: number;
    type: 'apport' | 'depense';
};

type TemplateSelectProps = {
    templates: Template[];
    type: 'apport' | 'depense';
    onSelect: (template: Template) => void;
};

// Composant réutilisable pour sélectionner un template
export default function TemplateSelect({ templates, type, onSelect }: TemplateSelectProps) {
    const filtered = templates.filter(t => t.type === type);
    const mainColor = type === 'apport' ? 'indigo' : 'emerald';

    if (filtered.length === 0) return null;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const template = templates.find(t => t._id === e.target.value);
        if (template) {
            onSelect(template);
        }
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-slate-400 mb-1 ml-1">
                📋 Sélection rapide
            </label>
            <select
                onChange={handleChange}
                className={`w-full p-3 rounded-lg bg-slate-800/50 text-white border border-slate-700 focus:border-${mainColor}-500 focus:ring-2 focus:ring-${mainColor}-500/20 outline-none transition-all cursor-pointer`}
                defaultValue=""
            >
                <option value="" disabled>Choisir un template...</option>
                {filtered.map(t => (
                    <option key={t._id} value={t._id}>
                        {t.nom} ({t.calories} kcal)
                    </option>
                ))}
            </select>
        </div>
    );
}

export type { Template };
