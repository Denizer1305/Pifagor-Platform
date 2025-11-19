export function initCourseCreation() {
    initPreview();
    initFormSubmission();
    initToastSystem();
    addToastStyles();
}

function initToastSystem() {
    if (!document.getElementById('toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
}

function showToast(message, type = 'info', duration = 4000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };

    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">
                <i class="${icons[type] || icons.info}"></i>
            </div>
            <div class="toast-message">${message}</div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="toast-progress"></div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        hideToast(toast);
    });

    if (duration > 0) {
        setTimeout(() => {
            hideToast(toast);
        }, duration);
    }

    const progressBar = toast.querySelector('.toast-progress');
    if (progressBar) {
        progressBar.style.animation = `progress ${duration}ms linear`;
    }

    return toast;
}

function hideToast(toast) {
    toast.classList.remove('show');
    toast.classList.add('hide');
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

function initPreview() {
    console.log('Initializing preview...');
    
    const titleInput = document.getElementById('course-title');
    const descInput = document.getElementById('course-short-desc');
    const levelSelect = document.getElementById('course-level');
    const durationInput = document.getElementById('course-duration');
    
    const previewTitle = document.getElementById('preview-title');
    const previewDesc = document.getElementById('preview-desc');
    const previewLevel = document.getElementById('preview-level');
    const previewDuration = document.getElementById('preview-duration');
    
    // Проверяем, что все элементы существуют
    if (!titleInput || !previewTitle) {
        console.error('Title input or preview title not found');
        return;
    }
    
    // Обновление предпросмотра при изменении полей
    titleInput.addEventListener('input', function() {
        console.log('Title changed:', this.value);
        previewTitle.textContent = this.value || 'Название курса';
    });
    
    if (descInput && previewDesc) {
        descInput.addEventListener('input', function() {
            previewDesc.textContent = this.value || 'Краткое описание курса появится здесь';
        });
    }
    
    if (levelSelect && previewLevel) {
        levelSelect.addEventListener('change', function() {
            const levelText = this.options[this.selectedIndex].text;
            previewLevel.textContent = `Уровень: ${levelText || '-'}`;
        });
    }
    
    if (durationInput && previewDuration) {
        durationInput.addEventListener('input', function() {
            previewDuration.textContent = `Часов: ${this.value || '-'}`;
        });
    }
    
    // Обработка загрузки изображения
    const imageInput = document.getElementById('course-image');
    const previewImage = document.querySelector('.preview-image');
    
    if (imageInput && previewImage) {
        imageInput.addEventListener('change', function(e) {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    previewImage.innerHTML = '';
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '8px';
                    previewImage.appendChild(img);
                };
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
    
    console.log('Preview initialized successfully');
}

function initFormSubmission() {
    console.log('Initializing form submission...');
    
    const form = document.getElementById('course-form');
    const saveDraftBtn = document.querySelector('.form-actions .btn-light');
    
    if (!form) {
        console.error('Form not found');
        return;
    }
    
    // Обработка сохранения черновика
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const formData = {
                title: document.getElementById('course-title').value,
                description: document.getElementById('course-short-desc').value,
                fullDescription: document.getElementById('course-full-desc').value,
                category: document.getElementById('course-category').value,
                level: document.getElementById('course-level').value,
                duration: document.getElementById('course-duration').value,
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('courseDraft', JSON.stringify(formData));
            
            showToast('Черновик успешно сохранен!', 'success', 3000);
            console.log('Draft saved:', formData);
        });
    }
    
    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Создание...';
        submitBtn.disabled = true;
        
        // Имитация отправки на сервер
        setTimeout(() => {
            showToast('Курс успешно создан и отправлен на модерацию!', 'success', 5000);
            
            // Сброс формы
            resetForm();
            
            // Удаление черновика
            localStorage.removeItem('courseDraft');
            
            // Восстановление кнопки
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            console.log('Course created successfully');
        }, 2000);
    });
    
    // Загрузка черновика при загрузке страницы
    loadDraft();
    
    console.log('Form submission initialized successfully');
}

function validateForm() {
    const title = document.getElementById('course-title').value.trim();
    const description = document.getElementById('course-short-desc').value.trim();
    const fullDescription = document.getElementById('course-full-desc').value.trim();
    const category = document.getElementById('course-category').value;
    const level = document.getElementById('course-level').value;
    const duration = document.getElementById('course-duration').value;
    
    if (!title) {
        showToast('Пожалуйста, введите название курса', 'error', 4000);
        return false;
    }
    
    if (!description) {
        showToast('Пожалуйста, введите краткое описание курса', 'error', 4000);
        return false;
    }
    
    if (!fullDescription) {
        showToast('Пожалуйста, введите полное описание курса', 'error', 4000);
        return false;
    }
    
    if (!category) {
        showToast('Пожалуйста, выберите категорию курса', 'error', 4000);
        return false;
    }
    
    if (!level) {
        showToast('Пожалуйста, выберите уровень сложности', 'error', 4000);
        return false;
    }
    
    if (!duration || duration < 1) {
        showToast('Пожалуйста, укажите корректную продолжительность курса', 'error', 4000);
        return false;
    }
    
    return true;
}

function resetForm() {
    const form = document.getElementById('course-form');
    const previewTitle = document.getElementById('preview-title');
    const previewDesc = document.getElementById('preview-desc');
    const previewLevel = document.getElementById('preview-level');
    const previewDuration = document.getElementById('preview-duration');
    const previewImage = document.querySelector('.preview-image');
    
    if (form) {
        form.reset();
        console.log('Form reset');
    }
    
    // Сброс предпросмотра
    if (previewTitle) previewTitle.textContent = 'Название курса';
    if (previewDesc) previewDesc.textContent = 'Краткое описание курса появится здесь';
    if (previewLevel) previewLevel.textContent = 'Уровень: -';
    if (previewDuration) previewDuration.textContent = 'Часов: -';
    
    // Сброс изображения
    if (previewImage) {
        previewImage.innerHTML = '<i class="fas fa-book"></i>';
    }
    
    console.log('Preview reset');
}

function loadDraft() {
    const draft = localStorage.getItem('courseDraft');
    if (draft) {
        try {
            const formData = JSON.parse(draft);
            
            document.getElementById('course-title').value = formData.title || '';
            document.getElementById('course-short-desc').value = formData.description || '';
            document.getElementById('course-full-desc').value = formData.fullDescription || '';
            document.getElementById('course-category').value = formData.category || '';
            document.getElementById('course-level').value = formData.level || '';
            document.getElementById('course-duration').value = formData.duration || '';
            
            // Триггерим события для обновления предпросмотра
            document.getElementById('course-title').dispatchEvent(new Event('input'));
            document.getElementById('course-short-desc').dispatchEvent(new Event('input'));
            document.getElementById('course-level').dispatchEvent(new Event('change'));
            document.getElementById('course-duration').dispatchEvent(new Event('input'));
            
            console.log('Draft loaded:', formData);
            showToast('Черновик загружен', 'info', 3000);
        } catch (error) {
            console.error('Ошибка при загрузке черновика:', error);
        }
    }
}

function addToastStyles() {
    const toastStyles = `
        .toast-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 400px;
        }
        
        .toast {
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            border-left: 4px solid;
        }
        
        .toast.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .toast.hide {
            transform: translateX(400px);
            opacity: 0;
        }
        
        .toast-success {
            border-left-color: #10b981;
        }
        
        .toast-error {
            border-left-color: #ef4444;
        }
        
        .toast-warning {
            border-left-color: #f59e0b;
        }
        
        .toast-info {
            border-left-color: #3b82f6;
        }
        
        .toast-content {
            display: flex;
            align-items: center;
            padding: 16px;
            position: relative;
        }
        
        .toast-icon {
            margin-right: 12px;
            font-size: 1.5em;
            flex-shrink: 0;
        }
        
        .toast-success .toast-icon {
            color: #10b981;
        }
        
        .toast-error .toast-icon {
            color: #ef4444;
        }
        
        .toast-warning .toast-icon {
            color: #f59e0b;
        }
        
        .toast-info .toast-icon {
            color: #3b82f6;
        }
        
        .toast-message {
            flex: 1;
            font-weight: 500;
            color: #374151;
            font-size: 0.95em;
            line-height: 1.4;
        }
        
        .toast-close {
            background: none;
            border: none;
            color: #9ca3af;
            cursor: pointer;
            padding: 4px;
            margin-left: 8px;
            border-radius: 4px;
            transition: all 0.2s;
            flex-shrink: 0;
        }
        
        .toast-close:hover {
            background: #f3f4f6;
            color: #6b7280;
        }
        
        .toast-progress {
            height: 3px;
            width: 100%;
            background: rgba(0, 0, 0, 0.1);
            position: relative;
        }
        
        .toast-progress::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            transform-origin: left;
            animation: progress linear;
        }
        
        .toast-success .toast-progress::before {
            background: linear-gradient(90deg, #10b981, #34d399);
        }
        
        .toast-error .toast-progress::before {
            background: linear-gradient(90deg, #ef4444, #f87171);
        }
        
        .toast-warning .toast-progress::before {
            background: linear-gradient(90deg, #f59e0b, #fbbf24);
        }
        
        .toast-info .toast-progress::before {
            background: linear-gradient(90deg, #3b82f6, #60a5fa);
        }
        
        @keyframes progress {
            0% {
                transform: scaleX(1);
            }
            100% {
                transform: scaleX(0);
            }
        }
        
        .fa-spin {
            animation: fa-spin 1s infinite linear;
        }
        
        @keyframes fa-spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        
        @media (max-width: 768px) {
            .toast-container {
                top: 10px;
                right: 10px;
                left: 10px;
                max-width: none;
            }
            
            .toast {
                transform: translateY(-100px);
            }
            
            .toast.show {
                transform: translateY(0);
            }
            
            .toast.hide {
                transform: translateY(-100px);
            }
        }
    `;

    if (!document.querySelector('#toast-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'toast-styles';
        styleSheet.textContent = toastStyles;
        document.head.appendChild(styleSheet);
    }
}