import { Router } from "express";
import Joi from "joi";
import { createValidator } from "express-joi-validation";
import { createAuthToken } from "./jwt";
import { db } from "../../db";
import bcrypt from "bcryptjs";

const validator = createValidator();
export const authRoutes = Router();

const usersCollection = db.collection("users");

// --- Types & Schemas ---

export type LoginData = {
    username: string;
    password: string;
};

const loginSchema = Joi.object<LoginData>({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

// --- Routes ---

// POST /auth/register : Inscription
authRoutes.post(
    "/register",
    validator.body(loginSchema),
    async (request, response) => {
        const { username, password } = request.body as LoginData;

        try {
            // Check if user exists
            const existingUser = await usersCollection.findOne({ username });
            if (existingUser) {
                response.status(400).json({ message: "Username already exists" });
                return;
            }

            // Hash password before storing
            const hashedPassword = await bcrypt.hash(password, 10);
            await usersCollection.insertOne({ username, password: hashedPassword, role: "user" });

            response.status(201).json({ message: "User created successfully" });
        } catch (error) {
            console.error("Register error:", error);
            response.status(500).json({ message: "Internal server error" });
        }
    }
);

// POST /auth/login : Connexion
authRoutes.post(
    "/login",
    validator.body(loginSchema),
    async (request, response) => {
        const { username, password } = request.body as LoginData;

        try {
            const user = await usersCollection.findOne({ username });

            if (user && await bcrypt.compare(password, user.password)) {
                const token = createAuthToken({ userId: user._id.toString(), role: "user" });
                response.json({ token, username: user.username });
            } else {
                response.status(401).json({ message: "Invalid credentials" });
            }
        } catch (error) {
            console.error("Login error:", error);
            response.status(500).json({ message: "Internal server error" });
        }
    },
);
