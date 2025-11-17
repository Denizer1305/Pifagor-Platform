// Вспомогательные функции для работы с модальными окнами
function showModal(modal) {
    if (modal) {
        console.log('Showing modal');
        modal.style.display = 'flex';
        // Используем setTimeout чтобы дать браузеру обновить display
        setTimeout(() => {
            modal.classList.add('active');
            console.log('Modal active class added');
        }, 10);
    }
}

function hideModal(modal) {
    if (modal) {
        console.log('Hiding modal');
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Ждем завершения анимации
    }
}

// Функция показа уведомлений
function showToast(message, type = 'info') {
    // Создаем элемент уведомления
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close">&times;</button>
    `;
    
    document.body.appendChild(toast);
    
    // Кнопка закрытия
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.remove();
    });
    
    // Автоматическое закрытие через 4 секунды
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 4000);
}

function getToastIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Функции для кастомных alert/confirm окон
function showAlert(message, title = 'Уведомление', type = 'info') {
    return new Promise((resolve) => {
        const alertModal = document.createElement('div');
        alertModal.className = 'confirm-modal-overlay active';
        
        let iconClass, iconType;
        switch(type) {
            case 'warning':
                iconClass = 'warning';
                iconType = 'fa-exclamation-triangle';
                break;
            case 'danger':
                iconClass = 'danger';
                iconType = 'fa-exclamation-circle';
                break;
            case 'success':
                iconClass = 'success';
                iconType = 'fa-check-circle';
                break;
            case 'info':
            default:
                iconClass = 'info';
                iconType = 'fa-info-circle';
        }
        
        alertModal.innerHTML = `
            <div class="confirm-modal alert">
                <div class="confirm-modal-header">
                    <div class="confirm-modal-icon ${iconClass}">
                        <i class="fas ${iconType}"></i>
                    </div>
                </div>
                <div class="confirm-modal-body">
                    <h3 class="confirm-modal-title">${title}</h3>
                    <p class="confirm-modal-message">${message}</p>
                </div>
                <div class="confirm-modal-footer">
                    <button class="confirm-modal-btn confirm-modal-btn-primary" id="alertOkBtn">OK</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(alertModal);
        
        const okBtn = alertModal.querySelector('#alertOkBtn');
        const modal = alertModal.querySelector('.confirm-modal');
        
        function closeAlert() {
            modal.classList.add('closing');
            setTimeout(() => {
                alertModal.remove();
                resolve(true);
            }, 300);
        }
        
        okBtn.addEventListener('click', closeAlert);
        
        // Закрытие по клику вне модального окна
        alertModal.addEventListener('click', function(e) {
            if (e.target === alertModal) {
                closeAlert();
            }
        });
        
        // Закрытие по ESC
        function handleEscKey(e) {
            if (e.key === 'Escape') {
                closeAlert();
                document.removeEventListener('keydown', handleEscKey);
            }
        }
        
        document.addEventListener('keydown', handleEscKey);
    });
}

function showConfirm(message, title = 'Подтверждение') {
    return new Promise((resolve) => {
        const confirmModal = document.createElement('div');
        confirmModal.className = 'confirm-modal-overlay active';
        
        confirmModal.innerHTML = `
            <div class="confirm-modal confirm">
                <div class="confirm-modal-header">
                    <div class="confirm-modal-icon warning">
                        <i class="fas fa-question-circle"></i>
                    </div>
                </div>
                <div class="confirm-modal-body">
                    <h3 class="confirm-modal-title">${title}</h3>
                    <p class="confirm-modal-message">${message}</p>
                </div>
                <div class="confirm-modal-footer">
                    <button class="confirm-modal-btn confirm-modal-btn-secondary" id="confirmCancelBtn">Отмена</button>
                    <button class="confirm-modal-btn confirm-modal-btn-danger" id="confirmOkBtn">Подтвердить</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(confirmModal);
        
        const okBtn = confirmModal.querySelector('#confirmOkBtn');
        const cancelBtn = confirmModal.querySelector('#confirmCancelBtn');
        const modal = confirmModal.querySelector('.confirm-modal');
        
        function closeConfirm(result) {
            modal.classList.add('closing');
            setTimeout(() => {
                confirmModal.remove();
                resolve(result);
            }, 300);
        }
        
        okBtn.addEventListener('click', () => closeConfirm(true));
        cancelBtn.addEventListener('click', () => closeConfirm(false));
        
        // Закрытие по клику вне модального окна
        confirmModal.addEventListener('click', function(e) {
            if (e.target === confirmModal) {
                closeConfirm(false);
            }
        });
        
        // Закрытие по ESC
        function handleEscKey(e) {
            if (e.key === 'Escape') {
                closeConfirm(false);
                document.removeEventListener('keydown', handleEscKey);
            }
        }
        
        document.addEventListener('keydown', handleEscKey);
    });
}

// Функции для редактирования модулей
function editModule(moduleCard, currentTitle, currentDescription, currentType) {
    // Создаем модальное окно редактирования
    const editModal = document.createElement('div');
    editModal.className = 'modal-overlay active';
    editModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Редактирование модуля</h3>
                <button type="button" class="modal-close" id="closeEditModuleModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="edit-module-title" class="form-label">Название модуля *</label>
                    <input type="text" id="edit-module-title" class="form-control" value="${currentTitle}" placeholder="Введите название модуля">
                </div>
                
                <div class="form-group">
                    <label for="edit-module-description" class="form-label">Описание модуля</label>
                    <textarea id="edit-module-description" class="form-control" placeholder="Опишите содержание модуля" rows="3">${currentDescription || ''}</textarea>
                </div>
                
                <div class="module-type-options">
                    <div class="form-group">
                        <label class="form-label">Тип модуля</label>
                        <div class="radio-options">
                            <label class="radio-option">
                                <input type="radio" name="edit-module-type" value="theory" ${currentType === 'theory' ? 'checked' : ''}>
                                <span class="radio-checkmark"></span>
                                <span class="radio-label">
                                    <i class="fas fa-book"></i>
                                    Теоретический
                                </span>
                            </label>
                            
                            <label class="radio-option">
                                <input type="radio" name="edit-module-type" value="practice" ${currentType === 'practice' ? 'checked' : ''}>
                                <span class="radio-checkmark"></span>
                                <span class="radio-label">
                                    <i class="fas fa-tasks"></i>
                                    Практический
                                </span>
                            </label>
                            
                            <label class="radio-option">
                                <input type="radio" name="edit-module-type" value="project" ${currentType === 'project' ? 'checked' : ''}>
                                <span class="radio-checkmark"></span>
                                <span class="radio-label">
                                    <i class="fas fa-project-diagram"></i>
                                    Проектный
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" id="cancelEditModuleModal">Отмена</button>
                <button type="button" class="btn btn-success" id="saveEditModuleModal">Сохранить изменения</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(editModal);
    
    // Обработчики для модального окна редактирования
    const closeBtn = editModal.querySelector('#closeEditModuleModal');
    const cancelBtn = editModal.querySelector('#cancelEditModuleModal');
    const saveBtn = editModal.querySelector('#saveEditModuleModal');
    
    function closeEditModal() {
        editModal.classList.remove('active');
        setTimeout(() => {
            editModal.remove();
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeEditModal);
    cancelBtn.addEventListener('click', closeEditModal);
    
    saveBtn.addEventListener('click', function() {
        const newTitle = document.getElementById('edit-module-title').value.trim();
        const newDescription = document.getElementById('edit-module-description').value.trim();
        const newType = editModal.querySelector('input[name="edit-module-type"]:checked').value;
        
        if (!newTitle) {
            showToast('Пожалуйста, введите название модуля', 'error');
            return;
        }
        
        // Обновляем данные модуля
        updateModuleData(moduleCard, newTitle, newDescription, newType);
        closeEditModal();
        showToast('Модуль успешно обновлен', 'success');
    });
    
    // Закрытие по клику вне модального окна
    editModal.addEventListener('click', function(e) {
        if (e.target === editModal) {
            closeEditModal();
        }
    });
}

function updateModuleData(moduleCard, title, description, type) {
    // Обновляем заголовок
    const titleElement = moduleCard.querySelector('.module-title');
    const currentText = titleElement.textContent;
    const moduleNumber = currentText.match(/Модуль (\d+):/)[1];
    titleElement.textContent = `Модуль ${moduleNumber}: ${title}`;
    
    // Обновляем описание
    const descriptionElement = moduleCard.querySelector('.module-description p:first-child');
    descriptionElement.textContent = description || 'Описание модуля будет добавлено здесь';
    
    // Обновляем тип модуля
    const typeElement = moduleCard.querySelector('.module-description p:last-child small');
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
    
    typeElement.innerHTML = `<i class="fas ${typeIcon}"></i> ${typeName} модуль`;
}

function initEditButtons() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.edit-module-btn')) {
            const moduleCard = e.target.closest('.module-card');
            const titleElement = moduleCard.querySelector('.module-title');
            const descriptionElement = moduleCard.querySelector('.module-description p:first-child');
            const typeElement = moduleCard.querySelector('.module-description p:last-child small');
            
            const currentTitle = titleElement.textContent.replace(/Модуль \d+: /, '');
            const currentDescription = descriptionElement.textContent;
            
            // Определяем текущий тип модуля
            let currentType = 'theory';
            if (typeElement.textContent.includes('Практический')) currentType = 'practice';
            if (typeElement.textContent.includes('Проектный')) currentType = 'project';
            
            editModule(moduleCard, currentTitle, currentDescription, currentType);
        }
    });
}

// Функции для работы с модулями
function addNewModule(title, description, type) {
    const modulesSection = document.querySelector('.modules-section');
    if (!modulesSection) {
        console.warn('Секция модулей не найдена');
        return;
    }

    const moduleId = Date.now();
    const moduleCount = modulesSection.querySelectorAll('.module-card').length;
    const moduleNumber = moduleCount + 1;

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

    const moduleCard = document.createElement('div');
    moduleCard.className = 'module-card';
    moduleCard.setAttribute('data-module-id', moduleId);
    moduleCard.setAttribute('draggable', 'true');
    
    moduleCard.innerHTML = `
        <div class="module-header">
            <div class="module-title-container">
                <h4 class="module-title">Модуль ${moduleNumber}: ${title}</h4>
                <div class="module-header-actions">
                    
                </div>
            </div>
            <div class="module-actions">
                <a href="/frontend/templates/courses/create-course-detail.html" class="btn btn-small btn-light">
                    <i class="fas fa-plus"></i>
                </a>
                <button type="button" class="btn btn-small btn-light edit-module-btn">
                    <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="btn btn-small btn-danger delete-module-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="module-description">
            <p>${description || 'Описание модуля будет добавлено здесь'}</p>
            <p><small><i class="fas ${typeIcon}"></i> ${typeName} модуль</small></p>
        </div>
        <div class="lessons-list">
            <div class="lesson-item">
                <div class="lesson-drag"><i class="fas fa-grip-vertical"></i></div>
                <div class="lesson-title">1. Введение в курс</div>
                <div class="lesson-actions">
                    <a href="/frontend/templates/courses/create-course-detail.html" class="btn btn-small">
                        <i class="fas fa-edit"></i>
                    </a>
                </div>
            </div>
            <div class="lesson-item">
                <div class="lesson-drag"><i class="fas fa-grip-vertical"></i></div>
                <div class="lesson-title">2. Установка необходимого ПО</div>
                <div class="lesson-actions">
                    <a href="/frontend/templates/courses/create-course-detail.html" class="btn btn-small">
                        <i class="fas fa-edit"></i>
                    </a>
                </div>
            </div>
        </div>
    `;

    // ИЩЕМ контейнер для модулей или создаем его
    let modulesContainer = modulesSection.querySelector('.modules-container');
    
    if (!modulesContainer) {
        // Если контейнера нет, создаем его и перемещаем в него существующие модули
        modulesContainer = document.createElement('div');
        modulesContainer.className = 'modules-container';
        
        // Перемещаем существующие модули в контейнер
        const existingModules = modulesSection.querySelectorAll('.module-card');
        existingModules.forEach(module => {
            modulesContainer.appendChild(module);
        });
        
        // Вставляем контейнер перед кнопкой добавления модуля
        const addModuleBtn = modulesSection.querySelector('.add-module-btn');
        if (addModuleBtn) {
            modulesSection.insertBefore(modulesContainer, addModuleBtn);
        } else {
            modulesSection.appendChild(modulesContainer);
        }
    }
    
    // Добавляем новый модуль в контейнер
    modulesContainer.appendChild(moduleCard);
    
    // Добавляем обработчик для кнопки редактирования модуля
    const editBtn = moduleCard.querySelector('.edit-module-btn');
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            editModule(moduleCard, title, description, type);
        });
    }
    
    // Добавляем обработчик для кнопки удаления модуля
    const deleteBtn = moduleCard.querySelector('.delete-module-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            deleteModule(moduleCard);
        });
    }
    
    // Добавляем обработчики для кнопок редактирования уроков
    const lessonEditBtns = moduleCard.querySelectorAll('.lesson-actions a');
    lessonEditBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '/frontend/templates/courses/create-course-detail.html';
        });
    });
    
    // Анимация появления
    moduleCard.style.animation = 'slideIn 0.3s ease';
    
    showToast(`Модуль "${title}" успешно создан`, 'success');
    
    console.log('Module added successfully');
}

// Функция удаления модуля
async function deleteModule(moduleCard) {
    const confirmed = await showConfirm(
        'Вы уверены, что хотите удалить этот модуль и все его уроки?',
        'Удаление модуля'
    );
    
    if (confirmed) {
        moduleCard.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            moduleCard.remove();
            updateModuleNumbers();
            showToast('Модуль успешно удален', 'success');
        }, 300);
    }
}

// Функции для работы с уроками
function initLessonButtons() {
    console.log('Initializing lesson buttons...');
    
    // Заменяем кнопки "Добавить урок" на ссылки
    const addLessonButtons = document.querySelectorAll('.btn-light');
    let replacedCount = 0;
    
    addLessonButtons.forEach(btn => {
        if (btn.textContent.includes('Добавить урок')) {
            // Создаем ссылку с теми же классами и стилями
            const link = document.createElement('a');
            link.href = '/frontend/templates/courses/create-course-detail.html';
            link.className = btn.className;
            link.innerHTML = btn.innerHTML;
            link.style.textDecoration = 'none';
            link.style.display = 'inline-block';
            
            // Заменяем кнопку на ссылку
            btn.parentNode.replaceChild(link, btn);
            replacedCount++;
        }
    });
    
    // Добавляем обработчики для кнопок редактирования уроков в существующих модулях
    const lessonEditButtons = document.querySelectorAll('.lesson-actions .btn-small');
    lessonEditButtons.forEach(btn => {
        if (!btn.hasAttribute('href')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = '/frontend/templates/courses/create-course-detail.html';
            });
        }
    });
    
    console.log(`Replaced ${replacedCount} lesson buttons with links`);
}

// Функции для предпросмотра
function initPreview() {
    // Обновление предпросмотра в реальном времени
    const titleInput = document.getElementById('course-title');
    const descInput = document.getElementById('course-short-desc');
    const levelSelect = document.getElementById('course-level');
    const durationInput = document.getElementById('course-duration');
    
    if (titleInput) {
        titleInput.addEventListener('input', updatePreview);
    }
    if (descInput) {
        descInput.addEventListener('input', updatePreview);
    }
    if (levelSelect) {
        levelSelect.addEventListener('change', updatePreview);
    }
    if (durationInput) {
        durationInput.addEventListener('input', updatePreview);
    }
    
    // Обновление предпросмотра изображения
    const imageInput = document.getElementById('course-image');
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const previewImage = document.querySelector('.preview-image');
                    if (previewImage) {
                        previewImage.innerHTML = `<img src="${e.target.result}" alt="Preview" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">`;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

function updatePreview() {
    const title = document.getElementById('course-title')?.value || 'Название курса';
    const desc = document.getElementById('course-short-desc')?.value || 'Краткое описание курса появится здесь';
    const level = document.getElementById('course-level')?.value;
    const duration = document.getElementById('course-duration')?.value || '-';
    
    const previewTitle = document.getElementById('preview-title');
    const previewDesc = document.getElementById('preview-desc');
    const previewLevel = document.getElementById('preview-level');
    const previewDuration = document.getElementById('preview-duration');
    
    if (previewTitle) previewTitle.textContent = title;
    if (previewDesc) previewDesc.textContent = desc;
    if (previewLevel) {
        const levelText = getLevelText(level);
        previewLevel.textContent = `Уровень: ${levelText}`;
    }
    if (previewDuration) previewDuration.textContent = `Часов: ${duration}`;
}

function getLevelText(level) {
    switch(level) {
        case 'beginner': return 'Начальный';
        case 'intermediate': return 'Средний';
        case 'advanced': return 'Продвинутый';
        default: return '-';
    }
}

// Функции для удаления
function initDeleteButtons() {
    document.addEventListener('click', async function(e) {
        // Обработка кнопок удаления модулей в статических модулях
        if (e.target.closest('.delete-module-btn') || 
            (e.target.closest('.btn-danger') && e.target.closest('.module-header'))) {
            
            const moduleCard = e.target.closest('.module-card');
            if (moduleCard) {
                e.preventDefault();
                await deleteModule(moduleCard);
            }
        }
        
        // Удаление уроков
        if (e.target.classList.contains('delete-lesson') || e.target.closest('.delete-lesson')) {
            const lessonItem = e.target.closest('.lesson-item');
            if (lessonItem) {
                e.preventDefault();
                const confirmed = await showConfirm(
                    'Вы уверены, что хотите удалить этот урок?',
                    'Удаление урока'
                );
                
                if (confirmed) {
                    lessonItem.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => {
                        lessonItem.remove();
                        updateLessonNumbers();
                        showToast('Урок успешно удален', 'success');
                    }, 300);
                }
            }
        }
    });
}

// Функции для drag and drop
function initDragAndDrop() {
    const lessonItems = document.querySelectorAll('.lesson-item');
    const moduleCards = document.querySelectorAll('.module-card');
    
    lessonItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });
    
    moduleCards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    });
    
    // Добавляем обработчики для контейнеры
    const lessonsContainers = document.querySelectorAll('.lessons-list');
    const modulesSection = document.querySelector('.modules-section');
    
    lessonsContainers.forEach(container => {
        container.addEventListener('dragover', handleDragOver);
        container.addEventListener('drop', handleDrop);
    });
    
    if (modulesSection) {
        modulesSection.addEventListener('dragover', handleDragOver);
        modulesSection.addEventListener('drop', handleDrop);
    }
}

function handleDragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-lesson-id') || e.target.getAttribute('data-module-id'));
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    const draggingElement = document.querySelector('.dragging');
    if (!draggingElement) return;

    const afterElement = getDragAfterElement(e.currentTarget, e.clientY);
    const container = e.currentTarget;
    
    if (afterElement) {
        container.insertBefore(draggingElement, afterElement);
    } else {
        container.appendChild(draggingElement);
    }
}

function handleDrop(e) {
    e.preventDefault();
    updateLessonNumbers();
    updateModuleNumbers();
    showToast('Порядок успешно изменен', 'success');
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.lesson-item:not(.dragging), .module-card:not(.dragging)')];
    
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
    document.querySelectorAll('.lessons-list').forEach(container => {
        const lessons = container.querySelectorAll('.lesson-item');
        lessons.forEach((lesson, index) => {
            const titleElement = lesson.querySelector('.lesson-title');
            if (titleElement) {
                const currentText = titleElement.textContent;
                const newText = currentText.replace(/^\d+\./, `${index + 1}.`);
                titleElement.textContent = newText;
            }
        });
    });
}

function updateModuleNumbers() {
    const modules = document.querySelectorAll('.module-card');
    modules.forEach((module, index) => {
        const titleElement = module.querySelector('.module-title');
        if (titleElement) {
            const currentText = titleElement.textContent;
            const newText = currentText.replace(/Модуль \d+:/, `Модуль ${index + 1}:`);
            titleElement.textContent = newText;
        }
    });
}

// Функции для отправки формы
function initFormSubmission() {
    const form = document.getElementById('course-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Базовая валидация
            const title = document.getElementById('course-title').value.trim();
            const shortDesc = document.getElementById('course-short-desc').value.trim();
            const fullDesc = document.getElementById('course-full-desc').value.trim();
            const category = document.getElementById('course-category').value;
            const level = document.getElementById('course-level').value;
            const duration = document.getElementById('course-duration').value;
            
            if (!title || !shortDesc || !fullDesc || !category || !level || !duration) {
                showToast('Пожалуйста, заполните все обязательные поля', 'error');
                return;
            }
            
            if (shortDesc.length > 150) {
                showToast('Краткое описание должно быть не более 150 символов', 'error');
                return;
            }
            
            // Симуляция успешного создания курса
            showToast('Курс успешно создан и отправлен на модерацию!', 'success');
            
            // Через 2 секунды перенаправляем на страницу курсов
            setTimeout(() => {
                window.location.href = '/frontend/templates/courses/courses.html';
            }, 2000);
        });
    }
}

// Функция для обработки радио-кнопок - ИСПРАВЛЕННАЯ
function initRadioButtonEffects() {
    console.log('Initializing radio button effects...');
    
    function addRadioButtonListeners() {
        const radioOptions = document.querySelectorAll('.radio-option');
        console.log('Found radio options:', radioOptions.length);
        
        radioOptions.forEach(option => {
            // Удаляем старые обработчики чтобы избежать дублирования
            option.removeEventListener('mousedown', handleRadioMouseDown);
            option.removeEventListener('mouseup', handleRadioMouseUp);
            option.removeEventListener('mouseleave', handleRadioMouseLeave);
            option.removeEventListener('touchstart', handleRadioTouchStart);
            option.removeEventListener('touchend', handleRadioTouchEnd);
            option.removeEventListener('click', handleRadioClick);
            
            // Добавляем новые обработчики
            option.addEventListener('mousedown', handleRadioMouseDown);
            option.addEventListener('mouseup', handleRadioMouseUp);
            option.addEventListener('mouseleave', handleRadioMouseLeave);
            option.addEventListener('touchstart', handleRadioTouchStart);
            option.addEventListener('touchend', handleRadioTouchEnd);
            option.addEventListener('click', handleRadioClick);
        });
    }
    
    function handleRadioMouseDown(e) {
        console.log('Radio button pressed');
        const radioOption = e.currentTarget;
        radioOption.classList.add('radio-active');
        e.preventDefault(); // Предотвращаем выделение текста
    }
    
    function handleRadioMouseUp(e) {
        const radioOption = e.currentTarget;
        radioOption.classList.remove('radio-active');
    }
    
    function handleRadioMouseLeave(e) {
        const radioOption = e.currentTarget;
        radioOption.classList.remove('radio-active');
    }
    
    function handleRadioTouchStart(e) {
        console.log('Radio button touched');
        const radioOption = e.currentTarget;
        radioOption.classList.add('radio-active');
    }
    
    function handleRadioTouchEnd(e) {
        const radioOption = e.currentTarget;
        // Небольшая задержка для визуальной обратной связи
        setTimeout(() => {
            radioOption.classList.remove('radio-active');
        }, 150);
    }
    
    function handleRadioClick(e) {
        // Обновляем визуальное состояние для всех радио-кнопок в группе
        const clickedOption = e.currentTarget;
        const radioName = clickedOption.querySelector('input[type="radio"]')?.name;
        
        if (radioName) {
            document.querySelectorAll(`.radio-option input[name="${radioName}"]`).forEach(radio => {
                const option = radio.closest('.radio-option');
                if (option) {
                    if (radio.checked) {
                        option.classList.add('radio-checked');
                    } else {
                        option.classList.remove('radio-checked');
                    }
                }
            });
        }
    }
    
    // Инициализация при загрузке
    addRadioButtonListeners();
    
    // Также инициализируем при открытии модальных окон
    document.addEventListener('modalOpened', function() {
        setTimeout(addRadioButtonListeners, 100);
    });
    
    // Обновляем состояние при изменении радио-кнопок
    document.addEventListener('change', function(e) {
        if (e.target.type === 'radio') {
            const radioOption = e.target.closest('.radio-option');
            if (radioOption) {
                // Обновляем все радио-кнопки в группе
                const radioName = e.target.name;
                document.querySelectorAll(`.radio-option input[name="${radioName}"]`).forEach(radio => {
                    const option = radio.closest('.radio-option');
                    if (option) {
                        option.classList.toggle('radio-checked', radio.checked);
                    }
                });
            }
        }
    });
    
    console.log('Radio button effects initialized');
}

// Обновленная функция для модального окна
function initAddModuleModal() {
    console.log('Initializing module modal...');
    
    const addModuleBtn = document.querySelector('.add-module-btn');
    const moduleModal = document.getElementById('addModuleModal');
    const closeModuleModal = document.getElementById('closeModuleModal');
    const cancelModuleModal = document.getElementById('cancelModuleModal');
    const confirmModuleModal = document.getElementById('confirmModuleModal');

    console.log('Add module button:', addModuleBtn);
    console.log('Module modal:', moduleModal);

    if (!addModuleBtn) {
        console.error('Add module button not found!');
        return;
    }
    
    if (!moduleModal) {
        console.error('Module modal not found!');
        return;
    }

    // Показ модального окна при клике на кнопку "Добавить модуль"
    addModuleBtn.addEventListener('click', function(e) {
        console.log('Add module button clicked');
        e.preventDefault();
        
        // Сброс формы
        const moduleTitle = document.getElementById('module-title');
        const moduleDescription = document.getElementById('module-description');
        const theoryRadio = document.querySelector('input[name="module-type"][value="theory"]');
        
        if (moduleTitle) moduleTitle.value = '';
        if (moduleDescription) moduleDescription.value = '';
        if (theoryRadio) theoryRadio.checked = true;
        
        showModal(moduleModal);
        
        // Инициализируем радио-кнопки после открытия модального окна
        setTimeout(initRadioButtonEffects, 100);
        
        // Триггерим кастомное событие
        document.dispatchEvent(new CustomEvent('modalOpened'));
    });

    // Закрытие модального окна
    function closeModuleModalFunc() {
        console.log('Closing module modal');
        hideModal(moduleModal);
    }

    if (closeModuleModal) {
        closeModuleModal.addEventListener('click', closeModuleModalFunc);
    } else {
        console.error('Close module modal button not found');
    }
    
    if (cancelModuleModal) {
        cancelModuleModal.addEventListener('click', closeModuleModalFunc);
    } else {
        console.error('Cancel module modal button not found');
    }

    // Подтверждение добавления модуля
    if (confirmModuleModal) {
        confirmModuleModal.addEventListener('click', function() {
            console.log('Confirm module creation');
            const title = document.getElementById('module-title')?.value.trim();
            const description = document.getElementById('module-description')?.value.trim();
            const type = document.querySelector('input[name="module-type"]:checked')?.value;

            if (!title) {
                showToast('Пожалуйста, введите название модуля', 'error');
                return;
            }

            addNewModule(title, description, type);
            closeModuleModalFunc();
        });
    } else {
        console.error('Confirm module modal button not found');
    }

    // Закрытие по клику вне модального окна
    moduleModal.addEventListener('click', function(e) {
        if (e.target === moduleModal) {
            closeModuleModalFunc();
        }
    });
    
    console.log('Module modal initialized successfully');
}

import { CourseStudentsManager } from './course-students.js';
import { modalManager } from './modal-manager.js';

export function initCourseManagement() {
    console.log('Initializing course management...');
    
    // Инициализация управления студентами
    const studentsManager = new CourseStudentsManager();
    
    // Инициализация управления модулями
    initModulesManagement();
    
    // Инициализация карточек управления
    initManagementCards();
    
    // Инициализация кнопок сохранения
    initSaveButtons();
    
    console.log('Course management fully initialized');
}

function initModulesManagement() {
    let currentModules = [
        { id: 1, title: "Введение в программирование", description: "Основные понятия и история программирования. Знакомство с языками программирования.", type: "theory", order: 1 },
        { id: 2, title: "Переменные и типы данных", description: "Работа с переменными, основные типы данных и операции над ними.", type: "theory", order: 2 },
        { id: 3, title: "Условные операторы", description: "Использование if, else, switch для управления потоком выполнения программы.", type: "theory", order: 3 },
        { id: 4, title: "Циклы", description: "Использование циклов for, while, do-while для повторения действий.", type: "practice", order: 4 }
    ];

    // Регистрируем модальное окно модулей
    if (!modalManager.register('addModuleModal')) {
        createModuleModal();
    }

    // Обработчик кнопки добавления модуля
    document.addEventListener('click', (e) => {
        if (e.target.closest('#addModuleBtn')) {
            openAddModuleModal();
        }
        
        if (e.target.closest('#confirmModuleModal')) {
            confirmAddModule();
        }
        
        // Обработчики действий модулей
        if (e.target.closest('[data-module-action]')) {
            const button = e.target.closest('[data-module-action]');
            const action = button.dataset.moduleAction;
            const moduleId = parseInt(button.dataset.moduleId);
            handleModuleAction(action, moduleId);
        }
    });

    function createModuleModal() {
        const modalContent = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Создание нового модуля</h3>
                    <button type="button" class="modal-close" data-modal-close>
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="module-title" class="form-label">Название модуля *</label>
                        <input type="text" id="module-title" class="form-control" placeholder="Введите название модуля">
                    </div>
                    
                    <div class="form-group">
                        <label for="module-description" class="form-label">Описание модуля</label>
                        <textarea id="module-description" class="form-control" placeholder="Опишите содержание модуля" rows="3"></textarea>
                    </div>
                    
                    <div class="module-type-options">
                        <div class="form-group">
                            <label class="form-label">Тип модуля</label>
                            <div class="radio-options">
                                <label class="radio-option">
                                    <input type="radio" name="moduleType" value="theory" checked>
                                    <span class="radio-checkmark"></span>
                                    <span class="radio-label">
                                        <i class="fas fa-book"></i>
                                        Теоретический
                                    </span>
                                </label>
                                
                                <label class="radio-option">
                                    <input type="radio" name="moduleType" value="practice">
                                    <span class="radio-checkmark"></span>
                                    <span class="radio-label">
                                        <i class="fas fa-tasks"></i>
                                        Практический
                                    </span>
                                </label>
                                
                                <label class="radio-option">
                                    <input type="radio" name="moduleType" value="project">
                                    <span class="radio-checkmark"></span>
                                    <span class="radio-label">
                                        <i class="fas fa-project-diagram"></i>
                                        Проектный
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-modal-close>Отмена</button>
                    <button type="button" class="btn btn-success" id="confirmModuleModal">Создать модуль</button>
                </div>
            </div>
        `;

        modalManager.createModal('addModuleModal', modalContent);
    }

    function openAddModuleModal() {
        console.log('Opening module modal');
        // Сброс формы
        const moduleTitle = document.getElementById('module-title');
        const moduleDescription = document.getElementById('module-description');
        
        if (moduleTitle) moduleTitle.value = '';
        if (moduleDescription) moduleDescription.value = '';
        
        const theoryRadio = document.querySelector('input[name="moduleType"][value="theory"]');
        if (theoryRadio) theoryRadio.checked = true;
        
        modalManager.show('addModuleModal');
    }

    function confirmAddModule() {
        const moduleTitle = document.getElementById('module-title');
        if (!moduleTitle) return;
        
        const title = moduleTitle.value.trim();
        const description = document.getElementById('module-description') ? 
                           document.getElementById('module-description').value.trim() : '';
        const typeInput = document.querySelector('input[name="moduleType"]:checked');
        const type = typeInput ? typeInput.value : 'theory';
        
        if (!title) {
            showNotification('Введите название модуля', 'error');
            moduleTitle.focus();
            return;
        }
        
        const newModule = {
            id: Date.now(),
            title: title,
            description: description,
            type: type,
            order: currentModules.length + 1
        };
        
        currentModules.push(newModule);
        updateModulesList();
        modalManager.hide('addModuleModal');
        showNotification('Модуль успешно создан');
    }

    function updateModulesList() {
        const modulesList = document.querySelector('.modules-list');
        if (!modulesList) return;
        
        modulesList.innerHTML = '';
        
        currentModules.forEach(module => {
            const moduleItem = document.createElement('div');
            moduleItem.className = 'module-item';
            moduleItem.innerHTML = `
                <div class="module-order">${module.order}</div>
                <div class="module-info">
                    <h4>${module.title}</h4>
                    <p>${module.description}</p>
                </div>
                <div class="module-actions">
                    <button class="action-btn" data-module-action="edit" data-module-id="${module.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn" data-module-action="delete" data-module-id="${module.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="action-btn" data-module-action="up" data-module-id="${module.id}">
                        <i class="fas fa-arrow-up"></i>
                    </button>
                    <button class="action-btn" data-module-action="down" data-module-id="${module.id}">
                        <i class="fas fa-arrow-down"></i>
                    </button>
                </div>
            `;
            modulesList.appendChild(moduleItem);
        });
        
        updateModuleCount();
    }

    function handleModuleAction(action, moduleId) {
        switch (action) {
            case 'edit':
                showNotification(`Редактирование модуля ${moduleId}`);
                break;
            case 'delete':
                deleteModule(moduleId);
                break;
            case 'up':
                moveModuleUp(moduleId);
                break;
            case 'down':
                moveModuleDown(moduleId);
                break;
        }
    }

    function deleteModule(moduleId) {
        if (confirm('Вы уверены, что хотите удалить этот модуль?')) {
            currentModules = currentModules.filter(module => module.id !== moduleId);
            currentModules.forEach((module, index) => {
                module.order = index + 1;
            });
            updateModulesList();
            showNotification('Модуль удален');
        }
    }

    function moveModuleUp(moduleId) {
        const moduleIndex = currentModules.findIndex(module => module.id === moduleId);
        if (moduleIndex > 0) {
            [currentModules[moduleIndex - 1], currentModules[moduleIndex]] = 
            [currentModules[moduleIndex], currentModules[moduleIndex - 1]];
            
            currentModules.forEach((module, index) => {
                module.order = index + 1;
            });
            
            updateModulesList();
        }
    }

    function moveModuleDown(moduleId) {
        const moduleIndex = currentModules.findIndex(module => module.id === moduleId);
        if (moduleIndex < currentModules.length - 1) {
            [currentModules[moduleIndex], currentModules[moduleIndex + 1]] = 
            [currentModules[moduleIndex + 1], currentModules[moduleIndex]];
            
            currentModules.forEach((module, index) => {
                module.order = index + 1;
            });
            
            updateModulesList();
        }
    }

    function updateModuleCount() {
        const moduleCountElement = document.querySelector('.management-card:first-child h3');
        if (moduleCountElement) {
            moduleCountElement.textContent = currentModules.length;
        }
    }

    // Инициализация начального списка модулей
    updateModulesList();
}

function initManagementCards() {
    document.querySelectorAll('.management-card').forEach(card => {
        card.addEventListener('click', function() {
            const cardText = this.querySelector('p').textContent;
            
            if (cardText.includes('Модулей')) {
                document.querySelector('.modules-list').scrollIntoView({ behavior: 'smooth' });
            } else if (cardText.includes('Студентов')) {
                document.querySelector('.students-table').scrollIntoView({ behavior: 'smooth' });
            } else if (cardText.includes('Заданий')) {
                document.querySelector('.assignments-list').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initSaveButtons() {
    const saveSettingsBtn = document.querySelector('.settings-form .btn');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Настройки курса сохранены');
        });
    }
    
    const saveMainBtn = document.querySelector('.course-management-actions .btn');
    if (saveMainBtn) {
        saveMainBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Изменения сохранены');
        });
    }
}

function showNotification(message, type = 'success') {
    if (typeof showToast !== 'undefined') {
        showToast(message, type);
    } else {
        console.log(`Notification [${type}]: ${message}`);
    }
}