import { createContext, useState, useEffect, type ReactNode } from 'react';

// 1. On définit le format de nos données (le "contrat")
type Apport = {
    id: string;
    nom: string;
    calories: number;
    type: 'apport' | 'depense';
    date?: string; // Optionnel pour l'affichage
};

type CaloriesContextType = {
    apports: Apport[];
    ajouterApport: (nom: string, calories: number, type?: 'apport' | 'depense') => void;
};

// 2. On crée le Context (le "Canal" de communication)
export const CaloriesContext = createContext<CaloriesContextType | undefined>(undefined);

// 3. On crée le Provider (le "Diffuseur")
export function CaloriesProvider({ children }: { children: ReactNode }) {
    const [apports, setApports] = useState<Apport[]>([]);

    // Fetch initial data
    useEffect(() => {
        const fetchCalories = async () => {
            try {
                const response = await fetch('http://localhost:3000/calories');
                const data = await response.json();
                // Map _id to id
                const formattedData = data.map((item: any) => ({
                    id: item._id,
                    nom: item.nom,
                    calories: item.calories,
                    type: item.type,
                    date: item.date
                }));
                setApports(formattedData);
            } catch (error) {
                console.error("Failed to fetch calories:", error);
            }
        };

        fetchCalories();
    }, []);

    const ajouterApport = async (nom: string, calories: number, type: 'apport' | 'depense' = 'apport') => {
        try {
            const response = await fetch('http://localhost:3000/calories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nom, calories, type }),
            });
            const newEntry = await response.json();

            // Add to local state (optimistic or after confirm)
            setApports((prev) => [...prev, {
                id: newEntry.id || newEntry._id, // Backend returns id as alias in my previous fix, but safe check
                nom: newEntry.nom,
                calories: newEntry.calories,
                type: newEntry.type,
                date: newEntry.date
            }]);
        } catch (error) {
            console.error("Error adding calorie:", error);
        }
    };

    return (
        <CaloriesContext.Provider value={{ apports, ajouterApport }}>
            {children}
        </CaloriesContext.Provider>
    );
}

export type { Apport };
