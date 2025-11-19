/**
 * Cache Manager - унифицированная система кеширования для образовательной платформы
 * Поддержка памяти, localStorage, sessionStorage и стратегий инвалидации
 */

export class CacheManager {
    constructor() {
        this.storages = new Map();
        this.strategies = new Map();
        this.isActive = false;
        this.defaultTTL = 15 * 60 * 1000; // 15 минут по умолчанию
        
        // Типы хранилищ
        this.storageTypes = {
        MEMORY: 'memory',
        LOCAL: 'local',
        SESSION: 'session'
        };
        
        // Стратегии инвалидации
        this.evictionStrategies = {
        LRU: 'lru', // Least Recently Used
        LFU: 'lfu', // Least Frequently Used
        TTL: 'ttl'  // Time To Live
        };
        
        this.defaultConfig = {
        storage: this.storageTypes.MEMORY,
        ttl: this.defaultTTL,
        maxSize: 1000,
        evictionStrategy: this.evictionStrategies.TTL,
        namespace: 'default',
        compression: false,
        encryption: false
        };
    }

    async activate(config = {}) {
        this.isActive = true;
        this.config = { ...this.defaultConfig, ...config };
        
        try {
        await this.initializeStorages();
        this.setupEvictionStrategies();
        this.startCleanupInterval();
        
        console.log('Cache Manager activated');
        } catch (error) {
        console.error('Error activating Cache Manager:', error);
        }
    }

    deactivate() {
        this.isActive = false;
        this.stopCleanupInterval();
        this.clearAll();
        console.log('Cache Manager deactivated');
    }

    // Инициализация хранилищ
    async initializeStorages() {
        // Инициализируем memory storage
        this.storages.set(this.storageTypes.MEMORY, new Map());
        
        // Проверяем доступность localStorage
        if (this.isLocalStorageAvailable()) {
        this.storages.set(this.storageTypes.LOCAL, {
            set: (key, value) => localStorage.setItem(key, value),
            get: (key) => localStorage.getItem(key),
            remove: (key) => localStorage.removeItem(key),
            clear: () => {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith('cache_')) {
                localStorage.removeItem(key);
                }
            });
            }
        });
        }
        
        // Проверяем доступность sessionStorage
        if (this.isSessionStorageAvailable()) {
        this.storages.set(this.storageTypes.SESSION, {
            set: (key, value) => sessionStorage.setItem(key, value),
            get: (key) => sessionStorage.getItem(key),
            remove: (key) => sessionStorage.removeItem(key),
            clear: () => {
            const keys = Object.keys(sessionStorage);
            keys.forEach(key => {
                if (key.startsWith('cache_')) {
                sessionStorage.removeItem(key);
                }
            });
            }
        });
        }
    }

    // Проверка доступности хранилищ
    isLocalStorageAvailable() {
        try {
        const test = 'test';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
        } catch (e) {
        return false;
        }
    }

    isSessionStorageAvailable() {
        try {
        const test = 'test';
        sessionStorage.setItem(test, test);
        sessionStorage.removeItem(test);
        return true;
        } catch (e) {
        return false;
        }
    }

    // Основные методы кеширования
    async set(key, value, options = {}) {
        if (!this.isActive) return false;

        const config = { ...this.config, ...options };
        const storage = this.getStorage(config.storage);
        
        if (!storage) {
        console.error(`Storage ${config.storage} not available`);
        return false;
        }

        try {
        const cacheItem = this.createCacheItem(value, config);
        const serialized = this.serialize(cacheItem, config);
        const storageKey = this.buildStorageKey(key, config.namespace);
        
        await this.evictIfNeeded(storage, config);
        storage.set(storageKey, serialized);
        
        this.updateAccessMetrics(key, config);
        
        return true;
        } catch (error) {
        console.error('Error setting cache:', error);
        return false;
        }
    }

    async get(key, options = {}) {
        if (!this.isActive) return null;

        const config = { ...this.config, ...options };
        const storage = this.getStorage(config.storage);
        
        if (!storage) return null;

        try {
        const storageKey = this.buildStorageKey(key, config.namespace);
        const serialized = storage.get(storageKey);
        
        if (!serialized) return null;
        
        const cacheItem = this.deserialize(serialized, config);
        
        // Проверяем TTL
        if (this.isExpired(cacheItem)) {
            this.remove(key, options);
            return null;
        }
        
        // Обновляем метрики доступа
        this.updateAccessMetrics(key, config);
        cacheItem.lastAccessed = Date.now();
        cacheItem.accessCount++;
        
        // Сохраняем обновленные метрики
        await this.set(key, cacheItem.value, options);
        
        return cacheItem.value;
        } catch (error) {
        console.error('Error getting cache:', error);
        return null;
        }
    }

    async remove(key, options = {}) {
        if (!this.isActive) return false;

        const config = { ...this.config, ...options };
        const storage = this.getStorage(config.storage);
        
        if (!storage) return false;

        try {
        const storageKey = this.buildStorageKey(key, config.namespace);
        storage.remove(storageKey);
        return true;
        } catch (error) {
        console.error('Error removing cache:', error);
        return false;
        }
    }

    async exists(key, options = {}) {
        if (!this.isActive) return false;

        const config = { ...this.config, ...options };
        const storage = this.getStorage(config.storage);
        
        if (!storage) return false;

        try {
        const storageKey = this.buildStorageKey(key, config.namespace);
        const serialized = storage.get(storageKey);
        
        if (!serialized) return false;
        
        const cacheItem = this.deserialize(serialized, config);
        return !this.isExpired(cacheItem);
        } catch (error) {
        return false;
        }
    }

    async clear(namespace = null, options = {}) {
        if (!this.isActive) return false;

        const config = { ...this.config, ...options };
        const storage = this.getStorage(config.storage);
        
        if (!storage) return false;

        try {
        if (namespace) {
            await this.clearNamespace(namespace, storage, config);
        } else {
            storage.clear();
        }
        return true;
        } catch (error) {
        console.error('Error clearing cache:', error);
        return false;
        }
    }

    async clearAll() {
        if (!this.isActive) return false;

        try {
        for (const [type, storage] of this.storages) {
            if (typeof storage.clear === 'function') {
            storage.clear();
            } else if (type === this.storageTypes.MEMORY) {
            storage.clear();
            }
        }
        return true;
        } catch (error) {
        console.error('Error clearing all cache:', error);
        return false;
        }
    }

    // Вспомогательные методы
    createCacheItem(value, config) {
        return {
        value: value,
        createdAt: Date.now(),
        lastAccessed: Date.now(),
        accessCount: 0,
        ttl: config.ttl,
        expiresAt: Date.now() + config.ttl,
        namespace: config.namespace,
        size: this.calculateSize(value)
        };
    }

    serialize(cacheItem, config) {
        let data = cacheItem;
        
        if (config.compression) {
        data = this.compress(data);
        }
        
        if (config.encryption) {
        data = this.encrypt(data, config);
        }
        
        return JSON.stringify(data);
    }

    deserialize(serialized, config) {
        let data = JSON.parse(serialized);
        
        if (config.encryption) {
        data = this.decrypt(data, config);
        }
        
        if (config.compression) {
        data = this.decompress(data);
        }
        
        return data;
    }

    buildStorageKey(key, namespace) {
        return `cache_${namespace}_${key}`;
    }

    getStorage(type) {
        return this.storages.get(type);
    }

    isExpired(cacheItem) {
        return Date.now() > cacheItem.expiresAt;
    }

    calculateSize(value) {
        try {
        const serialized = JSON.stringify(value);
        return new Blob([serialized]).size;
        } catch (error) {
        return 0;
        }
    }

    updateAccessMetrics(key, config) {
        // Здесь можно добавить логику для стратегий LFU/LRU
        // Пока просто логируем для отладки
        if (config.debug) {
        console.log(`Cache access: ${key}`, {
            storage: config.storage,
            namespace: config.namespace
        });
        }
    }

    // Стратегии вытеснения
    setupEvictionStrategies() {
        this.strategies.set(this.evictionStrategies.LRU, this.lruEviction.bind(this));
        this.strategies.set(this.evictionStrategies.LFU, this.lfuEviction.bind(this));
        this.strategies.set(this.evictionStrategies.TTL, this.ttlEviction.bind(this));
    }

    async evictIfNeeded(storage, config) {
        if (config.storage === this.storageTypes.MEMORY) {
        const memoryStorage = this.storages.get(this.storageTypes.MEMORY);
        if (memoryStorage.size >= config.maxSize) {
            const evictor = this.strategies.get(config.evictionStrategy);
            if (evictor) {
            await evictor(storage, config);
            }
        }
        }
    }

    async lruEviction(storage, config) {
        const memoryStorage = this.storages.get(this.storageTypes.MEMORY);
        const entries = Array.from(memoryStorage.entries());
        
        // Сортируем по времени последнего доступа
        entries.sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
        
        // Удаляем самые старые
        const toRemove = Math.floor(config.maxSize * 0.1); // 10% самых старых
        for (let i = 0; i < toRemove && i < entries.length; i++) {
        memoryStorage.delete(entries[i][0]);
        }
    }

    async lfuEviction(storage, config) {
        const memoryStorage = this.storages.get(this.storageTypes.MEMORY);
        const entries = Array.from(memoryStorage.entries());
        
        // Сортируем по количеству обращений
        entries.sort((a, b) => a[1].accessCount - b[1].accessCount);
        
        // Удаляем наименее используемые
        const toRemove = Math.floor(config.maxSize * 0.1); // 10% наименее используемых
        for (let i = 0; i < toRemove && i < entries.length; i++) {
        memoryStorage.delete(entries[i][0]);
        }
    }

    async ttlEviction(storage, config) {
        const memoryStorage = this.storages.get(this.storageTypes.MEMORY);
        const now = Date.now();
        
        for (const [key, value] of memoryStorage.entries()) {
        if (now > value.expiresAt) {
            memoryStorage.delete(key);
        }
        }
    }

    // Очистка по namespace
    async clearNamespace(namespace, storage, config) {
        if (storage === this.storageTypes.MEMORY) {
        const memoryStorage = this.storages.get(this.storageTypes.MEMORY);
        for (const [key, value] of memoryStorage.entries()) {
            if (value.namespace === namespace) {
            memoryStorage.delete(key);
            }
        }
        } else {
        // Для localStorage и sessionStorage
        const keys = Object.keys(storage);
        keys.forEach(key => {
            if (key.startsWith(`cache_${namespace}_`)) {
            storage.remove(key);
            }
        });
        }
    }

    // Сжатие и шифрование (заглушки для реализации)
    compress(data) {
        // В реальной реализации можно использовать LZ-String или другие библиотеки
        console.warn('Compression not implemented');
        return data;
    }

    decompress(data) {
        console.warn('Decompression not implemented');
        return data;
    }

    encrypt(data, config) {
        // В реальной реализации можно использовать Web Crypto API
        console.warn('Encryption not implemented');
        return data;
    }

    decrypt(data, config) {
        console.warn('Decryption not implemented');
        return data;
    }

    // Интервал автоматической очистки
    startCleanupInterval() {
        this.cleanupInterval = setInterval(() => {
        this.cleanupExpired();
        }, 60000); // Каждую минуту
    }

    stopCleanupInterval() {
        if (this.cleanupInterval) {
        clearInterval(this.cleanupInterval);
        }
    }

    async cleanupExpired() {
        if (!this.isActive) return;

        try {
        for (const [type, storage] of this.storages) {
            if (type === this.storageTypes.MEMORY) {
            this.ttlEviction(storage, this.config);
            }
            // Для других хранилищ очистка происходит при доступе
        }
        } catch (error) {
        console.error('Error during cache cleanup:', error);
        }
    }

    // Публичное API для конкретных use cases
    async cacheApiCall(apiKey, apiCall, options = {}) {
        const cached = await this.get(apiKey, options);
        
        if (cached) {
        return cached;
        }
        
        try {
        const data = await apiCall();
        await this.set(apiKey, data, options);
        return data;
        } catch (error) {
        console.error('API call failed:', error);
        throw error;
        }
    }

    async cacheUserData(userId, data, options = {}) {
        const userOptions = {
        namespace: `user_${userId}`,
        ttl: 30 * 60 * 1000, // 30 минут для пользовательских данных
        ...options
        };
        
        return await this.set(`profile_${userId}`, data, userOptions);
    }

    async getUserData(userId, options = {}) {
        const userOptions = {
        namespace: `user_${userId}`,
        ...options
        };
        
        return await this.get(`profile_${userId}`, userOptions);
    }

    async cacheCourseData(courseId, data, options = {}) {
        const courseOptions = {
        namespace: `course_${courseId}`,
        ttl: 60 * 60 * 1000, // 1 час для данных курса
        ...options
        };
        
        return await this.set(`course_${courseId}`, data, courseOptions);
    }

    async getCourseData(courseId, options = {}) {
        const courseOptions = {
        namespace: `course_${courseId}`,
        ...options
        };
        
        return await this.get(`course_${courseId}`, courseOptions);
    }

    // Статистика и мониторинг
    getStats() {
        const stats = {
        totalItems: 0,
        totalSize: 0,
        byStorage: {},
        byNamespace: {}
        };

        for (const [type, storage] of this.storages) {
        if (type === this.storageTypes.MEMORY) {
            stats.byStorage[type] = {
            count: storage.size,
            size: Array.from(storage.values()).reduce((sum, item) => sum + (item.size || 0), 0)
            };
            stats.totalItems += storage.size;
            stats.totalSize += stats.byStorage[type].size;
        }
        }

        return stats;
    }

    // Дебаг и разработка
    enableDebug() {
        this.config.debug = true;
        console.log('Cache debug enabled');
    }

    disableDebug() {
        this.config.debug = false;
    }

    // Экспорт/импорт данных (для отладки)
    exportData() {
        const data = {};
        
        for (const [type, storage] of this.storages) {
        if (type === this.storageTypes.MEMORY) {
            data[type] = Object.fromEntries(storage);
        }
        }
        
        return data;
    }

    importData(data) {
        if (!this.isActive) return false;

        try {
        for (const [type, storageData] of Object.entries(data)) {
            const storage = this.storages.get(type);
            if (storage && type === this.storageTypes.MEMORY) {
            for (const [key, value] of Object.entries(storageData)) {
                storage.set(key, value);
            }
            }
        }
        return true;
        } catch (error) {
        console.error('Error importing cache data:', error);
        return false;
        }
    }
}

// Глобальный экземпляр для быстрого доступа
window.CacheManager = new CacheManager();

export default CacheManager;