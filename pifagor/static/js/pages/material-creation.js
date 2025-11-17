export function initMaterialCreation() {
    // Анимация появления элементов при скролле
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

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Выбор типа материала
    const typeOptions = document.querySelectorAll('.type-option');
    const materialTypeInput = document.getElementById('material-type');
    const previewIcon = document.getElementById('preview-icon');
    const previewType = document.getElementById('preview-type');
    const fileTypeInfo = document.getElementById('file-type-info');
    const fileLabelText = document.getElementById('file-label-text');
    const fileUploadGroup = document.getElementById('file-upload-group');
    const linkInputGroup = document.getElementById('link-input-group');
    const materialUrl = document.getElementById('material-url');
    const urlPreview = document.getElementById('url-preview');
    const previewUrl = document.getElementById('preview-url');
    const previewLink = document.getElementById('preview-link');
    const previewLinkUrl = document.getElementById('preview-link-url');
    
    typeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем активный класс у всех опций
            typeOptions.forEach(opt => opt.classList.remove('active'));
            // Добавляем активный класс к выбранной опции
            this.classList.add('active');
            
            // Получаем тип материала
            const type = this.getAttribute('data-type');
            materialTypeInput.value = type;
            
            // Обновляем иконку и текст в предпросмотре
            updatePreviewByType(type);
            
            // Обновляем информацию о поддерживаемых файлах
            updateFileTypeInfo(type);
            
            // Показываем/скрываем соответствующие поля ввода
            toggleInputFields(type);
        });
    });
    
    function updatePreviewByType(type) {
        const typeNames = {
            'video': 'Видео',
            'document': 'Документ',
            'presentation': 'Презентация',
            'code': 'Код/Примеры',
            'task': 'Задание',
            'test': 'Тест',
            'link': 'Ссылка'
        };
        
        const typeIcons = {
            'video': 'fas fa-play',
            'document': 'far fa-file-pdf',
            'presentation': 'far fa-file-powerpoint',
            'code': 'fas fa-code',
            'task': 'fas fa-tasks',
            'test': 'fas fa-question-circle',
            'link': 'fas fa-link'
        };
        
        const typeColors = {
            'video': 'icon-video',
            'document': 'icon-document',
            'presentation': 'icon-presentation',
            'code': 'icon-code',
            'task': 'icon-task',
            'test': 'icon-test',
            'link': 'icon-link'
        };
        
        // Обновляем иконку
        previewIcon.className = 'preview-icon ' + typeColors[type];
        previewIcon.innerHTML = `<i class="${typeIcons[type]}"></i>`;
        
        // Обновляем текст
        previewType.textContent = `Тип: ${typeNames[type]}`;
        
        // Показываем/скрываем ссылку в предпросмотре
        if (type === 'link') {
            previewLink.style.display = 'block';
        } else {
            previewLink.style.display = 'none';
        }
    }
    
    function updateFileTypeInfo(type) {
        const fileInfo = {
            'video': 'Поддерживаются MP4, AVI, MOV, WebM (макс. 2GB)',
            'document': 'Поддерживаются PDF, DOC, DOCX, TXT (макс. 100MB)',
            'presentation': 'Поддерживаются PPT, PPTX, PDF (макс. 100MB)',
            'code': 'Поддерживаются ZIP, RAR, отдельные файлы кода (макс. 50MB)',
            'task': 'Поддерживаются PDF, DOC, ZIP с заданиями (макс. 50MB)',
            'test': 'Используйте встроенный редактор тестов',
            'link': 'Введите корректный URL (начинается с http:// или https://)'
        };
        
        const fileLabels = {
            'video': 'Загрузите видеофайл',
            'document': 'Загрузите документ',
            'presentation': 'Загрузите презентацию',
            'code': 'Загрузите архив с кодом',
            'task': 'Загрузите файл с заданием',
            'test': 'Создайте тест',
            'link': 'Введите ссылку на материал'
        };
        
        fileTypeInfo.textContent = fileInfo[type];
        fileLabelText.textContent = fileLabels[type];
    }
    
    function toggleInputFields(type) {
        if (type === 'link') {
            fileUploadGroup.style.display = 'none';
            linkInputGroup.classList.add('active');
            // Делаем поле ссылки обязательным
            materialUrl.required = true;
            // Делаем поле файла необязательным
            document.getElementById('material-file').required = false;
        } else if (type === 'test') {
            fileUploadGroup.style.display = 'none';
            linkInputGroup.classList.remove('active');
            // Оба поля необязательны для тестов
            document.getElementById('material-file').required = false;
            materialUrl.required = false;
        } else {
            fileUploadGroup.style.display = 'block';
            linkInputGroup.classList.remove('active');
            // Делаем поле файла обязательным
            document.getElementById('material-file').required = true;
            // Делаем поле ссылки необязательным
            materialUrl.required = false;
        }
    }
    
    // Предпросмотр в реальном времени
    const titleInput = document.getElementById('material-title');
    const descInput = document.getElementById('material-desc');
    const durationInput = document.getElementById('material-duration');
    
    const previewTitle = document.getElementById('preview-title');
    const previewDesc = document.getElementById('preview-desc');
    const previewDuration = document.getElementById('preview-duration');
    
    // Обновление предпросмотра при изменении полей
    titleInput.addEventListener('input', function() {
        previewTitle.textContent = this.value || 'Название материала';
    });
    
    descInput.addEventListener('input', function() {
        previewDesc.textContent = this.value || 'Описание материала появится здесь';
    });
    
    durationInput.addEventListener('input', function() {
        if (this.value) {
            previewDuration.textContent = `Время: ${this.value} мин.`;
        } else {
            previewDuration.textContent = 'Время: -';
        }
    });
    
    // Обновление предпросмотра ссылки
    materialUrl.addEventListener('input', function() {
        if (this.value) {
            previewUrl.href = this.value;
            previewUrl.textContent = this.value;
            urlPreview.classList.add('active');
            
            // Обновляем ссылку в предпросмотре материала
            previewLinkUrl.href = this.value;
            previewLinkUrl.textContent = this.value;
        } else {
            urlPreview.classList.remove('active');
        }
    });
    
    // Обработка отправки формы
    const form = document.getElementById('material-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Проверяем валидность URL, если выбран тип "Ссылка"
        const materialType = materialTypeInput.value;
        if (materialType === 'link') {
            const url = materialUrl.value;
            if (!isValidUrl(url)) {
                alert('Пожалуйста, введите корректный URL (начинается с http:// или https://)');
                materialUrl.focus();
                return;
            }
        }
        
        // В реальном приложении здесь будет отправка данных на сервер
        alert('Материал успешно создан!');
        // form.reset();
        
        // Сброс предпросмотра
        previewTitle.textContent = 'Название материала';
        previewDesc.textContent = 'Описание материала появится здесь';
        previewDuration.textContent = 'Время: -';
        urlPreview.classList.remove('active');
        previewLink.style.display = 'none';
    });
    
    // Функция проверки URL
    function isValidUrl(string) {
        try {
            new URL(string);
            return string.startsWith('http://') || string.startsWith('https://');
        } catch (_) {
            return false;
        }
    }
}