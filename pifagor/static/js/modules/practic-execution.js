import { showToast } from '../modules/toast.js';

export function initPracticExecution() {
    // Элементы управления заданием
    const codeInput = document.getElementById('code-input');
    const runBtn = document.getElementById('run-btn');
    const submitBtn = document.getElementById('submit-btn');
    const resetBtn = document.getElementById('reset-btn');
    const hintBtn = document.getElementById('hint-btn');
    const resultsSection = document.getElementById('results');
    const outputDisplay = document.getElementById('output-display');
    const feedbackText = document.getElementById('feedback-text');
    const resultStatus = document.getElementById('result-status');
    const nextTaskBtn = document.getElementById('next-task-btn');
    const tryAgainBtn = document.getElementById('try-again-btn');

    // Инициализация функционала прикрепления файлов
    const fileManager = initFileAttachment();

    // Исходный код по умолчанию
    const defaultCode = `# Ваш код здесь
name = "Анна"
age = 20
height = 1.65
is_student = True

# Вывод результата
print(f"Меня зовут {name}, мне {age} лет, мой рост {height} м, студент: {is_student}")`;

    // Запуск кода
    runBtn?.addEventListener('click', function() {
        const code = codeInput?.value;
        
        if (!code || code.trim() === defaultCode.trim()) {
            showToast('Введите свой код перед запуском', 'warning', 'Код не изменен');
            return;
        }
        
        // ПОКАЗЫВАЕМ секцию результатов для предварительного просмотра
        resultsSection?.classList.add('active');
        
        // В реальном приложении здесь был бы запрос к серверу для выполнения кода
        if (outputDisplay) outputDisplay.textContent = "Меня зовут Анна, мне 20 лет, мой рост 1.65 м, студент: True";
        if (feedbackText) feedbackText.textContent = "Код выполнен успешно! Проверьте вывод на соответствие требованиям задания.";
        if (resultStatus) {
            resultStatus.textContent = "Выполнено";
            resultStatus.className = "result-status status-success";
        }
        
        // Очищаем секцию файлов для запуска (только вывод кода)
        const submittedFiles = document.getElementById('submitted-files');
        if (submittedFiles) submittedFiles.innerHTML = '';
        
        resultsSection?.scrollIntoView({ behavior: 'smooth' });
        
        // Запускаем анимацию появления
        setTimeout(() => {
            const fadeElements = resultsSection?.querySelectorAll('.fade-in');
            fadeElements?.forEach(element => {
                element.classList.add('visible');
            });
        }, 100);
        
        showToast('Код успешно выполнен', 'success', 'Запуск');
    });

    // Отправка решения
    submitBtn?.addEventListener('click', function() {
        const code = codeInput?.value;
        
        // Синхронизируем файлы перед отправкой
        fileManager.syncFiles();
        const attachedFiles = fileManager.getAttachedFiles();
        
        console.log('Отправка решения. Файлы:', attachedFiles);
        
        if (!code || code.trim() === defaultCode.trim()) {
            showToast('Введите решение перед отправкой', 'warning', 'Решение отсутствует');
            return;
        }
        
        // ПОКАЗЫВАЕМ секцию результатов
        resultsSection?.classList.add('active');
        resultsSection?.scrollIntoView({ behavior: 'smooth' });
        
        // Обновляем время отправки
        const now = new Date();
        const submissionTimeElement = document.getElementById('submission-time');
        if (submissionTimeElement) {
            submissionTimeElement.textContent = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
        }
        
        // Показываем прикрепленные файлы в результатах
        const submittedFiles = document.getElementById('submitted-files');
        if (submittedFiles) {
            if (attachedFiles.length > 0) {
                let filesHtml = '<div class="submitted-files-title"><strong>Прикрепленные файлы:</strong></div>';
                
                attachedFiles.forEach(file => {
                    const fileIcon = getFileIcon(file.name);
                    const fileSize = formatFileSize(file.size);
                    
                    filesHtml += `
                        <div class="submitted-file-item">
                            <i class="fas ${fileIcon}"></i>
                            <span>${file.name}</span>
                            <small>(${fileSize})</small>
                        </div>
                    `;
                });
                
                submittedFiles.innerHTML = filesHtml;
            } else {
                submittedFiles.innerHTML = '<div class="submitted-files-title">Файлы не прикреплены</div>';
            }
        }
        
        // Показываем код в результатах
        if (outputDisplay) outputDisplay.textContent = code;
        
        // Показываем статус отправки
        if (feedbackText) {
            feedbackText.textContent = 
                'Ваше решение успешно отправлено на проверку. Результаты будут доступны после проверки преподавателем.';
        }
        
        if (resultStatus) {
            resultStatus.textContent = "Отправлено";
            resultStatus.className = "result-status status-success";
        }
        
        // Запускаем анимацию появления
        setTimeout(() => {
            const fadeElements = resultsSection?.querySelectorAll('.fade-in');
            fadeElements?.forEach(element => {
                element.classList.add('visible');
            });
        }, 100);
        
        // В реальном приложении здесь была бы отправка данных на сервер
        console.log('Отправка задания:', {
            code: code,
            files: attachedFiles
        });
        
        showToast('Решение успешно отправлено на проверку!', 'success', 'Отправлено');
        
        // Очищаем прикрепленные файлы после отправки
        fileManager.clearAttachedFiles();
    });

    // Сброс кода
    resetBtn?.addEventListener('click', function() {
        const confirmToast = showToast(
            'Вы уверены, что хотите сбросить код к исходному состоянию?', 
            'warning', 
            'Подтверждение сброса', 
            0
        );

        confirmToast.querySelector('.toast-close').remove();

        const toastActions = document.createElement('div');
        toastActions.className = 'toast-actions';
        toastActions.style.marginTop = '10px';
        toastActions.style.display = 'flex';
        toastActions.style.gap = '8px';
        toastActions.style.justifyContent = 'flex-end';
        
        toastActions.innerHTML = `
            <button class="btn btn-danger btn-small confirm-reset">Сбросить</button>
            <button class="btn btn-light btn-small cancel-reset">Отмена</button>
        `;
        
        const toastContent = confirmToast.querySelector('.toast-content');
        toastContent.appendChild(toastActions);

        confirmToast.querySelector('.confirm-reset').addEventListener('click', function() {
            if (codeInput) codeInput.value = defaultCode;
            showToast('Код сброшен к исходному состоянию', 'info', 'Сброс');
            confirmToast.remove();
        });
        
        confirmToast.querySelector('.cancel-reset').addEventListener('click', function() {
            confirmToast.remove();
        });
    });

    // Показать подсказку
    hintBtn?.addEventListener('click', function() {
        showToast('Используйте f-строки для форматирования вывода. Например: print(f"Текст {переменная} текст")', 'info', 'Подсказка');
    });

    // Следующее задание
    nextTaskBtn?.addEventListener('click', function() {
        showToast('Переход к следующему заданию...', 'info', 'Следующее задание');
        // В реальном приложении здесь был бы переход к следующему заданию
    });

    // Попробовать еще раз
    tryAgainBtn?.addEventListener('click', function() {
        // СКРЫВАЕМ секцию результатов
        resultsSection?.classList.remove('active');
        
        // Сбрасываем анимации
        const fadeElements = resultsSection?.querySelectorAll('.fade-in');
        fadeElements?.forEach(element => {
            element.classList.remove('visible');
        });
        
        // Фокусируемся на редакторе кода
        codeInput?.focus();
        
        showToast('Можете попробовать решить задание еще раз', 'info', 'Повторная попытка');
    });

    

    // Авто-сохранение кода
    let saveTimeout;
    codeInput?.addEventListener('input', function() {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            localStorage.setItem('practic_code_autosave', this.value);
        }, 1000);
    });

    // Восстановление авто-сохраненного кода
    const savedCode = localStorage.getItem('practic_code_autosave');
    if (savedCode && codeInput) {
        const restoreToast = showToast(
            'Обнаружено автосохраненное решение. Восстановить?', 
            'info', 
            'Автосохранение', 
            5000
        );

        restoreToast.querySelector('.toast-close').remove();

        const toastActions = document.createElement('div');
        toastActions.className = 'toast-actions';
        toastActions.style.marginTop = '10px';
        toastActions.style.display = 'flex';
        toastActions.style.gap = '8px';
        toastActions.style.justifyContent = 'flex-end';
        
        toastActions.innerHTML = `
            <button class="btn btn-success btn-small confirm-restore">Восстановить</button>
            <button class="btn btn-light btn-small cancel-restore">Отмена</button>
        `;
        
        const toastContent = restoreToast.querySelector('.toast-content');
        toastContent.appendChild(toastActions);

        restoreToast.querySelector('.confirm-restore').addEventListener('click', function() {
            codeInput.value = savedCode;
            showToast('Решение восстановлено', 'success', 'Восстановлено');
            restoreToast.remove();
        });
        
        restoreToast.querySelector('.cancel-restore').addEventListener('click', function() {
            localStorage.removeItem('practic_code_autosave');
            showToast('Автосохранение очищено', 'info', 'Отменено');
            restoreToast.remove();
        });
    }
}

export function initFileAttachment() {
    const attachFileBtn = document.getElementById('attach-file-btn');
    const fileAttachmentSection = document.getElementById('file-attachment-section');
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');
    const hideAttachmentsBtn = document.getElementById('hide-attachments-btn');
    const saveAttachmentsBtn = document.getElementById('save-attachments-btn');
    const fileUploadLabel = document.querySelector('.file-upload-label');
    const fileLabelText = document.getElementById('file-label-text');
    
    // Загружаем файлы из localStorage с проверкой
    let attachedFiles = [];
    try {
        const storedFiles = localStorage.getItem('practic_attached_files');
        if (storedFiles) {
            attachedFiles = JSON.parse(storedFiles);
            // Убедимся, что это массив
            if (!Array.isArray(attachedFiles)) {
                attachedFiles = [];
            }
        }
    } catch (e) {
        console.error('Ошибка загрузки файлов из localStorage:', e);
        attachedFiles = [];
    }

    // Убедимся, что у всех файлов есть расширение
    attachedFiles = attachedFiles.map(file => {
        if (!file.extension) {
            file.extension = getFileExtension(file.name);
        }
        return file;
    });

    // Показать/скрыть секцию прикрепления файлов
    attachFileBtn?.addEventListener('click', function() {
        fileAttachmentSection?.classList.toggle('active');
        if (fileAttachmentSection?.classList.contains('active')) {
            renderFileList();
        }
    });

    // Скрыть секцию прикрепления файлов
    hideAttachmentsBtn?.addEventListener('click', function() {
        fileAttachmentSection?.classList.remove('active');
    });

    // Drag and drop функционал
    if (fileUploadLabel) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            fileUploadLabel.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            fileUploadLabel.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            fileUploadLabel.addEventListener(eventName, unhighlight, false);
        });

        function highlight() {
            fileUploadLabel.classList.add('drag-over');
        }

        function unhighlight() {
            fileUploadLabel.classList.remove('drag-over');
        }

        fileUploadLabel.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles(files);
        }
    }

    // Обработка выбора файлов через input
    fileInput?.addEventListener('change', function(e) {
        handleFiles(e.target.files);
        fileInput.value = '';
    });

    function handleFiles(files) {
        const fileArray = Array.from(files);
        let filesAdded = 0;
        
        fileArray.forEach(file => {
            // Проверка количества файлов
            if (attachedFiles.length >= 5) {
                showToast('Можно прикрепить не более 5 файлов', 'warning', 'Ограничение');
                return;
            }
            
            // Проверка размера файла
            if (file.size > 10 * 1024 * 1024) {
                showToast(`Файл "${file.name}" слишком большой. Максимальный размер: 10 MB`, 'warning', 'Большой файл');
                return;
            }
            
            // Проверка типа файла
            const allowedTypes = ['.pdf', '.doc', '.docx', '.txt', '.py', '.jpg', '.jpeg', '.png', '.zip'];
            const fileExtension = getFileExtension(file.name);
            
            if (!allowedTypes.includes(fileExtension)) {
                showToast(`Файл "${file.name}" имеет недопустимый формат`, 'warning', 'Неверный формат');
                return;
            }
            
            // Проверка на дубликаты
            const isDuplicate = attachedFiles.some(f => 
                f.name === file.name && f.size === file.size
            );
            
            if (isDuplicate) {
                showToast(`Файл "${file.name}" уже добавлен`, 'warning', 'Дубликат');
                return;
            }
            
            // Добавляем файл
            attachedFiles.push({
                name: file.name,
                size: file.size,
                type: file.type,
                extension: fileExtension,
                lastModified: file.lastModified,
                // Добавляем временную метку для уникальности
                id: Date.now() + Math.random()
            });
            
            filesAdded++;
        });
        
        if (filesAdded > 0) {
            // НЕМЕДЛЕННО сохраняем в localStorage
            saveFilesToStorage();
            renderFileList();
            updateFileLabel();
            showToast(`Добавлено ${filesAdded} файл(ов)`, 'success', 'Файлы добавлены');
            
            // ДЕБАГ: Проверяем, что файлы действительно сохранились
            console.log('Файлы после добавления:', attachedFiles);
            console.log('Сохранено в localStorage:', localStorage.getItem('practic_attached_files'));
        }
    }

    // Функция для отображения списка файлов
    function renderFileList() {
        if (!fileList) return;
        
        fileList.innerHTML = '';
        
        if (attachedFiles.length === 0) {
            fileList.innerHTML = `
                <div class="file-item" style="text-align: center; color: #6c757d;">
                    <i class="fas fa-folder-open" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                    <div>Файлы не прикреплены</div>
                </div>
            `;
            return;
        }
        
        attachedFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            const fileSize = formatFileSize(file.size);
            const fileIcon = getFileIcon(file.name);
            const displayExtension = file.extension ? file.extension.replace('.', '').toUpperCase() : 'FILE';
            
            fileItem.innerHTML = `
                <div class="file-info">
                    <i class="fas ${fileIcon} file-icon"></i>
                    <div class="file-details">
                        <div class="file-name">${file.name}</div>
                        <div class="file-meta">
                            <span class="file-size">${fileSize}</span>
                            <span class="file-type">${displayExtension}</span>
                        </div>
                    </div>
                </div>
                <button class="file-remove" data-index="${index}" title="Удалить файл">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            fileList.appendChild(fileItem);
        });
        
        // Добавляем обработчики для кнопок удаления
        document.querySelectorAll('.file-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (index >= 0 && index < attachedFiles.length) {
                    const fileName = attachedFiles[index].name;
                    attachedFiles.splice(index, 1);
                    saveFilesToStorage(); // Сохраняем изменения
                    renderFileList();
                    updateFileLabel();
                    showToast(`Файл "${fileName}" удален`, 'info', 'Файл удален');
                }
            });
        });
    }

    // Обновление текста в label
    function updateFileLabel() {
        if (fileLabelText) {
            fileLabelText.textContent = attachedFiles.length > 0 
                ? `Прикреплено файлов: ${attachedFiles.length}` 
                : 'Загрузите файлы решения';
        }
    }

    // Сохранение прикрепленных файлов
    saveAttachmentsBtn?.addEventListener('click', function() {
        console.log('Нажата кнопка Сохранить файлы. attachedFiles:', attachedFiles);
        
        // Проверяем как attachedFiles, так и localStorage для надежности
        const storedFiles = getStoredFiles();
        const totalFiles = attachedFiles.length > 0 ? attachedFiles.length : storedFiles.length;
        
        if (totalFiles === 0) {
            showToast('Нет файлов для сохранения', 'warning', 'Файлы');
            return;
        }
        
        // Если attachedFiles пуст, но в localStorage есть файлы, восстанавливаем их
        if (attachedFiles.length === 0 && storedFiles.length > 0) {
            attachedFiles = storedFiles;
            saveFilesToStorage();
            renderFileList();
            updateFileLabel();
        }
        
        showToast(`Файлы сохранены (${attachedFiles.length} файл(ов))`, 'success', 'Сохранено');
        fileAttachmentSection?.classList.remove('active');
    });

    // Сохранение файлов в localStorage
    function saveFilesToStorage() {
        try {
            localStorage.setItem('practic_attached_files', JSON.stringify(attachedFiles));
            console.log('Файлы успешно сохранены в localStorage:', attachedFiles);
        } catch (e) {
            console.error('Ошибка сохранения файлов в localStorage:', e);
            showToast('Ошибка сохранения файлов', 'error', 'Ошибка');
        }
    }

    // Получение файлов из localStorage
    function getStoredFiles() {
        try {
            const stored = localStorage.getItem('practic_attached_files');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Ошибка чтения файлов из localStorage:', e);
            return [];
        }
    }

    // Инициализация при загрузке
    renderFileList();
    updateFileLabel();

    // ДЕБАГ: Выводим начальное состояние
    console.log('Инициализация файлового менеджера. attachedFiles:', attachedFiles);
    console.log('Файлы в localStorage:', getStoredFiles());

    // Экспортируем функцию для получения прикрепленных файлов
    return {
        getAttachedFiles: () => [...attachedFiles], // возвращаем копию массива
        clearAttachedFiles: () => {
            attachedFiles = [];
            localStorage.removeItem('practic_attached_files');
            renderFileList();
            updateFileLabel();
            showToast('Все файлы удалены', 'info', 'Очистка');
        },
        // Добавляем метод для принудительной синхронизации
        syncFiles: () => {
            const stored = getStoredFiles();
            if (stored.length !== attachedFiles.length) {
                attachedFiles = stored;
                renderFileList();
                updateFileLabel();
            }
        }
    };
}

// Вспомогательные функции остаются без изменений
function getFileExtension(filename) {
    if (!filename) return '';
    const parts = filename.split('.');
    return parts.length > 1 ? '.' + parts.pop().toLowerCase() : '';
}

function getFileIcon(filename) {
    const extension = getFileExtension(filename);
    
    switch(extension) {
        case '.pdf': return 'fa-file-pdf';
        case '.doc': case '.docx': return 'fa-file-word';
        case '.txt': return 'fa-file-alt';
        case '.py': return 'fa-file-code';
        case '.jpg': case '.jpeg': case '.png': return 'fa-file-image';
        case '.zip': return 'fa-file-archive';
        default: return 'fa-file';
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}