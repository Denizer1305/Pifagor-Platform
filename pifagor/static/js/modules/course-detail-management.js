// js/modules/course-detail-management.js

export function initCourseDetailManagement() {
    initDeleteButtons();
    initAddLessonModal();
    initAddModuleModal();
    initDragAndDrop();
    addManagementStyles();
}

function initDeleteButtons() {
    // Обработка удаления материалов
    const materialsList = document.querySelector('.materials-list');
    if (materialsList) {
        materialsList.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn-danger') || e.target.closest('.btn-danger')) {
                const materialItem = e.target.closest('.material-item');
                if (materialItem) {
                    if (confirm('Вы уверены, что хотите удалить этот материал?')) {
                        materialItem.style.animation = 'slideOut 0.3s ease';
                        setTimeout(() => {
                            materialItem.remove();
                            showToast('Материал успешно удален', 'success', 3000);
                        }, 300);
                    }
                }
            }
        });
    }

    // Обработка удаления уроков (если есть в структуре)
    const lessonsContainer = document.querySelector('.lessons-container');
    if (lessonsContainer) {
        lessonsContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('delete-lesson') || e.target.closest('.delete-lesson')) {
                const lessonItem = e.target.closest('.lesson-item');
                if (lessonItem) {
                    if (confirm('Вы уверены, что хотите удалить этот урок?')) {
                        lessonItem.style.animation = 'slideOut 0.3s ease';
                        setTimeout(() => {
                            lessonItem.remove();
                            updateLessonNumbers();
                            showToast('Урок успешно удален', 'success', 3000);
                        }, 300);
                    }
                }
            }
        });
    }

    // Обработка удаления модулей (если есть в структуре)
    const modulesContainer = document.querySelector('.modules-container');
    if (modulesContainer) {
        modulesContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('delete-module') || e.target.closest('.delete-module')) {
                const moduleItem = e.target.closest('.module-item');
                if (moduleItem) {
                    if (confirm('Вы уверены, что хотите удалить этот модуль и все его уроки?')) {
                        moduleItem.style.animation = 'slideOut 0.3s ease';
                        setTimeout(() => {
                            moduleItem.remove();
                            updateModuleNumbers();
                            showToast('Модуль успешно удален', 'success', 3000);
                        }, 300);
                    }
                }
            }
        });
    }
}

function initAddLessonModal() {
    const addLessonBtn = document.querySelector('.add-lesson-btn');
    const lessonModal = document.getElementById('addLessonModal');
    const closeLessonModal = document.getElementById('closeLessonModal');
    const cancelLessonModal = document.getElementById('cancelLessonModal');
    const confirmLessonModal = document.getElementById('confirmLessonModal');
    const lessonTypeOptions = document.querySelectorAll('.lesson-type-option');

    if (!addLessonBtn || !lessonModal) return;

    let selectedLessonType = 'lecture';

    // Показ модального окна
    addLessonBtn.addEventListener('click', function() {
        selectedLessonType = 'lecture';
        updateLessonTypeSelection();
        lessonModal.style.display = 'flex';
        setTimeout(() => lessonModal.classList.add('show'), 10);
    });

    // Закрытие модального окна
    function closeLessonModalFunc() {
        lessonModal.classList.remove('show');
        setTimeout(() => {
            lessonModal.style.display = 'none';
        }, 300);
    }

    if (closeLessonModal) closeLessonModal.addEventListener('click', closeLessonModalFunc);
    if (cancelLessonModal) cancelLessonModal.addEventListener('click', closeLessonModalFunc);

    // Выбор типа урока
    lessonTypeOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectedLessonType = this.getAttribute('data-type');
            updateLessonTypeSelection();
        });
    });

    // Обновление визуального выбора типа урока
    function updateLessonTypeSelection() {
        lessonTypeOptions.forEach(option => {
            if (option.getAttribute('data-type') === selectedLessonType) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
    }

    // Подтверждение добавления урока
    if (confirmLessonModal) {
        confirmLessonModal.addEventListener('click', function() {
            addNewLesson(selectedLessonType);
            closeLessonModalFunc();
        });
    }

    // Закрытие по клику вне модального окна
    lessonModal.addEventListener('click', function(e) {
        if (e.target === lessonModal) {
            closeLessonModalFunc();
        }
    });
}

function initAddModuleModal() {
    const addModuleBtn = document.querySelector('.add-module-btn');
    const moduleModal = document.getElementById('addModuleModal');
    const closeModuleModal = document.getElementById('closeModuleModal');
    const cancelModuleModal = document.getElementById('cancelModuleModal');
    const confirmModuleModal = document.getElementById('confirmModuleModal');

    if (!addModuleBtn || !moduleModal) return;

    // Показ модального окна
    addModuleBtn.addEventListener('click', function() {
        // Сброс формы
        document.getElementById('module-title').value = '';
        document.getElementById('module-description').value = '';
        document.querySelector('input[name="module-type"][value="theory"]').checked = true;
        
        moduleModal.style.display = 'flex';
        setTimeout(() => moduleModal.classList.add('show'), 10);
    });

    // Закрытие модального окна
    function closeModuleModalFunc() {
        moduleModal.classList.remove('show');
        setTimeout(() => {
            moduleModal.style.display = 'none';
        }, 300);
    }

    if (closeModuleModal) closeModuleModal.addEventListener('click', closeModuleModalFunc);
    if (cancelModuleModal) cancelModuleModal.addEventListener('click', closeModuleModalFunc);

    // Подтверждение добавления модуля
    if (confirmModuleModal) {
        confirmModuleModal.addEventListener('click', function() {
            const title = document.getElementById('module-title').value.trim();
            const description = document.getElementById('module-description').value.trim();
            const type = document.querySelector('input[name="module-type"]:checked').value;

            if (!title) {
                showToast('Пожалуйста, введите название модуля', 'error', 4000);
                return;
            }

            addNewModule(title, description, type);
            closeModuleModalFunc();
        });
    }

    // Закрытие по клику вне модального окна
    moduleModal.addEventListener('click', function(e) {
        if (e.target === moduleModal) {
            closeModuleModalFunc();
        }
    });
}

function addNewLesson(type) {
    const lessonsContainer = document.querySelector('.lessons-container');
    if (!lessonsContainer) {
        console.warn('Контейнер уроков не найден');
        return;
    }

    const lessonId = Date.now();
    const lessonNumber = lessonsContainer.children.length + 1;

    let typeIcon, typeName, typeClass;
    switch (type) {
        case 'test':
            typeIcon = 'fa-question-circle';
            typeName = 'Тест';
            typeClass = 'lesson-test';
            break;
        case 'practice':
            typeIcon = 'fa-code';
            typeName = 'Практика';
            typeClass = 'lesson-practice';
            break;
        case 'lecture':
        default:
            typeIcon = 'fa-play-circle';
            typeName = 'Лекция';
            typeClass = 'lesson-lecture';
    }

    const lessonItem = document.createElement('div');
    lessonItem.className = `lesson-item ${typeClass}`;
    lessonItem.setAttribute('data-lesson-id', lessonId);
    lessonItem.setAttribute('draggable', 'true');
    
    lessonItem.innerHTML = `
        <div class="lesson-drag-handle">
            <i class="fas fa-grip-vertical"></i>
        </div>
        <div class="lesson-icon">
            <i class="fas ${typeIcon}"></i>
        </div>
        <div class="lesson-content">
            <div class="lesson-header">
                <h4 class="lesson-title">Урок ${lessonNumber}: Новая ${typeName}</h4>
                <span class="lesson-type-badge">${typeName}</span>
            </div>
            <p class="lesson-description">Описание урока будет добавлено здесь</p>
            <div class="lesson-meta">
                <span class="lesson-duration"><i class="far fa-clock"></i> 0 мин.</span>
                <span class="lesson-status"><i class="far fa-edit"></i> Черновик</span>
            </div>
        </div>
        <div class="lesson-actions">
            <button type="button" class="btn btn-small btn-light edit-lesson" title="Редактировать">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="btn btn-small btn-danger delete-lesson" title="Удалить">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    lessonsContainer.appendChild(lessonItem);
    
    // Анимация появления
    lessonItem.style.animation = 'slideIn 0.3s ease';
    
    showToast(`Новый урок "${typeName}" успешно добавлен`, 'success', 3000);
    
    // Инициализация событий для нового элемента
    initLessonItemEvents(lessonItem);
}

function addNewModule(title, description, type) {
    const modulesContainer = document.querySelector('.modules-container');
    if (!modulesContainer) {
        console.warn('Контейнер модулей не найден');
        return;
    }

    const moduleId = Date.now();
    const moduleNumber = modulesContainer.children.length + 1;

    let typeIcon, typeName;
    switch (type) {
        case 'practice':
            typeIcon = 'fa-tasks';
            typeName = 'Практический';
            break;
        case 'project':
            typeIcon = 'fa-project-diagram';
            typeName = 'Проектный';
            break;
        case 'theory':
        default:
            typeIcon = 'fa-book';
            typeName = 'Теоретический';
    }

    const moduleItem = document.createElement('div');
    moduleItem.className = 'module-item';
    moduleItem.setAttribute('data-module-id', moduleId);
    moduleItem.setAttribute('draggable', 'true');
    
    moduleItem.innerHTML = `
        <div class="module-header">
            <div class="module-drag-handle">
                <i class="fas fa-grip-vertical"></i>
            </div>
            <div class="module-info">
                <h3 class="module-title">Модуль ${moduleNumber}: ${title}</h3>
                <span class="module-type-badge">
                    <i class="fas ${typeIcon}"></i> ${typeName}
                </span>
            </div>
            <div class="module-actions">
                <button type="button" class="btn btn-small btn-light add-lesson-btn" title="Добавить урок">
                    <i class="fas fa-plus"></i> Добавить урок
                </button>
                <button type="button" class="btn btn-small btn-danger delete-module" title="Удалить модуль">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="module-description">
            <p>${description || 'Описание модуля будет добавлено здесь'}</p>
        </div>
        <div class="lessons-container">
            <!-- Уроки будут добавляться сюда -->
        </div>
    `;

    modulesContainer.appendChild(moduleItem);
    
    // Анимация появления
    moduleItem.style.animation = 'slideIn 0.3s ease';
    
    showToast(`Модуль "${title}" успешно создан`, 'success', 3000);
    
    // Инициализация событий для нового модуля
    initModuleItemEvents(moduleItem);
}

function initLessonItemEvents(lessonItem) {
    // Редактирование урока
    const editBtn = lessonItem.querySelector('.edit-lesson');
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            const lessonId = lessonItem.getAttribute('data-lesson-id');
            showToast(`Редактирование урока ${lessonId}`, 'info', 3000);
            // Здесь будет переход на страницу редактирования урока
        });
    }

    // Drag and drop
    lessonItem.addEventListener('dragstart', handleDragStart);
    lessonItem.addEventListener('dragend', handleDragEnd);
}

function initModuleItemEvents(moduleItem) {
    // Добавление урока в модуль
    const addLessonBtn = moduleItem.querySelector('.add-lesson-btn');
    if (addLessonBtn) {
        addLessonBtn.addEventListener('click', function() {
            // Здесь можно добавить логику для добавления урока в конкретный модуль
            showToast('Добавление урока в модуль', 'info', 3000);
        });
    }

    // Drag and drop
    moduleItem.addEventListener('dragstart', handleDragStart);
    moduleItem.addEventListener('dragend', handleDragEnd);
}

function initDragAndDrop() {
    const containers = document.querySelectorAll('.lessons-container, .modules-container');
    
    containers.forEach(container => {
        container.addEventListener('dragover', handleDragOver);
        container.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-lesson-id') || e.target.getAttribute('data-module-id'));
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    const draggingElement = document.querySelector('.dragging');
    if (!draggingElement) return;

    const afterElement = getDragAfterElement(e.currentTarget, e.clientY);
    if (afterElement) {
        e.currentTarget.insertBefore(draggingElement, afterElement);
    } else {
        e.currentTarget.appendChild(draggingElement);
    }
}

function handleDrop(e) {
    e.preventDefault();
    updateLessonNumbers();
    updateModuleNumbers();
    showToast('Порядок успешно изменен', 'success', 2000);
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.lesson-item:not(.dragging), .module-item:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function updateLessonNumbers() {
    const lessons = document.querySelectorAll('.lesson-item');
    lessons.forEach((lesson, index) => {
        const titleElement = lesson.querySelector('.lesson-title');
        if (titleElement) {
            const currentText = titleElement.textContent;
            const newText = currentText.replace(/Урок \d+:/, `Урок ${index + 1}:`);
            titleElement.textContent = newText;
        }
    });
}

function updateModuleNumbers() {
    const modules = document.querySelectorAll('.module-item');
    modules.forEach((module, index) => {
        const titleElement = module.querySelector('.module-title');
        if (titleElement) {
            const currentText = titleElement.textContent;
            const newText = currentText.replace(/Модуль \d+:/, `Модуль ${index + 1}:`);
            titleElement.textContent = newText;
        }
    });
}

function addManagementStyles() {
    const styles = `
        /* Стили для модальных окон */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .modal.show {
            opacity: 1;
        }
        
        .modal-content {
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow: hidden;
            transform: translateY(-50px);
            transition: transform 0.3s ease;
        }
        
        .modal.show .modal-content {
            transform: translateY(0);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 25px;
            border-bottom: 1px solid #eee;
        }
        
        .modal-header h3 {
            margin: 0;
            color: var(--primary);
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.2em;
            color: #666;
            cursor: pointer;
            padding: 5px;
            border-radius: 4px;
            transition: all 0.2s;
        }
        
        .modal-close:hover {
            background: #f5f5f5;
            color: #333;
        }
        
        .modal-body {
            padding: 25px;
            max-height: 60vh;
            overflow-y: auto;
        }
        
        .modal-footer {
            display: flex;
            justify-content: flex-end;
            gap: 15px;
            padding: 20px 25px;
            border-top: 1px solid #eee;
        }
        
        /* Стили для выбора типа урока */
        .lesson-type-options {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .lesson-type-option {
            display: flex;
            align-items: center;
            padding: 20px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .lesson-type-option:hover {
            border-color: var(--accent);
            transform: translateY(-2px);
        }
        
        .lesson-type-option.selected {
            border-color: var(--accent);
            background-color: rgba(74, 144, 226, 0.05);
        }
        
        .type-icon {
            margin-right: 15px;
            font-size: 2em;
            color: var(--accent);
            flex-shrink: 0;
        }
        
        .type-info {
            flex: 1;
        }
        
        .type-info h4 {
            margin: 0 0 5px 0;
            color: var(--primary);
        }
        
        .type-info p {
            margin: 0;
            color: #666;
            font-size: 0.9em;
        }
        
        .type-check {
            color: var(--accent);
            font-size: 1.2em;
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .lesson-type-option.selected .type-check {
            opacity: 1;
        }
        
        /* Стили для выбора типа модуля */
        .radio-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .radio-option {
            display: flex;
            align-items: center;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            position: relative;
        }
        
        .radio-option:hover {
            border-color: var(--accent);
        }
        
        .radio-option input[type="radio"] {
            position: absolute;
            opacity: 0;
        }
        
        .radio-checkmark {
            width: 20px;
            height: 20px;
            border: 2px solid #ddd;
            border-radius: 50%;
            margin-right: 15px;
            position: relative;
            flex-shrink: 0;
            transition: all 0.3s;
        }
        
        .radio-option input[type="radio"]:checked + .radio-checkmark {
            border-color: var(--accent);
            background-color: var(--accent);
        }
        
        .radio-option input[type="radio"]:checked + .radio-checkmark::after {
            content: '';
            position: absolute;
            top: 4px;
            left: 4px;
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
        }
        
        .radio-label {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            color: var(--primary);
        }
        
        /* Стили для элементов уроков и модулей */
        .lesson-item, .module-item {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            margin-bottom: 15px;
            background: white;
            transition: all 0.3s;
        }
        
        .lesson-item:hover, .module-item:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .lesson-item {
            display: flex;
            align-items: center;
            padding: 15px;
            gap: 15px;
        }
        
        .lesson-lecture {
            border-left: 4px solid #4a90e2;
        }
        
        .lesson-test {
            border-left: 4px solid #f39c12;
        }
        
        .lesson-practice {
            border-left: 4px solid #27ae60;
        }
        
        .lesson-drag-handle {
            color: #ccc;
            cursor: grab;
            padding: 5px;
        }
        
        .lesson-drag-handle:active {
            cursor: grabbing;
        }
        
        .lesson-icon {
            font-size: 1.5em;
            color: var(--accent);
            flex-shrink: 0;
        }
        
        .lesson-content {
            flex: 1;
        }
        
        .lesson-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
        }
        
        .lesson-title {
            margin: 0;
            color: var(--primary);
            font-size: 1.1em;
        }
        
        .lesson-type-badge {
            background: var(--accent);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8em;
            font-weight: 500;
        }
        
        .lesson-test .lesson-type-badge {
            background: #f39c12;
        }
        
        .lesson-practice .lesson-type-badge {
            background: #27ae60;
        }
        
        .lesson-description {
            margin: 0 0 10px 0;
            color: #666;
            font-size: 0.9em;
        }
        
        .lesson-meta {
            display: flex;
            gap: 15px;
            font-size: 0.8em;
            color: #888;
        }
        
        .lesson-actions {
            display: flex;
            gap: 5px;
            flex-shrink: 0;
        }
        
        .module-item {
            padding: 0;
            overflow: hidden;
        }
        
        .module-header {
            display: flex;
            align-items: center;
            padding: 20px;
            background: #f8f9fa;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .module-drag-handle {
            color: #ccc;
            cursor: grab;
            padding: 5px;
            margin-right: 15px;
        }
        
        .module-info {
            flex: 1;
        }
        
        .module-title {
            margin: 0 0 5px 0;
            color: var(--primary);
        }
        
        .module-type-badge {
            background: #e9ecef;
            color: #495057;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8em;
            display: inline-flex;
            align-items: center;
            gap: 5px;
        }
        
        .module-actions {
            display: flex;
            gap: 10px;
        }
        
        .module-description {
            padding: 15px 20px;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .module-description p {
            margin: 0;
            color: #666;
        }
        
        .lessons-container {
            padding: 20px;
            min-height: 100px;
        }
        
        .dragging {
            opacity: 0.5;
            transform: rotate(5deg);
        }
        
        /* Анимации */
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(-100%);
            }
        }
        
        /* Адаптивность */
        @media (max-width: 768px) {
            .modal-content {
                width: 95%;
                margin: 20px;
            }
            
            .lesson-item {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .lesson-actions {
                align-self: flex-end;
            }
            
            .module-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 15px;
            }
            
            .module-actions {
                align-self: stretch;
                justify-content: space-between;
            }
        }
    `;

    if (!document.querySelector('#management-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'management-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
}

// Функция показа уведомлений (если не импортирована из другого модуля)
function showToast(message, type = 'info', duration = 4000) {
    // Реализация showToast из course-editor.js
    console.log(`Toast [${type}]: ${message}`);
    // В реальном приложении здесь будет вызов существующей функции showToast
}