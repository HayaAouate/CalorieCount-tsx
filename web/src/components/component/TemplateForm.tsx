import { useState } from 'react';

type TemplateFormData = {
    nom: string;
    calories: number;
    type: 'apport' | 'depense';
};

type TemplateFormProps = {
    onSubmit: (data: TemplateFormData) => void;
    buttonText?: string;
};

// Composant réutilisable pour créer un template
export default function TemplateForm({ onSubmit, buttonText = '+ Créer' }: TemplateFormProps) {
    const [nom, setNom] = useState('');
    const [calories, setCalories] = useState('');
    const [type, setType] = useState<'apport' | 'depense'>('apport');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nom || !calories) return;

        onSubmit({ nom, calories: parseInt(calories), type });

        // Reset form
        setNom('');
        setCalories('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
            <input
                type="text"
                placeholder="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="flex-1 min-w-[150px] p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-amber-500 outline-none text-white"
            />
            <input
                type="number"
                placeholder="Calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-32 p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-amber-500 outline-none text-white"
            />
            <select
                value={type}
                onChange={(e) => setType(e.target.value as 'apport' | 'depense')}
                className="p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-amber-500 outline-none text-white"
            >
                <option value="apport">Apport</option>
                <option value="depense">Dépense</option>
            </select>
            <button
                type="submit"
                className="px-6 py-3 rounded-lg font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 transition text-white"
            >
                {buttonText}
            </button>
        </form>
    );
}

export type { TemplateFormData };
