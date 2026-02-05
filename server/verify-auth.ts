
async function verifyAuth() {
    const baseUrl = 'http://localhost:3000/auth';
    const testUser = {
        username: 'test_verify_' + Date.now(),
        password: 'password123'
    };

    console.log('--- Starting Auth Verification ---');
    console.log(`Testing with user: ${testUser.username}`);

    // 1. Test Register
    try {
        console.log('\n1. Testing Register...');
        const registerRes = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        const registerData = await registerRes.json();
        console.log(`Status: ${registerRes.status}`);
        console.log('Response:', registerData);
    } catch (err) {
        console.error('Register Failed:', err);
    }

    // 2. Test Login
    try {
        console.log('\n2. Testing Login...');
        const loginRes = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        const loginData = await loginRes.json();
        console.log(`Status: ${loginRes.status}`);
        console.log('Response:', loginData);

        if (loginData.token) {
            console.log('\nSUCCESS: Token received!');
        } else {
            console.log('\nFAILURE: No token received.');
        }
    } catch (err) {
        console.error('Login Failed:', err);
    }
}

verifyAuth();
