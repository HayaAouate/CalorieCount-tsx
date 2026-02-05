import { createContext, useState, useEffect, type ReactNode } from 'react';

// 1. On définit le format de nos données (le "contrat")
// 1. On définit le format de nos données (le "contrat")
type Apport = {
    id: string;
    nom: string;
    calories: number;
    type: 'apport' | 'depense';
};

type CaloriesContextType = {
    apports: Apport[];
    ajouterApport: (nom: string, calories: number, type: 'apport' | 'depense') => void;
};

// 2. On crée le Context (le "Canal" de communication)
export const CaloriesContext = createContext<CaloriesContextType | undefined>(undefined);

// 3. On crée le Provider (le "Diffuseur")
export function CaloriesProvider({ children }: { children: ReactNode }) {
    const [apports, setApports] = useState<Apport[]>([]);

    // Fetch initial data
    useEffect(() => {
        fetch('http://localhost:3000/calories')
            .then(res => res.json())
            .then(data => {
                // Map database _id to id if necessary, or just rely on backend format
                const formattedData = data.map((item: any) => ({
                    id: item._id || item.id,
                    nom: item.nom,
                    calories: item.calories,
                    type: item.type || (item.calories < 0 ? 'depense' : 'apport') // Fallback logic
                }));
                setApports(formattedData);
            })
            .catch(err => console.error("Error fetching calories:", err));
    }, []);

    const ajouterApport = (nom: string, calories: number, type: 'apport' | 'depense') => {
        const payload = { nom, calories, type };

        fetch('http://localhost:3000/calories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(savedItem => {
                const nouvelApport: Apport = {
                    id: savedItem.id || savedItem._id,
                    nom: savedItem.nom,
                    calories: savedItem.calories,
                    type: savedItem.type
                };
                setApports(prev => [...prev, nouvelApport]);
            })
            .catch(err => console.error("Error adding calorie:", err));
    };

    return (
        <CaloriesContext.Provider value={{ apports, ajouterApport }}>
            {children}
        </CaloriesContext.Provider>
    );
}

export type { Apport };
