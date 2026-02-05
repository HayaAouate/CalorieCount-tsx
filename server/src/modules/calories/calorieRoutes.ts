import { Router } from "express";
import { createValidator } from "express-joi-validation";
import {
    CalorieEntry,
    calorieSchema,
    caloriesCollection,
} from "./calorieModels";
// import { authMiddleware, JwtPayload } from "../auth/jwt"; // Disabled for public access

const validator = createValidator();
export const calorieRoutes = Router();

// Toutes les routes calories demandent d'être authentifié -> DISABLED
// calorieRoutes.use(authMiddleware);

const PUBLIC_USER_ID = "guest";

// GET /calories : Récupérer les données de l'utilisateur "guest"
calorieRoutes.get("/", async (request, response) => {
    // const { userId } = (request as any).auth as JwtPayload;
    const userId = PUBLIC_USER_ID;

    console.log(`User ${userId} is fetching calories`);
    try {
        const result = await caloriesCollection.find({ userId }).toArray();
        response.json(result);
    } catch (error) {
        console.error("Error fetching calories:", error);
        response.status(500).json({ message: "Internal Server Error" });
    }
});

// POST /calories : Ajouter une nouvelle entrée
calorieRoutes.post(
    "/",
    validator.body(calorieSchema),
    async (request, response) => {
        // const { userId } = (request as any).auth as JwtPayload;
        const userId = PUBLIC_USER_ID;

        const entry = request.body as CalorieEntry;

        // On force l'association avec le userId du token pour la sécurité
        const newEntry: CalorieEntry = {
            ...entry,
            userId: userId,
            date: new Date() // Ou entry.date si fourni
        };

        try {
            const result = await caloriesCollection.insertOne(newEntry);
            // Important: Return the complete object including _id
            response.json({ ...newEntry, id: result.insertedId.toString() });
        } catch (error) {
            console.error("Error adding calorie entry:", error);
            response.status(500).json({ message: "Internal Server Error" });
        }
    },
);
