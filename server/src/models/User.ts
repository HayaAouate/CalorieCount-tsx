import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    nom_produits: string[];
    calories: number;
    total: number;
}

const UserSchema: Schema = new Schema({
    nom_produits: { type: [String], required: true },
    calories: { type: Number, required: true },
    total: { type: Number, required: true },
});

export const User = mongoose.model<IUser>('User', UserSchema);
