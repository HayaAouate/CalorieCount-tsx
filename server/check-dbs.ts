import { MongoClient } from 'mongodb';

const url = 'mongodb://root:root@localhost:27017';
const client = new MongoClient(url);

async function checkContent() {
    try {
        await client.connect();

        const dbs = ['count-cal', 'suivi-calories', 'entrainement'];

        for (const dbName of dbs) {
            console.log(`\n--- DB: ${dbName} ---`);
            const db = client.db(dbName);
            const collections = await db.listCollections().toArray();
            if (collections.length === 0) {
                console.log('  (No collections)');
                continue;
            }
            for (const col of collections) {
                const count = await db.collection(col.name).countDocuments();
                console.log(`  Collection: ${col.name}, Count: ${count}`);
            }
        }
    } finally {
        await client.close();
    }
}

checkContent().catch(console.error);
