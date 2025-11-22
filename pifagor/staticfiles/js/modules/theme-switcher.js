// Модуль переключения тем
export function initThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    if (themeButtons.length === 0) return;
    
    // Загрузка сохраненной темы
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            setTheme(theme);
            
            // Микровзаимодействие
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
            }, 100);
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    function setTheme(theme) {
        // Удаляем предыдущую тему
        const existingTheme = document.getElementById('dynamic-theme');
        if (existingTheme) {
            existingTheme.remove();
        }
        
        // Используем window.STATIC_URL для формирования правильного пути
        const staticBase = window.STATIC_URL || '/static/';
        const themeLink = document.createElement('link');
        themeLink.id = 'dynamic-theme';
        themeLink.rel = 'stylesheet';
        themeLink.href = `${staticBase}css/themes/${theme}.css`;
        
        // Обработка ошибки загрузки темы
        themeLink.onerror = function() {
            console.error(`Не удалось загрузить тему: ${theme}`);
            this.remove();
            // Загружаем тему по умолчанию если выбранная не найдена
            if (theme !== 'light') {
                setTheme('light');
            }
        };
        
        document.head.appendChild(themeLink);
        
        // Обновляем активную кнопку
        themeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            }
        });
        
        // Сохраняем в localStorage
        localStorage.setItem('theme', theme);
        
        // Обновляем мета-тег theme-color
        updateThemeColor(theme);
    }
    
    function updateThemeColor(theme) {
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
}