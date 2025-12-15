// homework-pages.js
import { Utils } from '../lib/utils.js';

// Добавляем стили для кастомных alert через JavaScript
const alertStyles = `
.custom-alert {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    background: white;
    border: 1px solid #e0e0e0;
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 12px;
    max-width: 400px;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
    font-family: 'PT Sans', sans-serif;
}

.custom-alert.visible {
    opacity: 1;
    transform: translateX(0);
}

.custom-alert.success {
    border-left: 4px solid #4CAF50;
    background: linear-gradient(135deg, #f8fff8 0%, #e8f5e8 100%);
}

.custom-alert.error {
    border-left: 4px solid #f44336;
    background: linear-gradient(135deg, #fff8f8 0%, #f5e8e8 100%);
}

.custom-alert.warning {
    border-left: 4px solid #ff9800;
    background: linear-gradient(135deg, #fffbf8 0%, #f5f0e8 100%);
}

.custom-alert.info {
    border-left: 4px solid #2196F3;
    background: linear-gradient(135deg, #f8fbff 0%, #e8f0f5 100%);
}

.custom-alert .alert-icon {
    font-size: 20px;
    width: 24px;
    text-align: center;
}

.custom-alert.success .alert-icon {
    color: #4CAF50;
}

.custom-alert.error .alert-icon {
    color: #f44336;
}

.custom-alert.warning .alert-icon {
    color: #ff9800;
}

.custom-alert.info .alert-icon {
    color: #2196F3;
}

.custom-alert .alert-content {
    flex: 1;
    color: #333;
    font-size: 14px;
    line-height: 1.4;
}

.custom-alert .alert-close {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: #666;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.custom-alert .alert-close:hover {
    background: rgba(0,0,0,0.1);
    color: #333;
}

/* Анимации для fade-in элементов */
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s ease;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Стили для ошибок форм */
.error {
    border-color: #f44336 !important;
    background-color: #fff8f8 !important;
}

.error-message {
    color: #f44336;
    font-size: 12px;
    margin-top: 5px;
    display: block;
}

/* Стили для загрузки файлов */
.file-upload-area {
    border: 2px dashed #ddd;
    border-radius: 8px;
    padding: 40px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #fafafa;
}

.file-upload-area:hover {
    border-color: #2196F3;
    background: #f0f8ff;
}

.file-upload-area.dragover {
    border-color: #2196F3;
    background: #e3f2fd;
}

.file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 6px;
    margin-bottom: 8px;
    border: 1px solid #e9ecef;
    transition: all 0.3s ease;
}

.file-item:hover {
    background: #e9ecef;
}

.file-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.file-details {
    display: flex;
    flex-direction: column;
}

.file-name {
    font-weight: 600;
    color: #333;
}

.file-size {
    font-size: 12px;
    color: #666;
}

.file-remove {
    color: #999;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.file-remove:hover {
    color: #f44336;
    background: rgba(244, 67, 54, 0.1);
}

/* Стили для критериев оценки */
.criteria-item {
    display: flex;
    gap: 15px;
    align-items: flex-end;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 10px;
    border: 1px solid #e9ecef;
    transition: all 0.3s ease;
}

.criteria-item:hover {
    background: #e9ecef;
}

.criteria-inputs {
    display: flex;
    gap: 15px;
    flex: 1;
}

.criteria-actions {
    display: flex;
    align-items: center;
}

.criteria-remove {
    color: #999;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.criteria-remove:hover {
    color: #f44336;
    background: rgba(244, 67, 54, 0.1);
}

/* Стили для прогресс-баров */
.progress-bar {
    height: 8px;
    background: #e9ecef;
    border-radius: 4px;
    overflow: hidden;
    flex: 1;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4CAF50, #45a049);
    border-radius: 4px;
    transition: width 1s ease-in-out;
}

/* Стили для статусов */
.status-new {
    background: #e3f2fd;
    color: #1976d2;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

.status-in-progress {
    background: #fff3e0;
    color: #f57c00;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

.status-reviewed {
    background: #e8f5e8;
    color: #388e3c;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

.status-overdue {
    background: #ffebee;
    color: #d32f2f;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

.status-pending {
    background: #fff3e0;
    color: #f57c00;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

.status-returned {
    background: #ffebee;
    color: #d32f2f;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

.status-completed {
    background: #e8f5e8;
    color: #388e3c;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

/* Стили для модальных окон */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.modal-overlay.active {
    opacity: 1;
    visibility: visible;
}

.modal {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    transform: scale(0.7);
    transition: all 0.3s ease;
}

.modal-overlay.active .modal {
    transform: scale(1);
}

.modal-header {
    padding: 20px 24px 0;
    display: flex;
    align-items: center;
    gap: 12px;
}

.modal-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #4CAF50;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
}

.modal-title {
    font-size: 20px;
    font-weight: 700;
    color: #333;
    margin: 0;
}

.modal-content {
    padding: 20px 24px;
    color: #666;
    line-height: 1.5;
}

.modal-actions {
    padding: 0 24px 20px;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
}
`;

// Добавляем стили в документ
const styleElement = document.createElement('style');
styleElement.textContent = alertStyles;
document.head.appendChild(styleElement);

// Основная функция инициализации страниц домашних заданий
export function initHomeworkPages(currentPath) {
    console.log('Initializing homework pages for path:', currentPath);
    
    if (currentPath.includes('homework.html')) {
        initHomeworkListPage();
    } else if (currentPath.includes('homework-create.html')) {
        initHomeworkCreatePage();
    } else if (currentPath.includes('homework-detail.html')) {
        initHomeworkDetailPage();
    } else if (currentPath.includes('homework-results.html')) {
        initHomeworkResultsPage();
    } else if (currentPath.includes('homework-review.html')) {
        initHomeworkReviewPage();
    } else if (currentPath.includes('homework-templates.html')) {
        initHomeworkTemplatesPage();
    }
}

// Вспомогательная функция для показа уведомлений
function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    
    const icon = getAlertIcon(type);
    
    alert.innerHTML = `
        <div class="alert-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="alert-content">
            ${message}
        </div>
        <button class="alert-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(alert);
    
    // Анимация появления
    setTimeout(() => {
        alert.classList.add('visible');
    }, 10);
    
    // Закрытие по клику
    alert.querySelector('.alert-close').addEventListener('click', function() {
        alert.classList.remove('visible');
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 300);
    });
    
    // Автоматическое закрытие для success и info
    if (type === 'success' || type === 'info') {
        setTimeout(() => {
            if (alert.parentNode) {
                alert.classList.remove('visible');
                setTimeout(() => {
                    if (alert.parentNode) {
                        alert.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
}

function getAlertIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        case 'info': return 'fa-info-circle';
        default: return 'fa-info-circle';
    }
}

// ===== СТРАНИЦА СПИСКА ДОМАШНИХ ЗАДАНИЙ =====
function initHomeworkListPage() {
    console.log('Initializing homework list page');
    initHomeworkFilters();
    initHomeworkCardInteractions();
}

function initHomeworkFilters() {
    const subjectFilter = document.getElementById('subject');
    const statusFilter = document.getElementById('status');
    const dueDateFilter = document.getElementById('due-date');
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    if (!subjectFilter && !statusFilter) {
        console.log('Homework filters not found on this page');
        return;
    }
    
    function filterHomework() {
        const subjectValue = subjectFilter ? subjectFilter.value : 'all';
        const statusValue = statusFilter ? statusFilter.value : 'all';
        const dueDateValue = dueDateFilter ? dueDateFilter.value : '';
        const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
        
        const homeworkCards = document.querySelectorAll('.homework-card');
        
        homeworkCards.forEach(card => {
            const cardSubject = card.querySelector('.homework-subject')?.textContent.toLowerCase() || '';
            const cardStatus = card.querySelector('.homework-status')?.textContent.toLowerCase() || '';
            const cardTitle = card.querySelector('.homework-title')?.textContent.toLowerCase() || '';
            const cardDueDateElement = card.querySelector('.homework-info-item:nth-child(2) .homework-info-value');
            const cardDueDate = cardDueDateElement ? cardDueDateElement.textContent : '';
            
            let showCard = true;
            
            // Фильтр по предмету
            if (subjectValue !== 'all' && subjectFilter) {
                const subjectText = subjectFilter.options[subjectFilter.selectedIndex].text.toLowerCase();
                if (!cardSubject.includes(subjectText)) {
                    showCard = false;
                }
            }
            
            // Фильтр по статусу
            if (statusValue !== 'all' && statusFilter) {
                let statusClass = '';
                switch(statusValue) {
                    case 'new': statusClass = 'status-new'; break;
                    case 'in-progress': statusClass = 'status-in-progress'; break;
                    case 'reviewed': statusClass = 'status-reviewed'; break;
                    case 'overdue': statusClass = 'status-overdue'; break;
                }
                
                if (!card.querySelector('.homework-status')?.classList.contains(statusClass)) {
                    showCard = false;
                }
            }
            
            // Фильтр по дате сдачи
            if (dueDateValue && cardDueDate) {
                const dueDateParts = cardDueDate.split('.');
                const cardDueDateFormatted = `${dueDateParts[2]}-${dueDateParts[1]}-${dueDateParts[0]}`;
                
                if (cardDueDateFormatted !== dueDateValue) {
                    showCard = false;
                }
            }
            
            // Поиск по названию
            if (searchValue && !cardTitle.includes(searchValue)) {
                showCard = false;
            }
            
            // Показать/скрыть карточку
            card.style.display = showCard ? 'block' : 'none';
        });
        
        // Показать сообщение, если ничего не найдено
        const visibleCards = document.querySelectorAll('.homework-card[style="display: block"]');
        const noResultsMessage = document.getElementById('no-results-message');
        
        if (visibleCards.length === 0) {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.id = 'no-results-message';
                message.className = 'no-results fade-in';
                message.innerHTML = `
                    <i class="fas fa-search"></i>
                    <h3>Задания не найдены</h3>
                    <p>Попробуйте изменить параметры фильтрации</p>
                `;
                document.querySelector('.homework-grid')?.appendChild(message);
                setTimeout(() => message.classList.add('visible'), 100);
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }
    
    // События для фильтров
    if (subjectFilter) subjectFilter.addEventListener('change', filterHomework);
    if (statusFilter) statusFilter.addEventListener('change', filterHomework);
    if (dueDateFilter) dueDateFilter.addEventListener('change', filterHomework);
    if (searchButton) searchButton.addEventListener('click', filterHomework);
    if (searchInput) {
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                filterHomework();
            }
        });
    }
    
    // Инициализация при загрузке
    setTimeout(filterHomework, 100);
}

function initHomeworkCardInteractions() {
    const homeworkCards = document.querySelectorAll('.homework-card');
    
    homeworkCards.forEach(card => {
        // Анимация при наведении
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
        
        // Клик по карточке (кроме кнопок)
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.btn')) {
                const detailLink = this.querySelector('a[href*="homework-detail"]');
                if (detailLink) {
                    window.location.href = detailLink.getAttribute('href');
                }
            }
        });
    });
}

// ===== СТРАНИЦА СОЗДАНИЯ ДОМАШНЕГО ЗАДАНИЯ =====
function initHomeworkCreatePage() {
    console.log('Initializing homework creation page');
    initHomeworkForm();
    initTemplatePreview();
    initCriteriaManagement();
    initFileUploadSection();
    initFormSubmission();
}

function initHomeworkForm() {
    const form = document.querySelector('.form-content');
    if (!form) return;

    // Установка дат по умолчанию
    setupDateDefaults();
    
    // Базовая валидация
    initBasicValidation();
}

function setupDateDefaults() {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    const startDateInput = document.getElementById('assignment-start');
    const dueDateInput = document.getElementById('assignment-due');
    
    if (startDateInput && !startDateInput.value) {
        startDateInput.valueAsDate = today;
    }
    if (dueDateInput && !dueDateInput.value) {
        dueDateInput.valueAsDate = nextWeek;
    }
    
    // Валидация дат
    if (startDateInput && dueDateInput) {
        startDateInput.addEventListener('change', function() {
            const startDate = new Date(this.value);
            const dueDate = new Date(dueDateInput.value);
            
            if (dueDate < startDate) {
                dueDateInput.valueAsDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
                updatePreview();
            }
        });
        
        dueDateInput.addEventListener('change', function() {
            const startDate = new Date(startDateInput.value);
            const dueDate = new Date(this.value);
            
            if (dueDate < startDate) {
                showAlert('Срок сдачи не может быть раньше даты выдачи', 'error');
                this.valueAsDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
            }
            updatePreview();
        });
    }
}

function initBasicValidation() {
    const requiredFields = document.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
    });
}

function initCriteriaManagement() {
    const addCriteriaBtn = document.getElementById('add-criteria-btn');
    const criteriaList = document.getElementById('criteria-list');
    
    if (!addCriteriaBtn || !criteriaList) return;
    
    let criteriaCount = criteriaList.querySelectorAll('.criteria-item').length || 1;
    
    addCriteriaBtn.addEventListener('click', function() {
        criteriaCount++;
        
        const criteriaItem = document.createElement('div');
        criteriaItem.className = 'criteria-item fade-in';
        
        criteriaItem.innerHTML = `
            <div class="criteria-inputs">
                <div class="form-group">
                    <label>Критерий ${criteriaCount}</label>
                    <input type="text" placeholder="Название критерия" class="criteria-name">
                </div>
                <div class="form-group">
                    <label>Баллы</label>
                    <input type="number" min="1" max="10" value="1" class="criteria-points">
                </div>
            </div>
            <div class="criteria-actions">
                <i class="fas fa-times criteria-remove" title="Удалить критерий"></i>
            </div>
        `;
        
        criteriaList.appendChild(criteriaItem);
        
        // Анимация появления
        setTimeout(() => {
            criteriaItem.classList.add('visible');
        }, 10);
        
        // Добавление функциональности удаления
        criteriaItem.querySelector('.criteria-remove').addEventListener('click', function() {
            if (criteriaCount > 1) {
                criteriaItem.style.opacity = '0';
                criteriaItem.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    criteriaItem.remove();
                    criteriaCount--;
                    updateCriteriaNumbers();
                    updateTotalScorePreview();
                }, 300);
            } else {
                showAlert('Должен остаться хотя бы один критерий оценки', 'warning');
            }
        });
        
        // Обновление общего балла при изменении
        const pointsInput = criteriaItem.querySelector('.criteria-points');
        pointsInput.addEventListener('input', updateTotalScorePreview);
        
        updateCriteriaNumbers();
        updateTotalScorePreview();
    });

    // Добавление функциональности удаления к изначальным критериям
    const initialRemoveBtns = criteriaList.querySelectorAll('.criteria-remove');
    initialRemoveBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const criteriaItem = this.closest('.criteria-item');
            if (criteriaCount > 1) {
                criteriaItem.style.opacity = '0';
                criteriaItem.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    criteriaItem.remove();
                    criteriaCount--;
                    updateCriteriaNumbers();
                    updateTotalScorePreview();
                }, 300);
            } else {
                showAlert('Должен остаться хотя бы один критерий оценки', 'warning');
            }
        });
    });

    // Обновление общего балла при изменении существующих полей
    criteriaList.querySelectorAll('.criteria-points').forEach(input => {
        input.addEventListener('input', updateTotalScorePreview);
    });
}

function updateCriteriaNumbers() {
    const criteriaList = document.getElementById('criteria-list');
    if (!criteriaList) return;
    
    const criteriaItems = criteriaList.querySelectorAll('.criteria-item');
    criteriaItems.forEach((item, index) => {
        const label = item.querySelector('label');
        if (label) {
            label.textContent = `Критерий ${index + 1}`;
        }
    });
}

function updateTotalScorePreview() {
    const criteriaPoints = document.querySelectorAll('.criteria-points');
    let totalScore = 0;
    
    criteriaPoints.forEach(input => {
        totalScore += parseInt(input.value) || 0;
    });
    
    const maxScoreInput = document.getElementById('max-score');
    if (maxScoreInput) {
        maxScoreInput.value = totalScore;
    }
    
    const previewScore = document.getElementById('preview-score');
    if (previewScore) {
        previewScore.textContent = totalScore;
    }
}

function initTemplatePreview() {
    const previewElements = {
        title: document.getElementById('preview-title'),
        subject: document.getElementById('preview-subject'),
        description: document.getElementById('preview-description'),
        difficulty: document.getElementById('preview-difficulty'),
        due: document.getElementById('preview-due'),
        score: document.getElementById('preview-score'),
        time: document.getElementById('preview-time')
    };
    
    const formElements = {
        title: document.getElementById('assignment-title'),
        subject: document.getElementById('assignment-subject'),
        difficulty: document.getElementById('assignment-difficulty'),
        description: document.getElementById('assignment-description'),
        due: document.getElementById('assignment-due'),
        time: document.getElementById('assignment-time'),
        score: document.getElementById('max-score')
    };
    
    // Проверка наличия всех элементов
    const hasAllElements = Object.values(previewElements).every(el => el !== null) && 
                          Object.values(formElements).every(el => el !== null);
    
    if (!hasAllElements) {
        console.log('Some preview elements are missing');
        return;
    }
    
    function updatePreview() {
        previewElements.title.textContent = formElements.title.value || 'Название задания';
        
        const subjectText = formElements.subject.options[formElements.subject.selectedIndex].text;
        previewElements.subject.textContent = subjectText !== 'Выберите предмет' ? subjectText : 'Предмет';
        
        previewElements.description.textContent = formElements.description.value || 'Описание задания появится здесь после ввода.';
        
        const difficultyText = formElements.difficulty.options[formElements.difficulty.selectedIndex].text;
        previewElements.difficulty.textContent = difficultyText;
        
        previewElements.due.textContent = formElements.due.value ? formatDate(formElements.due.value) : '--.--.----';
        previewElements.score.textContent = formElements.score.value || '10';
        previewElements.time.textContent = formElements.time.value ? `${formElements.time.value} ч` : '- ч';
    }
    
    // Форматирование даты для отображения
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    }
    
    // Начальное обновление предпросмотра
    updatePreview();
    
    // Обновление предпросмотра при изменениях в форме
    Object.values(formElements).forEach(element => {
        if (element) {
            element.addEventListener('input', updatePreview);
            element.addEventListener('change', updatePreview);
        }
    });
    
    // Ручное обновление предпросмотра
    const refreshPreviewBtn = document.getElementById('refresh-preview-btn');
    if (refreshPreviewBtn) {
        refreshPreviewBtn.addEventListener('click', function() {
            updatePreview();
            showAlert('Предпросмотр обновлен', 'success');
        });
    }
}

function initFileUploadSection() {
    const fileUploadArea = document.getElementById('file-upload-area');
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');
    
    if (!fileUploadArea || !fileInput || !fileList) return;
    
    // Используем базовую загрузку файлов
    initBasicFileUpload(fileUploadArea, fileInput, fileList);
}

function initBasicFileUpload(uploadArea, input, list) {
    // Добавляем класс для стилизации
    uploadArea.classList.add('file-upload-area');
    
    uploadArea.addEventListener('click', function() {
        input.click();
    });
    
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function() {
        this.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        
        if (e.dataTransfer.files.length > 0) {
            Array.from(e.dataTransfer.files).forEach(file => {
                addFileToList(file, list);
            });
        }
    });
    
    input.addEventListener('change', function() {
        if (this.files.length > 0) {
            Array.from(this.files).forEach(file => {
                addFileToList(file, list);
            });
            this.value = ''; // Сброс input для возможности повторной загрузки того же файла
        }
    });
}

function addFileToList(file, list) {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item fade-in';
    
    const fileExtension = file.name.split('.').pop().toLowerCase();
    let fileIcon = 'fa-file';
    
    if (['pdf'].includes(fileExtension)) {
        fileIcon = 'fa-file-pdf';
    } else if (['doc', 'docx'].includes(fileExtension)) {
        fileIcon = 'fa-file-word';
    } else if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'].includes(fileExtension)) {
        fileIcon = 'fa-file-image';
    } else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(fileExtension)) {
        fileIcon = 'fa-file-archive';
    } else if (['xls', 'xlsx'].includes(fileExtension)) {
        fileIcon = 'fa-file-excel';
    } else if (['ppt', 'pptx'].includes(fileExtension)) {
        fileIcon = 'fa-file-powerpoint';
    }
    
    const fileSize = formatFileSize(file.size);
    
    fileItem.innerHTML = `
        <div class="file-info">
            <i class="fas ${fileIcon}"></i>
            <div class="file-details">
                <div class="file-name">${file.name}</div>
                <div class="file-size">${fileSize}</div>
            </div>
        </div>
        <div class="file-remove" title="Удалить файл">
            <i class="fas fa-times"></i>
        </div>
    `;
    
    list.appendChild(fileItem);
    
    // Анимация появления
    setTimeout(() => {
        fileItem.classList.add('visible');
    }, 10);
    
    // Функциональность удаления
    fileItem.querySelector('.file-remove').addEventListener('click', function() {
        fileItem.style.opacity = '0';
        fileItem.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            fileItem.remove();
        }, 300);
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function initFormSubmission() {
    const saveDraftBtn = document.getElementById('save-draft-btn');
    const createAssignmentBtn = document.getElementById('create-assignment-btn');
    const successModal = document.getElementById('success-modal');
    const viewAssignmentBtn = document.getElementById('view-assignment-btn');
    
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function() {
            if (validateForm(true)) {
                // В реальном приложении здесь был бы запрос к серверу для сохранения черновика
                showAlert('Черновик успешно сохранен', 'success');
                
                // Анимация кнопки
                this.innerHTML = '<i class="fas fa-check"></i> Сохранено';
                this.classList.add('btn-success');
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-save"></i> Сохранить черновик';
                    this.classList.remove('btn-success');
                }, 2000);
            }
        });
    }
    
    if (createAssignmentBtn) {
        createAssignmentBtn.addEventListener('click', function() {
            if (validateForm()) {
                // В реальном приложении здесь был бы запрос к серверу для создания задания
                if (successModal) {
                    successModal.classList.add('active');
                } else {
                    showAlert('Задание успешно создано!', 'success');
                    setTimeout(() => {
                        window.location.href = '/frontend/templates/homework/homework.html';
                    }, 2000);
                }
            }
        });
    }
    
    if (viewAssignmentBtn) {
        viewAssignmentBtn.addEventListener('click', function() {
            // В реальном приложении здесь был бы переход к созданному заданию
            window.location.href = '/frontend/templates/homework/homework-detail.html';
        });
    }
}

function validateForm(isDraft = false) {
    const title = document.getElementById('assignment-title');
    const subject = document.getElementById('assignment-subject');
    const description = document.getElementById('assignment-description');
    const dueDate = document.getElementById('assignment-due');
    
    let isValid = true;
    
    // Сброс предыдущих ошибок
    document.querySelectorAll('.pifagor_error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.pifagor_error-message').forEach(el => el.remove());
    
    if (!isDraft) {
        if (!title || !title.value.trim()) {
            markFieldError(title, 'Введите название задания');
            isValid = false;
        }
        
        if (!subject || !subject.value) {
            markFieldError(subject, 'Выберите предмет');
            isValid = false;
        }
        
        if (!description || !description.value.trim()) {
            markFieldError(description, 'Введите описание задания');
            isValid = false;
        }
        
        if (!dueDate || !dueDate.value) {
            markFieldError(dueDate, 'Укажите срок сдачи');
            isValid = false;
        }
    }
    
    if (!isValid && !isDraft) {
        showAlert('Пожалуйста, заполните все обязательные поля', 'error');
        // Прокрутка к первой ошибке
        const firstError = document.querySelector('.pifagor_error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
    }
    
    return isDraft ? true : isValid;
}

function markFieldError(field, message) {
    if (!field) return;
    
    field.classList.add('error');
    
    // Создание или обновление сообщения об ошибке
    let errorElement = field.parentNode.querySelector('.pifagor_error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'pifagor_error-message';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

// ===== СТРАНИЦА ВЫПОЛНЕНИЯ ДОМАШНЕГО ЗАДАНИЯ =====
function initHomeworkDetailPage() {
    console.log('Initializing homework detail page');
    initSubmissionOptions();
    initHomeworkSubmission();
    initHomeworkSidebar();
    initDeadlineCounter();
}

function initSubmissionOptions() {
    const textOption = document.getElementById('text-option');
    const fileOption = document.getElementById('file-option');
    const textForm = document.getElementById('text-form');
    const fileForm = document.getElementById('file-form');
    const fileUploadArea = document.getElementById('file-upload-area');
    const fileInput = document.getElementById('file-input');
    const fileName = document.getElementById('file-name');
    
    if (!textOption || !fileOption) return;
    
    textOption.addEventListener('click', function() {
        textOption.classList.add('active');
        fileOption.classList.remove('active');
        if (textForm) textForm.style.display = 'block';
        if (fileForm) fileForm.style.display = 'none';
    });
    
    fileOption.addEventListener('click', function() {
        fileOption.classList.add('active');
        textOption.classList.remove('active');
        if (fileForm) fileForm.style.display = 'block';
        if (textForm) textForm.style.display = 'none';
    });
    
    // Обработка загрузки файла
    if (fileUploadArea && fileInput && fileName) {
        fileUploadArea.addEventListener('click', function() {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', function() {
            if (fileInput.files.length > 0) {
                fileName.textContent = `Выбран файл: ${fileInput.files[0].name}`;
                fileName.style.color = 'var(--success-color)';
            } else {
                fileName.textContent = '';
            }
        });
    }
}

function initHomeworkSubmission() {
    const submitBtn = document.getElementById('submit-btn');
    const saveDraftBtn = document.getElementById('save-draft-btn');
    const resultsSection = document.getElementById('results');
    const feedbackText = document.getElementById('feedback-text');
    
    if (!submitBtn) return;
    
    submitBtn.addEventListener('click', function() {
        const solutionText = document.getElementById('solution-text');
        const fileInput = document.getElementById('file-input');
        const file = fileInput?.files[0];
        const textOption = document.getElementById('text-option');
        
        // Проверка, что пользователь что-то отправил
        if (textOption?.classList.contains('active') && (!solutionText || !solutionText.value.trim())) {
            showAlert('Пожалуйста, введите ваше решение или загрузите файл с решением', 'warning');
            solutionText?.focus();
            return;
        }
        
        if (!textOption?.classList.contains('active') && !file) {
            showAlert('Пожалуйста, выберите файл для загрузки', 'warning');
            return;
        }
        
        // Анимация отправки
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        this.disabled = true;
        
        // Имитация отправки на сервер
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
            
            // В реальном приложении здесь был бы запрос к серверу для отправки задания
            if (textOption?.classList.contains('active')) {
                if (feedbackText) {
                    feedbackText.textContent = 'Ваша работа успешно отправлена на проверку. Результат будет доступен после проверки преподавателем. Обычно проверка занимает 1-3 рабочих дня.';
                }
            } else {
                if (feedbackText) {
                    feedbackText.textContent = `Файл "${file.name}" успешно загружен и отправлен на проверку. Результат будет доступен после проверки преподавателем. Обычно проверка занимает 1-3 рабочих дня.`;
                }
            }
            
            if (resultsSection) {
                resultsSection.style.display = 'block';
                resultsSection.scrollIntoView({ behavior: 'smooth' });
                showAlert('Работа успешно отправлена на проверку', 'success');
            }
        }, 1500);
    });
    
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function() {
            const solutionText = document.getElementById('solution-text');
            
            // В реальном приложении здесь был бы запрос к серверу для сохранения черновика
            showAlert('Черновик успешно сохранен', 'success');
            
            // Анимация кнопки
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Сохранено';
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    }
}

function initHomeworkSidebar() {
    // Инициализация интерактивных элементов боковой панели
    const tipsItems = document.querySelectorAll('.tips-list li');
    const resourceLinks = document.querySelectorAll('.resources-list a');
    
    tipsItems.forEach((tip, index) => {
        tip.style.animationDelay = `${index * 0.1}s`;
        tip.classList.add('fade-in');
        setTimeout(() => tip.classList.add('visible'), 100);
    });
    
    resourceLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

function initDeadlineCounter() {
    const deadlineElement = document.querySelector('.meta-item span');
    if (!deadlineElement) return;
    
    const deadlineText = deadlineElement.textContent;
    const deadlineMatch = deadlineText.match(/(\d{2})\.(\d{2})\.(\d{4})/);
    
    if (deadlineMatch) {
        const deadlineDate = new Date(`${deadlineMatch[3]}-${deadlineMatch[2]}-${deadlineMatch[1]}`);
        updateDeadlineCounter(deadlineDate);
    }
}

function updateDeadlineCounter(deadlineDate) {
    const now = new Date();
    const timeDiff = deadlineDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    const daysLeftElement = document.querySelector('.info-item:nth-child(5) .info-value');
    if (daysLeftElement) {
        daysLeftElement.textContent = `${daysLeft} ${getDaysText(daysLeft)}`;
        
        if (daysLeft <= 0) {
            daysLeftElement.style.color = 'var(--pifagor_error-color)';
            daysLeftElement.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Просрочено`;
        } else if (daysLeft <= 3) {
            daysLeftElement.style.color = 'var(--warning-color)';
        }
    }
}

function getDaysText(days) {
    if (days % 10 === 1 && days % 100 !== 11) return 'день';
    if (days % 10 >= 2 && days % 10 <= 4 && (days % 100 < 10 || days % 100 >= 20)) return 'дня';
    return 'дней';
}

// ===== СТРАНИЦА РЕЗУЛЬТАТОВ ПРОВЕРКИ =====
function initHomeworkResultsPage() {
    console.log('Initializing homework results page');
    initResultsTabs();
    initResubmissionHandler();
    initProgressBars();
    initFeedbackInteractions();
}

function initResultsTabs() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Убираем активный класс у всех вкладок и контента
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Добавляем активный класс к выбранной вкладке и контенту
            tab.classList.add('active');
            const targetTab = document.getElementById(`${tabId}-tab`);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
}

function initResubmissionHandler() {
    const resubmitBtn = document.getElementById('resubmit-btn');
    
    if (resubmitBtn) {
        resubmitBtn.addEventListener('click', function() {
            if (confirm('Вы уверены, что хотите пересдать это задание? У вас осталось 2 попытки.')) {
                // В реальном приложении здесь был бы переход к странице сдачи задания
                window.location.href = '/frontend/templates/homework/homework-detail.html';
            }
        });
    }
}

function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width;
        }, 300);
    });
}

function initFeedbackInteractions() {
    const feedbackCard = document.querySelector('.feedback-card');
    
    if (feedbackCard) {
        feedbackCard.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    }
    
    // Анимация появления критериев
    const criteriaItems = document.querySelectorAll('.criteria-item');
    criteriaItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
        setTimeout(() => item.classList.add('visible'), 100);
    });
}

// ===== СТРАНИЦА ПРОВЕРКИ ПРЕПОДАВАТЕЛЕМ =====
function initHomeworkReviewPage() {
    console.log('Initializing homework review page');
    initReviewInterface();
    initReviewFilters();
    initScoreCalculation();
    initReviewSubmission();
    initNextSubmissionHandler();
}

function initReviewInterface() {
    initSubmissionSwitcher();
    initReviewTabs();
}

function initSubmissionSwitcher() {
    const submissionItems = document.querySelectorAll('.submission-item');
    
    submissionItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            submissionItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // In a real app, we would load the submission data here
            const studentName = this.querySelector('.student-name')?.textContent;
            const assignmentTitle = this.querySelector('.assignment-title')?.textContent;
            
            if (studentName) {
                const studentNameElement = document.querySelector('.student-details h3');
                if (studentNameElement) studentNameElement.textContent = studentName;
            }
            if (assignmentTitle) {
                const assignmentNameElement = document.querySelector('.assignment-name');
                if (assignmentNameElement) assignmentNameElement.textContent = assignmentTitle;
            }
            
            // Update avatar initials
            if (studentName) {
                const names = studentName.split(' ');
                const initials = names[0].charAt(0) + (names[1] ? names[1].charAt(0) : '');
                const avatar = document.querySelector('.student-avatar');
                if (avatar) {
                    avatar.textContent = initials;
                }
            }
            
            // Reset form for new submission
            resetReviewForm();
        });
    });
}

function resetReviewForm() {
    const overallScoreInput = document.getElementById('overall-score');
    const criteriaInputs = document.querySelectorAll('.criteria-input');
    const feedbackTextarea = document.getElementById('feedback');
    const teacherCommentTextarea = document.getElementById('teacher-comment');
    
    if (overallScoreInput) overallScoreInput.value = 0;
    criteriaInputs.forEach(input => input.value = 0);
    if (feedbackTextarea) feedbackTextarea.value = '';
    if (teacherCommentTextarea) teacherCommentTextarea.value = '';
    
    // Recalculate total score
    calculateTotalScore();
}

function initReviewTabs() {
    const reviewTabs = document.querySelectorAll('.review-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    reviewTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            reviewTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetTab = document.getElementById(`${tabId}-tab`);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
}

function initReviewFilters() {
    const subjectFilter = document.getElementById('subject');
    const statusFilter = document.getElementById('status');
    const groupFilter = document.getElementById('group');
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    if (!subjectFilter && !statusFilter) return;
    
    function filterSubmissions() {
        const subjectValue = subjectFilter ? subjectFilter.value : 'all';
        const statusValue = statusFilter ? statusFilter.value : 'all';
        const groupValue = groupFilter ? groupFilter.value : 'all';
        const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
        
        const submissionItems = document.querySelectorAll('.submission-item');
        
        submissionItems.forEach(item => {
            const studentName = item.querySelector('.student-name')?.textContent.toLowerCase() || '';
            const assignmentTitle = item.querySelector('.assignment-title')?.textContent.toLowerCase() || '';
            const status = item.querySelector('.submission-status')?.textContent.toLowerCase() || '';
            
            let showItem = true;
            
            // Filter by subject (simulated)
            if (subjectValue !== 'all') {
                // This would normally check a data attribute
                // For demo, we'll just show all if math is selected (since most are math)
                if (subjectValue !== 'math') {
                    showItem = false;
                }
            }
            
            // Filter by status
            if (statusValue !== 'all') {
                let statusClass = '';
                switch(statusValue) {
                    case 'pending': statusClass = 'ожидает'; break;
                    case 'reviewed': statusClass = 'проверено'; break;
                    case 'returned': statusClass = 'возвращено'; break;
                }
                
                if (!status.includes(statusClass)) {
                    showItem = false;
                }
            }
            
            // Search by student name or assignment title
            if (searchValue && !studentName.includes(searchValue) && !assignmentTitle.includes(searchValue)) {
                showItem = false;
            }
            
            // Show/hide item
            item.style.display = showItem ? 'flex' : 'none';
        });
        
        // Update counter
        updatePendingCounter();
    }
    
    function updatePendingCounter() {
        const pendingItems = document.querySelectorAll('.submission-item[style="display: flex"] .status-pending');
        const pendingCounter = document.querySelector('.stat-item:first-child .stat-value');
        
        if (pendingCounter && pendingItems.length > 0) {
            pendingCounter.textContent = pendingItems.length;
        }
    }
    
    // Event listeners for filters
    if (subjectFilter) subjectFilter.addEventListener('change', filterSubmissions);
    if (statusFilter) statusFilter.addEventListener('change', filterSubmissions);
    if (groupFilter) groupFilter.addEventListener('change', filterSubmissions);
    if (searchButton) searchButton.addEventListener('click', filterSubmissions);
    if (searchInput) {
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                filterSubmissions();
            }
        });
    }
    
    // Initial filter
    setTimeout(filterSubmissions, 100);
}

function initScoreCalculation() {
    const criteriaInputs = document.querySelectorAll('.criteria-input');
    const overallScoreInput = document.getElementById('overall-score');
    const totalScoreValue = document.getElementById('total-score-value');
    
    if (!criteriaInputs.length || !overallScoreInput || !totalScoreValue) return;
    
    function calculateTotalScore() {
        let total = 0;
        criteriaInputs.forEach(input => {
            total += parseInt(input.value) || 0;
        });
        
        // Update overall score input
        overallScoreInput.value = total;
        
        // Update total score display
        totalScoreValue.textContent = `${total} / 10`;
        
        // Update grade color based on score
        updateGradeColor(total);
    }
    
    function updateGradeColor(score) {
        const maxScore = 10;
        const percentage = (score / maxScore) * 100;
        
        if (percentage >= 80) {
            totalScoreValue.style.color = 'var(--success-color)';
        } else if (percentage >= 60) {
            totalScoreValue.style.color = 'var(--warning-color)';
        } else {
            totalScoreValue.style.color = 'var(--pifagor_error-color)';
        }
    }
    
    // Update total score when criteria inputs change
    criteriaInputs.forEach(input => {
        input.addEventListener('input', calculateTotalScore);
    });
    
    // Update total score when overall score changes
    overallScoreInput.addEventListener('input', function() {
        totalScoreValue.textContent = `${this.value} / 10`;
        updateGradeColor(parseInt(this.value) || 0);
    });
    
    // Initial calculation
    calculateTotalScore();
}

function initReviewSubmission() {
    const saveDraftBtn = document.getElementById('save-draft-btn');
    const returnBtn = document.getElementById('return-btn');
    const submitReviewBtn = document.getElementById('submit-review-btn');
    const successModal = document.getElementById('success-modal');
    
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function() {
            // In a real app, this would save the review as a draft
            showAlert('Черновик оценки сохранен', 'success');
            
            // Button feedback
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Сохранено';
            setTimeout(() => {
                this.innerHTML = originalHTML;
            }, 2000);
        });
    }
    
    if (returnBtn) {
        returnBtn.addEventListener('click', function() {
            if (confirm('Вы уверены, что хотите вернуть эту работу на доработку? Студент получит уведомление и сможет исправить работу.')) {
                // In a real app, this would mark the submission as returned
                showAlert('Работа возвращена студенту на доработку', 'success');
                
                // Update status in the list
                const activeSubmission = document.querySelector('.submission-item.active');
                if (activeSubmission) {
                    const statusElement = activeSubmission.querySelector('.submission-status');
                    if (statusElement) {
                        statusElement.textContent = 'Возвращено';
                        statusElement.className = 'submission-status status-returned';
                    }
                }
            }
        });
    }
    
    if (submitReviewBtn) {
        submitReviewBtn.addEventListener('click', function() {
            const overallScore = document.getElementById('overall-score')?.value;
            const feedback = document.getElementById('feedback')?.value;
            
            if (!overallScore || overallScore === '0') {
                showAlert('Пожалуйста, укажите оценку', 'warning');
                return;
            }
            
            if (!feedback || !feedback.trim()) {
                showAlert('Пожалуйста, напишите обратную связь для студента', 'warning');
                return;
            }
            
            if (confirm('Вы уверены, что хотите отправить оценку? Студент получит уведомление с результатами проверки.')) {
                // In a real app, this would submit the review
                if (successModal) {
                    successModal.classList.add('active');
                }
                
                // Update status in the list
                const activeSubmission = document.querySelector('.submission-item.active');
                if (activeSubmission) {
                    const statusElement = activeSubmission.querySelector('.submission-status');
                    if (statusElement) {
                        statusElement.textContent = 'Проверено';
                        statusElement.className = 'submission-status status-reviewed';
                    }
                }
                
                showAlert('Оценка успешно отправлена студенту', 'success');
            }
        });
    }
}

function initNextSubmissionHandler() {
    const nextSubmissionBtn = document.getElementById('next-submission-btn');
    
    if (nextSubmissionBtn) {
        nextSubmissionBtn.addEventListener('click', function() {
            const successModal = document.getElementById('success-modal');
            if (successModal) {
                successModal.classList.remove('active');
            }
            
            // Find current active submission
            const currentActive = document.querySelector('.submission-item.active');
            const nextItem = currentActive?.nextElementSibling;
            
            if (nextItem && nextItem.classList.contains('submission-item')) {
                // Remove active class from current item
                currentActive.classList.remove('active');
                
                // Add active class to next item
                nextItem.classList.add('active');
                
                // Simulate loading next submission
                const studentName = nextItem.querySelector('.student-name')?.textContent;
                const assignmentTitle = nextItem.querySelector('.assignment-title')?.textContent;
                
                if (studentName) {
                    document.querySelector('.student-name').textContent = studentName;
                }
                if (assignmentTitle) {
                    document.querySelector('.assignment-name').textContent = assignmentTitle;
                }
                
                // Update avatar initials
                if (studentName) {
                    const names = studentName.split(' ');
                    const initials = names[0].charAt(0) + (names[1] ? names[1].charAt(0) : '');
                    const avatar = document.querySelector('.student-avatar');
                    if (avatar) {
                        avatar.textContent = initials;
                    }
                }
                
                // Reset form for new submission
                resetReviewForm();
                
                // Switch to submission tab
                const reviewTabs = document.querySelectorAll('.review-tab');
                const tabContents = document.querySelectorAll('.tab-content');
                
                reviewTabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                const submissionTab = document.querySelector('.review-tab[data-tab="submission"]');
                const submissionTabContent = document.getElementById('submission-tab');
                
                if (submissionTab) submissionTab.classList.add('active');
                if (submissionTabContent) submissionTabContent.classList.add('active');
                
                showAlert('Переход к следующей работе', 'info');
            } else {
                showAlert('Это последняя работа в списке', 'info');
            }
        });
    }
}

// ===== СТРАНИЦА ШАБЛОНОВ ДОМАШНИХ ЗАДАНИЙ =====
function initHomeworkTemplatesPage() {
    console.log('Initializing homework templates page');
    initTemplateFilters();
    initTemplatePreviewModal();
    initTemplateUsage();
    initTemplateCardInteractions();
}

function initTemplateFilters() {
    const subjectFilter = document.getElementById('subject');
    const difficultyFilter = document.getElementById('difficulty');
    const typeFilter = document.getElementById('type');
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    if (!subjectFilter && !difficultyFilter) return;
    
    function filterTemplates() {
        const subjectValue = subjectFilter ? subjectFilter.value : 'all';
        const difficultyValue = difficultyFilter ? difficultyFilter.value : 'all';
        const typeValue = typeFilter ? typeFilter.value : 'all';
        const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
        
        const templateCards = document.querySelectorAll('.template-card');
        
        templateCards.forEach(card => {
            const cardSubject = card.querySelector('.template-subject')?.textContent.toLowerCase() || '';
            const cardDifficultyElement = card.querySelector('.template-info-item:nth-child(1) .template-info-value');
            const cardDifficulty = cardDifficultyElement ? cardDifficultyElement.textContent.toLowerCase() : '';
            const cardTypeElement = card.querySelector('.template-info-item:nth-child(3) .template-info-value');
            const cardType = cardTypeElement ? cardTypeElement.textContent.toLowerCase() : '';
            const cardTitle = card.querySelector('.template-title')?.textContent.toLowerCase() || '';
            
            let showCard = true;
            
            // Filter by subject
            if (subjectValue !== 'all') {
                const subjectText = subjectFilter.options[subjectFilter.selectedIndex].text.toLowerCase();
                if (!cardSubject.includes(subjectText)) {
                    showCard = false;
                }
            }
            
            // Filter by difficulty
            if (difficultyValue !== 'all') {
                let difficultyClass = '';
                switch(difficultyValue) {
                    case 'easy': difficultyClass = 'начальный'; break;
                    case 'medium': difficultyClass = 'средний'; break;
                    case 'hard': difficultyClass = 'продвинутый'; break;
                }
                
                if (cardDifficulty !== difficultyClass) {
                    showCard = false;
                }
            }
            
            // Filter by type
            if (typeValue !== 'all') {
                let typeClass = '';
                switch(typeValue) {
                    case 'theory': typeClass = 'теоретическое'; break;
                    case 'practice': typeClass = 'практическое'; break;
                    case 'project': typeClass = 'проектное'; break;
                    case 'research': typeClass = 'исследовательское'; break;
                }
                
                if (!cardType.includes(typeClass)) {
                    showCard = false;
                }
            }
            
            // Search by title
            if (searchValue && !cardTitle.includes(searchValue)) {
                showCard = false;
            }
            
            // Show/hide card
            card.style.display = showCard ? 'block' : 'none';
        });
        
        // Show no results message
        const visibleCards = document.querySelectorAll('.template-card[style="display: block"]');
        const noResultsMessage = document.getElementById('no-templates-message');
        
        if (visibleCards.length === 0) {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.id = 'no-templates-message';
                message.className = 'no-results fade-in';
                message.innerHTML = `
                    <i class="fas fa-search"></i>
                    <h3>Шаблоны не найдены</h3>
                    <p>Попробуйте изменить параметры фильтрации</p>
                `;
                document.querySelector('.templates-grid')?.appendChild(message);
                setTimeout(() => message.classList.add('visible'), 100);
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }
    
    // Event listeners for filters
    if (subjectFilter) subjectFilter.addEventListener('change', filterTemplates);
    if (difficultyFilter) difficultyFilter.addEventListener('change', filterTemplates);
    if (typeFilter) typeFilter.addEventListener('change', filterTemplates);
    if (searchButton) searchButton.addEventListener('click', filterTemplates);
    if (searchInput) {
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                filterTemplates();
            }
        });
    }
    
    // Initial filter
    setTimeout(filterTemplates, 100);
}

function initTemplatePreviewModal() {
    const previewModal = document.getElementById('preview-modal');
    const previewClose = document.getElementById('preview-close');
    const previewCancel = document.getElementById('preview-cancel');
    const previewButtons = document.querySelectorAll('.preview-template');
    
    if (!previewModal) return;
    
    const templateData = {
        1: {
            title: "Решение квадратных уравнений",
            description: `Задание направлено на закрепление навыков решения квадратных уравнений различными методами. Студенты должны решить предложенные уравнения, показать полное решение и проверить полученные корни.`,
            requirements: `1. Решите 10 квадратных уравнений, приведенных ниже\n2. Для каждого уравнения укажите использованный метод решения\n3. Предоставьте полное решение с пояснениями каждого шага\n4. Проверьте корни, подставив их в исходное уравнение\n5. Оформите решение аккуратно и разборчиво`,
            criteria: `Максимальный балл: 10\n\nКритерии оценки:\n- Правильность решения уравнений (5 баллов)\n- Полнота объяснений (3 балла)\n- Аккуратность оформления (2 балла)`
        },
        2: {
            title: "Законы Ньютона",
            description: `Задание направлено на понимание и применение законов Ньютона для решения физических задач. Студенты должны проанализировать предложенные ситуации и применить соответствующие законы.`,
            requirements: `1. Изучите теоретический материал по законам Ньютона\n2. Решите 8 задач на применение законов Ньютона\n3. Ответьте на 5 вопросов для самопроверки\n4. Сформулируйте выводы по проделанной работе`,
            criteria: `Максимальный балл: 10\n\nКритерии оценки:\n- Понимание теоретического материала (3 балла)\n- Правильность решения задач (4 балла)\n- Полнота ответов на вопросы (2 балла)\n- Качество выводов (1 балл)`
        },
        3: {
            title: "Алгоритмы сортировки",
            description: `Задание направлено на практическое освоение алгоритмов сортировки и их реализацию на языке программирования Python. Студенты должны реализовать несколько алгоритмов и проанализировать их эффективность.`,
            requirements: `1. Реализуйте алгоритмы пузырьковой сортировки, быстрой сортировки и сортировки слиянием\n2. Протестируйте алгоритмы на различных наборах данных\n3. Сравните эффективность алгоритмов по времени выполнения\n4. Подготовьте отчет с анализом результатов`,
            criteria: `Максимальный балл: 10\n\nКритерии оценки:\n- Корректность реализации алгоритмов (4 балла)\n- Качество тестирования (3 балла)\n- Анализ эффективности (2 балла)\n- Оформление отчета (1 балл)`
        }
    };
    
    // Current template ID
    let currentTemplateId = null;
    
    // Open preview modal
    previewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const templateId = this.getAttribute('data-template');
            currentTemplateId = templateId;
            
            const template = templateData[templateId];
            if (template) {
                const previewModalTitle = document.getElementById('preview-modal-title');
                const previewDescriptionContent = document.getElementById('preview-description-content');
                const previewRequirementsContent = document.getElementById('preview-requirements-content');
                const previewCriteriaContent = document.getElementById('preview-criteria-content');
                
                if (previewModalTitle) previewModalTitle.textContent = template.title;
                if (previewDescriptionContent) previewDescriptionContent.textContent = template.description;
                if (previewRequirementsContent) previewRequirementsContent.textContent = template.requirements;
                if (previewCriteriaContent) previewCriteriaContent.textContent = template.criteria;
                
                previewModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close preview modal
    function closePreviewModal() {
        previewModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (previewClose) previewClose.addEventListener('click', closePreviewModal);
    if (previewCancel) previewCancel.addEventListener('click', closePreviewModal);
    
    // Close modal on overlay click
    previewModal.addEventListener('click', function(e) {
        if (e.target === previewModal) {
            closePreviewModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && previewModal.classList.contains('active')) {
            closePreviewModal();
        }
    });
}

function initTemplateUsage() {
    const useButtons = document.querySelectorAll('.use-template');
    const previewUse = document.getElementById('preview-use');
    
    useButtons.forEach(button => {
        button.addEventListener('click', function() {
            const templateId = this.getAttribute('data-template');
            showAlert(`Шаблон "${templateId}" загружается...`, 'info');
            setTimeout(() => {
                window.location.href = `/frontend/templates/homework/homework-create.html?template=${templateId}`;
            }, 1000);
        });
    });
    
    if (previewUse) {
        previewUse.addEventListener('click', function() {
            const previewModal = document.getElementById('preview-modal');
            if (previewModal) {
                previewModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            if (currentTemplateId) {
                showAlert(`Шаблон "${currentTemplateId}" загружается...`, 'info');
                setTimeout(() => {
                    window.location.href = `/frontend/templates/homework/homework-create.html?template=${currentTemplateId}`;
                }, 1000);
            }
        });
    }
}

function initTemplateCardInteractions() {
    const templateCards = document.querySelectorAll('.template-card');
    
    templateCards.forEach(card => {
        // Анимация при наведении
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        // Клик по карточке (кроме кнопок)
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.btn')) {
                const previewBtn = this.querySelector('.preview-template');
                if (previewBtn) {
                    previewBtn.click();
                }
            }
        });
    });
}

// Экспортируем все функции для использования в main.js
export {
    initHomeworkListPage,
    initHomeworkCreatePage,
    initHomeworkDetailPage,
    initHomeworkResultsPage,
    initHomeworkReviewPage,
    initHomeworkTemplatesPage
};

// Для обратной совместимости
window.initHomeworkPages = initHomeworkPages;