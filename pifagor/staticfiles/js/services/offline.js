/**
 * Offline Manager - управление оффлайн-режимом для образовательной платформы
 * Обеспечивает работу приложения без интернета с последующей синхронизацией
 */

export class OfflineManager {
    constructor() {
        this.isOnline = navigator.onLine;
        this.syncQueue = [];
        this.pendingActions = new Map();
        this.syncInProgress = false;
        this.retryAttempts = 3;
        this.retryDelay = 5000; // 5 секунд
        this.cacheName = 'educache-v1';
        this.isActive = false;
        
        // Типы действий для синхронизации
        this.actionTypes = {
        HOMEWORK_SUBMIT: 'homework_submit',
        PRACTICE_SUBMIT: 'practice_submit',
        ATTENDANCE_MARK: 'attendance_mark',
        GRADE_UPDATE: 'grade_update',
        MESSAGE_SEND: 'message_send',
        FILE_UPLOAD: 'file_upload'
        };
    }

    async activate() {
        this.isActive = true;
        
        try {
        await this.initializeCache();
        this.setupEventListeners();
        this.loadPendingActions();
        this.startSyncMonitor();
        
        console.log('Offline Manager activated');
        } catch (error) {
        console.error('Error activating Offline Manager:', error);
        }
    }

    deactivate() {
        this.isActive = false;
        this.cleanupEventListeners();
        this.stopSyncMonitor();
        console.log('Offline Manager deactivated');
    }

    // Инициализация кеша
    async initializeCache() {
        if (!('caches' in window)) {
        console.warn('Cache API not supported');
        return;
        }

        try {
        this.cache = await caches.open(this.cacheName);
        
        // Предзагрузка критически важных ресурсов
        await this.precacheCriticalResources();
        } catch (error) {
        console.error('Cache initialization failed:', error);
        }
    }

    async precacheCriticalResources() {
        const criticalResources = [
        '/css/main.css',
        '/js/main.js',
        '/js/core/utils.js',
        '/js/services/api.js',
        '/offline.html'
        ];

        try {
        await this.cache.addAll(criticalResources);
        console.log('Critical resources precached');
        } catch (error) {
        console.warn('Some critical resources failed to cache:', error);
        }
    }

    // Настройка обработчиков событий
    setupEventListeners() {
        window.addEventListener('online', this.handleOnline.bind(this));
        window.addEventListener('offline', this.handleOffline.bind(this));
        
        // Слушаем кастомные события от других модулей
        document.addEventListener('offline:action-queued', this.handleActionQueued.bind(this));
        document.addEventListener('offline:sync-request', this.handleSyncRequest.bind(this));
    }

    cleanupEventListeners() {
        window.removeEventListener('online', this.handleOnline.bind(this));
        window.removeEventListener('offline', this.handleOffline.bind(this));
        document.removeEventListener('offline:action-queued', this.handleActionQueued.bind(this));
        document.removeEventListener('offline:sync-request', this.handleSyncRequest.bind(this));
    }

    // Обработчики событий сети
    handleOnline() {
        this.isOnline = true;
        console.log('Connection restored');
        
        if (typeof NotificationManager !== 'undefined') {
        NotificationManager.showSuccess('Соединение восстановлено. Синхронизация данных...');
        }
        
        this.processSyncQueue();
        this.updateUIStatus();
    }

    handleOffline() {
        this.isOnline = false;
        console.log('Connection lost');
        
        if (typeof NotificationManager !== 'undefined') {
        NotificationManager.showWarning('Отсутствует интернет-соединение. Работа в оффлайн-режиме.');
        }
        
        this.updateUIStatus();
    }

    // Мониторинг состояния синхронизации
    startSyncMonitor() {
        this.syncMonitor = setInterval(() => {
        this.checkSyncStatus();
        }, 30000); // Проверка каждые 30 секунд
    }

    stopSyncMonitor() {
        if (this.syncMonitor) {
        clearInterval(this.syncMonitor);
        }
    }

    checkSyncStatus() {
        if (this.isOnline && this.syncQueue.length > 0 && !this.syncInProgress) {
        this.processSyncQueue();
        }
    }

    // Управление очередью синхронизации
    async addToSyncQueue(action) {
        const actionId = this.generateActionId();
        const queueItem = {
        id: actionId,
        type: action.type,
        data: action.data,
        timestamp: new Date().toISOString(),
        retryCount: 0,
        priority: action.priority || 'normal'
        };

        this.syncQueue.push(queueItem);
        this.pendingActions.set(actionId, queueItem);
        
        await this.saveToStorage();
        
        // Уведомляем о добавлении в очередь
        this.dispatchEvent('actionQueued', { actionId, type: action.type });
        
        // Если онлайн, сразу пытаемся синхронизировать
        if (this.isOnline) {
        this.processSyncQueue();
        }
        
        return actionId;
    }

    async processSyncQueue() {
        if (this.syncInProgress || this.syncQueue.length === 0 || !this.isOnline) {
        return;
        }

        this.syncInProgress = true;
        console.log('Starting sync process...');

        try {
        // Сортируем по приоритету
        this.syncQueue.sort((a, b) => {
            const priorityOrder = { high: 0, normal: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        let successCount = 0;
        let errorCount = 0;

        for (const action of [...this.syncQueue]) {
            try {
            await this.processAction(action);
            successCount++;
            
            // Удаляем успешно выполненное действие из очереди
            this.syncQueue = this.syncQueue.filter(item => item.id !== action.id);
            this.pendingActions.delete(action.id);
            
            } catch (error) {
            console.error(`Failed to process action ${action.id}:`, error);
            errorCount++;
            
            action.retryCount++;
            
            // Если превышено количество попыток, удаляем действие
            if (action.retryCount >= this.retryAttempts) {
                console.warn(`Action ${action.id} failed after ${this.retryAttempts} attempts`);
                this.syncQueue = this.syncQueue.filter(item => item.id !== action.id);
                this.pendingActions.delete(action.id);
                
                this.dispatchEvent('actionFailed', { 
                actionId: action.id, 
                type: action.type,
                error: error.message 
                });
            }
            }
            
            // Небольшая задержка между запросами
            await this.delay(100);
        }

        await this.saveToStorage();
        
        console.log(`Sync completed. Success: ${successCount}, Errors: ${errorCount}`);
        
        if (successCount > 0 && typeof NotificationManager !== 'undefined') {
            NotificationManager.showSuccess(`Синхронизировано действий: ${successCount}`);
        }
        
        } catch (error) {
        console.error('Sync process failed:', error);
        } finally {
        this.syncInProgress = false;
        this.dispatchEvent('syncCompleted', { 
            successCount: this.syncQueue.length - errorCount,
            errorCount 
        });
        }
    }

    async processAction(action) {
        console.log(`Processing action: ${action.type}`, action);
        
        switch (action.type) {
        case this.actionTypes.HOMEWORK_SUBMIT:
            return await this.syncHomeworkSubmit(action.data);
            
        case this.actionTypes.PRACTICE_SUBMIT:
            return await this.syncPracticeSubmit(action.data);
            
        case this.actionTypes.ATTENDANCE_MARK:
            return await this.syncAttendanceMark(action.data);
            
        case this.actionTypes.GRADE_UPDATE:
            return await this.syncGradeUpdate(action.data);
            
        case this.actionTypes.MESSAGE_SEND:
            return await this.syncMessageSend(action.data);
            
        case this.actionTypes.FILE_UPLOAD:
            return await this.syncFileUpload(action.data);
            
        default:
            throw new Error(`Unknown action type: ${action.type}`);
        }
    }

    // Методы синхронизации для разных типов действий
    async syncHomeworkSubmit(data) {
        // Используем существующий API для отправки домашнего задания
        const response = await fetch('/api/homework/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Offline-Sync': 'true'
        },
        body: JSON.stringify(data)
        });

        if (!response.ok) {
        throw new Error(`Homework submit failed: ${response.status}`);
        }

        return await response.json();
    }

    async syncPracticeSubmit(data) {
        const response = await fetch('/api/practice/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Offline-Sync': 'true'
        },
        body: JSON.stringify(data)
        });

        if (!response.ok) {
        throw new Error(`Practice submit failed: ${response.status}`);
        }

        return await response.json();
    }

    async syncAttendanceMark(data) {
        const response = await fetch('/api/attendance/mark', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Offline-Sync': 'true'
        },
        body: JSON.stringify(data)
        });

        if (!response.ok) {
        throw new Error(`Attendance mark failed: ${response.status}`);
        }

        return await response.json();
    }

    async syncGradeUpdate(data) {
        const response = await fetch('/api/grades/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Offline-Sync': 'true'
        },
        body: JSON.stringify(data)
        });

        if (!response.ok) {
        throw new Error(`Grade update failed: ${response.status}`);
        }

        return await response.json();
    }

    async syncMessageSend(data) {
        const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Offline-Sync': 'true'
        },
        body: JSON.stringify(data)
        });

        if (!response.ok) {
        throw new Error(`Message send failed: ${response.status}`);
        }

        return await response.json();
    }

    async syncFileUpload(data) {
        const formData = new FormData();
        formData.append('file', data.file);
        formData.append('metadata', JSON.stringify(data.metadata));

        const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
            'X-Offline-Sync': 'true'
        },
        body: formData
        });

        if (!response.ok) {
        throw new Error(`File upload failed: ${response.status}`);
        }

        return await response.json();
    }

    // Управление кешем
    async cacheRequest(url, response) {
        if (!this.cache) return;

        try {
        await this.cache.put(url, response);
        } catch (error) {
        console.warn('Cache put failed:', error);
        }
    }

    async getCachedResponse(url) {
        if (!this.cache) return null;

        try {
        const response = await this.cache.match(url);
        return response || null;
        } catch (error) {
        console.warn('Cache match failed:', error);
        return null;
        }
    }

    async cacheApiResponse(endpoint, data) {
        const cacheKey = `/api/cache/${btoa(endpoint)}_${Date.now()}`;
        const response = new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
        });

        await this.cacheRequest(cacheKey, response);
        return cacheKey;
    }

    // Работа с хранилищем
    async saveToStorage() {
        try {
        const data = {
            syncQueue: this.syncQueue,
            pendingActions: Array.from(this.pendingActions.entries()),
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('offlineSyncData', JSON.stringify(data));
        } catch (error) {
        console.error('Failed to save sync data:', error);
        }
    }

    async loadPendingActions() {
        try {
        const stored = localStorage.getItem('offlineSyncData');
        if (!stored) return;

        const data = JSON.parse(stored);
        this.syncQueue = data.syncQueue || [];
        this.pendingActions = new Map(data.pendingActions || []);

        console.log(`Loaded ${this.syncQueue.length} pending actions from storage`);
        } catch (error) {
        console.error('Failed to load sync data:', error);
        }
    }

    async clearStorage() {
        try {
        localStorage.removeItem('offlineSyncData');
        this.syncQueue = [];
        this.pendingActions.clear();
        
        if (this.cache) {
            const keys = await caches.keys();
            await Promise.all(
            keys.map(key => {
                if (key.startsWith('educache')) {
                return caches.delete(key);
                }
            })
            );
        }
        
        console.log('Offline storage cleared');
        } catch (error) {
        console.error('Failed to clear storage:', error);
        }
    }

    // Публичное API для других модулей
    async submitHomework(data) {
        const action = {
        type: this.actionTypes.HOMEWORK_SUBMIT,
        data: data,
        priority: 'high'
        };

        return await this.addToSyncQueue(action);
    }

    async submitPractice(data) {
        const action = {
        type: this.actionTypes.PRACTICE_SUBMIT,
        data: data,
        priority: 'high'
        };

        return await this.addToSyncQueue(action);
    }

    async markAttendance(data) {
        const action = {
        type: this.actionTypes.ATTENDANCE_MARK,
        data: data,
        priority: 'high'
        };

        return await this.addToSyncQueue(action);
    }

    async updateGrade(data) {
        const action = {
        type: this.actionTypes.GRADE_UPDATE,
        data: data,
        priority: 'normal'
        };

        return await this.addToSyncQueue(action);
    }

    async sendMessage(data) {
        const action = {
        type: this.actionTypes.MESSAGE_SEND,
        data: data,
        priority: 'low'
        };

        return await this.addToSyncQueue(action);
    }

    async uploadFile(data) {
        const action = {
        type: this.actionTypes.FILE_UPLOAD,
        data: data,
        priority: 'normal'
        };

        return await this.addToSyncQueue(action);
    }

    // Утилиты
    generateActionId() {
        return `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    dispatchEvent(eventName, detail) {
        const event = new CustomEvent(`offline:${eventName}`, { detail });
        document.dispatchEvent(event);
    }

    handleActionQueued(event) {
        console.log('Action queued:', event.detail);
    }

    handleSyncRequest(event) {
        this.processSyncQueue();
    }

    // Статус и информация
    getSyncStatus() {
        return {
        isOnline: this.isOnline,
        isSyncing: this.syncInProgress,
        pendingActions: this.syncQueue.length,
        queue: this.syncQueue.map(item => ({
            id: item.id,
            type: item.type,
            timestamp: item.timestamp,
            retryCount: item.retryCount,
            priority: item.priority
        }))
        };
    }

    getStorageUsage() {
        try {
        const stored = localStorage.getItem('offlineSyncData');
        const size = stored ? new Blob([stored]).size : 0;
        
        return {
            queueSize: this.syncQueue.length,
            storageSize: size,
            cacheSupported: !!this.cache
        };
        } catch (error) {
        return { error: error.message };
        }
    }

    updateUIStatus() {
        // Обновляем индикатор статуса в UI
        const statusElement = document.getElementById('offline-status');
        if (!statusElement) return;

        if (this.isOnline) {
        statusElement.className = 'online-status';
        statusElement.innerHTML = '🟢 Онлайн';
        
        if (this.syncQueue.length > 0) {
            statusElement.innerHTML += ` (${this.syncQueue.length} в очереди)`;
        }
        } else {
        statusElement.className = 'offline-status';
        statusElement.innerHTML = '🔴 Оффлайн';
        
        if (this.syncQueue.length > 0) {
            statusElement.innerHTML += ` (${this.syncQueue.length} ожидают)`;
        }
        }
    }

    // Экстренные методы
    forceSync() {
        if (!this.isOnline) {
        if (typeof NotificationManager !== 'undefined') {
            NotificationManager.showWarning('Невозможно синхронизировать: нет соединения');
        }
        return;
        }

        this.processSyncQueue();
    }

    cancelAction(actionId) {
        this.syncQueue = this.syncQueue.filter(item => item.id !== actionId);
        this.pendingActions.delete(actionId);
        this.saveToStorage();
        
        this.dispatchEvent('actionCancelled', { actionId });
    }

    // Дебаг и логирование
    enableDebug() {
        this.debug = true;
        console.log('Offline debug enabled');
    }

    disableDebug() {
        this.debug = false;
    }

    logDebug(message, data) {
        if (this.debug) {
        console.log(`[Offline] ${message}`, data);
        }
    }
}

// Глобальный экземпляр для быстрого доступа
window.OfflineManager = new OfflineManager();

// CSS стили для оффлайн-индикатора
const offlineStyles = `
.online-status {
    position: fixed;
    top: 10px;
    right: 10px;
    background: #10B981;
    color: white;
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    z-index: 10000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.offline-status {
    position: fixed;
    top: 10px;
    right: 10px;
    background: #EF4444;
    color: white;
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    z-index: 10000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.sync-progress {
    position: fixed;
    top: 50px;
    right: 10px;
    background: #3B82F6;
    color: white;
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    z-index: 10000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.offline-warning {
    background: #FEF3C7;
    border: 1px solid #F59E0B;
    color: #92400E;
    padding: 12px 16px;
    border-radius: 8px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    gap: 10px;
}

.offline-warning::before {
    content: '⚠️';
    font-size: 16px;
}
`;

// Добавляем стили в документ
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = offlineStyles;
    document.head.appendChild(styleSheet);
}

// Создаем индикатор статуса в DOM
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const statusIndicator = document.createElement('div');
        statusIndicator.id = 'offline-status';
        statusIndicator.className = 'online-status';
        statusIndicator.innerHTML = '🟢 Онлайн';
        document.body.appendChild(statusIndicator);
    });
}

export default OfflineManager;