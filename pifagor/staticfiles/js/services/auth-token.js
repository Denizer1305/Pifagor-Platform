/**
 * Auth Token Manager - управление токенами аутентификации для образовательной платформы
 * Обработка JWT токенов, автоматическое обновление и безопасное хранение
 */

export class AuthTokenManager {
    constructor() {
        this.accessToken = null;
        this.refreshToken = null;
        this.tokenExpiry = null;
        this.isRefreshing = false;
        this.refreshSubscribers = [];
        this.isActive = false;
        
        // Конфигурация токенов
        this.config = {
            accessTokenKey: 'access_token',
            refreshTokenKey: 'refresh_token',
            expiryKey: 'token_expiry',
            userDataKey: 'user_data',
            tokenRefreshMargin: 5 * 60 * 1000, // 5 минут до истечения
            maxRefreshAttempts: 3,
            storageType: 'localStorage' // или 'sessionStorage'
        };
    }

    async activate(config = {}) {
        this.isActive = true;
        this.config = { ...this.config, ...config };
        
        try {
            await this.loadTokensFromStorage();
            this.setupAutoRefresh();
            this.setupTokenInterceptors();
            
            console.log('Auth Token Manager activated');
        } catch (error) {
            console.error('Error activating Auth Token Manager:', error);
        }
    }

    deactivate() {
        this.isActive = false;
        this.clearAutoRefresh();
        console.log('Auth Token Manager deactivated');
    }

    // Загрузка токенов из хранилища
    async loadTokensFromStorage() {
        try {
            const storage = this.getStorage();
            
            this.accessToken = storage.getItem(this.config.accessTokenKey);
            this.refreshToken = storage.getItem(this.config.refreshTokenKey);
            
            const expiry = storage.getItem(this.config.expiryKey);
            this.tokenExpiry = expiry ? parseInt(expiry) : null;
            
            if (this.accessToken) {
                this.validateToken(this.accessToken);
            }
            
            console.log('Tokens loaded from storage');
        } catch (error) {
            console.error('Error loading tokens from storage:', error);
            this.clearTokens();
        }
    }

    // Сохранение токенов в хранилище
    async saveTokensToStorage() {
        try {
            const storage = this.getStorage();
            
            if (this.accessToken) {
                storage.setItem(this.config.accessTokenKey, this.accessToken);
            }
            
            if (this.refreshToken) {
                storage.setItem(this.config.refreshTokenKey, this.refreshToken);
            }
            
            if (this.tokenExpiry) {
                storage.setItem(this.config.expiryKey, this.tokenExpiry.toString());
            }
        } catch (error) {
            console.error('Error saving tokens to storage:', error);
        }
    }

    // Установка токенов
    async setTokens(accessToken, refreshToken = null) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        
        // Парсим expiry из JWT токена
        try {
            const payload = this.parseJwt(accessToken);
            this.tokenExpiry = payload.exp * 1000; // Конвертируем в миллисекунды
            
            await this.saveTokensToStorage();
            this.notifyTokenChange('tokens_updated');
            
            console.log('Tokens set successfully');
        } catch (error) {
            console.error('Error setting tokens:', error);
            throw error;
        }
    }

    // Получение access token с автоматическим обновлением
    async getAccessToken() {
        if (!this.accessToken) {
            return null;
        }

        // Проверяем, не истек ли токен
        if (this.isTokenExpiredOrExpiring()) {
            try {
                await this.refreshAccessToken();
            } catch (error) {
                console.error('Failed to refresh access token:', error);
                this.clearTokens();
                throw error;
            }
        }

        return this.accessToken;
    }

    // Проверка истечения токена
    isTokenExpiredOrExpiring() {
        if (!this.tokenExpiry) {
            return true;
        }

        const now = Date.now();
        const timeUntilExpiry = this.tokenExpiry - now;
        
        return timeUntilExpiry <= this.config.tokenRefreshMargin;
    }

    isTokenExpired() {
        if (!this.tokenExpiry) {
            return true;
        }

        return Date.now() >= this.tokenExpiry;
    }

    // Обновление access token
    async refreshAccessToken() {
        if (!this.refreshToken) {
            throw new Error('No refresh token available');
        }

        if (this.isRefreshing) {
            // Если уже обновляем, ждем завершения
            return new Promise((resolve, reject) => {
                this.refreshSubscribers.push({ resolve, reject });
            });
        }

        this.isRefreshing = true;

        try {
            const response = await fetch('/api/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refresh_token: this.refreshToken
                })
            });

            if (!response.ok) {
                throw new Error(`Refresh failed with status: ${response.status}`);
            }

            const data = await response.json();
            
            if (!data.access_token) {
                throw new Error('No access token in refresh response');
            }

            await this.setTokens(data.access_token, data.refresh_token || this.refreshToken);
            
            // Уведомляем всех подписчиков об успешном обновлении
            this.refreshSubscribers.forEach(subscriber => subscriber.resolve());
            this.refreshSubscribers = [];
            
            return data.access_token;
        } catch (error) {
            // Уведомляем всех подписчиков об ошибке
            this.refreshSubscribers.forEach(subscriber => subscriber.reject(error));
            this.refreshSubscribers = [];
            
            throw error;
        } finally {
            this.isRefreshing = false;
        }
    }

    // Парсинг JWT токена
    parseJwt(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error parsing JWT token:', error);
            throw new Error('Invalid JWT token');
        }
    }

    // Валидация токена
    validateToken(token) {
        try {
            const payload = this.parseJwt(token);
            const now = Math.floor(Date.now() / 1000);
            
            if (payload.exp && payload.exp < now) {
                throw new Error('Token has expired');
            }
            
            if (payload.nbf && payload.nbf > now) {
                throw new Error('Token not yet valid');
            }
            
            return payload;
        } catch (error) {
            console.error('Token validation failed:', error);
            throw error;
        }
    }

    // Получение информации из токена
    getTokenPayload() {
        if (!this.accessToken) {
            return null;
        }
        
        try {
            return this.parseJwt(this.accessToken);
        } catch (error) {
            return null;
        }
    }

    getUserId() {
        const payload = this.getTokenPayload();
        return payload?.sub || payload?.user_id || null;
    }

    getUserRoles() {
        const payload = this.getTokenPayload();
        return payload?.roles || payload?.scope || [];
    }

    hasRole(role) {
        const roles = this.getUserRoles();
        return Array.isArray(roles) ? roles.includes(role) : roles === role;
    }

    hasAnyRole(requiredRoles) {
        const userRoles = this.getUserRoles();
        return requiredRoles.some(role => this.hasRole(role));
    }

    // Автоматическое обновление токена
    setupAutoRefresh() {
        this.clearAutoRefresh();
        
        this.autoRefreshInterval = setInterval(() => {
            if (this.isTokenExpiredOrExpiring() && this.refreshToken) {
                console.log('Auto-refreshing token...');
                this.refreshAccessToken().catch(error => {
                    console.error('Auto-refresh failed:', error);
                });
            }
        }, 60000); // Проверка каждую минуту
    }

    clearAutoRefresh() {
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
            this.autoRefreshInterval = null;
        }
    }

    // Перехватчики для fetch/XMLHttpRequest
    setupTokenInterceptors() {
        // Перехватчик для fetch
        if (window.fetch) {
            const originalFetch = window.fetch;
            
            window.fetch = async (...args) => {
                // Добавляем токен к запросам
                const [resource, config = {}] = args;
                
                const headers = new Headers(config.headers || {});
                
                try {
                    const token = await this.getAccessToken();
                    if (token && !headers.has('Authorization')) {
                        headers.set('Authorization', `Bearer ${token}`);
                    }
                } catch (error) {
                    console.warn('Could not add authorization header:', error);
                }
                
                const newConfig = {
                    ...config,
                    headers
                };
                
                return originalFetch(resource, newConfig);
            };
        }

        // Перехватчик для XMLHttpRequest
        if (window.XMLHttpRequest) {
            const originalOpen = XMLHttpRequest.prototype.open;
            const originalSend = XMLHttpRequest.prototype.send;
            
            XMLHttpRequest.prototype.open = function(...args) {
                this._url = args[1];
                return originalOpen.apply(this, args);
            };
            
            XMLHttpRequest.prototype.send = function(...args) {
                if (this._url && this._url.startsWith('/api/') || this._url.startsWith('http')) {
                    try {
                        const token = this.getAccessTokenSync();
                        if (token && !this.getRequestHeader('Authorization')) {
                            this.setRequestHeader('Authorization', `Bearer ${token}`);
                        }
                    } catch (error) {
                        console.warn('Could not add authorization header to XHR:', error);
                    }
                }
                
                return originalSend.apply(this, args);
            };
        }
    }

    // Синхронная версия для XMLHttpRequest
    getAccessTokenSync() {
        if (!this.accessToken) {
            return null;
        }
        
        // Для синхронного использования не делаем автоматическое обновление
        // Просто возвращаем текущий токен, если он еще действителен
        if (!this.isTokenExpired()) {
            return this.accessToken;
        }
        
        return null;
    }

    // Управление хранилищем
    getStorage() {
        switch (this.config.storageType) {
            case 'sessionStorage':
                return sessionStorage;
            case 'localStorage':
            default:
                return localStorage;
        }
    }

    // Очистка токенов
    async clearTokens() {
        this.accessToken = null;
        this.refreshToken = null;
        this.tokenExpiry = null;
        
        try {
            const storage = this.getStorage();
            
            storage.removeItem(this.config.accessTokenKey);
            storage.removeItem(this.config.refreshTokenKey);
            storage.removeItem(this.config.expiryKey);
            storage.removeItem(this.config.userDataKey);
            
            this.notifyTokenChange('tokens_cleared');
            
            console.log('Tokens cleared');
        } catch (error) {
            console.error('Error clearing tokens:', error);
        }
    }

    // Уведомления об изменении токенов
    notifyTokenChange(event) {
        const customEvent = new CustomEvent(`auth:tokens_${event}`, {
            detail: {
                hasToken: !!this.accessToken,
                userId: this.getUserId(),
                expiresAt: this.tokenExpiry
            }
        });
        
        document.dispatchEvent(customEvent);
    }

    // Проверка аутентификации
    isAuthenticated() {
        return !!this.accessToken && !this.isTokenExpired();
    }

    // Дебаг информация
    getTokenInfo() {
        const payload = this.getTokenPayload();
        
        return {
            isAuthenticated: this.isAuthenticated(),
            userId: this.getUserId(),
            roles: this.getUserRoles(),
            expiresAt: this.tokenExpiry,
            timeUntilExpiry: this.tokenExpiry ? this.tokenExpiry - Date.now() : null,
            payload: payload
        };
    }

    // Экспорт/импорт для отладки
    exportTokenData() {
        return {
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            tokenExpiry: this.tokenExpiry,
            config: this.config
        };
    }

    // Восстановление сессии
    async restoreSession() {
        try {
            await this.loadTokensFromStorage();
            
            if (this.isAuthenticated()) {
                console.log('Session restored successfully');
                return true;
            } else {
                console.log('No valid session found');
                return false;
            }
        } catch (error) {
            console.error('Error restoring session:', error);
            return false;
        }
    }

    // Принудительная проверка токена
    async verifyToken() {
        if (!this.accessToken) {
            return false;
        }

        try {
            const response = await fetch('/api/auth/verify', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.ok;
        } catch (error) {
            console.error('Token verification failed:', error);
            return false;
        }
    }

    // Обработка выхода
    async logout() {
        try {
            // Отправляем запрос на сервер для инвалидации токена
            if (this.accessToken) {
                await fetch('/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        refresh_token: this.refreshToken
                    })
                }).catch(error => {
                    console.warn('Logout API call failed:', error);
                });
            }

            // Очищаем локальные токены
            await this.clearTokens();
            
            console.log('User logged out successfully');
        } catch (error) {
            console.error('Error during logout:', error);
            await this.clearTokens(); // Все равно очищаем токены
        }
    }
}

// Глобальный экземпляр для быстрого доступа
window.AuthTokenManager = new AuthTokenManager();

export default AuthTokenManager;