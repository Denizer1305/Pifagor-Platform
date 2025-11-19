// js/modules/courses.js
export function initCoursePages() {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('courses.html')) {
        initCoursesPage();
    } else if (currentPath.includes('courses-list.html')) {
        initCoursesListPage();
    } else if (currentPath.includes('courses-detail.html')) {
        initCourseDetailPage();
    } else if (currentPath.includes('create-courses.html')) {
        initCreateCoursePage();
    }
}

function initCoursesPage() {
    // Анимации уже инициализированы в main.js
    console.log('Initialized courses page');
}

function initCoursesListPage() {
    // Анимации уже инициализированы в main.js
    console.log('Initialized courses list page');
}

function initCourseDetailPage() {
    // Отметить лекцию как пройденную
    document.addEventListener('DOMContentLoaded', function() {
        const video = document.querySelector('iframe');
        if (video) {
            video.addEventListener('load', function() {
                // Здесь может быть логика отслеживания просмотра видео
                console.log('Видео загружено, лекция отмечена как просмотренная');
            });
        }
    });
}

function initCreateCoursePage() {
    // Убрать вложенный DOMContentLoaded - он уже есть в main.js
    const titleInput = document.getElementById('course-title');
    const descInput = document.getElementById('course-short-desc');
    const levelSelect = document.getElementById('course-level');
    const durationInput = document.getElementById('course-duration');
    
    const previewTitle = document.getElementById('preview-title');
    const previewDesc = document.getElementById('preview-desc');
    const previewLevel = document.getElementById('preview-level');
    const previewDuration = document.getElementById('preview-duration');
    
    // Обновление предпросмотра при изменении полей
    if (titleInput && previewTitle) {
        titleInput.addEventListener('input', function() {
            previewTitle.textContent = this.value || 'Название курса';
        });
    }
    
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
    
    // Обработка отправки формы
    const form = document.getElementById('course-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // В реальном приложении здесь будет отправка данных на сервер
            alert('Курс успешно создан и отправлен на модерацию!');
            
            // Сброс предпросмотра
            if (previewTitle) previewTitle.textContent = 'Название курса';
            if (previewDesc) previewDesc.textContent = 'Краткое описание курса появится здесь';
            if (previewLevel) previewLevel.textContent = 'Уровень: -';
            if (previewDuration) previewDuration.textContent = 'Часов: -';
            
            // Сброс изображения
            if (previewImage) previewImage.innerHTML = '<i class="fas fa-book"></i>';
        });
    }
}