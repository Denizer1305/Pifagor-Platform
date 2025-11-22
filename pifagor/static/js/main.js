import { initMobileMenu } from './modules/mobile-menu.js';
import { initScrollAnimations, initHeaderScrollEffect } from './modules/animations.js';
import { initThemeSwitcher } from './modules/theme-switcher.js';
import { initSmoothScroll, initParticles } from './modules/ui.js';
import { initAuth } from './modules/auth.js';
import { initAttendancePage, initProgressPage, initStatisticsPage } from './pages/analitics-page.js';
import { initMap, initFAQ, initContactForm } from './pages/contact-pages.js';
import { initTeachersFilter } from './pages/teachers-pages.js';
import { initPlatformUsers } from './pages/admin/platform-users.js';
import { initRoleManagement } from './pages/admin/role-management.js';
import { initSubjectManagement } from './pages/admin/subject-management.js';
import { initMaterialCreation } from './pages/material-creation.js';
import { initMaterialBrowser } from './pages/material-browser.js';
import { initSchedulePage, initScheduleCreatePage } from './pages/schedule-pages.js';
import { initProgress as initProgressModule } from './modules/progress.js';
// import { initExport } from './modules/export.js';
import { initChat, quickAction } from './modules/chat.js';
import { initDashboard } from './pages/dashboard.js';
import { Utils } from './lib/utils.js';

import { initCourseManagement } from './modules/course-management.js';
import { initCoursesModule } from './pages/course-pages.js';
import { initPracticePage } from './pages/practic-pages.js';
import { initCreateTestPage } from './pages/test-pages.js';
import { initHomeworkPages } from './pages/homework-pages.js';

import { initTestTaking, initTestResultsPage } from './modules/tests.js';

import themeManager from './theme-manager.js';

document.addEventListener('DOMContentLoaded', function() {
    initThemeSwitcher();
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    themeManager.applyTheme(savedTheme);
});

document.addEventListener('themeChanged', (event) => {
    console.log('Тема изменена на:', event.detail.theme);
});

document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;

    
    initHomeworkPages(currentPath);
    initPracticePage();
    initMobileMenu();
    initScrollAnimations();
    initHeaderScrollEffect();
    initThemeSwitcher();
    initSmoothScroll();
    initParticles();
    initAuth();
    initCoursesModule();
    initAnalyticsPages(currentPath);
    initPageSpecificModules(currentPath);
    initNewModules(currentPath);
    initJournalPages(currentPath);
    initSmoothAnchorScroll();

    if (document.querySelector('.test-creation')) {
        initCreateTestPage();
    }
    
    if (document.querySelector('.test-taking')) {
        initTestTaking();
    }
    
    if (document.querySelector('.test-results')) {
        initTestResultsPage();
    }
});

function initAnalyticsPages(currentPath) {
    if (currentPath.includes('attendance.html')) {
        initAttendancePage();
    } else if (currentPath.includes('progress.html')) {
        initProgressPage();
    } else if (currentPath.includes('statistics.html')) {
        initStatisticsPage();
    }
}

function initPageSpecificModules(currentPath) {
    if (document.getElementById('contactForm') || document.getElementById('map')) {
        if (document.getElementById('map') && typeof ymaps === 'undefined') {
            loadYandexMaps().then(() => {
                initMap();
                initFAQ();
                initContactForm();
            });
        } else {
            initFAQ();
            initContactForm();
            if (document.getElementById('map')) {
                initMap();
            }
        }
    }
    
    if (document.querySelector('.teachers-filters')) {
        initTeachersFilter();
    }
    
    if (document.querySelector('.users-header')) {
        initPlatformUsers();
    }
    
    if (document.querySelector('.roles-header')) {
        initRoleManagement();
    }
    
    if (document.querySelector('.subjects-header')) {
        initSubjectManagement();
    }
    
    if (document.getElementById('material-form')) {
        initMaterialCreation();
    }
    
    if (document.querySelector('.material-card')) {
        initMaterialBrowser();
    }
}

function initNewModules(currentPath) {
    if (currentPath.includes('chat-interface.html')) {
        initChat();
    }
    
    if (currentPath.includes('dashboard.html') || currentPath.includes('teacher-dashboard.html')) {
        initDashboard();
    }

    if (currentPath.includes('registration') || 
        currentPath.includes('/authorization/') || 
        window.location.pathname === '/authorization/' || 
        window.location.pathname === '/authorization') {
        console.log('Initializing registration module...');
        initAuth();
    }

    if (currentPath.includes('practic-detail.html')) {
        console.log('Прямая инициализация страницы выполнения задания');
        import('./modules/practic-execution.js').then(module => {
            module.initPracticExecution();
        });
    }
    
    if (currentPath.includes('test-generation.html')) {
        initTestGeneration();
    }

    if (currentPath.includes('homework')) {
        initHomeworkPages(currentPath);
    }
    
    if (currentPath.includes('create-tests.html')) {
        initCreateTestPage();
    } else if (currentPath.includes('tests-detail.html')) {
        initTestTaking();
    } else if (currentPath.includes('test-result.html')) {
        initTestResultsPage();
    } else if (currentPath.includes('tests-list.html')) {
        initTestsList();
    } else if (currentPath.includes('tests.html')) {
        initCommonAnimations();
    }
}

function initSmoothAnchorScroll() {
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

function initCommonAnimations() {
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

function loadYandexMaps() {
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

function initPracticeModules(currentPath) {
    if (currentPath.includes('create-practic.html')) {
        initPracticeCreation();
    }
    
    else if (currentPath.includes('practic-detail.html')) {
        initPracticExecution(); 
    }
    
    else if (currentPath.includes('practic-check.html')) {
        initPracticeReview();
    }
    
    else if (currentPath.includes('practic.html') || currentPath.includes('practic-list.html')) {
        initCommonPracticeAnimations();
    }
}

function initJournalPages(currentPath) {
    if (currentPath.includes('journal.html')) {
        initJournalPage();
    } else if (currentPath.includes('progress.html')) {
        initProgressModule();
    } else if (currentPath.includes('grades.html') || currentPath.includes('classes.html')) {
        initDashboard();
    } else if (currentPath.includes('schedule.html')) {
        initSchedulePage();
    } else if (currentPath.includes('schedule-create.html')) {
        initScheduleCreatePage();
    }
}

function initCommonPracticeAnimations() {
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

function initJournalPage() {
    const journalTable = document.querySelector('.journal-table');
    if (journalTable) {
        initJournalTable();
    }
}

function initJournalTable() {
    const tableRows = document.querySelectorAll('.journal-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
}

window.Utils = Utils;
window.quickAction = quickAction;
window.removeQuestion = removeQuestion;
window.initJournalPage = initJournalPage;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMobileMenu,
        initScrollAnimations,
        initHeaderScrollEffect,
        initThemeSwitcher,
        initSmoothScroll,
        initParticles,
        initAuth,
        initAnalyticsPages,
        initPageSpecificModules,
        initNewModules,
        initPracticeModules,
        initJournalPages,
        initSmoothAnchorScroll,
        initCommonAnimations,
        loadYandexMaps,
        initCommonPracticeAnimations,
        initJournalPage
    };
}