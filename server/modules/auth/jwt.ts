import sign from 'jsonwebtoken';
import expressjwt from 'express-jwt';

export type jwtPayload = {
    id: string;
    nom: string;
    role: "admin"|"user"
}
const SECRET_KEY = "lol";
const ALGORITHM = "HS256";


