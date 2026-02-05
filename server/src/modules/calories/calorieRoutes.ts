import express, { Request, Response } from "express";
import { createValidator } from "express-joi-validation";
import {
    CalorieEntry,
    calorieSchema,
    caloriesCollection,
} from "./calorieModels";

const validator = createValidator();
export const calorieRoutes = express.Router();

const PUBLIC_USER_ID = "guest";

// Récupérer les données avec filtre 
calorieRoutes.get("/", async (request: Request, response: Response) => {
    const userId = PUBLIC_USER_ID;
    const { type } = request.query;

    console.log(`User ${userId} is fetching calories. Filter: ${type || 'None'}`);

    const query: any = { userId };
    if (type) {
        query.type = type;
    }

    try {
        const result = await caloriesCollection.find(query).toArray();
        response.json(result);
    } catch (error) {
        console.error("Error fetching calories:", error);
        response.status(500).json({ message: "Internal Server Error" });
    }
});

// Ajouter une nouvelle entrée
calorieRoutes.post(
    "/",
    validator.body(calorieSchema),
    async (request: Request, response: Response) => {
        const userId = PUBLIC_USER_ID;
        const entry = request.body as CalorieEntry;

        const newEntry: CalorieEntry = {
            ...entry,
            userId: userId,
            date: new Date()
        };

        try {
            const result = await caloriesCollection.insertOne(newEntry);
            response.json({ ...newEntry, id: result.insertedId.toString() });
        } catch (error) {
            console.error("Error adding calorie entry:", error);
            response.status(500).json({ message: "Internal Server Error" });
        }
    },
);

// DELETE /calories/:id : Supprimer une entrée
calorieRoutes.delete("/:id", async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const { ObjectId } = require("mongodb");
        const result = await caloriesCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            response.status(404).json({ message: "Entry not found" });
            return;
        }
        response.json({ message: "Entry deleted successfully" });
    } catch (error) {
        console.error("Error deleting entry:", error);
        response.status(500).json({ message: "Internal Server Error" });
    }
});

