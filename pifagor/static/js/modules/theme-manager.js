// Централизованный менеджер тем
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Глобальные обработчики для переключателей темы
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('theme-btn')) {
                const theme = e.target.getAttribute('data-theme');
                this.switchTheme(theme);
                
                // Микровзаимодействие
                e.target.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    e.target.style.transform = 'scale(1.1)';
                }, 100);
                setTimeout(() => {
                    e.target.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }

    switchTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme(theme);
        localStorage.setItem('theme', theme);
        
        // Оповещаем другие компоненты о смене темы
        this.dispatchThemeChangeEvent(theme);
    }

    applyTheme(theme) {
        // Удаляем предыдущую тему
        const existingTheme = document.getElementById('dynamic-theme');
        if (existingTheme) {
            existingTheme.remove();
        }

        // Создаем новую ссылку на тему
        const staticBase = window.STATIC_URL || '/static/';
        const themeLink = document.createElement('link');
        themeLink.id = 'dynamic-theme';
        themeLink.rel = 'stylesheet';
        themeLink.href = `${staticBase}css/themes/${theme}.css`;
        
        themeLink.onerror = () => {
            console.error(`Не удалось загрузить тему: ${theme}`);
            themeLink.remove();
            // Загружаем тему по умолчанию
            if (theme !== 'light') {
                this.switchTheme('light');
            }
        };

        document.head.appendChild(themeLink);
        this.updateActiveButtons(theme);
        this.updateThemeColor(theme);
    }

    updateActiveButtons(theme) {
        // Обновляем все переключатели темы на странице
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            }
        });
    }

    updateThemeColor(theme) {
        let themeColor = '#394458';
        
        switch(theme) {
            case 'dark':
                themeColor = '#1E293B';
                break;
            case 'light':
            default:
                themeColor = '#394458';
                break;
        }

        let themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (!themeColorMeta) {
            themeColorMeta = document.createElement('meta');
            themeColorMeta.name = 'theme-color';
            document.head.appendChild(themeColorMeta);
        }
        themeColorMeta.setAttribute('content', themeColor);
    }

    dispatchThemeChangeEvent(theme) {
        const event = new CustomEvent('themeChanged', {
            detail: { theme }
        });
        document.dispatchEvent(event);
    }

    getCurrentTheme() {
        return this.currentTheme;
    }
}

// Создаем глобальный экземпляр менеджера тем
window.themeManager = new ThemeManager();

// Экспорт для модульной системы
export default window.themeManager;