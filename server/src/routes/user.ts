import express, { Request, Response } from 'express';
import { User } from '../models/User';

const router = express.Router();

router.post('/test-user', async (req: Request, res: Response) => {
    try {
        const newUser = new User({
            nom_produits: ['pomme', 'poire'],
        
            calories: 100,
            total: 200
        });
        await newUser.save();
        res.json({ message: 'User created', user: newUser });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user', details: err });
    }
});

export default router;


//