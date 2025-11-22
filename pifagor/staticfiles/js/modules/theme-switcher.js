import themeManager from './theme-manager.js';
export function initThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    if (themeButtons.length === 0) return;
    
    const currentTheme = themeManager.getCurrentTheme();
    themeManager.updateActiveButtons(currentTheme);
    
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
        });
    });
}