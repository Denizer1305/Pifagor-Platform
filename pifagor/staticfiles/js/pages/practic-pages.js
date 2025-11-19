// practic-pages.js
import { initPracticExecution } from '../modules/practic-execution.js';
import { initPracticReview } from '../modules/practic-review.js';
import { initPracticCreation } from '../modules/practic-creation.js';
import { initCommonAnimations, initPracticeAnimations } from '../modules/animations.js';
import { initToastSystem } from '../modules/toast.js';

// Автоматическое определение типа страницы и инициализация соответствующего модуля
function initPracticePage() {
    // Инициализируем общие анимации
    initCommonAnimations();
    
    // Инициализируем систему уведомлений
    initToastSystem();
    
    // Определяем тип страницы по наличию специфических элементов
    if (document.getElementById('code-input') && document.getElementById('run-btn')) {
        // Страница выполнения задания (practic-detail.html)
        console.log('Инициализация страницы выполнения задания');
        initPracticExecution(); // ← ЭТА СТРОКА ВАЖНА!
    } else if (document.getElementById('review-modal') || document.querySelector('.submission-card')) {
        // Страница проверки заданий (practic-check.html)
        console.log('Инициализация страницы проверки заданий');
        initPracticReview();
    } else if (document.getElementById('practice-subject') || document.querySelector('.practice-creation')) {
        // Страница создания задания (create-practic.html)
        console.log('Инициализация страницы создания задания');
        initPracticCreation();
    } else if (document.querySelector('.practice-grid') && document.querySelector('.subject-card')) {
        // Главная страница практики (practic.html)
        console.log('Инициализация главной страницы практики');
        initPracticOverview();
    } else if (document.querySelector('.topics-container') && document.querySelector('.topic-card')) {
        // Страница списка заданий (practic-list.html)
        console.log('Инициализация страницы списка заданий');
        initPracticeAnimations();
    } else {
        console.log('Тип страницы практики не определен');
    }
}

// Функция для главной страницы практики
function initPracticOverview() {
    console.log('Инициализация главной страницы практики');
    
    // Инициализация анимаций для карточек предметов
    const subjectCards = document.querySelectorAll('.subject-card');
    
    subjectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Клик по карточке предмета
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn')) {
                const link = this.querySelector('a');
                if (link) {
                    window.location.href = link.getAttribute('href');
                }
            }
        });
    });

    // Инициализация поиска по предметам
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const cards = document.querySelectorAll('.subject-card');
            
            cards.forEach(card => {
                const title = card.querySelector('.subject-title').textContent.toLowerCase();
                const description = card.querySelector('.subject-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Инициализация фильтров
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterSubjects(filter);
        });
    });

    // Функция фильтрации предметов
    function filterSubjects(filter) {
        const cards = document.querySelectorAll('.subject-card');
        
        cards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                const subjectType = card.getAttribute('data-subject');
                if (subjectType === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }

    // Инициализация статистики прогресса
    initProgressStats();
}

// Функция для инициализации статистики прогресса
function initProgressStats() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
        
        // Анимация заполнения прогресс-бара
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
        }, 100);
    });
}

// Экспортируем функции для использования в main.js
export {
    initPracticePage,
    initPracticExecution,
    initPracticReview,
    initPracticCreation,
    initPracticOverview,
};

// Автоматическая инициализация при загрузке модуля
document.addEventListener('DOMContentLoaded', initPracticePage);