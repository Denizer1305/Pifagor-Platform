/**
 * WebSocket Manager - управление веб-сокет соединениями для образовательной платформы
 * Обеспечивает реальное время для чатов, уведомлений, обновлений прогресса и совместной работы
 */

export class WebSocketManager {
    constructor() {
        this.connections = new Map();
        this.reconnectAttempts = new Map();
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 1000;
        this.heartbeatInterval = 30000; // 30 секунд
        this.pendingMessages = new Map();
        this.messageHandlers = new Map();
        this.isActive = false;
        
        // Типы соединений
        this.connectionTypes = {
        NOTIFICATIONS: 'notifications',
        CHAT: 'chat',
        COLLABORATION: 'collaboration',
        PROGRESS: 'progress',
        ADMIN: 'admin'
        };

        // Типы сообщений
        this.messageTypes = {
        // Системные
        PING: 'ping',
        PONG: 'pong',
        HEARTBEAT: 'heartbeat',
        RECONNECT: 'reconnect',
        
        // Уведомления
        NOTIFICATION_NEW: 'notification_new',
        NOTIFICATION_READ: 'notification_read',
        
        // Чат
        CHAT_MESSAGE: 'chat_message',
        CHAT_TYPING: 'chat_typing',
        CHAT_READ: 'chat_read',
        CHAT_DELIVERED: 'chat_delivered',
        
        // Прогресс
        PROGRESS_UPDATE: 'progress_update',
        ATTENDANCE_UPDATE: 'attendance_update',
        GRADE_UPDATE: 'grade_update',
        
        // Совместная работа
        COLLAB_JOIN: 'collab_join',
        COLLAB_LEAVE: 'collab_leave',
        COLLAB_CURSOR: 'collab_cursor',
        COLLAB_EDIT: 'collab_edit',
        
        // Администрирование
        USER_ONLINE: 'user_online',
        USER_OFFLINE: 'user_offline',
        SYSTEM_ALERT: 'system_alert'
        };

        this.defaultConfig = {
        autoReconnect: true,
        heartbeat: true,
        queueMessages: true,
        debug: false
        };
    }

    async activate(config = {}) {
        this.isActive = true;
        this.config = { ...this.defaultConfig, ...config };
        
        try {
        this.setupGlobalHandlers();
        await this.initializeConnections();
        
        console.log('WebSocket Manager activated');
        } catch (error) {
        console.error('Error activating WebSocket Manager:', error);
        }
    }

    deactivate() {
        this.isActive = false;
        this.closeAllConnections();
        this.cleanupGlobalHandlers();
        console.log('WebSocket Manager deactivated');
    }

    // Инициализация соединений
    async initializeConnections() {
        const user = await this.getCurrentUser();
        if (!user) {
        console.warn('No user found, skipping WebSocket initialization');
        return;
        }

        // Инициализируем основные соединения
        const connections = [
        { type: this.connectionTypes.NOTIFICATIONS, path: '/ws/notifications' },
        { type: this.connectionTypes.CHAT, path: '/ws/chat' },
        { type: this.connectionTypes.PROGRESS, path: '/ws/progress' }
        ];

        for (const conn of connections) {
        await this.createConnection(conn.type, conn.path);
        }
    }

    async createConnection(type, path, customConfig = {}) {
        if (this.connections.has(type)) {
        console.warn(`WebSocket connection for ${type} already exists`);
        return this.connections.get(type);
        }

        const config = { ...this.config, ...customConfig };
        const url = this.buildWebSocketURL(path);
        
        try {
        const ws = new WebSocket(url);
        const connection = {
            socket: ws,
            type: type,
            url: url,
            config: config,
            isConnected: false,
            isAuthenticated: false,
            queue: [],
            handlers: new Map(),
            heartbeatTimer: null
        };

        this.setupConnectionHandlers(connection);
        this.connections.set(type, connection);

        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
            reject(new Error(`Connection timeout for ${type}`));
            }, 10000);

            ws.onopen = () => {
            clearTimeout(timeout);
            resolve(connection);
            };

            ws.onerror = (error) => {
            clearTimeout(timeout);
            reject(error);
            };
        });
        } catch (error) {
        console.error(`Failed to create WebSocket connection for ${type}:`, error);
        throw error;
        }
    }

    buildWebSocketURL(path) {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const host = window.location.host;
        const token = this.getAuthToken();
        
        return `${protocol}//${host}${path}?token=${encodeURIComponent(token)}&version=1.0`;
    }

    // Обработчики соединений
    setupConnectionHandlers(connection) {
        const { socket, type } = connection;

        socket.onopen = () => {
        console.log(`WebSocket connected: ${type}`);
        connection.isConnected = true;
        this.handleConnectionOpen(connection);
        };

        socket.onmessage = (event) => {
        this.handleMessage(connection, event);
        };

        socket.onclose = (event) => {
        console.log(`WebSocket disconnected: ${type}`, event);
        connection.isConnected = false;
        this.handleConnectionClose(connection, event);
        };

        socket.onerror = (error) => {
        console.error(`WebSocket error (${type}):`, error);
        this.handleConnectionError(connection, error);
        };
    }

    handleConnectionOpen(connection) {
        // Аутентификация
        this.authenticateConnection(connection);
        
        // Запускаем heartbeat
        if (connection.config.heartbeat) {
        this.startHeartbeat(connection);
        }
        
        // Отправляем сообщения из очереди
        this.processMessageQueue(connection);
        
        // Уведомляем о подключении
        this.dispatchEvent('connected', { type: connection.type });
        
        if (typeof NotificationManager !== 'undefined') {
        NotificationManager.showInfo(`Подключено к ${this.getConnectionDisplayName(connection.type)}`);
        }
    }

    handleConnectionClose(connection, event) {
        // Останавливаем heartbeat
        this.stopHeartbeat(connection);
        
        // Пытаемся переподключиться
        if (connection.config.autoReconnect && event.code !== 1000) {
        this.scheduleReconnect(connection);
        }
        
        // Уведомляем о отключении
        this.dispatchEvent('disconnected', { 
        type: connection.type, 
        code: event.code,
        reason: event.reason
        });
    }

    handleConnectionError(connection, error) {
        this.dispatchEvent('error', { 
        type: connection.type, 
        error: error 
        });
    }

    // Аутентификация
    async authenticateConnection(connection) {
        try {
        const user = await this.getCurrentUser();
        const token = this.getAuthToken();
        
        const authMessage = {
            type: 'auth',
            data: {
            userId: user.id,
            token: token,
            userRole: user.role,
            connectionType: connection.type
            },
            timestamp: Date.now()
        };
        
        this.sendMessage(connection.type, authMessage);
        
        // Устанавливаем таймаут для аутентификации
        setTimeout(() => {
            if (!connection.isAuthenticated) {
            console.warn(`Authentication timeout for ${connection.type}`);
            this.dispatchEvent('auth_timeout', { type: connection.type });
            }
        }, 5000);
        
        } catch (error) {
        console.error(`Authentication failed for ${connection.type}:`, error);
        }
    }

    // Обработка сообщений
    handleMessage(connection, event) {
        try {
        const message = JSON.parse(event.data);
        this.logDebug(`Received message (${connection.type}):`, message);
        
        // Обрабатываем системные сообщения
        if (this.handleSystemMessage(connection, message)) {
            return;
        }
        
        // Вызываем зарегистрированные обработчики
        this.callMessageHandlers(connection.type, message);
        
        // Диспатчим глобальное событие
        this.dispatchEvent('message', {
            type: connection.type,
            message: message
        });
        
        } catch (error) {
        console.error(`Error processing message (${connection.type}):`, error, event.data);
        }
    }

    handleSystemMessage(connection, message) {
        switch (message.type) {
        case this.messageTypes.PONG:
            connection.lastPong = Date.now();
            return true;
            
        case this.messageTypes.HEARTBEAT:
            this.sendPong(connection);
            return true;
            
        case 'auth_success':
            connection.isAuthenticated = true;
            this.dispatchEvent('authenticated', { type: connection.type });
            return true;
            
        case 'auth_failed':
            connection.isAuthenticated = false;
            this.dispatchEvent('auth_failed', { 
            type: connection.type, 
            reason: message.data?.reason 
            });
            return true;
            
        default:
            return false;
        }
    }

    // Отправка сообщений
    sendMessage(connectionType, message, options = {}) {
        const connection = this.connections.get(connectionType);
        if (!connection) {
        throw new Error(`No WebSocket connection for ${connectionType}`);
        }
        
        if (!connection.isConnected) {
        if (options.queue !== false && connection.config.queueMessages) {
            this.queueMessage(connection, message);
            return false;
        }
        throw new Error(`WebSocket connection ${connectionType} is not connected`);
        }
        
        try {
        const messageWithMetadata = {
            ...message,
            id: this.generateMessageId(),
            timestamp: Date.now(),
            connectionType: connectionType
        };
        
        connection.socket.send(JSON.stringify(messageWithMetadata));
        this.logDebug(`Sent message (${connectionType}):`, messageWithMetadata);
        
        return messageWithMetadata.id;
        } catch (error) {
        console.error(`Error sending message (${connectionType}):`, error);
        
        if (options.queue !== false && connection.config.queueMessages) {
            this.queueMessage(connection, message);
        }
        
        throw error;
        }
    }

    queueMessage(connection, message) {
        if (connection.queue.length < 100) { // Лимит очереди
        connection.queue.push({
            message: message,
            timestamp: Date.now(),
            attempts: 0
        });
        this.logDebug(`Message queued (${connection.type}):`, message);
        } else {
        console.warn(`Message queue full for ${connection.type}, dropping message`);
        }
    }

    processMessageQueue(connection) {
        if (!connection.isConnected || connection.queue.length === 0) {
        return;
        }
        
        const successfulSends = [];
        
        for (const queuedMessage of connection.queue) {
        try {
            this.sendMessage(connection.type, queuedMessage.message, { queue: false });
            successfulSends.push(queuedMessage);
            queuedMessage.attempts++;
        } catch (error) {
            console.warn(`Failed to send queued message (attempt ${queuedMessage.attempts + 1}):`, error);
            
            if (queuedMessage.attempts >= 3) {
            console.warn(`Dropping message after ${queuedMessage.attempts} failed attempts`);
            successfulSends.push(queuedMessage);
            }
        }
        }
        
        // Удаляем успешно отправленные сообщения
        connection.queue = connection.queue.filter(msg => 
        !successfulSends.includes(msg)
        );
    }

    // Heartbeat и поддержание соединения
    startHeartbeat(connection) {
        if (connection.heartbeatTimer) {
        clearInterval(connection.heartbeatTimer);
        }
        
        connection.heartbeatTimer = setInterval(() => {
        if (connection.isConnected) {
            this.sendPing(connection);
            
            // Проверяем, не превышен ли таймаут pong
            if (connection.lastPong && Date.now() - connection.lastPong > this.heartbeatInterval * 2) {
            console.warn(`Heartbeat timeout for ${connection.type}, reconnecting...`);
            this.reconnect(connection);
            }
        }
        }, this.heartbeatInterval);
    }

    stopHeartbeat(connection) {
        if (connection.heartbeatTimer) {
        clearInterval(connection.heartbeatTimer);
        connection.heartbeatTimer = null;
        }
    }

    sendPing(connection) {
        const pingMessage = {
        type: this.messageTypes.PING,
        timestamp: Date.now()
        };
        
        this.sendMessage(connection.type, pingMessage, { queue: false });
    }

    sendPong(connection) {
        const pongMessage = {
        type: this.messageTypes.PONG,
        timestamp: Date.now()
        };
        
        this.sendMessage(connection.type, pongMessage, { queue: false });
    }

    // Переподключение
    scheduleReconnect(connection) {
        const attempts = this.reconnectAttempts.get(connection.type) || 0;
        
        if (attempts >= this.maxReconnectAttempts) {
        console.error(`Max reconnection attempts reached for ${connection.type}`);
        this.dispatchEvent('reconnect_failed', { type: connection.type });
        return;
        }
        
        const delay = this.reconnectDelay * Math.pow(2, attempts); // Exponential backoff
        this.reconnectAttempts.set(connection.type, attempts + 1);
        
        console.log(`Scheduling reconnect for ${connection.type} in ${delay}ms (attempt ${attempts + 1})`);
        
        setTimeout(() => {
        this.reconnect(connection);
        }, delay);
    }

    async reconnect(connection) {
        console.log(`Reconnecting WebSocket: ${connection.type}`);
        
        try {
        // Закрываем старое соединение
        if (connection.socket) {
            connection.socket.close(1000, 'Reconnecting');
        }
        
        // Создаем новое соединение
        await this.createConnection(connection.type, connection.url, connection.config);
        this.reconnectAttempts.set(connection.type, 0);
        
        } catch (error) {
        console.error(`Reconnection failed for ${connection.type}:`, error);
        this.scheduleReconnect(connection);
        }
    }

    // Регистрация обработчиков сообщений
    addMessageHandler(connectionType, messageType, handler) {
        const key = `${connectionType}.${messageType}`;
        
        if (!this.messageHandlers.has(key)) {
        this.messageHandlers.set(key, []);
        }
        
        this.messageHandlers.get(key).push(handler);
        
        // Возвращаем функцию для удаления обработчика
        return () => {
        this.removeMessageHandler(connectionType, messageType, handler);
        };
    }

    removeMessageHandler(connectionType, messageType, handler) {
        const key = `${connectionType}.${messageType}`;
        const handlers = this.messageHandlers.get(key);
        
        if (handlers) {
        const index = handlers.indexOf(handler);
        if (index !== -1) {
            handlers.splice(index, 1);
        }
        }
    }

    callMessageHandlers(connectionType, message) {
        const specificKey = `${connectionType}.${message.type}`;
        const wildcardKey = `${connectionType}.*`;
        
        // Вызываем специфические обработчики
        const specificHandlers = this.messageHandlers.get(specificKey) || [];
        specificHandlers.forEach(handler => {
        try {
            handler(message, connectionType);
        } catch (error) {
            console.error(`Error in message handler (${specificKey}):`, error);
        }
        });
        
        // Вызываем обработчики для всех сообщений
        const wildcardHandlers = this.messageHandlers.get(wildcardKey) || [];
        wildcardHandlers.forEach(handler => {
        try {
            handler(message, connectionType);
        } catch (error) {
            console.error(`Error in wildcard message handler (${wildcardKey}):`, error);
        }
        });
    }

    // Публичное API для конкретных функций
    // Уведомления
    async subscribeToNotifications(userId) {
        const message = {
        type: 'subscribe_notifications',
        data: { userId }
        };
        
        return this.sendMessage(this.connectionTypes.NOTIFICATIONS, message);
    }

    async markNotificationRead(notificationId) {
        const message = {
        type: this.messageTypes.NOTIFICATION_READ,
        data: { notificationId }
        };
        
        return this.sendMessage(this.connectionTypes.NOTIFICATIONS, message);
    }

    // Чат
    async joinChat(chatId) {
        const message = {
        type: 'chat_join',
        data: { chatId }
        };
        
        return this.sendMessage(this.connectionTypes.CHAT, message);
    }

    async leaveChat(chatId) {
        const message = {
        type: 'chat_leave',
        data: { chatId }
        };
        
        return this.sendMessage(this.connectionTypes.CHAT, message);
    }

    async sendChatMessage(chatId, content, options = {}) {
        const message = {
        type: this.messageTypes.CHAT_MESSAGE,
        data: {
            chatId,
            content,
            ...options
        }
        };
        
        return this.sendMessage(this.connectionTypes.CHAT, message);
    }

    async sendTypingIndicator(chatId, isTyping) {
        const message = {
        type: this.messageTypes.CHAT_TYPING,
        data: {
            chatId,
            isTyping
        }
        };
        
        return this.sendMessage(this.connectionTypes.CHAT, message);
    }

    // Совместная работа
    async joinCollaborationSession(sessionId, documentId) {
        const message = {
        type: this.messageTypes.COLLAB_JOIN,
        data: {
            sessionId,
            documentId,
            user: await this.getCurrentUser()
        }
        };
        
        return this.sendMessage(this.connectionTypes.COLLABORATION, message);
    }

    async sendCursorPosition(sessionId, position) {
        const message = {
        type: this.messageTypes.COLLAB_CURSOR,
        data: {
            sessionId,
            position
        }
        };
        
        return this.sendMessage(this.connectionTypes.COLLABORATION, message);
    }

    async sendEdit(sessionId, edit) {
        const message = {
        type: this.messageTypes.COLLAB_EDIT,
        data: {
            sessionId,
            edit
        }
        };
        
        return this.sendMessage(this.connectionTypes.COLLABORATION, message);
    }

    // Управление соединениями
    closeConnection(connectionType, code = 1000, reason = 'Normal closure') {
        const connection = this.connections.get(connectionType);
        if (connection && connection.socket) {
        connection.socket.close(code, reason);
        this.connections.delete(connectionType);
        }
    }

    closeAllConnections() {
        this.connections.forEach((connection, type) => {
        this.closeConnection(type, 1000, 'Manager deactivated');
        });
        
        this.connections.clear();
    }

    getConnectionStatus(connectionType) {
        const connection = this.connections.get(connectionType);
        if (!connection) {
        return 'not_initialized';
        }
        
        return {
        type: connection.type,
        isConnected: connection.isConnected,
        isAuthenticated: connection.isAuthenticated,
        queueLength: connection.queue.length,
        reconnectAttempts: this.reconnectAttempts.get(connectionType) || 0
        };
    }

    getAllConnectionsStatus() {
        const status = {};
        this.connections.forEach((connection, type) => {
        status[type] = this.getConnectionStatus(type);
        });
        return status;
    }

    // Утилиты
    generateMessageId() {
        return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    getAuthToken() {
        // Получаем токен из localStorage или куков
        return localStorage.getItem('auth_token') || 
            document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    }

    async getCurrentUser() {
        // Получаем информацию о текущем пользователе
        if (typeof AuthService !== 'undefined') {
        return AuthService.getCurrentUser();
        }
        
        // Fallback: пытаемся получить из localStorage
        const userData = localStorage.getItem('current_user');
        return userData ? JSON.parse(userData) : null;
    }

    getConnectionDisplayName(connectionType) {
        const names = {
        [this.connectionTypes.NOTIFICATIONS]: 'Уведомления',
        [this.connectionTypes.CHAT]: 'Чат',
        [this.connectionTypes.COLLABORATION]: 'Совместная работа',
        [this.connectionTypes.PROGRESS]: 'Обновления прогресса',
        [this.connectionTypes.ADMIN]: 'Администрирование'
        };
        
        return names[connectionType] || connectionType;
    }

    dispatchEvent(eventName, detail) {
        const event = new CustomEvent(`websocket:${eventName}`, { detail });
        document.dispatchEvent(event);
    }

    setupGlobalHandlers() {
        // Обработчики для глобальных событий
        document.addEventListener('websocket:send_message', (event) => {
        const { connectionType, message } = event.detail;
        this.sendMessage(connectionType, message);
        });
        
        // Интеграция с OfflineManager
        if (typeof OfflineManager !== 'undefined') {
        document.addEventListener('offline:online', () => {
            this.reconnectAll();
        });
        }
    }

    cleanupGlobalHandlers() {
        document.removeEventListener('websocket:send_message', () => {});
    }

    async reconnectAll() {
        console.log('Reconnecting all WebSocket connections...');
        
        const reconnectPromises = [];
        this.connections.forEach((connection, type) => {
        reconnectPromises.push(this.reconnect(connection));
        });
        
        await Promise.allSettled(reconnectPromises);
    }

    logDebug(message, data) {
        if (this.config.debug) {
        console.log(`[WebSocket] ${message}`, data);
        }
    }

    // Статистика и мониторинг
    getStatistics() {
        let totalMessagesSent = 0;
        let totalMessagesReceived = 0;
        let totalQueueSize = 0;
        
        this.connections.forEach(connection => {
        totalQueueSize += connection.queue.length;
        // Здесь можно добавить подсчет отправленных/полученных сообщений
        });
        
        return {
        activeConnections: this.connections.size,
        totalQueueSize,
        totalMessagesSent,
        totalMessagesReceived,
        reconnectAttempts: Object.fromEntries(this.reconnectAttempts)
        };
    }
}

// Глобальный экземпляр для быстрого доступа
window.WebSocketManager = new WebSocketManager();

// CSS стили для индикаторов WebSocket
const websocketStyles = `
.websocket-status {
    position: fixed;
    bottom: 10px;
    right: 10px;
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    z-index: 10000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    gap: 8px;
}

.websocket-status.connected {
    background: #10B981;
    color: white;
}

.websocket-status.connecting {
    background: #F59E0B;
    color: white;
}

.websocket-status.disconnected {
    background: #EF4444;
    color: white;
}

.websocket-status .connection-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    animation: pulse 2s infinite;
}

.websocket-status.connected .connection-dot {
    background: #34D399;
}

.websocket-status.connecting .connection-dot {
    background: #FBBF24;
    animation: pulse 1s infinite;
}

.websocket-status.disconnected .connection-dot {
    background: #F87171;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}

.connection-details {
    position: fixed;
    bottom: 50px;
    right: 10px;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    padding: 12px;
    font-size: 11px;
    max-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    z-index: 9999;
}

.connection-details h4 {
    margin: 0 0 8px 0;
    color: #374151;
}

.connection-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    padding: 2px 0;
}

.connection-item:not(:last-child) {
    border-bottom: 1px solid #F3F4F6;
}

.connection-status {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
}

.connection-status.connected {
    background: #10B981;
}

.connection-status.connecting {
    background: #F59E0B;
}

.connection-status.disconnected {
    background: #EF4444;
}
`;

// Добавляем стили в документ
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = websocketStyles;
    document.head.appendChild(styleSheet);
}

// Создаем индикатор статуса в DOM
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const statusIndicator = document.createElement('div');
        statusIndicator.id = 'websocket-status';
        statusIndicator.className = 'websocket-status disconnected';
        statusIndicator.innerHTML = `
        <span class="connection-dot"></span>
        <span class="status-text">Подключение...</span>
        `;
        document.body.appendChild(statusIndicator);
        
        // Обновляем статус при изменениях
        document.addEventListener('websocket:connected', () => {
        statusIndicator.className = 'websocket-status connected';
        statusIndicator.querySelector('.status-text').textContent = 'Подключено';
        });
        
        document.addEventListener('websocket:disconnected', () => {
        statusIndicator.className = 'websocket-status disconnected';
        statusIndicator.querySelector('.status-text').textContent = 'Отключено';
        });
    });
}

export default WebSocketManager;