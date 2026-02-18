import express, { Request, Response, NextFunction } from "express";
import { createValidator } from "express-joi-validation";
import { Template, templateSchema, templatesCollection } from "./templateModels";
import { authMiddleware } from "../auth/jwt";

const validator = createValidator();
export const templateRoutes = express.Router();

// Middleware pour vérifier le rôle admin
const adminOnly = (req: Request, res: Response, next: NextFunction) => {
    const role = (req as any).auth?.role;
    if (role !== 'admin') {
        res.status(403).json({ message: "Accès refusé: Admin uniquement" });
        return;
    }
    next();
};

// GET /templates : Récupérer les templates 
templateRoutes.get("/", async (_request: Request, response: Response) => {
    try {
        const templates = await templatesCollection.find({}).toArray();
        response.json(templates);
    } catch (error) {
        console.error("Error fetching templates:", error);
        response.status(500).json({ message: "Internal Server Error" });
    }
});

// POST /templates : Créer un template (admin seulement)
templateRoutes.post(
    "/",
    authMiddleware as any,
    adminOnly,
    validator.body(templateSchema),
    async (request: Request, response: Response) => {
        const template = request.body as Template;

        try {
            console.log("🟠 BACKEND: Tentative d'insertion du template en BDD:", template);
            const result = await templatesCollection.insertOne(template);
            console.log("✅ BACKEND: Template inséré avec succès ! ID:", result.insertedId);

            response.status(201).json({ ...template, id: result.insertedId.toString() });
        } catch (error) {
            console.error("❌ Error creating template:", error);
            response.status(500).json({ message: "Internal Server Error" });
        }
    }
);

// DELETE /templates/:id : Supprimer un template (admin seulement)
templateRoutes.delete(
    "/:id",
    authMiddleware as any,
    adminOnly,
    async (request: Request, response: Response) => {
        const { id } = request.params;
        try {
            const { ObjectId } = require("mongodb");
            const result = await templatesCollection.deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 0) {
                response.status(404).json({ message: "Template not found" });
                return;
            }
            response.json({ message: "Template deleted" });
        } catch (error) {
            console.error("Error deleting template:", error);
            response.status(500).json({ message: "Internal Server Error" });
        }
    }
);
