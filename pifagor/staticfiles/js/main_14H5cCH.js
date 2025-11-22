// ===== ОСНОВНЫЕ ИМПОРТЫ МОДУЛЕЙ =====
import { initMobileMenu } from './modules/mobile-menu.js';
import { initScrollAnimations, initHeaderScrollEffect } from './modules/animations.js';
import { initSmoothScroll, initParticles } from './modules/ui.js';
import { initAuth } from './modules/auth.js';
import { initProgress as initProgressModule } from './modules/progress.js';
import { initChat, quickAction } from './modules/chat.js';
import { Utils } from './lib/utils.js';

// Импорт менеджеров
import ThemeManager from './theme-manager.js';
import { ValidationManager } from './modules/validation.js';
import { StorageManager } from './modules/storage.js';
import { UploadManager } from './modules/upload.js';

// ===== ИМПОРТЫ СТРАНИЦ =====
// Аналитика
import { initAttendancePage, initProgressPage, initStatisticsPage } from './pages/analitics-page.js';

// Контакты
import { initMap, initFAQ, initContactForm } from './pages/contact-pages.js';

// Преподаватели
import { initTeachersFilter } from './pages/teachers-pages.js';

// Админка
import { initPlatformUsers } from './pages/admin/platform-users.js';
import { initRoleManagement } from './pages/admin/role-management.js';
import { initSubjectManagement } from './pages/admin/subject-management.js';

// Материалы
import { initMaterialCreation } from './pages/material-creation.js';
import { initMaterialBrowser } from './pages/material-browser.js';

// Расписание
import { initSchedulePage, initScheduleCreatePage } from './pages/schedule-pages.js';

// Дашборд
import { initDashboard } from './pages/dashboard.js';

// Курсы
import { initCourseManagement } from './modules/course-management.js';
import { initCoursesModule } from './pages/course-pages.js';

// Практика
import { initPracticePage } from './pages/practic-pages.js';

// Тесты
import { initCreateTestPage } from './pages/test-pages.js';
import { initTestTaking, initTestResultsPage } from './modules/tests.js';

// Домашние задания
import { initHomeworkPages } from './pages/homework-pages.js';

// Профиль
import { initProfilePage } from './pages/profile.js';

// ===== КОНФИГУРАЦИЯ ПРИЛОЖЕНИЯ =====
const AppConfig = {
    debug: true,
    enableParticles: true,
    enableAnimations: true,
    autoInit: true,
    modules: {
        theme: true,
        auth: true,
        upload: true,
        validation: true,
        storage: true
    }
};

// ===== ОСНОВНОЙ КЛАСС ПРИЛОЖЕНИЯ =====
class EducationalPlatform {
    constructor(config = {}) {
        this.config = { ...AppConfig, ...config };
        this.modules = new Map();
        this.currentPath = window.location.pathname;
        this.isInitialized = false;
        
        // Инициализация менеджеров
        this.initManagers();
    }

    // Инициализация менеджеров
    initManagers() {
        if (this.config.modules.theme) {
            this.modules.set('theme', ThemeManager);
        }
        
        if (this.config.modules.validation) {
            this.modules.set('validation', ValidationManager);
            ValidationManager.activate();
        }
        
        if (this.config.modules.storage) {
            this.modules.set('storage', StorageManager);
        }
        
        if (this.config.modules.upload) {
            this.modules.set('upload', UploadManager);
            UploadManager.activate();
        }
    }

    // Основная инициализация приложения
    async init() {
        if (this.isInitialized) {
            console.warn('App already initialized');
            return;
        }

        try {
            this.log('Initializing Educational Platform...');

            // Базовая инициализация
            await this.initCore();
            
            // Инициализация по пути
            await this.initRouteSpecific();
            
            // Инициализация общих компонентов
            await this.initCommonComponents();

            this.isInitialized = true;
            this.log('Educational Platform initialized successfully');

            // Диспатчим событие успешной инициализации
            this.dispatchEvent('app:initialized');

        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.dispatchEvent('app:error', { error });
        }
    }

    // Инициализация ядра приложения
    async initCore() {
        // Инициализация темы
        if (this.modules.has('theme')) {
            const savedTheme = StorageManager.getTheme() || 'light';
            ThemeManager.applyTheme(savedTheme);
        }

        // Базовые UI компоненты
        initMobileMenu();
        initSmoothScroll();
        this.initSmoothAnchorScroll();

        // Анимации
        if (this.config.enableAnimations) {
            initScrollAnimations();
            initHeaderScrollEffect();
        }

        // Частицы
        if (this.config.enableParticles) {
            initParticles();
        }

        // Аутентификация
        if (this.config.modules.auth) {
            initAuth();
        }
    }

    // Инициализация специфичных для маршрута модулей
    async initRouteSpecific() {
        const path = this.currentPath;

        // Аналитика
        this.initAnalyticsPages(path);

        // Админка
        this.initAdminPages(path);

        // Учебные материалы
        this.initLearningPages(path);

        // Тесты и задания
        this.initAssessmentPages(path);

        // Профиль и настройки
        this.initProfilePages(path);

        // Другие специфичные страницы
        this.initOtherPages(path);
    }

    // Инициализация страниц аналитики
    initAnalyticsPages(path) {
        if (path.includes('attendance.html')) {
            initAttendancePage();
        } else if (path.includes('progress.html')) {
            initProgressPage();
        } else if (path.includes('statistics.html')) {
            initStatisticsPage();
        }
    }

    // Инициализация админских страниц
    initAdminPages(path) {
        if (document.querySelector('.users-header')) {
            initPlatformUsers();
        }
        
        if (document.querySelector('.roles-header')) {
            initRoleManagement();
        }
        
        if (document.querySelector('.subjects-header')) {
            initSubjectManagement();
        }
    }

    // Инициализация учебных страниц
    initLearningPages(path) {
        // Курсы
        initCoursesModule();
        
        // Материалы
        if (document.getElementById('material-form')) {
            initMaterialCreation();
        }
        
        if (document.querySelector('.material-card')) {
            initMaterialBrowser();
        }
        
        // Расписание
        if (path.includes('schedule.html')) {
            initSchedulePage();
        } else if (path.includes('schedule-create.html')) {
            initScheduleCreatePage();
        }
        
        // Преподаватели
        if (document.querySelector('.teachers-filters')) {
            initTeachersFilter();
        }
    }

    // Инициализация страниц оценки
    initAssessmentPages(path) {
        // Домашние задания
        if (path.includes('homework')) {
            initHomeworkPages(path);
        }
        
        // Практика
        if (path.includes('practic')) {
            initPracticePage();
        }
        
        // Тесты
        if (document.querySelector('.test-creation')) {
            initCreateTestPage();
        }
        
        if (document.querySelector('.test-taking')) {
            initTestTaking();
        }
        
        if (document.querySelector('.test-results')) {
            initTestResultsPage();
        }
        
        if (path.includes('practic-detail.html')) {
            this.loadModule('./modules/practic-execution.js').then(module => {
                if (module.initPracticExecution) {
                    module.initPracticExecution();
                }
            });
        }
    }

    // Инициализация страниц профиля
    initProfilePages(path) {
        if (path.includes('profile.html') || path.includes('edit-profile')) {
            initProfilePage();
        }
    }

    // Инициализация других страниц
    initOtherPages(path) {
        // Контакты
        if (document.getElementById('contactForm') || document.getElementById('map')) {
            this.initContactPage();
        }
        
        // Чат
        if (path.includes('chat-interface.html')) {
            initChat();
        }
        
        // Дашборд
        if (path.includes('dashboard.html') || path.includes('teacher-dashboard.html')) {
            initDashboard();
        }
        
        // Журнал
        if (path.includes('journal.html')) {
            this.initJournalPage();
        }
    }

    // Инициализация страницы контактов
    async initContactPage() {
        initFAQ();
        initContactForm();
        
        if (document.getElementById('map')) {
            if (typeof ymaps === 'undefined') {
                await this.loadYandexMaps();
            }
            initMap();
        }
    }

    // Инициализация общих компонентов
    async initCommonComponents() {
        // Общие анимации
        this.initCommonAnimations();
        
        // Инициализация переключателей темы (если есть на странице)
        this.initThemeSwitchers();
        
        // Инициализация журнала если есть
        const journalTable = document.querySelector('.journal-table');
        if (journalTable) {
            this.initJournalTable();
        }
    }

    // Инициализация переключателей темы
    initThemeSwitchers() {
        // Инициализируем кнопки переключения темы, если они есть на странице
        const themeButtons = document.querySelectorAll('.theme-btn, .theme-option');
        if (themeButtons.length > 0) {
            themeButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const theme = e.target.getAttribute('data-theme');
                    if (theme) {
                        ThemeManager.switchTheme(theme);
                    }
                });
            });
            this.log('Theme switchers initialized');
        }
    }

    // ===== ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ =====

    // Загрузка модуля динамически
    async loadModule(modulePath) {
        try {
            const module = await import(modulePath);
            return module;
        } catch (error) {
            console.error(`Failed to load module: ${modulePath}`, error);
            throw error;
        }
    }

    // Загрузка Яндекс карт
    async loadYandexMaps() {
        return new Promise((resolve, reject) => {
            if (typeof ymaps !== 'undefined') {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://api-maps.yandex.ru/2.1/?apikey=d6033963-5910-4384-8a9b-ca0e6600b444&lang=ru_RU';
            script.type = 'text/javascript';
            
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Yandex Maps'));
            
            document.head.appendChild(script);
        });
    }

    // Плавная прокрутка к якорям
    initSmoothAnchorScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || href === '#!' || this.getAttribute('data-toggle')) {
                    return;
                }
                
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Общие анимации
    initCommonAnimations() {
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
    }

    // Анимации для практики
    initCommonPracticeAnimations() {
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

        const subjectCards = document.querySelectorAll('.subject-card');
        
        subjectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        const topicCards = document.querySelectorAll('.topic-card');
        
        topicCards.forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.classList.contains('btn')) {
                    const link = this.querySelector('.btn-practice');
                    if (link) {
                        window.location.href = link.getAttribute('href');
                    }
                }
            });
        });
    }

    // Инициализация журнала
    initJournalPage() {
        const journalTable = document.querySelector('.journal-table');
        if (journalTable) {
            this.initJournalTable();
        }
    }

    // Инициализация таблицы журнала
    initJournalTable() {
        const tableRows = document.querySelectorAll('.journal-table tbody tr');
        tableRows.forEach(row => {
            row.addEventListener('click', function() {
                this.classList.toggle('selected');
            });
        });
    }

    // Диспатч событий
    dispatchEvent(name, detail = {}) {
        const event = new CustomEvent(name, {
            detail: { ...detail, timestamp: Date.now() }
        });
        document.dispatchEvent(event);
    }

    // Логирование
    log(message, data = null) {
        if (this.config.debug) {
            console.log(`[EducationalPlatform] ${message}`, data || '');
        }
    }

    // Получение информации о приложении
    getAppInfo() {
        return {
            version: '1.0.0',
            initialized: this.isInitialized,
            path: this.currentPath,
            modules: Array.from(this.modules.keys()),
            config: this.config
        };
    }

    // Переинициализация приложения
    async reinit() {
        this.isInitialized = false;
        await this.init();
    }

    // Деструктор
    destroy() {
        this.modules.forEach((manager, name) => {
            if (manager.deactivate) {
                manager.deactivate();
            }
        });
        
        this.modules.clear();
        this.isInitialized = false;
        
        this.log('Educational Platform destroyed');
    }
}

// ===== ГЛОБАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ =====

// Создаем глобальный экземпляр приложения
const EduApp = new EducationalPlatform();

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    if (EduApp.config.autoInit) {
        EduApp.init();
    }
});

// Обработчики событий темы
document.addEventListener('themeChanged', (event) => {
    console.log('Тема изменена на:', event.detail.theme);
});

// Глобальные экспорты для обратной совместимости
window.EduApp = EduApp;
window.Utils = Utils;
window.quickAction = quickAction;

// Функции для обратной совместимости (если нужны в других модулях)
window.initJournalPage = () => EduApp.initJournalPage();
window.initCommonAnimations = () => EduApp.initCommonAnimations();
window.initCommonPracticeAnimations = () => EduApp.initCommonPracticeAnimations();

// Экспорт для модульной системы
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EducationalPlatform,
        EduApp,
        Utils,
        initCommonAnimations: () => EduApp.initCommonAnimations(),
        initCommonPracticeAnimations: () => EduApp.initCommonPracticeAnimations()
    };
}

export default EduApp;