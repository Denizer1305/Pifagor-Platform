export class AuthAPI {
    static async login(email, password, remember) {
        // Implementation for login API call
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, remember })
        });
        return await response.json();
    }

    static async register(userData) {
        // Implementation for registration API call
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        return await response.json();
    }

    static async verifyEmail(code) {
        // Implementation for email verification API call
        const response = await fetch('/api/auth/verify-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code })
        });
        return await response.json();
    }

    static async resendVerificationCode() {
        // Implementation for resend verification code API call
        const response = await fetch('/api/auth/resend-verification', {
            method: 'POST'
        });
        return await response.json();
    }

    static async resetPassword(email) {
        // Implementation for password reset API call
        const response = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        return await response.json();
    }
}