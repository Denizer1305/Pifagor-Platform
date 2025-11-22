export class StorageManager {
    // ===== МЕТОДЫ ДЛЯ АУТЕНТИФИКАЦИИ =====
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

    // ===== МЕТОДЫ ДЛЯ ДАННЫХ ПРОФИЛЯ =====
    
    /**
     * Сохранение личных данных пользователя
     */
    static savePersonalData(formData = null) {
        let data;
        
        if (formData) {
            // Если переданы данные формы
            data = {
                firstName: formData.firstName || '',
                lastName: formData.lastName || '',
                email: formData.email || '',
                phone: formData.phone || '',
                birthDate: formData.birthDate || '',
                bio: formData.bio || '',
                interests: formData.interests || '',
                grade: formData.grade || '',
                school: formData.school || '',
                lastUpdated: new Date().toISOString()
            };
        } else {
            // Получаем данные из формы
            data = {
                firstName: document.getElementById('firstName')?.value || '',
                lastName: document.getElementById('lastName')?.value || '',
                email: document.getElementById('email')?.value || '',
                phone: document.getElementById('phone')?.value || '',
                birthDate: document.getElementById('birthDate')?.value || '',
                bio: document.getElementById('bio')?.value || '',
                interests: document.getElementById('interests')?.value || '',
                grade: document.getElementById('grade')?.value || '',
                school: document.getElementById('school')?.value || '',
                lastUpdated: new Date().toISOString()
            };
        }
        
        console.log('Сохранение личных данных:', data);
        localStorage.setItem('personalData', JSON.stringify(data));
        return data;
    }

    /**
     * Загрузка личных данных
     */
    static loadPersonalData() {
        const personalData = JSON.parse(localStorage.getItem('personalData'));
        
        if (personalData) {
            // Заполняем форму данными
            if (document.getElementById('firstName')) {
                document.getElementById('firstName').value = personalData.firstName || '';
            }
            if (document.getElementById('lastName')) {
                document.getElementById('lastName').value = personalData.lastName || '';
            }
            if (document.getElementById('email')) {
                document.getElementById('email').value = personalData.email || '';
            }
            if (document.getElementById('phone')) {
                document.getElementById('phone').value = personalData.phone || '';
            }
            if (document.getElementById('birthDate')) {
                document.getElementById('birthDate').value = personalData.birthDate || '';
            }
            if (document.getElementById('bio')) {
                document.getElementById('bio').value = personalData.bio || '';
            }
            if (document.getElementById('interests')) {
                document.getElementById('interests').value = personalData.interests || '';
            }
            if (document.getElementById('grade')) {
                document.getElementById('grade').value = personalData.grade || '';
            }
            if (document.getElementById('school')) {
                document.getElementById('school').value = personalData.school || '';
            }
        }
        
        return personalData;
    }

    /**
     * Сохранение настроек безопасности
     */
    static saveSecuritySettings(formData = null) {
        let data;
        
        if (formData) {
            data = {
                twoFactor: formData.twoFactor || false,
                loginNotifications: formData.loginNotifications || false,
                lastUpdated: new Date().toISOString()
            };
        } else {
            const checkboxes = document.querySelectorAll('#securityForm input[type="checkbox"]');
            data = {
                twoFactor: checkboxes[0]?.checked || false,
                loginNotifications: checkboxes[1]?.checked || false,
                lastUpdated: new Date().toISOString()
            };
        }
        
        console.log('Сохранение настроек безопасности:', data);
        localStorage.setItem('securitySettings', JSON.stringify(data));
        return data;
    }

    /**
     * Загрузка настроек безопасности
     */
    static loadSecuritySettings() {
        const securitySettings = JSON.parse(localStorage.getItem('securitySettings'));
        
        if (securitySettings) {
            const checkboxes = document.querySelectorAll('#securityForm input[type="checkbox"]');
            if (checkboxes[0]) {
                checkboxes[0].checked = securitySettings.twoFactor || false;
            }
            if (checkboxes[1]) {
                checkboxes[1].checked = securitySettings.loginNotifications || false;
            }
        }
        
        return securitySettings;
    }

    /**
     * Сохранение настроек внешнего вида
     */
    static saveAppearanceSettings() {
        const data = {
            theme: localStorage.getItem('selectedTheme') || 'light',
            fontSize: localStorage.getItem('selectedFontSize') || 'medium',
            density: localStorage.getItem('selectedDensity') || 'normal',
            lastUpdated: new Date().toISOString()
        };
        
        console.log('Сохранение настроек внешнего вида:', data);
        localStorage.setItem('appearanceSettings', JSON.stringify(data));
        return data;
    }

    /**
     * Загрузка настроек внешнего вида
     */
    static loadAppearanceSettings() {
        return JSON.parse(localStorage.getItem('appearanceSettings'));
    }

    /**
     * Загрузка всех сохраненных данных
     */
    static loadAllSavedData() {
        this.loadPersonalData();
        this.loadSecuritySettings();
        return {
            personalData: this.loadPersonalData(),
            securitySettings: this.loadSecuritySettings(),
            appearanceSettings: this.loadAppearanceSettings()
        };
    }

    // ===== МЕТОДЫ ДЛЯ АВАТАРА =====
    
    /**
     * Сохранение аватара
     */
    static saveAvatar(avatarData) {
        if (avatarData) {
            localStorage.setItem('userAvatar', avatarData);
            console.log('Аватар сохранен');
            return true;
        }
        return false;
    }

    /**
     * Получение аватара
     */
    static getAvatar() {
        return localStorage.getItem('userAvatar');
    }

    /**
     * Удаление аватара
     */
    static removeAvatar() {
        localStorage.removeItem('userAvatar');
        console.log('Аватар удален');
    }

    // ===== МЕТОДЫ ДЛЯ НАСТРОЕК ТЕМЫ =====
    
    /**
     * Сохранение выбранной темы
     */
    static setTheme(themeName) {
        localStorage.setItem('selectedTheme', themeName);
    }

    /**
     * Получение выбранной темы
     */
    static getTheme() {
        return localStorage.getItem('selectedTheme') || 'light';
    }

    /**
     * Сохранение размера шрифта
     */
    static setFontSize(size) {
        localStorage.setItem('selectedFontSize', size);
    }

    /**
     * Получение размера шрифта
     */
    static getFontSize() {
        return localStorage.getItem('selectedFontSize') || 'medium';
    }

    /**
     * Сохранение плотности интерфейса
     */
    static setDensity(density) {
        localStorage.setItem('selectedDensity', density);
    }

    /**
     * Получение плотности интерфейса
     */
    static getDensity() {
        return localStorage.getItem('selectedDensity') || 'normal';
    }

    // ===== МЕТОДЫ ДЛЯ УПРАВЛЕНИЯ КУРСАМИ =====
    
    /**
     * Сохранение данных о курсах
     */
    static saveCourseProgress(courseId, progressData) {
        const courses = this.getCourseProgress();
        courses[courseId] = {
            ...progressData,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('courseProgress', JSON.stringify(courses));
        return courses[courseId];
    }

    /**
     * Получение прогресса по курсам
     */
    static getCourseProgress() {
        return JSON.parse(localStorage.getItem('courseProgress')) || {};
    }

    /**
     * Получение прогресса по конкретному курсу
     */
    static getCourseProgressById(courseId) {
        const courses = this.getCourseProgress();
        return courses[courseId] || null;
    }

    // ===== МЕТОДЫ ДЛЯ НАСТРОЕК УВЕДОМЛЕНИЙ =====
    
    /**
     * Сохранение настроек уведомлений
     */
    static saveNotificationSettings(settings) {
        const data = {
            ...settings,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('notificationSettings', JSON.stringify(data));
        return data;
    }

    /**
     * Получение настроек уведомлений
     */
    static getNotificationSettings() {
        return JSON.parse(localStorage.getItem('notificationSettings')) || {
            emailNotifications: true,
            pushNotifications: true,
            assignmentReminders: true,
            gradeNotifications: true,
            courseUpdates: true
        };
    }

    // ===== МЕТОДЫ ДЛЯ ИЗБРАННОГО =====
    
    /**
     * Добавление в избранное
     */
    static addToFavorites(itemId, itemType) {
        const favorites = this.getFavorites();
        const key = `${itemType}_${itemId}`;
        
        if (!favorites[key]) {
            favorites[key] = {
                id: itemId,
                type: itemType,
                addedAt: new Date().toISOString()
            };
            localStorage.setItem('userFavorites', JSON.stringify(favorites));
        }
        
        return favorites;
    }

    /**
     * Удаление из избранного
     */
    static removeFromFavorites(itemId, itemType) {
        const favorites = this.getFavorites();
        const key = `${itemType}_${itemId}`;
        
        if (favorites[key]) {
            delete favorites[key];
            localStorage.setItem('userFavorites', JSON.stringify(favorites));
        }
        
        return favorites;
    }

    /**
     * Получение избранного
     */
    static getFavorites() {
        return JSON.parse(localStorage.getItem('userFavorites')) || {};
    }

    /**
     * Проверка, находится ли элемент в избранном
     */
    static isFavorite(itemId, itemType) {
        const favorites = this.getFavorites();
        const key = `${itemType}_${itemId}`;
        return !!favorites[key];
    }

    // ===== МЕТОДЫ ДЛЯ ИСТОРИИ ДЕЙСТВИЙ =====
    
    /**
     * Добавление действия в историю
     */
    static addToHistory(action, itemId, itemType, metadata = {}) {
        const history = this.getHistory();
        const actionId = `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        history[actionId] = {
            id: actionId,
            action: action,
            itemId: itemId,
            itemType: itemType,
            metadata: metadata,
            timestamp: new Date().toISOString()
        };
        
        // Ограничиваем историю последними 100 действиями
        const historyArray = Object.values(history);
        if (historyArray.length > 100) {
            const sorted = historyArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            const toKeep = sorted.slice(0, 100);
            const newHistory = {};
            toKeep.forEach(item => {
                newHistory[item.id] = item;
            });
            localStorage.setItem('userHistory', JSON.stringify(newHistory));
        } else {
            localStorage.setItem('userHistory', JSON.stringify(history));
        }
        
        return history[actionId];
    }

    /**
     * Получение истории действий
     */
    static getHistory() {
        return JSON.parse(localStorage.getItem('userHistory')) || {};
    }

    /**
     * Очистка истории действий
     */
    static clearHistory() {
        localStorage.removeItem('userHistory');
        return {};
    }

    // ===== УТИЛИТЫ И СЛУЖЕБНЫЕ МЕТОДЫ =====
    
    /**
     * Получение всех данных пользователя
     */
    static getAllUserData() {
        return {
            auth: {
                token: this.getToken(),
                userData: this.getUserData()
            },
            profile: {
                personal: this.loadPersonalData(),
                security: this.loadSecuritySettings(),
                appearance: this.loadAppearanceSettings(),
                avatar: this.getAvatar()
            },
            preferences: {
                theme: this.getTheme(),
                fontSize: this.getFontSize(),
                density: this.getDensity(),
                notifications: this.getNotificationSettings()
            },
            learning: {
                courseProgress: this.getCourseProgress(),
                favorites: this.getFavorites(),
                history: this.getHistory()
            }
        };
    }

    /**
     * Экспорт всех данных пользователя
     */
    static exportUserData() {
        const data = this.getAllUserData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `user-data-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return data;
    }

    /**
     * Импорт данных пользователя
     */
    static importUserData(jsonData) {
        try {
            const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
            
            if (data.auth) {
                if (data.auth.token) this.setToken(data.auth.token);
                if (data.auth.userData) this.setUserData(data.auth.userData);
            }
            
            if (data.profile) {
                if (data.profile.personal) localStorage.setItem('personalData', JSON.stringify(data.profile.personal));
                if (data.profile.security) localStorage.setItem('securitySettings', JSON.stringify(data.profile.security));
                if (data.profile.appearance) localStorage.setItem('appearanceSettings', JSON.stringify(data.profile.appearance));
                if (data.profile.avatar) this.saveAvatar(data.profile.avatar);
            }
            
            if (data.preferences) {
                if (data.preferences.theme) this.setTheme(data.preferences.theme);
                if (data.preferences.fontSize) this.setFontSize(data.preferences.fontSize);
                if (data.preferences.density) this.setDensity(data.preferences.density);
                if (data.preferences.notifications) this.saveNotificationSettings(data.preferences.notifications);
            }
            
            if (data.learning) {
                if (data.learning.courseProgress) localStorage.setItem('courseProgress', JSON.stringify(data.learning.courseProgress));
                if (data.learning.favorites) localStorage.setItem('userFavorites', JSON.stringify(data.learning.favorites));
                if (data.learning.history) localStorage.setItem('userHistory', JSON.stringify(data.learning.history));
            }
            
            console.log('Данные успешно импортированы');
            return true;
        } catch (error) {
            console.error('Ошибка импорта данных:', error);
            return false;
        }
    }

    /**
     * Очистка всех данных пользователя
     */
    static clearAll() {
        const keys = [
            'auth_token',
            'user_data',
            'personalData',
            'securitySettings',
            'appearanceSettings',
            'userAvatar',
            'selectedTheme',
            'selectedFontSize',
            'selectedDensity',
            'courseProgress',
            'notificationSettings',
            'userFavorites',
            'userHistory'
        ];
        
        keys.forEach(key => {
            localStorage.removeItem(key);
        });
        
        console.log('Все данные пользователя очищены');
    }

    /**
     * Получение статистики хранилища
     */
    static getStorageStats() {
        let totalSize = 0;
        const items = {};
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            const size = new Blob([value]).size;
            
            items[key] = {
                size: size,
                sizeFormatted: this.formatBytes(size),
                value: key.includes('token') ? '***' : value.substring(0, 100) + (value.length > 100 ? '...' : '')
            };
            
            totalSize += size;
        }
        
        return {
            totalItems: localStorage.length,
            totalSize: totalSize,
            totalSizeFormatted: this.formatBytes(totalSize),
            items: items
        };
    }

    /**
     * Форматирование размера в байтах
     */
    static formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    /**
     * Проверка поддержки localStorage
     */
    static isSupported() {
        try {
            const test = 'test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Резервное копирование в сессионное хранилище
     */
    static backupToSessionStorage() {
        const backup = {};
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            backup[key] = localStorage.getItem(key);
        }
        
        sessionStorage.setItem('localStorageBackup', JSON.stringify(backup));
        console.log('Резервная копия создана в sessionStorage');
        return backup;
    }

    /**
     * Восстановление из сессионного хранилища
     */
    static restoreFromSessionStorage() {
        const backup = sessionStorage.getItem('localStorageBackup');
        
        if (backup) {
            const data = JSON.parse(backup);
            
            this.clearAll();
            
            Object.keys(data).forEach(key => {
                localStorage.setItem(key, data[key]);
            });
            
            console.log('Данные восстановлены из sessionStorage');
            return true;
        }
        
        console.warn('Резервная копия не найдена в sessionStorage');
        return false;
    }
}

// Создаем глобальный экземпляр для обратной совместимости
window.StorageManager = StorageManager;

// Экспортируем для модульной системы
export default StorageManager;