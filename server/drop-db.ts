import { MongoClient } from 'mongodb';

const url = 'mongodb://root:root@localhost:27017';
const client = new MongoClient(url);

async function dropEntrainement() {
    try {
        await client.connect();
        const db = client.db('entrainement');
        console.log('Dropping database: entrainement...');
        await db.dropDatabase();
        console.log('Database entrainement dropped successfully.');
    } catch (e) {
        console.error('Error dropping database:', e);
    } finally {
        await client.close();
    }
}

dropEntrainement().catch(console.error);
