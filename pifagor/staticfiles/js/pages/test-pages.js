let toastContainer;

function initToastSystem() {
    if (!document.querySelector('.toast-container')) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    } else {
        toastContainer = document.querySelector('.toast-container');
    }
}

function showToast(message, type = 'success', title = '', duration = 4000) {
    if (!toastContainer) initToastSystem();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        warning: 'fas fa-exclamation-triangle',
        error: 'fas fa-times-circle',
        info: 'fas fa-info-circle'
    };

    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${icons[type] || icons.info}"></i>
        </div>
        <div class="toast-content">
            ${title ? `<div class="toast-title">${title}</div>` : ''}
            <p class="toast-message">${message}</p>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);

    if (duration > 0) {
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    return toast;
}

export function initTestGeneration() {
    const questionCountSlider = document.getElementById('questionCount');
    const questionCountDisplay = document.getElementById('questionCountDisplay');
    const questionCountValue = document.getElementById('questionCountValue');
    const generateButton = document.getElementById('generateButton');
    const saveButton = document.getElementById('saveButton');
    const resetButton = document.getElementById('resetButton');
    const previewContent = document.getElementById('previewContent');
    const testForm = document.getElementById('testForm');
    
    if (!questionCountSlider || !generateButton) return;

    questionCountSlider.addEventListener('input', function() {
        const value = this.value;
        if (questionCountDisplay) questionCountDisplay.textContent = value;
        if (questionCountValue) questionCountValue.textContent = value;
    });

    generateButton.addEventListener('click', function() {
        generateTest();
    });

    if (resetButton) {
        resetButton.addEventListener('click', function() {
            if (testForm) testForm.reset();
            if (questionCountDisplay) questionCountDisplay.textContent = '10';
            if (questionCountValue) questionCountValue.textContent = '10';
            if (questionCountSlider) questionCountSlider.value = '10';
            if (previewContent) {
                previewContent.innerHTML = `
                    <div class="preview-placeholder">
                        <i class="fas fa-file-alt"></i>
                        <p>Настройте параметры теста и нажмите "Сгенерировать" для предпросмотра</p>
                    </div>
                `;
            }
            if (saveButton) saveButton.disabled = true;
            showToast('Форма сброшена', 'info', 'Сброс');
        });
    }

    if (saveButton) {
        saveButton.addEventListener('click', function() {
            saveGeneratedTest();
        });
    }
}

function generateTest() {
    const previewContent = document.getElementById('previewContent');
    const saveButton = document.getElementById('saveButton');
    
    if (!previewContent) return;

    previewContent.innerHTML = `
        <div class="preview-placeholder">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Анастасия генерирует тест...</p>
        </div>
    `;

    setTimeout(() => {
        const testTitle = document.getElementById('testTitle')?.value || 'Новый тест';
        const questionCount = document.getElementById('questionCount')?.value || '5';
        const testLevel = document.getElementById('testLevel')?.value || 'intermediate';

        let previewHTML = `
            <h3>${testTitle}</h3>
            <p><strong>Уровень:</strong> ${getLevelText(testLevel)} | <strong>Вопросов:</strong> ${questionCount}</p>
            <hr>
        `;

        for (let i = 1; i <= Math.min(questionCount, 5); i++) {
            previewHTML += generateQuestion(i);
        }
        
        if (questionCount > 5) {
            previewHTML += `<p>... и еще ${questionCount - 5} вопросов</p>`;
        }
        
        previewContent.innerHTML = previewHTML;
        if (saveButton) saveButton.disabled = false;
        
        showToast(`Тест сгенерирован: ${questionCount} вопросов`, 'success', 'Готово');
    }, 1500);
}

function generateQuestion(number) {
    const questionTypes = ['multiple', 'truefalse'];
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    if (questionType === 'multiple') {
        return `
            <div class="test-question">
                <div class="question-text">${number}. Какой тип данных используется для хранения целых чисел в Python?</div>
                <ul class="options-list">
                    <li class="option-item">
                        <div class="option-label">
                            <span class="option-letter">A</span>
                            <span>int</span>
                        </div>
                    </li>
                    <li class="option-item correct">
                        <div class="option-label">
                            <span class="option-letter">B</span>
                            <span>float</span>
                        </div>
                    </li>
                    <li class="option-item">
                        <div class="option-label">
                            <span class="option-letter">C</span>
                            <span>str</span>
                        </div>
                    </li>
                    <li class="option-item">
                        <div class="option-label">
                            <span class="option-letter">D</span>
                            <span>bool</span>
                        </div>
                    </li>
                </ul>
            </div>
        `;
    } else {
        return `
            <div class="test-question">
                <div class="question-text">${number}. В Python списки являются изменяемыми объектами.</div>
                <ul class="options-list">
                    <li class="option-item correct">
                        <div class="option-label">
                            <span class="option-letter">A</span>
                            <span>Верно</span>
                        </div>
                    </li>
                    <li class="option-item">
                        <div class="option-label">
                            <span class="option-letter">B</span>
                            <span>Неверно</span>
                        </div>
                    </li>
                </ul>
            </div>
        `;
    }
}

function getLevelText(level) {
    switch(level) {
        case 'beginner': return 'Начальный';
        case 'intermediate': return 'Средний';
        case 'advanced': return 'Продвинутый';
        default: return 'Средний';
    }
}

function saveGeneratedTest() {
    const saveButton = document.getElementById('saveButton');
    if (!saveButton) return;

    const saveButtonText = saveButton.innerHTML;
    saveButton.innerHTML = '<i class="fas fa-check"></i> Тест сохранен!';
    saveButton.disabled = true;

    setTimeout(() => {
        saveButton.innerHTML = saveButtonText;
        saveButton.disabled = false;

        showToast('Тест успешно сохранен! Вы можете найти его в разделе "Мои тесты".', 'success', 'Сохранено');
    }, 2000);
}

export function removeQuestion(questionNumber) {
    const confirmToast = showToast(
        `Вы уверены, что хотите удалить вопрос ${questionNumber}?`, 
        'warning', 
        'Подтверждение удаления', 
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
        <button class="btn btn-danger btn-small confirm-delete">Удалить</button>
        <button class="btn btn-light btn-small cancel-delete">Отмена</button>
    `;
    
    const toastContent = confirmToast.querySelector('.toast-content');
    toastContent.appendChild(toastActions);

    confirmToast.querySelector('.confirm-delete').addEventListener('click', function() {
        const questionCards = document.querySelectorAll('.question-card');
        if (questionCards[questionNumber - 1]) {
            questionCards[questionNumber - 1].remove();
            updateQuestionNumbers();
            updateProgress();
            updateNavigation();
            showToast(`Вопрос ${questionNumber} удален`, 'success', 'Успешно');
        }
        confirmToast.remove();
    });
    
    confirmToast.querySelector('.cancel-delete').addEventListener('click', function() {
        confirmToast.remove();
    });
}

function updateQuestionNumbers() {
    const questionCards = document.querySelectorAll('.question-card');
    
    questionCards.forEach((card, index) => {
        const questionNumber = card.querySelector('.question-number');
        if (questionNumber) {
            questionNumber.textContent = `Вопрос ${index + 1}`;
        }

        const deleteBtn = card.querySelector('.btn-danger');
        if (deleteBtn) {
            deleteBtn.setAttribute('onclick', `removeQuestion(${index + 1})`);
        }

        const textarea = card.querySelector('textarea[id^="question-text-"]');
        if (textarea) {
            textarea.id = `question-text-${index + 1}`;
            const label = card.querySelector('label[for^="question-text-"]');
            if (label) {
                label.setAttribute('for', `question-text-${index + 1}`);
            }
        }
    });

    const totalQuestionsElement = document.getElementById('total-questions');
    if (totalQuestionsElement) {
        totalQuestionsElement.textContent = questionCards.length;
    }
}

function updateProgress() {
    const currentQuestionElement = document.getElementById('current-question');
    const totalQuestionsElement = document.getElementById('total-questions');
    
    if (!currentQuestionElement || !totalQuestionsElement) return;
    
    const currentQuestion = parseInt(currentQuestionElement.textContent) || 1;
    const totalQuestions = parseInt(totalQuestionsElement.textContent) || 1;
    const progressPercent = Math.round((currentQuestion / totalQuestions) * 100);
    
    const progressPercentElement = document.getElementById('progress-percent');
    if (progressPercentElement) {
        progressPercentElement.textContent = `${progressPercent}%`;
    }
}

function updateNavigation() {
    const questionsNav = document.querySelector('.questions-nav');
    const questionCards = document.querySelectorAll('.question-card');
    
    if (!questionsNav) return;

    const existingNavItems = questionsNav.querySelectorAll('.question-nav-item:not(:last-child)');
    existingNavItems.forEach(item => item.remove());

    questionCards.forEach((_, index) => {
        const navItem = document.createElement('div');
        navItem.className = 'question-nav-item';
        if (index === 0) navItem.classList.add('current');
        navItem.textContent = index + 1;
        navItem.addEventListener('click', () => navigateToQuestion(index + 1));
        
        const addButton = questionsNav.querySelector('.question-nav-item:last-child');
        questionsNav.insertBefore(navItem, addButton);
    });

    updateSummary();
}

function updateSummary() {
    const questionCards = document.querySelectorAll('.question-card');
    const summaryValue = document.querySelector('.summary-item:nth-child(2) .summary-value');
    if (summaryValue) {
        summaryValue.textContent = `${questionCards.length}/20`;
    }
}

function updateQuestionTypeUI(questionCard) {
    const typeSelect = questionCard.querySelector('.question-type-select');
    const optionsContainer = questionCard.querySelector('.options-container');
    const textAnswerContainer = questionCard.querySelector('.text-answer-container');
    const codeAnswerContainer = questionCard.querySelector('.code-answer-container');
    
    if (!typeSelect) return;
    
    const questionType = typeSelect.value;

    questionCard.classList.remove('question-type-single', 'question-type-multiple', 'question-type-text', 'question-type-code');
    questionCard.classList.add(`question-type-${questionType}`);

    switch(questionType) {
        case 'single':
        case 'multiple':
            if (optionsContainer) optionsContainer.style.display = 'block';
            if (textAnswerContainer) textAnswerContainer.style.display = 'none';
            if (codeAnswerContainer) codeAnswerContainer.style.display = 'none';
            break;
        case 'text':
            if (optionsContainer) optionsContainer.style.display = 'none';
            if (textAnswerContainer) textAnswerContainer.style.display = 'block';
            if (codeAnswerContainer) codeAnswerContainer.style.display = 'none';
            break;
        case 'code':
            if (optionsContainer) optionsContainer.style.display = 'none';
            if (textAnswerContainer) textAnswerContainer.style.display = 'none';
            if (codeAnswerContainer) codeAnswerContainer.style.display = 'block';
            break;
    }

    updateAnswerSelectionLogic(questionCard);
}

function updateAnswerSelectionLogic(questionCard) {
    const typeSelect = questionCard.querySelector('.question-type-select');
    const optionItems = questionCard.querySelectorAll('.option-item');
    
    if (!typeSelect) return;
    
    const questionType = typeSelect.value;
    
    optionItems.forEach(item => {
        item.removeEventListener('click', handleOptionClick);
        item.addEventListener('click', handleOptionClick);
    });
    
    function handleOptionClick(e) {
        if (e.target.tagName === 'INPUT' || e.target.closest('.option-actions')) {
            return;
        }
        
        const clickedItem = this;
        const questionType = typeSelect.value;
        
        if (questionType === 'single') {
            optionItems.forEach(opt => opt.classList.remove('selected'));
            clickedItem.classList.add('selected');
        } else if (questionType === 'multiple') {
            clickedItem.classList.toggle('selected');
        }
    }
}

function initQuestionTypeEvents() {
    const questionTypeSelects = document.querySelectorAll('.question-type-select');
    
    questionTypeSelects.forEach(select => {
        if (!select.hasAttribute('data-type-initialized')) {
            select.setAttribute('data-type-initialized', 'true');
            
            select.addEventListener('change', function() {
                const questionCard = this.closest('.question-card');
                updateQuestionTypeUI(questionCard);
            });
        }
    });
    
    const questionCards = document.querySelectorAll('.question-card');
    questionCards.forEach(card => {
        updateQuestionTypeUI(card);
    });
}

function createNewQuestion(questionData = null) {
    const questionsContainer = document.querySelector('.test-creation-content');
    const questionCards = document.querySelectorAll('.question-card');
    const newQuestionNumber = questionCards.length + 1;
    
    const questionText = questionData?.text || 'Новый вопрос';
    const questionType = questionData?.type || 'single';
    const options = questionData?.options || [
        { text: 'Вариант ответа 1', isCorrect: false },
        { text: 'Вариант ответа 2', isCorrect: false }
    ];
    
    let optionsHTML = '';
    options.forEach((option, index) => {
        const optionLetter = String.fromCharCode(65 + index);
        optionsHTML += `
            <div class="option-item ${option.isCorrect ? 'selected' : ''}">
                <div class="option-marker"></div>
                <div class="option-text">
                    <input type="text" class="form-control" value="${option.text}">
                </div>
                <div class="option-actions">
                    <button class="btn btn-small btn-success option-correct-btn">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn btn-small btn-danger option-delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    const newQuestionHTML = `
        <div class="question-card">
            <div class="question-header">
                <div>
                    <div class="question-number">Вопрос ${newQuestionNumber}</div>
                    <div class="question-text">${questionText}</div>
                </div>
                <button class="btn btn-danger btn-small" onclick="removeQuestion(${newQuestionNumber})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>

            <div class="form-group">
                <label class="form-label" for="question-text-${newQuestionNumber}">Текст вопроса</label>
                <textarea id="question-text-${newQuestionNumber}" class="form-control">${questionText}</textarea>
            </div>

            <div class="form-group programming-only" style="display: none;">
                <label class="form-label">Код (опционально)</label>
                <div class="code-editor">
                    <div class="code-toolbar">
                        <button type="button">Python</button>
                        <button type="button">JavaScript</button>
                        <button type="button">HTML</button>
                    </div>
                    <textarea class="form-control code-block" rows="4">${questionData?.code || ''}</textarea>
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Тип вопроса</label>
                <select class="form-control form-select question-type-select">
                    <option value="single" ${questionType === 'single' ? 'selected' : ''}>Один правильный ответ</option>
                    <option value="multiple" ${questionType === 'multiple' ? 'selected' : ''}>Несколько правильных ответов</option>
                    <option value="text" ${questionType === 'text' ? 'selected' : ''}>Текстовый ответ</option>
                    <option value="code" ${questionType === 'code' ? 'selected' : ''} class="programming-only">Написание кода</option>
                </select>
            </div>

            <div class="form-group options-container">
                <label class="form-label">Варианты ответов</label>
                <div class="options-list">
                    ${optionsHTML}
                </div>
                <button class="btn btn-light add-option-btn">
                    <i class="fas fa-plus"></i> Добавить вариант ответа
                </button>
            </div>

            <div class="form-group text-answer-container">
                <label class="form-label">Текстовый ответ</label>
                <textarea class="form-control" rows="4" placeholder="Студент введет ответ здесь..."></textarea>
            </div>

            <div class="form-group code-answer-container programming-only">
                <label class="form-label">Редактор кода</label>
                <div class="code-editor">
                    <div class="code-toolbar">
                        <button type="button" class="active">Python</button>
                        <button type="button">JavaScript</button>
                        <button type="button">Java</button>
                        <button type="button">C++</button>
                    </div>
                    <textarea class="form-control code-block" rows="6" placeholder="// Студент напишет код здесь..."></textarea>
                </div>
            </div>

            <div class="question-actions">
                <button class="btn btn-light duplicate-question-btn">
                    <i class="fas fa-copy"></i> Дублировать вопрос
                </button>
            </div>
        </div>
    `;
    
    const addButton = document.querySelector('.add-question-btn');
    if (addButton) {
        addButton.insertAdjacentHTML('beforebegin', newQuestionHTML);
    } else {
        questionsContainer.insertAdjacentHTML('beforeend', newQuestionHTML);
    }
    
    updateQuestionNumbers();
    updateNavigation();
    updateProgress();
    initQuestionEvents();
    
    if (newQuestionNumber > 1) {
        const newQuestion = document.querySelector('.question-card:last-child');
        if (newQuestion) {
            newQuestion.style.display = 'none';
        }
    }
    
    setTimeout(() => {
        const newQuestion = document.querySelector('.question-card:last-child');
        if (newQuestion) {
            updateQuestionTypeUI(newQuestion);
            initQuestionTypeEvents();
        }
    }, 0);
    
    if (questionType === 'code') {
        const newQuestion = document.querySelector('.question-card:last-child');
        const codeBlock = newQuestion.querySelector('.programming-only');
        if (codeBlock) {
            codeBlock.style.display = 'block';
        }
    }
    
    showToast(`Добавлен вопрос ${newQuestionNumber}`, 'success', 'Новый вопрос');
    
    return newQuestionNumber;
}

function navigateToQuestion(questionNumber) {
    const questionCards = document.querySelectorAll('.question-card');
    const questionNavItems = document.querySelectorAll('.question-nav-item:not(:last-child)');
    
    questionCards.forEach(card => {
        card.style.display = 'none';
    });
    
    if (questionCards[questionNumber - 1]) {
        questionCards[questionNumber - 1].style.display = 'block';
    }
    
    questionNavItems.forEach((item, index) => {
        item.classList.toggle('current', index === questionNumber - 1);
    });
    
    const currentQuestionElement = document.getElementById('current-question');
    if (currentQuestionElement) {
        currentQuestionElement.textContent = questionNumber;
    }
    
    updateProgress();
}

function duplicateQuestion(questionCard) {
    if (!questionCard) return;
    
    const questionData = {
        text: questionCard.querySelector('textarea[id^="question-text-"]')?.value || 'Новый вопрос',
        type: questionCard.querySelector('.question-type-select')?.value || 'single',
        options: []
    };
    
    const optionItems = questionCard.querySelectorAll('.option-item');
    optionItems.forEach(option => {
        questionData.options.push({
            text: option.querySelector('input[type="text"]')?.value || 'Вариант ответа',
            isCorrect: option.classList.contains('selected')
        });
    });
    
    const codeBlock = questionCard.querySelector('.code-block');
    if (codeBlock) {
        questionData.code = codeBlock.value;
    }
    
    const newQuestionNumber = createNewQuestion(questionData);
    
    navigateToQuestion(newQuestionNumber);
}

function initQuestionEvents() {
    const optionItems = document.querySelectorAll('.option-item');
    
    optionItems.forEach(item => {
        if (!item.hasAttribute('data-initialized')) {
            item.setAttribute('data-initialized', 'true');
            
            item.addEventListener('click', function(e) {
                if (e.target === this || e.target.classList.contains('option-marker')) {
                    const questionCard = this.closest('.question-card');
                    const questionTypeSelect = questionCard.querySelector('.question-type-select');
                    const questionType = questionTypeSelect ? questionTypeSelect.value : 'single';
                    
                    if (questionType === 'single') {
                        const parentOptions = this.closest('.options-list');
                        parentOptions.querySelectorAll('.option-item').forEach(opt => {
                            opt.classList.remove('selected');
                        });
                        this.classList.add('selected');
                    } else if (questionType === 'multiple') {
                        this.classList.toggle('selected');
                    }
                }
            });
        }
    });
    
    const optionCorrectBtns = document.querySelectorAll('.option-correct-btn');
    optionCorrectBtns.forEach(btn => {
        if (!btn.hasAttribute('data-initialized')) {
            btn.setAttribute('data-initialized', 'true');
            
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const optionItem = this.closest('.option-item');
                const questionCard = optionItem.closest('.question-card');
                const questionType = questionCard.querySelector('.question-type-select').value;
                
                if (questionType === 'single') {
                    const parentOptions = optionItem.closest('.options-list');
                    parentOptions.querySelectorAll('.option-item').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    optionItem.classList.add('selected');
                } else {
                    optionItem.classList.toggle('selected');
                }
            });
        }
    });
    
    const optionDeleteBtns = document.querySelectorAll('.option-delete-btn');
    optionDeleteBtns.forEach(btn => {
        if (!btn.hasAttribute('data-initialized')) {
            btn.setAttribute('data-initialized', 'true');
            
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const optionItem = this.closest('.option-item');
                const optionsList = optionItem.parentElement;
                
                if (optionsList.children.length > 1) {
                    const confirmToast = showToast(
                        'Удалить этот вариант ответа?', 
                        'warning', 
                        'Подтверждение удаления', 
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
                        <button class="btn btn-danger btn-small confirm-delete">Удалить</button>
                        <button class="btn btn-light btn-small cancel-delete">Отмена</button>
                    `;
                    
                    const toastContent = confirmToast.querySelector('.toast-content');
                    toastContent.appendChild(toastActions);
                    
                    toastContent.querySelector('.confirm-delete').addEventListener('click', function() {
                        optionItem.remove();
                        showToast('Вариант ответа удален', 'success');
                        confirmToast.remove();
                    });
                    
                    toastContent.querySelector('.cancel-delete').addEventListener('click', function() {
                        confirmToast.remove();
                    });
                } else {
                    showToast('Должен остаться хотя бы один вариант ответа', 'warning', 'Невозможно удалить');
                }
            });
        }
    });
    
    const addOptionBtns = document.querySelectorAll('.add-option-btn');
    addOptionBtns.forEach(btn => {
        if (!btn.hasAttribute('data-initialized')) {
            btn.setAttribute('data-initialized', 'true');
            
            btn.addEventListener('click', function() {
                const optionsList = this.previousElementSibling;
                const optionCount = optionsList.children.length;
                const newOptionLetter = String.fromCharCode(65 + optionCount);
                
                const newOptionHTML = `
                    <div class="option-item">
                        <div class="option-marker"></div>
                        <div class="option-text">
                            <input type="text" class="form-control" value="Вариант ${newOptionLetter}">
                        </div>
                        <div class="option-actions">
                            <button class="btn btn-small btn-success option-correct-btn"><i class="fas fa-check"></i></button>
                            <button class="btn btn-small btn-danger option-delete-btn"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `;
                
                optionsList.insertAdjacentHTML('beforeend', newOptionHTML);
                initQuestionEvents();
            });
        }
    });
    
    const duplicateBtns = document.querySelectorAll('.duplicate-question-btn');
    duplicateBtns.forEach(btn => {
        if (!btn.hasAttribute('data-initialized')) {
            btn.setAttribute('data-initialized', 'true');
            
            btn.addEventListener('click', function() {
                const questionCard = this.closest('.question-card');
                duplicateQuestion(questionCard);
            });
        }
    });
    
    const questionTypeSelects = document.querySelectorAll('.question-type-select');
    questionTypeSelects.forEach(select => {
        if (!select.hasAttribute('data-initialized')) {
            select.setAttribute('data-initialized', 'true');
            
            select.addEventListener('change', function() {
                const questionCard = this.closest('.question-card');
                updateQuestionTypeUI(questionCard);
            });
        }
    });
    
    initQuestionTypeEvents();
}

function previewTest() {
    const testData = collectTestData();
    
    if (testData.questions.length === 0) {
        showToast('Добавьте хотя бы один вопрос для просмотра', 'warning', 'Недостаточно данных');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal" style="max-width: 800px;">
            <div class="modal-header">
                <h3 class="modal-title">Предварительный просмотр теста</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body" style="max-height: 60vh; overflow-y: auto;">
                <div class="preview-content">
                    <h2>${testData.title}</h2>
                    <p class="text-muted">${testData.description}</p>
                    <div class="preview-meta">
                        <span><strong>Предмет:</strong> ${getSubjectName(testData.subject)}</span>
                        <span><strong>Время:</strong> ${testData.time} мин</span>
                        <span><strong>Уровень:</strong> ${getLevelName(testData.level)}</span>
                        <span><strong>Вопросов:</strong> ${testData.questions.length}</span>
                    </div>
                    <hr>
                    ${testData.questions.map((question, index) => `
                        <div class="preview-question">
                            <h4>Вопрос ${index + 1}: ${question.text}</h4>
                            ${question.type !== 'text' && question.type !== 'code' ? `
                                <div class="preview-options">
                                    ${question.options.map((option, optIndex) => `
                                        <div class="preview-option ${option.isCorrect ? 'correct' : ''}">
                                            <span class="option-letter">${String.fromCharCode(65 + optIndex)}</span>
                                            <span>${option.text}</span>
                                            ${option.isCorrect ? '<span class="correct-badge"><i class="fas fa-check"></i></span>' : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            ` : `
                                <div class="preview-text-answer">
                                    <em>${question.type === 'code' ? 'Ответ: написание кода' : 'Ответ: текстовый ввод'}</em>
                                </div>
                            `}
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-light" id="preview-close">Закрыть</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('#preview-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    showToast('Предпросмотр теста открыт', 'info', 'Готово');
}

function getSubjectName(subject) {
    const subjects = {
        'russian': 'Русский язык',
        'literature': 'Литература',
        'math': 'Математика',
        'economics': 'Экономика',
        'programming': 'Программирование'
    };
    return subjects[subject] || subject;
}

function getLevelName(level) {
    const levels = {
        'beginner': 'Начальный',
        'intermediate': 'Средний',
        'advanced': 'Продвинутый'
    };
    return levels[level] || level;
}

function collectTestData() {
    const testTitle = document.getElementById('test-title');
    const testDescription = document.getElementById('test-description');
    const testSubject = document.getElementById('test-subject');
    const testTime = document.getElementById('test-time');
    const testLevel = document.getElementById('test-level');
    const testDueDate = document.getElementById('test-due-date');
    
    const testData = {
        title: testTitle?.value || 'Без названия',
        description: testDescription?.value || '',
        subject: testSubject?.value || 'programming',
        time: testTime?.value || '20',
        level: testLevel?.value || 'intermediate',
        dueDate: testDueDate?.value || '',
        questions: []
    };
    
    const questionCards = document.querySelectorAll('.question-card');
    questionCards.forEach(card => {
        const questionTextElement = card.querySelector('textarea[id^="question-text-"]');
        const questionTypeElement = card.querySelector('.question-type-select');
        
        if (questionTextElement && questionTypeElement) {
            const question = {
                text: questionTextElement.value,
                type: questionTypeElement.value,
                options: []
            };
            
            const optionItems = card.querySelectorAll('.option-item');
            optionItems.forEach(option => {
                const input = option.querySelector('input[type="text"]');
                if (input) {
                    question.options.push({
                        text: input.value,
                        isCorrect: option.classList.contains('selected')
                    });
                }
            });
            
            const codeBlock = card.querySelector('.code-block');
            if (codeBlock) {
                question.code = codeBlock.value;
            }
            
            testData.questions.push(question);
        }
    });
    
    return testData;
}

function saveTest() {
    const testData = collectTestData();
    
    if (testData.questions.length === 0) {
        showToast('Добавьте хотя бы один вопрос перед сохранением', 'warning', 'Недостаточно данных');
        return;
    }
    
    if (!testData.title.trim()) {
        showToast('Введите название теста', 'warning', 'Недостаточно данных');
        document.getElementById('test-title')?.focus();
        return;
    }
    
    const saveButton = document.getElementById('save-test-btn');
    const originalText = saveButton.innerHTML;
    saveButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Сохранение...';
    saveButton.disabled = true;
    
    // Имитация сохранения (в реальном приложении здесь будет запрос к серверу)
    setTimeout(() => {
        saveButton.innerHTML = originalText;
        saveButton.disabled = false;
        
        showToast('Тест успешно сохранен! Вы можете найти его в разделе "Мои тесты".', 'success', 'Сохранено');
    }, 1500);
}

export function initCreateTestPage() {
    initToastSystem();
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    const subjectSelect = document.getElementById('test-subject');
    const programmingOnlyElements = document.querySelectorAll('.programming-only');
    const currentSubjectSpan = document.getElementById('current-subject');
    const testDueDateInput = document.getElementById('test-due-date');
    const dueDateInfo = document.getElementById('due-date-info');
    const dueDateText = document.getElementById('due-date-text');
    
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7);
    if (testDueDateInput) {
        testDueDateInput.valueAsDate = defaultDate;
        updateDueDateInfo();
    }
    
    function updateSubjectUI() {
        const selectedSubject = subjectSelect?.value || 'programming';
        
        const isProgramming = selectedSubject === 'programming';
        programmingOnlyElements.forEach(el => {
            el.style.display = isProgramming ? 'block' : 'none';
        });
        
        if (currentSubjectSpan) {
            currentSubjectSpan.textContent = getSubjectName(selectedSubject);
        }
        
        const testCreationSection = document.querySelector('.test-creation');
        if (testCreationSection) {
            testCreationSection.classList.remove('subject-russian', 'subject-literature', 'subject-math', 'subject-economics', 'subject-programming');
            testCreationSection.classList.add(`subject-${selectedSubject}`);
        }
    }
    
    function updateDueDateInfo() {
        if (!testDueDateInput || !dueDateInfo || !dueDateText) return;
        
        const dueDate = new Date(testDueDateInput.value);
        const today = new Date();
        const timeDiff = dueDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        if (daysDiff > 0) {
            dueDateInfo.style.display = 'flex';
            dueDateText.textContent = `Осталось ${daysDiff} дней до сдачи`;
            
            if (daysDiff > 14) {
                dueDateInfo.className = 'due-date-info';
            } else if (daysDiff > 7) {
                dueDateInfo.className = 'due-date-info warning';
            } else {
                dueDateInfo.className = 'due-date-info danger';
            }
        } else if (daysDiff === 0) {
            dueDateInfo.style.display = 'flex';
            dueDateInfo.className = 'due-date-info danger';
            dueDateText.textContent = 'Тест нужно сдать сегодня!';
        } else {
            dueDateInfo.style.display = 'flex';
            dueDateInfo.className = 'due-date-info danger';
            dueDateText.textContent = 'Срок сдачи истек!';
        }
    }
    
    if (subjectSelect) {
        updateSubjectUI();
        
        subjectSelect.addEventListener('change', updateSubjectUI);
        if (testDueDateInput) {
            testDueDateInput.addEventListener('change', updateDueDateInfo);
        }
    }
    initQuestionEvents();

    const addQuestionBtn = document.querySelector('.add-question-btn');
    if (addQuestionBtn) {
        addQuestionBtn.addEventListener('click', () => createNewQuestion());
    }
    
    const addNavButton = document.querySelector('.questions-nav .question-nav-item:last-child');
    if (addNavButton) {
        addNavButton.addEventListener('click', () => createNewQuestion());
    }
    
    updateNavigation();
    navigateToQuestion(1);
    const previewBtn = document.querySelector('.test-creation-navigation .btn-light');
    if (previewBtn && previewBtn.querySelector('.fa-eye')) {
        previewBtn.addEventListener('click', previewTest);
    }

    const saveTestBtn = document.getElementById('save-test-btn');
    if (saveTestBtn) {
        saveTestBtn.addEventListener('click', saveTest);
    }

    const settingsBtn = document.getElementById('settings-btn');
    const shareBtn = document.getElementById('share-btn');
    
    const settingsModal = document.getElementById('settings-modal');
    const shareModal = document.getElementById('share-modal');
    
    const settingsClose = document.getElementById('settings-close');
    const shareClose = document.getElementById('share-close');
    
    const settingsCancel = document.getElementById('settings-cancel');
    const shareCancel = document.getElementById('share-cancel');
    
    const settingsSave = document.getElementById('settings-save');
    const copyLink = document.getElementById('copy-link');

    if (settingsBtn && settingsModal) {
        settingsBtn.addEventListener('click', () => {
            settingsModal.classList.add('active');
        });
    }
    
    if (shareBtn && shareModal) {
        shareBtn.addEventListener('click', () => {
            shareModal.classList.add('active');
        });
    }

    function closeAllModals() {
        if (settingsModal) settingsModal.classList.remove('active');
        if (shareModal) shareModal.classList.remove('active');

        const helpModals = document.querySelectorAll('.modal-overlay');
        helpModals.forEach(modal => modal.classList.remove('active'));
    }
    
    if (settingsClose) settingsClose.addEventListener('click', closeAllModals);
    if (shareClose) shareClose.addEventListener('click', closeAllModals);
    
    if (settingsCancel) settingsCancel.addEventListener('click', closeAllModals);
    if (shareCancel) shareCancel.addEventListener('click', closeAllModals);

    if (settingsSave) {
        settingsSave.addEventListener('click', () => {
            showToast('Настройки теста сохранены!', 'success', 'Сохранено');
            closeAllModals();
        });
    }

    if (copyLink) {
        copyLink.addEventListener('click', () => {
            const linkInput = document.querySelector('.share-link input');
            if (linkInput) {
                linkInput.select();
                document.execCommand('copy');

                const originalText = copyLink.innerHTML;
                copyLink.innerHTML = '<i class="fas fa-check"></i> Скопировано!';
                setTimeout(() => {
                    copyLink.innerHTML = originalText;
                }, 2000);
                
                showToast('Ссылка скопирована в буфер обмена', 'success', 'Скопировано');
            }
        });
    }
    
    const shareFacebook = document.getElementById('share-facebook');
    const shareTelegram = document.getElementById('share-telegram');
    const shareVk = document.getElementById('share-vk');
    const shareEmail = document.getElementById('share-email');
    const shareCopy = document.getElementById('share-copy');
    
    const shareActions = [shareFacebook, shareTelegram, shareVk, shareEmail, shareCopy];
    shareActions.forEach(action => {
        if (action) {
            action.addEventListener('click', function() {
                const platform = this.querySelector('span').textContent;
                showToast(`Функция "Поделиться через ${platform}" будет реализована позже`, 'info', 'В разработке');
            });
        }
    });
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeAllModals();
        }
    });

    const testTypeOptions = document.querySelectorAll('.test-type-option');
    const aiAssistant = document.getElementById('ai-assistant');
    
    if (testTypeOptions.length > 0) {
        testTypeOptions.forEach(option => {
            option.addEventListener('click', function() {
                testTypeOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                
                const testType = this.getAttribute('data-type');
                
                if (testType === 'training') {
                    if (aiAssistant) aiAssistant.style.display = 'block';
                } else {
                    if (aiAssistant) aiAssistant.style.display = 'none';
                }
            });
        });
    }
    
    const aiRequestBtn = document.getElementById('ai-request-btn');
    const aiRequestInput = document.querySelector('.ai-request-input');
    const aiResponse = document.getElementById('ai-response');
    
    if (aiRequestBtn && aiRequestInput) {
        aiRequestBtn.addEventListener('click', function() {
            const request = aiRequestInput.value.trim();
            
            if (request.startsWith('/test')) {
                aiRequestBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Генерация...';
                aiRequestBtn.disabled = true;
                
                setTimeout(() => {
                    if (aiResponse) aiResponse.classList.add('show');
                    
                    aiRequestBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Отправить';
                    aiRequestBtn.disabled = false;
                    
                    showToast('Вопросы успешно сгенерированы', 'success', 'ИИ Анастасия');
                    
                }, 2000);
            } else {
                showToast('Пожалуйста, используйте формат: /test <тема> [сложность] [количество_вопросов]', 'warning', 'Неверный формат');
            }
        });
    }
    
    const aiAddAllBtn = document.getElementById('ai-add-all');
    const aiCancelBtn = document.getElementById('ai-cancel');
    const aiQuestionItems = document.querySelectorAll('.ai-question-item');
    
    if (aiAddAllBtn) {
        aiAddAllBtn.addEventListener('click', function() {
            const aiQuestions = document.querySelectorAll('.ai-question-item');
            let addedCount = 0;
            
            aiQuestions.forEach(aiQuestion => {
                createNewQuestion();
                
                const questionCards = document.querySelectorAll('.question-card');
                const lastQuestion = questionCards[questionCards.length - 1];
                
                const questionText = aiQuestion.textContent.replace(/^Вопрос \d+:\s*/, '');
                const textarea = lastQuestion.querySelector('textarea');
                if (textarea) {
                    textarea.value = questionText;
                }
                
                const questionTextElement = lastQuestion.querySelector('.question-text');
                if (questionTextElement) {
                    questionTextElement.textContent = questionText;
                }
                
                addedCount++;
            });
            
            if (aiResponse) {
                aiResponse.classList.remove('show');
            }
            
            if (aiRequestInput) {
                aiRequestInput.value = '';
            }
            
            showToast(`Добавлено ${addedCount} вопросов в тест!`, 'success', 'ИИ Анастасия');
        });
    }
    
    if (aiCancelBtn) {
        aiCancelBtn.addEventListener('click', function() {
            if (aiResponse) aiResponse.classList.remove('show');
            if (aiRequestInput) aiRequestInput.value = '';
            showToast('Генерация вопросов отменена', 'info', 'Отменено');
        });
    }
    
    if (aiQuestionItems.length > 0) {
        aiQuestionItems.forEach(item => {
            item.addEventListener('click', function() {
                const questionText = this.textContent.replace(/^Вопрос \d+:\s*/, '');
                
                createNewQuestion();
                const questionCards = document.querySelectorAll('.question-card');
                const lastQuestion = questionCards[questionCards.length - 1];
                
                const textarea = lastQuestion.querySelector('textarea');
                if (textarea) {
                    textarea.value = questionText;
                }
                
                const questionTextElement = lastQuestion.querySelector('.question-text');
                if (questionTextElement) {
                    questionTextElement.textContent = questionText;
                }
                
                showToast('Вопрос добавлен в тест', 'success', 'Добавлено');
            });
        });
    }
    
    if (aiRequestInput) {
        aiRequestInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (aiRequestBtn) aiRequestBtn.click();
            }
        });
    }

    const requireRegistration = document.getElementById('require-registration');
    const passwordField = document.getElementById('password-field');
    
    if (requireRegistration && passwordField) {
        if (requireRegistration.checked) {
            passwordField.style.display = 'block';
        } else {
            passwordField.style.display = 'none';
        }
        
        requireRegistration.addEventListener('change', function() {
            if (this.checked) {
                passwordField.style.display = 'block';
            } else {
                passwordField.style.display = 'none';
            }
        });
    }

    const helpGuideLink = document.getElementById('help-guide-link');
    const helpTypesLink = document.getElementById('help-types-link');
    const helpAnalyticsLink = document.getElementById('help-analytics-link');
    
    if (helpGuideLink) {
        helpGuideLink.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = document.getElementById('help-guide-modal');
            if (modal) modal.classList.add('active');
        });
    }
    
    if (helpTypesLink) {
        helpTypesLink.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = document.getElementById('help-types-modal');
            if (modal) modal.classList.add('active');
        });
    }
    
    if (helpAnalyticsLink) {
        helpAnalyticsLink.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = document.getElementById('help-analytics-modal');
            if (modal) modal.classList.add('active');
        });
    }
    
    const helpGuideClose = document.getElementById('help-guide-close');
    const helpTypesClose = document.getElementById('help-types-close');
    const helpAnalyticsClose = document.getElementById('help-analytics-close');
    
    const helpGuideCancel = document.getElementById('help-guide-cancel');
    const helpTypesCancel = document.getElementById('help-types-cancel');
    const helpAnalyticsCancel = document.getElementById('help-analytics-cancel');
    
    function closeHelpModals() {
        const modals = [
            'help-guide-modal',
            'help-types-modal',
            'help-analytics-modal'
        ];
        
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) modal.classList.remove('active');
        });
    }
    
    if (helpGuideClose) helpGuideClose.addEventListener('click', closeHelpModals);
    if (helpTypesClose) helpTypesClose.addEventListener('click', closeHelpModals);
    if (helpAnalyticsClose) helpAnalyticsClose.addEventListener('click', closeHelpModals);
    
    if (helpGuideCancel) helpGuideCancel.addEventListener('click', closeHelpModals);
    if (helpTypesCancel) helpTypesCancel.addEventListener('click', closeHelpModals);
    if (helpAnalyticsCancel) helpAnalyticsCancel.addEventListener('click', closeHelpModals);
}

window.removeQuestion = removeQuestion;
window.showToast = showToast;

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.test-creation')) {
        initCreateTestPage();
    }
});