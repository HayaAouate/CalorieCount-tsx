import Joi from "joi";
import { db } from "../../db";

export type Template = {
    nom: string;
    calories: number;
    type: 'apport' | 'depense';
};

export const templateSchema = Joi.object<Template>({
    nom: Joi.string().required(),
    calories: Joi.number().required(),
    type: Joi.string().valid('apport', 'depense').required(),
});

export const templatesCollection = db.collection<Template>("templates");
