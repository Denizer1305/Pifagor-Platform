import { initTabs } from '../modules/tabs.js';
import { ValidationManager } from '../modules/validation.js';
import { StorageManager } from '../services/storage.js';
import { showNotification } from '../modules/toast.js';

export function initProfilePage() {
    // Инициализация всех систем
    initTabs();
    initAppearanceSettings();
    initAvatarUpload();
    initFormHandlers();
    loadSavedData();
    initMobileMenu();

    console.log('Profile page initialized successfully');
}

// ===== СИСТЕМА ВНЕШНЕГО ВИДА =====
function initAppearanceSettings() {
    // Настройки уже управляются через ThemeManager глобально
    // Эта функция оставлена для обратной совместимости
    console.log('Appearance settings initialized via ThemeManager');
}

// ===== СИСТЕМА АВАТАРА =====
function initAvatarUpload() {
    const avatarContainer = document.querySelector('.avatar-container');
    const avatarImage = document.getElementById('profileAvatar');
    
    if (!avatarContainer || !avatarImage) {
        console.warn('Avatar elements not found');
        return;
    }

    // Используем глобальный UploadManager для загрузки аватара
    if (window.UploadManager) {
        window.UploadManager.initAvatarUpload(avatarContainer, avatarImage, {
            maxFileSize: 5 * 1024 * 1024, // 5MB
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.8
        });
    } else {
        // Fallback на простую реализацию
        initSimpleAvatarUpload(avatarContainer, avatarImage);
    }
}

function initSimpleAvatarUpload(avatarContainer, avatarImage) {
    const avatarInput = document.createElement('input');
    avatarInput.type = 'file';
    avatarInput.accept = 'image/*';
    avatarInput.style.display = 'none';

    avatarContainer.appendChild(avatarInput);

    avatarContainer.addEventListener('click', () => {
        avatarInput.click();
    });

    avatarInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // Базовая валидация файла
            if (file.size > 5 * 1024 * 1024) {
                showNotification('Размер файла не должен превышать 5MB', 'error');
                return;
            }

            if (!file.type.startsWith('image/')) {
                showNotification('Выберите изображение', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                avatarImage.src = event.target.result;
                StorageManager.saveAvatar(event.target.result);
                showNotification('Аватар успешно обновлен', 'success');
            };
            reader.readAsDataURL(file);
        }
        e.target.value = '';
    });

    // Загрузка сохраненного аватара
    const savedAvatar = StorageManager.getAvatar();
    if (savedAvatar) {
        avatarImage.src = savedAvatar;
    }
}

// ===== ОБРАБОТКА ФОРМ =====
function initFormHandlers() {
    const saveProfileBtn = document.getElementById('saveProfile');
    const cancelBtn = document.querySelector('.btn-light');

    // Обработчик для кнопки сохранения
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', handleSaveProfile);
    }

    // Обработчик для кнопки "Отменить"
    if (cancelBtn) {
        cancelBtn.addEventListener('click', handleCancel);
    }

    // Валидация в реальном времени
    initRealTimeValidation();
}

function handleSaveProfile() {
    const activeTab = document.querySelector('.tab-content.active');
    const activeTabId = activeTab ? activeTab.id : 'personal-tab';
    
    let success = true;
    let message = 'Изменения успешно сохранены!';
    
    // Валидация и сохранение в зависимости от активной вкладки
    switch(activeTabId) {
        case 'personal-tab':
            const personalResult = ValidationManager.validatePersonalForm();
            success = personalResult.isValid;
            if (success) {
                StorageManager.savePersonalData();
            } else {
                message = 'Пожалуйста, заполните все обязательные поля';
            }
            break;
            
        case 'security-tab':
            const securityResult = ValidationManager.validateSecurityForm();
            success = securityResult.isValid;
            if (success) {
                StorageManager.saveSecuritySettings();
            } else {
                message = 'Проверьте правильность введенных данных';
            }
            break;
            
        case 'preferences-tab':
            // Сохраняем настройки внешнего вида через ThemeManager
            if (window.themeManager) {
                window.themeManager.saveAppearanceSettings();
            } else {
                StorageManager.saveAppearanceSettings();
            }
            break;
    }
    
    if (success) {
        showNotification(message, 'success');
        
        // Диспатчим кастомное событие об успешном сохранении
        document.dispatchEvent(new CustomEvent('profile:saved', {
            detail: { tab: activeTabId }
        }));
    } else {
        showNotification(message, 'error');
    }
}

function handleCancel() {
    // Сброс форм к исходным значениям
    const personalForm = document.getElementById('personalForm');
    const securityForm = document.getElementById('securityForm');
    
    if (personalForm) personalForm.reset();
    if (securityForm) securityForm.reset();
    
    // Перезагружаем сохраненные данные
    loadSavedData();
    
    showNotification('Изменения отменены', 'info');
}

function initRealTimeValidation() {
    // Валидация при вводе для основных полей
    const importantFields = ['firstName', 'lastName', 'email', 'newPassword', 'confirmPassword'];
    
    importantFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', validateField);
            field.addEventListener('input', clearFieldError);
        }
    });
}

function validateField(e) {
    const field = e.target;
    const fieldName = field.id;
    
    switch(fieldName) {
        case 'firstName':
        case 'lastName':
            if (!field.value.trim()) {
                showFieldError(field, 'Это поле обязательно для заполнения');
            } else if (field.value.trim().length < 2) {
                showFieldError(field, 'Минимальная длина 2 символа');
            } else {
                clearFieldError(e);
            }
            break;
            
        case 'email':
            if (!field.value.trim()) {
                showFieldError(field, 'Email обязателен для заполнения');
            } else if (!ValidationManager.isValidEmail(field.value)) {
                showFieldError(field, 'Введите корректный email адрес');
            } else {
                clearFieldError(e);
            }
            break;
            
        case 'newPassword':
            if (field.value && field.value.length < 8) {
                showFieldError(field, 'Пароль должен содержать не менее 8 символов');
            } else {
                clearFieldError(e);
            }
            break;
            
        case 'confirmPassword':
            const newPassword = document.getElementById('newPassword');
            if (field.value && newPassword && field.value !== newPassword.value) {
                showFieldError(field, 'Пароли не совпадают');
            } else {
                clearFieldError(e);
            }
            break;
    }
}

function showFieldError(field, message) {
    field.classList.add('error');
    field.style.borderColor = '#f44336';
    
    // Удаляем предыдущее сообщение об ошибке
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = 'color: #f44336; font-size: 12px; margin-top: 5px;';
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    field.style.borderColor = '';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// ===== ЗАГРУЗКА ДАННЫХ =====
function loadSavedData() {
    // Загрузка личных данных
    const personalData = StorageManager.loadPersonalData();
    
    // Загрузка настроек безопасности
    StorageManager.loadSecuritySettings();
    
    // Загрузка аватара
    const savedAvatar = StorageManager.getAvatar();
    if (savedAvatar) {
        const avatarImage = document.getElementById('profileAvatar');
        if (avatarImage) {
            avatarImage.src = savedAvatar;
        }
    }
    
    console.log('Profile data loaded successfully');
}

// ===== МОБИЛЬНОЕ МЕНЮ =====
function initMobileMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

    if (!burgerMenu || !mobileMenu) return;

    burgerMenu.addEventListener('click', openMobileMenu);
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Закрытие меню при клике на ссылку
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

function openMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (mobileMenu) mobileMenu.classList.add('active');
    if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ =====

/**
 * Экспорт данных профиля
 */
export function exportProfileData() {
    const allData = StorageManager.exportUserData();
    showNotification('Данные профиля экспортированы', 'success');
    return allData;
}

/**
 * Импорт данных профиля
 */
export function importProfileData(jsonData) {
    try {
        const success = StorageManager.importUserData(jsonData);
        if (success) {
            loadSavedData(); // Перезагружаем данные
            showNotification('Данные профиля импортированы', 'success');
            return true;
        }
    } catch (error) {
        showNotification('Ошибка импорта данных', 'error');
        console.error('Import error:', error);
    }
    return false;
}

/**
 * Сброс профиля к настройкам по умолчанию
 */
export function resetProfile() {
    if (confirm('Вы уверены, что хотите сбросить все настройки профиля? Это действие нельзя отменить.')) {
        // Очищаем только данные профиля, оставляя аутентификацию
        const keys = [
            'personalData',
            'securitySettings',
            'appearanceSettings',
            'userAvatar',
            'selectedTheme',
            'selectedFontSize',
            'selectedDensity',
            'notificationSettings',
            'userFavorites',
            'userHistory'
        ];
        
        keys.forEach(key => {
            localStorage.removeItem(key);
        });
        
        // Сбрасываем настройки темы
        if (window.themeManager) {
            window.themeManager.resetToDefaults();
        }
        
        // Перезагружаем страницу для применения изменений
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        
        showNotification('Профиль сброшен к настройкам по умолчанию', 'info');
    }
}

/**
 * Получение статистики профиля
 */
export function getProfileStats() {
    const storageStats = StorageManager.getStorageStats();
    const validationStats = ValidationManager.getValidationStats();
    
    return {
        storage: storageStats,
        validation: validationStats,
        lastUpdated: new Date().toISOString()
    };
}

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====

// Слушаем события изменения темы
document.addEventListener('themeChanged', (event) => {
    console.log('Theme changed to:', event.detail.theme);
    showNotification(`Тема изменена на ${event.detail.theme}`, 'info');
});

// Слушаем события изменения внешнего вида
document.addEventListener('appearanceChanged', (event) => {
    console.log('Appearance changed:', event.detail);
});

// Глобальные обработчики для быстрого доступа
window.ProfileManager = {
    init: initProfilePage,
    exportData: exportProfileData,
    importData: importProfileData,
    reset: resetProfile,
    getStats: getProfileStats,
    save: handleSaveProfile,
    cancel: handleCancel
};

// Автоматическая инициализация при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfilePage);
} else {
    initProfilePage();
}

export default {
    initProfilePage,
    exportProfileData,
    importProfileData,
    resetProfile,
    getProfileStats
};