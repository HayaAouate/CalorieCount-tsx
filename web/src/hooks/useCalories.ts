import { useContext } from 'react';
import { CaloriesContext } from '../contexts/calorieContext';

// C'est ici qu'on met la logique de calcul "qui change tout au long"
export function useCalories() {
    const context = useContext(CaloriesContext);

    if (!context) {
        throw new Error("useCalories doit être utilisé à l'intérieur d'un CaloriesProvider");
    }

    const { apports, ajouterApport } = context;

    // Calcul du total (La fonction demandée)
    // Elle se recalcule automatiquement dès que 'apports' change
    const totalCalories = apports.reduce((total, item) => total + item.calories, 0);

    return {
        apports,
        ajouterApport,
        totalCalories // On renvoie le résultat calculé
    };
}
