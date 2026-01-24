async function verifyOtp() {
    try {
        const response = await fetch('http://localhost:8080/api/auth/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test-verify@example.com',
                name: 'Verify User'
            })
        });

        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(data, null, 2));

        if (response.ok) {
            console.log('✅ OTP Verification Successful!');
        } else {
            console.log('❌ OTP Verification Failed!');
        }
    } catch (error) {
        console.error('❌ Request error:', error.message);
    }
}

verifyOtp();
