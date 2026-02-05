import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// Connection URL
// Utilisation de la variable d'environnement ou fallback sur la valeur par défaut du snippet
const url = process.env.MONGO_URL || 'mongodb://root:root@localhost:27017';
const client = new MongoClient(url);

// Nom de la base de données
const dbName = process.env.DB_NAME || 'count-cal';

export const db: Db = client.db(dbName);

console.log(`Connecting to MongoDB at ${url}...`);
client.connect().then(() => {
    console.log('Connected successfully to MongoDB server');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
