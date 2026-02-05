import express, { Request, Response } from "express";
import { createValidator } from "express-joi-validation";
import {
    CalorieEntry,
    calorieSchema,
    caloriesCollection,
} from "./calorieModels";
import { authMiddleware } from "../auth/jwt";

const validator = createValidator();
export const calorieRoutes = express.Router();

// Apply authMiddleware to all routes in this router
calorieRoutes.use(authMiddleware as any);

calorieRoutes.get("/", async (request: Request, response: Response) => {
    const userId = (request as any).auth?.userId;
    const { type } = request.query;

    console.log(`User ${userId} is fetching calories. Filter: ${type || 'None'}`);

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
        const userId = (request as any).auth?.userId;
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

calorieRoutes.delete("/:id", async (request: Request, response: Response) => {
    const userId = (request as any).auth?.userId;
    const { id } = request.params;
    try {
        const { ObjectId } = require("mongodb");
        // Only delete if it belongs to the user
        const result = await caloriesCollection.deleteOne({ _id: new ObjectId(id), userId });
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

