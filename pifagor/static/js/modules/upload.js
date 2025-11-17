/**
 * Upload Manager - унифицированная система загрузки файлов для образовательной платформы
 * Поддержка различных типов файлов, прогресс загрузки, обработка ошибок и интеграция с API
 */

export class UploadManager {
    constructor() {
        this.uploads = new Map();
        this.activeUploads = new Map();
        this.queuedUploads = [];
        this.maxConcurrentUploads = 3;
        this.isActive = false;
        this.config = {
            maxFileSize: 100 * 1024 * 1024, // 100MB
            allowedFileTypes: [
                // Документы
                '.pdf', '.doc', '.docx', '.txt', '.rtf',
                // Таблицы
                '.xls', '.xlsx', '.csv',
                // Презентации
                '.ppt', '.pptx',
                // Изображения
                '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp',
                // Архивы
                '.zip', '.rar', '.7z',
                // Код
                '.js', '.html', '.css', '.py', '.java', '.cpp', '.c', '.php',
                // Видео
                '.mp4', '.avi', '.mov', '.wmv',
                // Аудио
                '.mp3', '.wav', '.ogg'
            ],
            chunkSize: 5 * 1024 * 1024, // 5MB chunks для больших файлов
            maxRetries: 3,
            retryDelay: 1000,
            autoUpload: true,
            debug: false
        };

        this.uploadTypes = {
            HOMEWORK: 'homework',
            COURSE_MATERIAL: 'course_material',
            PROFILE_IMAGE: 'profile_image',
            PRACTICE_CODE: 'practice_code',
            SUBMISSION: 'submission',
            GENERAL: 'general'
        };
    }

    async activate(config = {}) {
        this.isActive = true;
        this.config = { ...this.config, ...config };
        
        try {
            this.setupEventListeners();
            this.initializeUploadAreas();
            this.startQueueProcessor();
            
            console.log('Upload Manager activated');
        } catch (error) {
            console.error('Error activating Upload Manager:', error);
        }
    }

    deactivate() {
        this.isActive = false;
        this.cleanupEventListeners();
        this.stopQueueProcessor();
        this.cancelAllUploads();
        console.log('Upload Manager deactivated');
    }

    // Инициализация областей загрузки
    initializeUploadAreas() {
        // Автоматическая инициализация элементов с data-upload
        const uploadElements = document.querySelectorAll('[data-upload]');
        
        uploadElements.forEach(element => {
            this.initializeUploadElement(element);
        });
    }

    initializeUploadElement(element) {
        const uploadType = element.dataset.upload;
        const allowedTypes = element.dataset.allowedTypes;
        const maxSize = element.dataset.maxSize;
        
        const config = {
            uploadType: uploadType,
            allowedFileTypes: allowedTypes ? allowedTypes.split(',') : this.config.allowedFileTypes,
            maxFileSize: maxSize ? parseInt(maxSize) : this.config.maxFileSize
        };

        // Создаем инпут файла если его нет
        if (!element.querySelector('input[type="file"]')) {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.multiple = element.dataset.multiple !== undefined;
            fileInput.accept = config.allowedFileTypes.join(',');
            fileInput.style.display = 'none';
            
            element.appendChild(fileInput);
        }

        const fileInput = element.querySelector('input[type="file"]');
        
        // Обработчик выбора файлов
        fileInput.addEventListener('change', (event) => {
            this.handleFileSelect(event, element, config);
        });

        // Обработчик перетаскивания
        if (element.dataset.dragDrop !== 'false') {
            this.setupDragAndDrop(element, fileInput, config);
        }

        // Сохраняем конфигурацию элемента
        element._uploadConfig = config;
    }

    setupDragAndDrop(element, fileInput, config) {
        element.addEventListener('dragover', (event) => {
            event.preventDefault();
            element.classList.add('drag-over');
        });

        element.addEventListener('dragleave', (event) => {
            event.preventDefault();
            element.classList.remove('drag-over');
        });

        element.addEventListener('drop', (event) => {
            event.preventDefault();
            element.classList.remove('drag-over');
            
            const files = Array.from(event.dataTransfer.files);
            this.handleFilesSelection(files, element, config);
        });
    }

    // Обработка выбора файлов
    handleFileSelect(event, element, config) {
        const files = Array.from(event.target.files);
        this.handleFilesSelection(files, element, config);
        
        // Сбрасываем значение инпута для возможности повторной загрузки тех же файлов
        event.target.value = '';
    }

    handleFilesSelection(files, element, config) {
        const validFiles = [];
        const errors = [];

        files.forEach(file => {
            const validation = this.validateFile(file, config);
            
            if (validation.isValid) {
                validFiles.push(file);
            } else {
                errors.push(...validation.errors);
            }
        });

        // Показываем ошибки
        if (errors.length > 0) {
            errors.forEach(error => {
                if (typeof NotificationManager !== 'undefined') {
                    NotificationManager.showError(error);
                } else {
                    console.error('Upload error:', error);
                }
            });
        }

        // Загружаем валидные файлы
        if (validFiles.length > 0) {
            this.processFiles(validFiles, element, config);
        }
    }

    // Валидация файлов
    validateFile(file, config) {
        const errors = [];

        // Проверка размера
        if (file.size > config.maxFileSize) {
            const maxSizeMB = (config.maxFileSize / (1024 * 1024)).toFixed(2);
            errors.push(`Файл "${file.name}" слишком большой. Максимальный размер: ${maxSizeMB}MB`);
        }

        // Проверка типа файла
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        const isValidType = config.allowedFileTypes.some(type => {
            if (type.startsWith('.')) {
                return type === fileExtension;
            }
            return file.type === type;
        });

        if (!isValidType) {
            errors.push(`Тип файла "${file.name}" не поддерживается. Разрешены: ${config.allowedFileTypes.join(', ')}`);
        }

        return {
            isValid: errors.length === 0,
            errors: errors,
            file: file
        };
    }

    // Обработка файлов
    processFiles(files, element, config) {
        files.forEach(file => {
            const uploadId = this.generateUploadId();
            const uploadInfo = {
                id: uploadId,
                file: file,
                element: element,
                config: config,
                progress: 0,
                status: 'queued',
                retries: 0,
                chunks: [],
                uploadedChunks: 0
            };

            this.uploads.set(uploadId, uploadInfo);

            // Показываем превью файла
            this.createFilePreview(uploadInfo);

            // Добавляем в очередь загрузки
            if (this.config.autoUpload) {
                this.queueUpload(uploadId);
            }
        });
    }

    // Создание превью файла
    createFilePreview(uploadInfo) {
        const { file, element, id } = uploadInfo;
        const previewContainer = element.querySelector('.upload-preview') || this.createPreviewContainer(element);

        const filePreview = document.createElement('div');
        filePreview.className = 'file-preview';
        filePreview.dataset.uploadId = id;

        const fileInfo = document.createElement('div');
        fileInfo.className = 'file-info';
        fileInfo.innerHTML = `
            <div class="file-name">${file.name}</div>
            <div class="file-size">${this.formatFileSize(file.size)}</div>
            <div class="file-status">В очереди</div>
        `;

        const progressBar = document.createElement('div');
        progressBar.className = 'upload-progress';
        progressBar.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill" style="width: 0%"></div>
            </div>
            <div class="progress-text">0%</div>
        `;

        const cancelButton = document.createElement('button');
        cancelButton.className = 'cancel-upload';
        cancelButton.innerHTML = '❌';
        cancelButton.title = 'Отменить загрузку';
        cancelButton.addEventListener('click', () => {
            this.cancelUpload(id);
        });

        filePreview.appendChild(fileInfo);
        filePreview.appendChild(progressBar);
        filePreview.appendChild(cancelButton);

        // Добавляем иконку типа файла
        this.addFileIcon(filePreview, file);

        previewContainer.appendChild(filePreview);

        // Сохраняем ссылку на превью
        uploadInfo.previewElement = filePreview;
    }

    createPreviewContainer(element) {
        const previewContainer = document.createElement('div');
        previewContainer.className = 'upload-preview';
        element.appendChild(previewContainer);
        return previewContainer;
    }

    addFileIcon(previewElement, file) {
        const icon = document.createElement('div');
        icon.className = 'file-icon';
        
        const extension = file.name.split('.').pop().toLowerCase();
        const type = file.type.split('/')[0];
        
        let iconText = '📄';
        
        if (type === 'image') iconText = '🖼️';
        else if (type === 'video') iconText = '🎬';
        else if (type === 'audio') iconText = '🎵';
        else if (extension === 'pdf') iconText = '📕';
        else if (['doc', 'docx'].includes(extension)) iconText = '📝';
        else if (['xls', 'xlsx', 'csv'].includes(extension)) iconText = '📊';
        else if (['zip', 'rar', '7z'].includes(extension)) iconText = '📦';
        else if (['js', 'html', 'css', 'py', 'java'].includes(extension)) iconText = '💻';
        
        icon.textContent = iconText;
        previewElement.insertBefore(icon, previewElement.firstChild);
    }

    // Управление очередью загрузки
    queueUpload(uploadId) {
        this.queuedUploads.push(uploadId);
        this.updateUploadStatus(uploadId, 'queued');
        this.processQueue();
    }

    startQueueProcessor() {
        this.queueInterval = setInterval(() => {
            this.processQueue();
        }, 1000);
    }

    stopQueueProcessor() {
        if (this.queueInterval) {
            clearInterval(this.queueInterval);
        }
    }

    processQueue() {
        // Проверяем, есть ли свободные слоты для загрузки
        const availableSlots = this.maxConcurrentUploads - this.activeUploads.size;
        
        if (availableSlots > 0 && this.queuedUploads.length > 0) {
            const uploadsToStart = this.queuedUploads.splice(0, availableSlots);
            
            uploadsToStart.forEach(uploadId => {
                this.startUpload(uploadId);
            });
        }
    }

    // Загрузка файлов
    async startUpload(uploadId) {
        const uploadInfo = this.uploads.get(uploadId);
        if (!uploadInfo) return;

        // Проверяем, не отменена ли загрузка
        if (uploadInfo.status === 'cancelled') {
            return;
        }

        this.activeUploads.set(uploadId, uploadInfo);
        this.updateUploadStatus(uploadId, 'uploading');

        try {
            // Для больших файлов используем chunked upload
            if (uploadInfo.file.size > this.config.chunkSize) {
                await this.uploadInChunks(uploadInfo);
            } else {
                await this.uploadSingleFile(uploadInfo);
            }
            
            this.updateUploadStatus(uploadId, 'completed');
            this.activeUploads.delete(uploadId);
            
            if (typeof NotificationManager !== 'undefined') {
                NotificationManager.showSuccess(`Файл "${uploadInfo.file.name}" успешно загружен`);
            }
            
        } catch (error) {
            console.error(`Upload failed for ${uploadInfo.file.name}:`, error);
            
            // Пытаемся повторить загрузку
            if (uploadInfo.retries < this.config.maxRetries) {
                uploadInfo.retries++;
                this.updateUploadStatus(uploadId, 'retrying');
                
                setTimeout(() => {
                    this.queueUpload(uploadId);
                }, this.config.retryDelay * uploadInfo.retries);
                
            } else {
                this.updateUploadStatus(uploadId, 'error');
                this.activeUploads.delete(uploadId);
                
                if (typeof NotificationManager !== 'undefined') {
                    NotificationManager.showError(`Ошибка загрузки файла "${uploadInfo.file.name}"`);
                }
            }
        }
    }

    async uploadSingleFile(uploadInfo) {
        const formData = new FormData();
        formData.append('file', uploadInfo.file);
        formData.append('uploadType', uploadInfo.config.uploadType);
        formData.append('fileName', uploadInfo.file.name);
        formData.append('fileSize', uploadInfo.file.size);
        
        // Добавляем метаданные
        if (uploadInfo.metadata) {
            formData.append('metadata', JSON.stringify(uploadInfo.metadata));
        }

        const xhr = new XMLHttpRequest();
        
        return new Promise((resolve, reject) => {
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const progress = (event.loaded / event.total) * 100;
                    this.updateUploadProgress(uploadInfo.id, progress);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        uploadInfo.response = response;
                        resolve(response);
                    } catch (error) {
                        reject(new Error('Invalid response format'));
                    }
                } else {
                    reject(new Error(`Upload failed with status ${xhr.status}`));
                }
            });

            xhr.addEventListener('error', () => {
                reject(new Error('Upload failed'));
            });

            xhr.addEventListener('abort', () => {
                reject(new Error('Upload cancelled'));
            });

            xhr.open('POST', this.getUploadEndpoint(uploadInfo.config.uploadType));
            
            // Добавляем заголовок авторизации
            const token = this.getAuthToken();
            if (token) {
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            }

            xhr.send(formData);

            // Сохраняем xhr для возможности отмены
            uploadInfo.xhr = xhr;
        });
    }

    async uploadInChunks(uploadInfo) {
        const file = uploadInfo.file;
        const chunkSize = this.config.chunkSize;
        const totalChunks = Math.ceil(file.size / chunkSize);
        
        uploadInfo.totalChunks = totalChunks;
        uploadInfo.chunks = [];

        // Создаем upload session
        const sessionResponse = await this.createUploadSession(uploadInfo);
        const sessionId = sessionResponse.sessionId;

        uploadInfo.sessionId = sessionId;

        // Загружаем чанки последовательно
        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            if (uploadInfo.status === 'cancelled') {
                throw new Error('Upload cancelled');
            }

            const start = chunkIndex * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const chunk = file.slice(start, end);

            await this.uploadChunk(uploadInfo, chunk, chunkIndex, sessionId);
            
            uploadInfo.uploadedChunks++;
            
            // Обновляем общий прогресс
            const overallProgress = (uploadInfo.uploadedChunks / totalChunks) * 100;
            this.updateUploadProgress(uploadInfo.id, overallProgress);
        }

        // Завершаем upload session
        return await this.completeUploadSession(uploadInfo, sessionId);
    }

    async createUploadSession(uploadInfo) {
        const response = await fetch('/api/upload/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAuthToken()}`
            },
            body: JSON.stringify({
                fileName: uploadInfo.file.name,
                fileSize: uploadInfo.file.size,
                fileType: uploadInfo.file.type,
                uploadType: uploadInfo.config.uploadType,
                totalChunks: Math.ceil(uploadInfo.file.size / this.config.chunkSize),
                metadata: uploadInfo.metadata
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create upload session');
        }

        return await response.json();
    }

    async uploadChunk(uploadInfo, chunk, chunkIndex, sessionId) {
        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('chunkIndex', chunkIndex);
        formData.append('sessionId', sessionId);
        formData.append('totalChunks', uploadInfo.totalChunks);

        const response = await fetch('/api/upload/chunk', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.getAuthToken()}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Failed to upload chunk ${chunkIndex}`);
        }

        return await response.json();
    }

    async completeUploadSession(uploadInfo, sessionId) {
        const response = await fetch('/api/upload/complete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAuthToken()}`
            },
            body: JSON.stringify({
                sessionId: sessionId,
                fileName: uploadInfo.file.name
            })
        });

        if (!response.ok) {
            throw new Error('Failed to complete upload session');
        }

        return await response.json();
    }

    // Управление загрузками
    cancelUpload(uploadId) {
        const uploadInfo = this.uploads.get(uploadId);
        
        if (uploadInfo) {
            uploadInfo.status = 'cancelled';
            
            // Отменяем XHR запрос если есть
            if (uploadInfo.xhr) {
                uploadInfo.xhr.abort();
            }
            
            // Удаляем из активных загрузок и очереди
            this.activeUploads.delete(uploadId);
            this.queuedUploads = this.queuedUploads.filter(id => id !== uploadId);
            
            // Обновляем статус в превью
            this.updateUploadStatus(uploadId, 'cancelled');
            
            // Удаляем превью через некоторое время
            setTimeout(() => {
                this.removeUploadPreview(uploadId);
            }, 3000);
        }
    }

    cancelAllUploads() {
        this.uploads.forEach((uploadInfo, uploadId) => {
            this.cancelUpload(uploadId);
        });
        
        this.activeUploads.clear();
        this.queuedUploads = [];
    }

    pauseUpload(uploadId) {
        const uploadInfo = this.uploads.get(uploadId);
        
        if (uploadInfo && uploadInfo.status === 'uploading') {
            uploadInfo.status = 'paused';
            
            if (uploadInfo.xhr) {
                uploadInfo.xhr.abort();
            }
            
            this.activeUploads.delete(uploadId);
            this.updateUploadStatus(uploadId, 'paused');
        }
    }

    resumeUpload(uploadId) {
        const uploadInfo = this.uploads.get(uploadId);
        
        if (uploadInfo && uploadInfo.status === 'paused') {
            this.queueUpload(uploadId);
        }
    }

    // Обновление UI
    updateUploadProgress(uploadId, progress) {
        const uploadInfo = this.uploads.get(uploadId);
        
        if (uploadInfo && uploadInfo.previewElement) {
            uploadInfo.progress = progress;
            
            const progressFill = uploadInfo.previewElement.querySelector('.progress-fill');
            const progressText = uploadInfo.previewElement.querySelector('.progress-text');
            
            if (progressFill) {
                progressFill.style.width = `${progress}%`;
            }
            
            if (progressText) {
                progressText.textContent = `${Math.round(progress)}%`;
            }
        }
    }

    updateUploadStatus(uploadId, status) {
        const uploadInfo = this.uploads.get(uploadId);
        
        if (uploadInfo) {
            uploadInfo.status = status;
            
            if (uploadInfo.previewElement) {
                const statusElement = uploadInfo.previewElement.querySelector('.file-status');
                const previewElement = uploadInfo.previewElement;
                
                if (statusElement) {
                    const statusTexts = {
                        'queued': 'В очереди',
                        'uploading': 'Загружается',
                        'paused': 'На паузе',
                        'retrying': 'Повторная попытка',
                        'completed': 'Завершено',
                        'error': 'Ошибка',
                        'cancelled': 'Отменено'
                    };
                    
                    statusElement.textContent = statusTexts[status] || status;
                }
                
                // Обновляем CSS классы
                previewElement.className = `file-preview status-${status}`;
            }
            
            // Диспатчим событие
            this.dispatchUploadEvent(uploadId, status);
        }
    }

    removeUploadPreview(uploadId) {
        const uploadInfo = this.uploads.get(uploadId);
        
        if (uploadInfo && uploadInfo.previewElement) {
            uploadInfo.previewElement.remove();
            this.uploads.delete(uploadId);
        }
    }

    // Вспомогательные методы
    getUploadEndpoint(uploadType) {
        const endpoints = {
            [this.uploadTypes.HOMEWORK]: '/api/upload/homework',
            [this.uploadTypes.COURSE_MATERIAL]: '/api/upload/course-material',
            [this.uploadTypes.PROFILE_IMAGE]: '/api/upload/profile-image',
            [this.uploadTypes.PRACTICE_CODE]: '/api/upload/practice-code',
            [this.uploadTypes.SUBMISSION]: '/api/upload/submission',
            [this.uploadTypes.GENERAL]: '/api/upload/general'
        };
        
        return endpoints[uploadType] || endpoints[this.uploadTypes.GENERAL];
    }

    getAuthToken() {
        return localStorage.getItem('auth_token') || 
               document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    }

    generateUploadId() {
        return `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Публичное API
    async uploadFile(file, options = {}) {
        const uploadId = this.generateUploadId();
        
        const uploadInfo = {
            id: uploadId,
            file: file,
            config: {
                ...this.config,
                ...options
            },
            progress: 0,
            status: 'queued',
            metadata: options.metadata || {}
        };

        this.uploads.set(uploadId, uploadInfo);
        
        if (this.config.autoUpload) {
            await this.startUpload(uploadId);
        }
        
        return uploadId;
    }

    async uploadFiles(files, options = {}) {
        const uploadIds = [];
        
        for (const file of files) {
            const uploadId = await this.uploadFile(file, options);
            uploadIds.push(uploadId);
        }
        
        return uploadIds;
    }

    getUploadStatus(uploadId) {
        const uploadInfo = this.uploads.get(uploadId);
        
        if (!uploadInfo) {
            return null;
        }
        
        return {
            id: uploadInfo.id,
            fileName: uploadInfo.file.name,
            progress: uploadInfo.progress,
            status: uploadInfo.status,
            response: uploadInfo.response,
            error: uploadInfo.error
        };
    }

    getAllUploads() {
        const uploads = [];
        
        this.uploads.forEach(uploadInfo => {
            uploads.push(this.getUploadStatus(uploadInfo.id));
        });
        
        return uploads;
    }

    // События
    setupEventListeners() {
        document.addEventListener('upload:file-added', this.handleFileAdded.bind(this));
        document.addEventListener('upload:progress', this.handleUploadProgress.bind(this));
        document.addEventListener('upload:complete', this.handleUploadComplete.bind(this));
        document.addEventListener('upload:error', this.handleUploadError.bind(this));
    }

    cleanupEventListeners() {
        document.removeEventListener('upload:file-added', this.handleFileAdded.bind(this));
        document.removeEventListener('upload:progress', this.handleUploadProgress.bind(this));
        document.removeEventListener('upload:complete', this.handleUploadComplete.bind(this));
        document.removeEventListener('upload:error', this.handleUploadError.bind(this));
    }

    handleFileAdded(event) {
        this.logDebug('File added to upload queue:', event.detail);
    }

    handleUploadProgress(event) {
        this.logDebug('Upload progress:', event.detail);
    }

    handleUploadComplete(event) {
        this.logDebug('Upload completed:', event.detail);
    }

    handleUploadError(event) {
        this.logDebug('Upload error:', event.detail);
    }

    dispatchUploadEvent(uploadId, eventType) {
        const uploadInfo = this.uploads.get(uploadId);
        
        if (!uploadInfo) return;

        const event = new CustomEvent(`upload:${eventType}`, {
            detail: {
                uploadId: uploadId,
                fileName: uploadInfo.file.name,
                progress: uploadInfo.progress,
                status: uploadInfo.status,
                response: uploadInfo.response,
                file: uploadInfo.file
            }
        });
        
        document.dispatchEvent(event);
    }

    // Утилиты
    logDebug(message, data) {
        if (this.config.debug) {
            console.log(`[Upload Manager] ${message}`, data);
        }
    }

    // Статистика
    getStats() {
        return {
            totalUploads: this.uploads.size,
            activeUploads: this.activeUploads.size,
            queuedUploads: this.queuedUploads.length,
            completedUploads: Array.from(this.uploads.values()).filter(u => u.status === 'completed').length,
            failedUploads: Array.from(this.uploads.values()).filter(u => u.status === 'error').length
        };
    }
}

// Глобальный экземпляр для быстрого доступа
window.UploadManager = new UploadManager();

// CSS стили для системы загрузки
const uploadStyles = `
.upload-area {
    border: 2px dashed #d1d5db;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    background: #f9fafb;
    transition: all 0.3s ease;
    cursor: pointer;
}

.upload-area:hover {
    border-color: #3b82f6;
    background: #eff6ff;
}

.upload-area.drag-over {
    border-color: #1d4ed8;
    background: #dbeafe;
}

.upload-preview {
    margin-top: 15px;
}

.file-preview {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    margin-bottom: 8px;
    background: white;
    transition: all 0.3s ease;
}

.file-preview.status-uploading {
    border-left: 4px solid #3b82f6;
}

.file-preview.status-completed {
    border-left: 4px solid #10b981;
}

.file-preview.status-error {
    border-left: 4px solid #ef4444;
}

.file-preview.status-cancelled {
    border-left: 4px solid #6b7280;
}

.file-preview.status-paused {
    border-left: 4px solid #f59e0b;
}

.file-icon {
    font-size: 24px;
    margin-right: 12px;
    flex-shrink: 0;
}

.file-info {
    flex: 1;
    min-width: 0;
}

.file-name {
    font-weight: 500;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.file-size {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 2px;
}

.file-status {
    font-size: 0.875rem;
    color: #374151;
}

.upload-progress {
    margin: 0 12px;
    min-width: 120px;
}

.progress-bar {
    width: 100%;
    height: 6px;
    background: #e5e7eb;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 4px;
}

.progress-fill {
    height: 100%;
    background: #3b82f6;
    transition: width 0.3s ease;
    border-radius: 3px;
}

.progress-text {
    font-size: 0.75rem;
    color: #6b7280;
    text-align: center;
}

.cancel-upload {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    flex-shrink: 0;
}

.cancel-upload:hover {
    background: #f3f4f6;
}

.upload-actions {
    margin-top: 15px;
    display: flex;
    gap: 10px;
    justify-content: center;
}

.btn-upload {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.875rem;
}

.btn-upload:hover {
    background: #2563eb;
}

.btn-upload:disabled {
    background: #9ca3af;
    cursor: not-allowed;
}

.btn-cancel-all {
    background: #ef4444;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.875rem;
}

.btn-cancel-all:hover {
    background: #dc2626;
}
`;

// Добавляем стили в документ
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = uploadStyles;
    document.head.appendChild(styleSheet);
}

export default UploadManager;