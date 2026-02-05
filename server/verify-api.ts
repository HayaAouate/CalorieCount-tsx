import axios from 'axios';
import { MongoClient } from 'mongodb';

async function verify() {
    const apiUrl = 'http://localhost:3000';
    const client = new MongoClient('mongodb://root:root@localhost:27017');

    try {
        console.log('--- 1. Testing API POST (Valid) ---');
        const validEntry = {
            nom: 'Pomme',
            calories: 52,
            type: 'apport'
        };
        const resValid = await axios.post(`${apiUrl}/calories`, validEntry);
        console.log('POST Valid Status:', resValid.status);
        console.log('POST Valid Data:', resValid.data);

        console.log('\n--- 2. Testing API POST (Invalid - Missing type) ---');
        try {
            await axios.post(`${apiUrl}/calories`, { nom: 'Error', calories: 100 });
            console.error('FAILED: Should have rejected missing type');
        } catch (e: any) {
            console.log('SUCCESS: Rejected missing type with status:', e.response?.status);
        }

        console.log('\n--- 3. Verifying Database Content ---');
        await client.connect();
        const db = client.db('count-cal');
        const logs = await db.collection('logs').find({ nom: 'Pomme' }).toArray();
        console.log('Found in "logs" collection:', logs.length > 0 ? 'YES' : 'NO');
        if (logs.length > 0) {
            console.log('Saved Document:', logs[0]);
            if (logs[0].type === 'apport') {
                console.log('Type field persisted correctly: YES');
            } else {
                console.error('Type field persisted correctly: NO');
            }
        }

    } catch (e) {
        console.error('Verification failed:', e);
    } finally {
        await client.close();
    }
}

verify().catch(console.error);
