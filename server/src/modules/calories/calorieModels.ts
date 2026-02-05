import Joi from "joi";
import { db } from "../../db";

export type CalorieEntry = {
    _id?: any;
    nom: string;
    calories: number;
    type: 'apport' | 'depense';
    date: Date;
    userId: string;
};

export const calorieSchema = Joi.object<CalorieEntry>({
    nom: Joi.string().required(),
    calories: Joi.number().required(),
    type: Joi.string().valid('apport', 'depense').required(),
    date: Joi.date().default(() => new Date()),
    userId: Joi.string().optional()
});

export const caloriesCollection = db.collection<CalorieEntry>("logs");
