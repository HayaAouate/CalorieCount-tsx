// Usage: npx ts-node src/modules/templates/seed-templates.ts

import { db } from '../../db';

const templates = [

    { nom: "Pomme", calories: 52, type: "apport" },
    { nom: "Banane", calories: 89, type: "apport" },
    { nom: "Riz (100g)", calories: 130, type: "apport" },
    { nom: "Poulet grillé (100g)", calories: 165, type: "apport" },
    { nom: "Œuf", calories: 78, type: "apport" },


    { nom: "Marche (30 min)", calories: 150, type: "depense" },
    { nom: "Course à pied (30 min)", calories: 300, type: "depense" },
    { nom: "Vélo (30 min)", calories: 250, type: "depense" },
    { nom: "Natation (30 min)", calories: 350, type: "depense" },
    { nom: "Musculation (30 min)", calories: 200, type: "depense" },
];

async function seedTemplates() {
    const templatesCollection = db.collection("templates");

    // Vider la collection
    await templatesCollection.deleteMany({});

    // Insérer les templates
    const result = await templatesCollection.insertMany(templates);

    console.log(`✅ ${result.insertedCount} templates insérés avec succès!`);
    console.log("\nTemplates:");
    templates.forEach(t => console.log(`  - ${t.nom}: ${t.calories} kcal (${t.type})`));

    process.exit(0);
}

seedTemplates().catch(err => {
    console.error("Erreur:", err);
    process.exit(1);
});
