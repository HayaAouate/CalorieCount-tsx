import { useContext } from 'react';
import { CaloriesContext } from '../contexts/calorieContext';

// logic de calcul
export function useCalories() {
    const context = useContext(CaloriesContext);

    if (!context) {
        throw new Error("useCalories doit être utilisé à l'intérieur d'un CaloriesProvider");
    }

    const { apports, ajouterApport, supprimerApport } = context;

    // Calcul du total 
    // dès que 'apports' change on recalcul automatiquement
    const totalCalories = apports.reduce((total, item) => {
        return item.type === 'depense' ? total - item.calories : total + item.calories;
    }, 0);

    return {
        apports,
        ajouterApport,
        supprimerApport,
        totalCalories
    };
}
