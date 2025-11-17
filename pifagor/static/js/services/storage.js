// services/storage.js
export class AuthStorage {
    static setToken(token) {
        localStorage.setItem('auth_token', token);
    }

    static getToken() {
        return localStorage.getItem('auth_token');
    }

    static removeToken() {
        localStorage.removeItem('auth_token');
    }

    static setUserData(userData) {
        localStorage.setItem('user_data', JSON.stringify(userData));
    }

    static getUserData() {
        const data = localStorage.getItem('user_data');
        return data ? JSON.parse(data) : null;
    }

    static clear() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
    }
}