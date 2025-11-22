import themeManager from './theme-manager.js';

// Модуль переключения тем (теперь просто инициализирует кнопки)
export function initThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    if (themeButtons.length === 0) return;
    
    // Устанавливаем активное состояние для кнопок
    const currentTheme = themeManager.getCurrentTheme();
    themeManager.updateActiveButtons(currentTheme);
    
    // Обработчики уже настроены в ThemeManager, но можно добавить дополнительные
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            // Тема переключится через глобальный менеджер
        });
    });
}