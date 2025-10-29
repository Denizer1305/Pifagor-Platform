import { initUI } from './modules/ui.js';
import { initAuth } from './modules/auth.js';
import { initValidation } from './modules/validation.js';

async function initPageSpecificModules() {
    const bodyClass = document.body.className;
    const path = window.location.pathname;
    
    console.log('Current path:', path);
    console.log('Body class:', bodyClass);
    
    try {
        if (path === '/' || bodyClass.includes('main-page')) {
            if (path.includes('teachers') || document.querySelector('.teachers-filters')) {
                console.log('Loading teachers module...');
                const { initTeachersPage } = await import('./pages/teachers.js');
                initTeachersPage();
            }
            if (path.includes('contact') || document.querySelector('.contact-form')) {
                console.log('Loading contact module...');
                const { initContactPage } = await import('./pages/contact-pages.js');
                initContactPage();
            }
            if (path.includes('about')) {
                console.log('About page - using common modules only');
            }
        }
        
        if (bodyClass.includes('login-page') || bodyClass.includes('register-page') || bodyClass.includes('password-reset-page')) {
            console.log('Loading auth module...');
            const { initAuthPages } = await import('./pages/auth-pages.js');
            initAuthPages();
        }
    } catch (error) {
        console.error('Error loading page module:', error);
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Pifagor Platform - Initializing...');
    
    // Инициализация общих модулей
    initUI();
    initAuth();
    initValidation();
    
    // Инициализация страничных модулей
    initPageSpecificModules();
});

// Глобальные функции для обратной совместимости
window.togglePassword = function(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const icon = input.parentNode.querySelector('.password-toggle i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
};