import { Router } from "express";
import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { createAuthToken } from "./jwt";

// Initialisation du validateur si non importé globalement
const validator = createValidator();

export const authRoutes = Router();

export type LoginData = {
    username: string;
};

// Schéma simplifié pour l'instant car pas de DB user défini pour le login
const loginInfoDataSchema = Joi.object<LoginData>({
    username: Joi.string().required(),
});

authRoutes.post(
    "/login",
    validator.body(loginInfoDataSchema),
    async (request, response) => {
        const { username } = request.body as LoginData;

        // Simulation d'une authentification réussie pour tout username non vide
        // Dans un vrai cas, on vérifierait le mot de passe dans la BDD

        // Génération du token
        const token = createAuthToken({ userId: username, role: "user" }); // UserId = username pour simplifier

        response.json({ token, message: `Welcome ${username}` });
    },
);
