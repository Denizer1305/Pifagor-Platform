import { showToast } from '../modules/toast.js';

export function initPracticCreation() {
    // Объявляем ВСЕ переменные в начале функции
    const subjectSelect = document.getElementById('practice-subject');
    const subjectSections = document.querySelectorAll('.subject-specific-section');
    const programmingLanguageGroup = document.getElementById('programming-language-group');
    const codeBtn = document.getElementById('code-btn');
    const currentSubjectSpan = document.getElementById('current-subject');
    const examplesTitle = document.getElementById('examples-title');
    const inputLabel = document.getElementById('input-label-1');
    const outputLabel = document.getElementById('output-label-1');
    const addRequirementBtn = document.getElementById('add-requirement-btn');
    const requirementsList = document.getElementById('requirements-list');
    const addTestCaseBtn = document.getElementById('add-test-case-btn');
    const testCasesContainer = document.querySelector('.test-cases');
    const savePracticeBtn = document.getElementById('save-practice-btn');
    const previewBtn = document.querySelector('.practice-creation-navigation .btn-light');
    
    // Map subjects to display names
    const subjectNames = {
        'russian': 'Русский язык',
        'literature': 'Литература',
        'math': 'Математика',
        'economics': 'Экономика',
        'programming': 'Программирование'
    };
    
    // Map subjects to labels for examples
    const exampleLabels = {
        'russian': { input: 'Текст задания', output: 'Пример ответа' },
        'literature': { input: 'Вопрос/задание', output: 'Пример анализа' },
        'math': { input: 'Условие задачи', output: 'Решение/ответ' },
        'economics': { input: 'Условие задачи', output: 'Решение/ответ' },
        'programming': { input: 'Входные данные', output: 'Ожидаемый вывод' }
    };

    // Функция для обновления интерфейса в зависимости от выбранного предмета
    function updateSubjectUI() {
        const selectedSubject = subjectSelect?.value;
        if (!selectedSubject) return;
        
        // Hide all subject sections
        subjectSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected subject section
        const selectedSection = document.getElementById(`${selectedSubject}-section`);
        if (selectedSection) selectedSection.classList.add('active');
        
        // Update current subject in sidebar
        if (currentSubjectSpan) currentSubjectSpan.textContent = subjectNames[selectedSubject];
        
        // Show/hide programming language selector
        if (selectedSubject === 'programming') {
            if (programmingLanguageGroup) programmingLanguageGroup.style.display = 'block';
            if (codeBtn) codeBtn.style.display = 'flex';
            if (examplesTitle) examplesTitle.textContent = 'Тестовые случаи';
            if (inputLabel) inputLabel.textContent = exampleLabels[selectedSubject].input;
            if (outputLabel) outputLabel.textContent = exampleLabels[selectedSubject].output;
        } else {
            if (programmingLanguageGroup) programmingLanguageGroup.style.display = 'none';
            if (codeBtn) codeBtn.style.display = 'none';
            if (examplesTitle) examplesTitle.textContent = 'Примеры';
            if (inputLabel) inputLabel.textContent = exampleLabels[selectedSubject].input;
            if (outputLabel) outputLabel.textContent = exampleLabels[selectedSubject].output;
        }
        
        // Update section class for subject-specific styling
        const practiceCreationSection = document.querySelector('.practice-creation');
        if (practiceCreationSection) {
            practiceCreationSection.className = `section practice-creation subject-${selectedSubject}`;
        }
    }

    // Функция для инициализации событий требований
    function initRequirementEvents(requirementItem) {
        const deleteBtn = requirementItem.querySelector('.delete-requirement');
        const moveUpBtn = requirementItem.querySelector('.move-up');
        const moveDownBtn = requirementItem.querySelector('.move-down');
        
        deleteBtn?.addEventListener('click', function() {
            const confirmToast = showToast(
                'Удалить это требование?', 
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
                if (requirementsList && requirementItem.parentNode === requirementsList) {
                    requirementsList.removeChild(requirementItem);
                    updateRequirementsSummary();
                    showToast('Требование удалено', 'success', 'Удалено');
                }
                confirmToast.remove();
            });
            
            toastContent.querySelector('.cancel-delete').addEventListener('click', function() {
                confirmToast.remove();
            });
        });
        
        moveUpBtn?.addEventListener('click', function() {
            const prev = requirementItem.previousElementSibling;
            if (prev && requirementsList) {
                requirementsList.insertBefore(requirementItem, prev);
                updateRequirementNumbers();
                showToast('Требование перемещено вверх', 'info', 'Перемещение');
            } else {
                showToast('Требование уже на первой позиции', 'warning', 'Перемещение');
            }
        });
        
        moveDownBtn?.addEventListener('click', function() {
            const next = requirementItem.nextElementSibling;
            if (next && requirementsList) {
                requirementsList.insertBefore(next, requirementItem);
                updateRequirementNumbers();
                showToast('Требование перемещено вниз', 'info', 'Перемещение');
            } else {
                showToast('Требование уже на последней позиции', 'warning', 'Перемещение');
            }
        });
    }

    // Функция для обновления номеров требований
    function updateRequirementNumbers() {
        const requirements = document.querySelectorAll('.requirement-item');
        requirements.forEach((item, index) => {
            // Если нужно добавить номера, можно добавить здесь
        });
    }

    // Обновление сводки требований
    function updateRequirementsSummary() {
        const requirementsCount = document.querySelectorAll('.requirement-item').length;
        const summaryElement = document.querySelector('.summary-item:nth-child(4) .summary-value');
        if (summaryElement) {
            summaryElement.textContent = requirementsCount;
        }
    }

    // Функция для инициализации событий тестовых случаев
    function initTestCaseEvents(testCase) {
        const deleteBtn = testCase.querySelector('.delete-test-case');
        const toggleBtn = testCase.querySelector('.toggle-visibility');
        const editBtn = testCase.querySelector('.edit-test-case');
        
        deleteBtn?.addEventListener('click', function() {
            const confirmToast = showToast(
                'Удалить этот тестовый случай?', 
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
                if (testCasesContainer && testCase.parentNode === testCasesContainer) {
                    testCasesContainer.removeChild(testCase);
                    updateTestCasesSummary();
                    showToast('Тестовый случай удален', 'success', 'Удалено');
                }
                confirmToast.remove();
            });
            
            toastContent.querySelector('.cancel-delete').addEventListener('click', function() {
                confirmToast.remove();
            });
        });
        
        toggleBtn?.addEventListener('click', function() {
            const isVisible = this.innerHTML.includes('fa-eye');
            if (isVisible) {
                this.innerHTML = '<i class="fas fa-eye-slash"></i> Скрыть от студентов';
                showToast('Тестовый случай скрыт от студентов', 'info', 'Видимость');
            } else {
                this.innerHTML = '<i class="fas fa-eye"></i> Показать студентам';
                showToast('Тестовый случай показан студентам', 'info', 'Видимость');
            }
        });
        
        // Обработчик для кнопки "Редактировать"
        editBtn?.addEventListener('click', function() {
            const isEditing = this.classList.contains('editing');
            
            if (isEditing) {
                // Сохраняем изменения
                saveTestCaseEdits(testCase, this);
            } else {
                // Включаем режим редактирования
                enableTestCaseEditing(testCase, this);
            }
        });
    }

    // Функция для включения режима редактирования тестового случая
    function enableTestCaseEditing(testCase, editButton) {
        const inputElement = testCase.querySelector('.test-case-input');
        const outputElement = testCase.querySelector('.test-case-output');
        
        // Сохраняем оригинальный текст
        const originalInput = inputElement.textContent;
        const originalOutput = outputElement.textContent;
        
        // Заменяем div на textarea для редактирования
        const inputTextarea = document.createElement('textarea');
        inputTextarea.className = 'form-control test-case-edit-input';
        inputTextarea.value = originalInput;
        inputTextarea.rows = 3;
        
        const outputTextarea = document.createElement('textarea');
        outputTextarea.className = 'form-control test-case-edit-output';
        outputTextarea.value = originalOutput;
        outputTextarea.rows = 3;
        
        inputElement.replaceWith(inputTextarea);
        outputElement.replaceWith(outputTextarea);
        
        // Меняем кнопку на "Сохранить"
        editButton.innerHTML = '<i class="fas fa-save"></i> Сохранить';
        editButton.classList.add('editing');
        editButton.classList.remove('btn-light');
        editButton.classList.add('btn-success');
        
        // Добавляем кнопку отмены
        const cancelButton = document.createElement('button');
        cancelButton.className = 'btn btn-warning btn-small cancel-edit';
        cancelButton.innerHTML = '<i class="fas fa-times"></i> Отмена';
        cancelButton.style.marginLeft = '5px';
        
        editButton.parentNode.insertBefore(cancelButton, editButton.nextSibling);
        
        // Обработчик для кнопки отмены
        cancelButton.addEventListener('click', function() {
            // Восстанавливаем оригинальные элементы
            const inputDiv = document.createElement('div');
            inputDiv.className = 'test-case-input';
            inputDiv.textContent = originalInput;
            
            const outputDiv = document.createElement('div');
            outputDiv.className = 'test-case-output';
            outputDiv.textContent = originalOutput;
            
            const editInput = testCase.querySelector('.test-case-edit-input');
            const editOutput = testCase.querySelector('.test-case-edit-output');
            
            if (editInput) editInput.replaceWith(inputDiv);
            if (editOutput) editOutput.replaceWith(outputDiv);
            
            // Восстанавливаем кнопку редактирования
            editButton.innerHTML = '<i class="fas fa-edit"></i> Редактировать';
            editButton.classList.remove('editing', 'btn-success');
            editButton.classList.add('btn-light');
            
            // Удаляем кнопку отмены
            cancelButton.remove();
            
            showToast('Редактирование отменено', 'info', 'Отмена');
        });
        
        showToast('Режим редактирования включен', 'info', 'Редактирование');
    }

    // Функция для сохранения изменений тестового случая
    function saveTestCaseEdits(testCase, editButton) {
        const inputTextarea = testCase.querySelector('.test-case-edit-input');
        const outputTextarea = testCase.querySelector('.test-case-edit-output');
        const cancelButton = testCase.querySelector('.cancel-edit');
        
        const newInput = inputTextarea?.value || '';
        const newOutput = outputTextarea?.value || '';
        
        // Проверяем, что поля не пустые
        if (!newInput.trim() || !newOutput.trim()) {
            showToast('Заполните все поля', 'warning', 'Внимание');
            return;
        }
        
        // Заменяем textarea на div с новым содержимым
        const inputDiv = document.createElement('div');
        inputDiv.className = 'test-case-input';
        inputDiv.textContent = newInput;
        
        const outputDiv = document.createElement('div');
        outputDiv.className = 'test-case-output';
        outputDiv.textContent = newOutput;
        
        if (inputTextarea) inputTextarea.replaceWith(inputDiv);
        if (outputTextarea) outputTextarea.replaceWith(outputDiv);
        
        // Восстанавливаем кнопку редактирования
        editButton.innerHTML = '<i class="fas fa-edit"></i> Редактировать';
        editButton.classList.remove('editing', 'btn-success');
        editButton.classList.add('btn-light');
        
        // Удаляем кнопку отмены
        if (cancelButton) {
            cancelButton.remove();
        }
        
        showToast('Изменения сохранены', 'success', 'Сохранено');
    }

    // Обновление сводки тестовых случаев
    function updateTestCasesSummary() {
        const testCasesCount = document.querySelectorAll('.test-case-card').length;
        const summaryElement = document.querySelector('.summary-item:nth-child(3) .summary-value');
        if (summaryElement) {
            summaryElement.textContent = testCasesCount;
        }
    }

    // Функция для сбора данных задания
    function collectPracticeData() {
        return {
            title: document.getElementById('practice-title')?.value || '',
            description: document.getElementById('practice-description')?.value || '',
            subject: subjectSelect?.value || 'programming',
            requirements: Array.from(document.querySelectorAll('.requirement-item input')).map(input => input.value),
            testCases: Array.from(document.querySelectorAll('.test-case-card')).map(card => ({
                input: card.querySelector('.test-case-input')?.textContent || '',
                output: card.querySelector('.test-case-output')?.textContent || ''
            }))
        };
    }

    // Функция для показа предпросмотра
    function showPreviewModal(practiceData) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal" style="max-width: 800px;">
                <div class="modal-header">
                    <h3 class="modal-title">Предварительный просмотр задания</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body" style="max-height: 60vh; overflow-y: auto;">
                    <div class="preview-content">
                        <h2>${practiceData.title}</h2>
                        <p class="text-muted">${practiceData.description}</p>
                        <div class="preview-meta">
                            <span><strong>Предмет:</strong> ${subjectNames[practiceData.subject]}</span>
                        </div>
                        <hr>
                        
                        ${practiceData.requirements.length > 0 ? `
                            <div class="preview-section">
                                <h4>Требования к решению:</h4>
                                <ul>
                                    ${practiceData.requirements.map(req => `<li>${req}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        ${practiceData.testCases.length > 0 ? `
                            <div class="preview-section">
                                <h4>${practiceData.subject === 'programming' ? 'Тестовые случаи' : 'Примеры'}:</h4>
                                ${practiceData.testCases.map((testCase, index) => `
                                    <div class="preview-test-case">
                                        <h5>${practiceData.subject === 'programming' ? 'Тестовый случай' : 'Пример'} ${index + 1}</h5>
                                        <div class="preview-test-case-content">
                                            <div>
                                                <strong>${exampleLabels[practiceData.subject].input}:</strong>
                                                <div class="code-block">${testCase.input}</div>
                                            </div>
                                            <div>
                                                <strong>${exampleLabels[practiceData.subject].output}:</strong>
                                                <div class="code-block">${testCase.output}</div>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
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
        
        showToast('Предпросмотр задания открыт', 'info', 'Готово');
    }

    // Функция для инициализации модальных окон
    function initModals() {
        const settingsBtn = document.getElementById('settings-btn');
        const requirementsBtn = document.getElementById('requirements-btn');
        const examplesBtn = document.getElementById('examples-btn');
        const hintsBtn = document.getElementById('hints-btn');
        const codeBtn = document.getElementById('code-btn');
        
        const settingsModal = document.getElementById('settings-modal');
        const requirementsModal = document.getElementById('requirements-modal');
        const examplesModal = document.getElementById('examples-modal');
        const hintsModal = document.getElementById('hints-modal');
        const codeModal = document.getElementById('code-modal');
        
        const settingsClose = document.getElementById('settings-close');
        const requirementsClose = document.getElementById('requirements-close');
        const examplesClose = document.getElementById('examples-close');
        const hintsClose = document.getElementById('hints-close');
        const codeClose = document.getElementById('code-close');
        
        const settingsCancel = document.getElementById('settings-cancel');
        const requirementsCancel = document.getElementById('requirements-cancel');
        const examplesCancel = document.getElementById('examples-cancel');
        const hintsCancel = document.getElementById('hints-cancel');
        const codeCancel = document.getElementById('code-cancel');
        
        const settingsSave = document.getElementById('settings-save');
        const requirementsSave = document.getElementById('requirements-save');
        const examplesSave = document.getElementById('examples-save');
        const hintsSave = document.getElementById('hints-save');
        const codeSave = document.getElementById('code-save');

        // Проверяем, существуют ли элементы
        if (!settingsBtn || !settingsModal) {
            console.log('Модальные окна не найдены на странице');
            return;
        }
        
        // Open modals
        settingsBtn.addEventListener('click', () => {
            settingsModal.classList.add('active');
        });
        
        requirementsBtn?.addEventListener('click', () => {
            requirementsModal?.classList.add('active');
        });
        
        examplesBtn?.addEventListener('click', () => {
            examplesModal?.classList.add('active');
        });
        
        hintsBtn?.addEventListener('click', () => {
            hintsModal?.classList.add('active');
        });
        
        codeBtn?.addEventListener('click', () => {
            codeModal?.classList.add('active');
        });
        
        // Close modals
        function closeAllModals() {
            settingsModal?.classList.remove('active');
            requirementsModal?.classList.remove('active');
            examplesModal?.classList.remove('active');
            hintsModal?.classList.remove('active');
            codeModal?.classList.remove('active');
        }
        
        settingsClose?.addEventListener('click', closeAllModals);
        requirementsClose?.addEventListener('click', closeAllModals);
        examplesClose?.addEventListener('click', closeAllModals);
        hintsClose?.addEventListener('click', closeAllModals);
        codeClose?.addEventListener('click', closeAllModals);
        
        settingsCancel?.addEventListener('click', closeAllModals);
        requirementsCancel?.addEventListener('click', closeAllModals);
        examplesCancel?.addEventListener('click', closeAllModals);
        hintsCancel?.addEventListener('click', closeAllModals);
        codeCancel?.addEventListener('click', closeAllModals);
        
        // Save actions
        settingsSave?.addEventListener('click', () => {
            showToast('Настройки задания сохранены!', 'success', 'Настройки');
            closeAllModals();
        });
        
        requirementsSave?.addEventListener('click', () => {
            showToast('Требования сохранены!', 'success', 'Требования');
            closeAllModals();
        });
        
        examplesSave?.addEventListener('click', () => {
            showToast('Примеры сохранены!', 'success', 'Примеры');
            closeAllModals();
        });
        
        hintsSave?.addEventListener('click', () => {
            showToast('Подсказки сохранены!', 'success', 'Подсказки');
            closeAllModals();
        });
        
        codeSave?.addEventListener('click', () => {
            showToast('Начальный код сохранен!', 'success', 'Код');
            closeAllModals();
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                closeAllModals();
            }
        });
    }

    // Функция для управления полем пароля в настройках
    function initPasswordFieldManagement() {
        const requireRegistration = document.getElementById('require-registration');
        const passwordField = document.getElementById('password-field');
        
        // Проверяем, существуют ли элементы на странице
        if (!requireRegistration || !passwordField) {
            return; // Элементы не найдены, выходим из функции
        }
        
        function togglePasswordField() {
            if (requireRegistration.checked) {
                passwordField.style.display = 'block';
            } else {
                passwordField.style.display = 'none';
            }
        }
        
        // Инициализация при загрузке
        togglePasswordField();
        
        // Обработчик изменения состояния чекбокса
        requireRegistration.addEventListener('change', togglePasswordField);
        
        // Также добавим обработчик для сохранения настроек
        const settingsSave = document.getElementById('settings-save');
        if (settingsSave) {
            settingsSave.addEventListener('click', function() {
                // Сохраняем настройки пароля
                if (requireRegistration.checked) {
                    const password = document.getElementById('practice-password')?.value;
                    if (password) {
                        showToast('Пароль для задания сохранен', 'success', 'Настройки');
                    } else {
                        showToast('Введите пароль для задания', 'warning', 'Внимание');
                        return; // Не закрываем модальное окно если пароль не введен
                    }
                }
            });
        }
    }

    // Функция для инициализации функционала существующих тестовых случаев
    function initExistingTestCases() {
        const testCases = document.querySelectorAll('.test-case-card');
        
        testCases.forEach(testCase => {
            const toggleBtn = testCase.querySelector('.btn-light');
            const editBtn = testCase.querySelector('.btn-light:nth-child(1)');
            const deleteBtn = testCase.querySelector('.btn-danger');
            
            // Обработчик для кнопки "Показать студентам"
            toggleBtn?.addEventListener('click', function() {
                const isVisible = this.innerHTML.includes('fa-eye');
                if (isVisible) {
                    this.innerHTML = '<i class="fas fa-eye-slash"></i> Скрыть от студентов';
                    showToast('Пример скрыт от студентов', 'info', 'Видимость');
                } else {
                    this.innerHTML = '<i class="fas fa-eye"></i> Показать студентам';
                    showToast('Пример показан студентам', 'info', 'Видимость');
                }
            });
            
            // Обработчик для кнопки "Редактировать"
            editBtn?.addEventListener('click', function() {
                const testCaseContent = this.closest('.test-case-card').querySelector('.test-case-content');
                const inputs = testCaseContent.querySelectorAll('.test-case-input, .test-case-output');
                
                inputs.forEach(input => {
                    const currentText = input.textContent;
                    input.innerHTML = `<textarea class="form-control" style="height: 80px;">${currentText}</textarea>`;
                });
                
                // Заменяем кнопку редактирования на кнопку сохранения
                this.innerHTML = '<i class="fas fa-save"></i> Сохранить';
                this.classList.remove('btn-light');
                this.classList.add('btn-success');
                
                // Сохраняем оригинальный обработчик
                const originalClickHandler = this.onclick;
                this.onclick = null;
                
                this.addEventListener('click', function saveHandler() {
                    const textareas = testCaseContent.querySelectorAll('textarea');
                    textareas.forEach((textarea, index) => {
                        const div = document.createElement('div');
                        div.className = index === 0 ? 'test-case-input' : 'test-case-output';
                        div.textContent = textarea.value;
                        div.style.border = 'none';
                        div.style.padding = '8px';
                        div.style.backgroundColor = 'transparent';
                        textarea.parentNode.replaceChild(div, textarea);
                    });
                    
                    // Возвращаем кнопку в исходное состояние
                    this.innerHTML = '<i class="fas fa-edit"></i> Редактировать';
                    this.classList.remove('btn-success');
                    this.classList.add('btn-light');
                    this.onclick = originalClickHandler;
                    
                    showToast('Изменения сохранены', 'success', 'Редактирование');
                }, { once: true });
            });
            
            // Обработчик для кнопки удаления
            deleteBtn?.addEventListener('click', function() {
                const testCaseCard = this.closest('.test-case-card');
                const confirmToast = showToast(
                    'Удалить этот пример?', 
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
                    testCaseCard.remove();
                    updateTestCasesSummary();
                    showToast('Пример удален', 'success', 'Удалено');
                    confirmToast.remove();
                });
                
                toastContent.querySelector('.cancel-delete').addEventListener('click', function() {
                    confirmToast.remove();
                });
            });
        });
    }

    // === ОСНОВНОЙ КОД ИНИЦИАЛИЗАЦИИ ===

    // Initial call to set up UI
    updateSubjectUI();
    
    // Add event listener for subject change
    subjectSelect?.addEventListener('change', updateSubjectUI);
    
    // Добавление нового требования
    addRequirementBtn?.addEventListener('click', function() {
        if (!requirementsList) return;
        
        const newRequirement = document.createElement('li');
        newRequirement.className = 'requirement-item';
        newRequirement.innerHTML = `
            <div class="requirement-text">
                <input type="text" class="form-control" placeholder="Введите требование">
            </div>
            <div class="requirement-actions">
                <button class="btn btn-light btn-small move-up"><i class="fas fa-arrow-up"></i></button>
                <button class="btn btn-light btn-small move-down"><i class="fas fa-arrow-down"></i></button>
                <button class="btn btn-danger btn-small delete-requirement"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        requirementsList.appendChild(newRequirement);
        
        // Добавляем обработчики для новой кнопки
        initRequirementEvents(newRequirement);
        updateRequirementsSummary();
        showToast('Новое требование добавлено', 'success', 'Требование');
    });

    // Добавление нового примера/тестового случая
    addTestCaseBtn?.addEventListener('click', function() {
        if (!testCasesContainer) return;
        
        const selectedSubject = subjectSelect?.value || 'programming';
        const testCases = document.querySelectorAll('.test-case-card');
        const newTestCaseNumber = testCases.length + 1;
        
        const newTestCase = document.createElement('div');
        newTestCase.className = 'test-case-card';
        newTestCase.innerHTML = `
            <div class="test-case-header">
                <div class="test-case-title">${selectedSubject === 'programming' ? 'Тестовый случай' : 'Пример'} ${newTestCaseNumber}</div>
                <div>
                    <button class="btn btn-light btn-small toggle-visibility"><i class="fas fa-eye"></i> Показать студентам</button>
                </div>
            </div>
            <div class="test-case-content">
                <div>
                    <div class="form-label">${exampleLabels[selectedSubject].input}</div>
                    <div class="test-case-input">${selectedSubject === 'programming' ? 'Входные данные...' : 'Условие...'}</div>
                </div>
                <div>
                    <div class="form-label">${exampleLabels[selectedSubject].output}</div>
                    <div class="test-case-output">${selectedSubject === 'programming' ? 'Ожидаемый вывод...' : 'Решение...'}</div>
                </div>
            </div>
            <div class="test-case-actions">
                <button class="btn btn-light btn-small edit-test-case"><i class="fas fa-edit"></i> Редактировать</button>
                <button class="btn btn-danger btn-small delete-test-case"><i class="fas fa-trash"></i> Удалить</button>
            </div>
        `;
        
        testCasesContainer.appendChild(newTestCase);
        
        // Добавляем обработчики для нового тестового случая
        initTestCaseEvents(newTestCase);
        updateTestCasesSummary();
        showToast('Новый тестовый случай добавлен', 'success', 'Тестовый случай');
    });

    // Сохранение задания
    savePracticeBtn?.addEventListener('click', function() {
        const practiceTitle = document.getElementById('practice-title')?.value;
        const selectedSubject = subjectSelect?.value;
        
        if (!practiceTitle) {
            showToast('Пожалуйста, введите название задания', 'warning', 'Недостаточно данных');
            document.getElementById('practice-title')?.focus();
            return;
        }
        
        if (!selectedSubject) {
            showToast('Пожалуйста, выберите предмет', 'warning', 'Недостаточно данных');
            return;
        }
        
        const saveButton = this;
        const originalText = saveButton.innerHTML;
        saveButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Сохранение...';
        saveButton.disabled = true;
        
        // В реальном приложении здесь был бы код сохранения задания
        setTimeout(() => {
            saveButton.innerHTML = originalText;
            saveButton.disabled = false;
            
            showToast(`Задание "${practiceTitle}" по предмету "${subjectNames[selectedSubject]}" успешно сохранено!`, 'success', 'Сохранено');
        }, 1500);
    });

    // Предпросмотр задания
    previewBtn?.addEventListener('click', function() {
        const practiceData = collectPracticeData();
        
        if (!practiceData.title) {
            showToast('Введите название задания для предпросмотра', 'warning', 'Недостаточно данных');
            return;
        }
        
        showPreviewModal(practiceData);
    });

    // Инициализация существующих элементов
    document.querySelectorAll('.requirement-item').forEach(initRequirementEvents);
    document.querySelectorAll('.test-case-card').forEach(initTestCaseEvents);
    updateRequirementsSummary();
    updateTestCasesSummary();

    // Инициализация модальных окон
    initModals();

    // Инициализация управления паролем
    initPasswordFieldManagement();

    // Инициализация функционала для кнопок в существующих тестовых случаях
    initExistingTestCases();

    // Автосохранение
    let autoSaveTimeout;
    const autoSaveElements = document.querySelectorAll('#practice-title, #practice-description, .requirement-item input, .test-case-input, .test-case-output');
    
    autoSaveElements.forEach(element => {
        element.addEventListener('input', function() {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                const data = collectPracticeData();
                localStorage.setItem('practice_autosave', JSON.stringify(data));
            }, 2000);
        });
    });

    // Восстановление автосохранения
    const savedPractice = localStorage.getItem('practice_autosave');
    if (savedPractice) {
        try {
            const practiceData = JSON.parse(savedPractice);
            const restoreToast = showToast(
                'Обнаружено автосохраненное задание. Восстановить?', 
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
                // Восстановление данных
                document.getElementById('practice-title').value = practiceData.title;
                document.getElementById('practice-description').value = practiceData.description;
                subjectSelect.value = practiceData.subject;
                updateSubjectUI();
                
                showToast('Задание восстановлено из автосохранения', 'success', 'Восстановлено');
                restoreToast.remove();
            });
            
            restoreToast.querySelector('.cancel-restore').addEventListener('click', function() {
                localStorage.removeItem('practice_autosave');
                showToast('Автосохранение очищено', 'info', 'Отменено');
                restoreToast.remove();
            });
        } catch (e) {
            console.error('Error restoring autosave:', e);
        }
    }

    // Очистка автосохранения при успешном сохранении
    savePracticeBtn?.addEventListener('click', function() {
        localStorage.removeItem('practice_autosave');
    });
}