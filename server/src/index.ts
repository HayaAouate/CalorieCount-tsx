import express from 'express';
import cors from 'cors';
import { authRoutes } from './modules/auth/authRoutes';
import { calorieRoutes } from './modules/calories/calorieRoutes';

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

app.get('/', (_, response) => {
    response.json({ message: 'Backend is running with Modular Architecture 🚀' });
});

// Register Modules
app.use('/auth', authRoutes);
app.use('/calories', calorieRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
