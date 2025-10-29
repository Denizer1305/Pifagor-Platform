export class ApiService {
    static async request(endpoint, options = {}) {
        const baseUrl = window.location.origin;
        const url = `${baseUrl}/api/${endpoint}`;
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': this.getCSRFToken(),
            },
            ...options
        };
        
        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
    
    static getCSRFToken() {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];
        return cookieValue;
    }
    
    static async login(credentials) {
        return this.request('auth/login/', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }
    
    static async register(userData) {
        return this.request('auth/register/', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }
    
    static async contactForm(data) {
        return this.request('contact/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}