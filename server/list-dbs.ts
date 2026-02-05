import { MongoClient } from 'mongodb';

const url = 'mongodb://root:root@localhost:27017';
const client = new MongoClient(url);

async function listDatabases() {
    try {
        await client.connect();
        const adminDb = client.db('admin');
        const dbs = await adminDb.admin().listDatabases();
        console.log('Databases:');
        dbs.databases.forEach((db) => console.log(` - ${db.name}`));
    } finally {
        await client.close();
    }
}

listDatabases().catch(console.error);
