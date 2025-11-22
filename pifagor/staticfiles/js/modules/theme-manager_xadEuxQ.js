class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('selectedTheme') || 'light';
        this.themeFolderMap = {
            'light': 'light',
            'dark': 'dark', 
            'blue': 'blue',
            'light-blue': 'light-blue',
            'green': 'green',
            'orange': 'orange',
            'pinki': 'pinki',
            'red': 'red',
            'violett': 'violett',
            'yellow': 'yellow'
        };
        
        // Настройки внешнего вида
        this.fontSize = localStorage.getItem('selectedFontSize') || 'medium';
        this.density = localStorage.getItem('selectedDensity') || 'normal';
        
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.applyAppearanceSettings();
        this.setupEventListeners();
        
        // Инициализация переключателей в DOM
        this.initializeThemeOptions();
        this.initializeAppearanceOptions();
    }

    setupEventListeners() {
        // Глобальные обработчики для переключателей темы
        document.addEventListener('click', (e) => {
            // Обработка theme-btn (кнопки в хедере)
            if (e.target.classList.contains('theme-btn')) {
                const theme = e.target.getAttribute('data-theme');
                this.switchTheme(theme);
                
                // Микровзаимодействие
                this.animateButton(e.target);
            }
            
            // Обработка theme-option (опции в настройках профиля)
            if (e.target.classList.contains('theme-option')) {
                const theme = e.target.getAttribute('data-theme');
                this.switchTheme(theme);
                
                // Микровзаимодействие
                this.animateButton(e.target);
            }
            
            // Обработка размера шрифта
            if (e.target.classList.contains('font-size-option')) {
                const size = e.target.getAttribute('data-size');
                this.setFontSize(size);
                
                // Обновление активного состояния
                document.querySelectorAll('.font-size-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                e.target.classList.add('active');
            }
            
            // Обработка плотности интерфейса
            if (e.target.classList.contains('density-option')) {
                const density = e.target.getAttribute('data-density');
                this.setDensity(density);
                
                // Обновление активного состояния
                document.querySelectorAll('.density-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        });
    }

    // Инициализация опций темы в DOM
    initializeThemeOptions() {
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', function() {
                const theme = this.getAttribute('data-theme');
                window.themeManager.switchTheme(theme);
            });
        });
    }

    // Инициализация настроек внешнего вида в DOM
    initializeAppearanceOptions() {
        // Установка активных состояний для настроек
        const savedFontSize = localStorage.getItem('selectedFontSize') || 'medium';
        const savedDensity = localStorage.getItem('selectedDensity') || 'normal';
        
        const fontSizeOption = document.querySelector(`.font-size-option[data-size="${savedFontSize}"]`);
        const densityOption = document.querySelector(`.density-option[data-density="${savedDensity}"]`);
        
        if (fontSizeOption) {
            document.querySelectorAll('.font-size-option').forEach(opt => opt.classList.remove('active'));
            fontSizeOption.classList.add('active');
        }
        
        if (densityOption) {
            document.querySelectorAll('.density-option').forEach(opt => opt.classList.remove('active'));
            densityOption.classList.add('active');
        }
    }

    switchTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme(theme);
        localStorage.setItem('selectedTheme', theme);
        
        // Оповещаем другие компоненты о смене темы
        this.dispatchThemeChangeEvent(theme);
    }

    applyTheme(theme) {
        // Удаляем предыдущую тему
        const existingTheme = document.getElementById('current-theme') || document.getElementById('dynamic-theme');
        if (existingTheme) {
            existingTheme.remove();
        }

        // Создаем новую ссылку на CSS тему
        const staticBase = window.STATIC_URL || '/static/';
        const themeLink = document.createElement('link');
        themeLink.id = 'current-theme';
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
        
        // Обновляем логотипы
        this.updateLogos(theme);
        
        // Обновляем активные кнопки
        this.updateActiveButtons(theme);
        
        // Обновляем цвет темы для мобильных браузеров
        this.updateThemeColor(theme);
    }

    // Обновление логотипов согласно теме
    updateLogos(theme) {
        const folderName = this.themeFolderMap[theme] || 'light';
        const staticBase = window.STATIC_URL || '/static/';
        
        // Основной логотип в хедере
        const mainLogos = document.querySelectorAll('.logo-header img, .mobile-logo img');
        mainLogos.forEach(logo => {
            const newSrc = `${staticBase}assets/image/logo/${folderName}/logo.svg`;
            logo.src = newSrc;
            // Добавляем обработчик ошибок на случай отсутствия файла
            logo.onerror = () => {
                console.warn(`Логотип не найден: ${newSrc}`);
                // Можно установить логотип по умолчанию
                logo.src = `${staticBase}assets/image/logo/light/logo.svg`;
            };
        });

        // Фавикон
        this.updateFavicon(folderName, staticBase);

        // Герой-логотип (если есть на странице)
        this.updateHeroLogos(folderName, staticBase);

        // AI карта логотип (если есть на странице)
        this.updateAICardLogos(folderName, staticBase);

        console.log(`Logos updated for theme: ${theme}, folder: ${folderName}`);
    }

    // Обновление фавикона
    updateFavicon(folderName, staticBase) {
        let favicon = document.querySelector('link[rel="icon"]');
        if (!favicon) {
            favicon = document.createElement('link');
            favicon.rel = 'icon';
            document.head.appendChild(favicon);
        }
        const faviconSrc = `${staticBase}assets/image/logo/${folderName}/icons.svg`;
        favicon.href = faviconSrc;
        
        // Проверка существования фавикона
        const tempImage = new Image();
        tempImage.onerror = () => {
            console.warn(`Фавикон не найден: ${faviconSrc}`);
            // Устанавливаем фавикон по умолчанию
            favicon.href = `${staticBase}assets/image/logo/light/icons.svg`;
        };
        tempImage.src = faviconSrc;
    }

    // Обновление герой-логотипов
    updateHeroLogos(folderName, staticBase) {
        const heroLogos = document.querySelectorAll('.hero-logo, .hero-logo img');
        if (heroLogos.length === 0) {
            console.log('Hero logos not found on this page');
            return;
        }

        heroLogos.forEach(logo => {
            const heroLogoSrc = `${staticBase}assets/image/logo/${folderName}/hero-logo.svg`;
            
            // Если это img элемент, меняем src
            if (logo.tagName.toLowerCase() === 'img') {
                logo.src = heroLogoSrc;
            } else {
                // Если это div/span с background-image, меняем стиль
                logo.style.backgroundImage = `url('${heroLogoSrc}')`;
            }
            
            logo.onerror = () => {
                console.warn(`Герой-логотип не найден: ${heroLogoSrc}`);
                // Устанавливаем герой-логотип по умолчанию
                const defaultSrc = `${staticBase}assets/image/logo/light/hero-logo.svg`;
                if (logo.tagName.toLowerCase() === 'img') {
                    logo.src = defaultSrc;
                } else {
                    logo.style.backgroundImage = `url('${defaultSrc}')`;
                }
            };
        });
    }

    // Обновление AI карта логотипов
    updateAICardLogos(folderName, staticBase) {
        const aiCardLogos = document.querySelectorAll('.ai-card-logo, .ai-card-logo img');
        if (aiCardLogos.length === 0) {
            console.log('AI card logos not found on this page');
            return;
        }

        aiCardLogos.forEach(logo => {
            const aiCardLogoSrc = `${staticBase}assets/image/logo/${folderName}/ai-card-logo.svg`;
            
            // Если это img элемент, меняем src
            if (logo.tagName.toLowerCase() === 'img') {
                logo.src = aiCardLogoSrc;
            } else {
                // Если это div/span с background-image, меняем стиль
                logo.style.backgroundImage = `url('${aiCardLogoSrc}')`;
            }
            
            logo.onerror = () => {
                console.warn(`AI карта логотип не найден: ${aiCardLogoSrc}`);
                // Устанавливаем AI карта логотип по умолчанию
                const defaultSrc = `${staticBase}assets/image/logo/light/ai-card-logo.svg`;
                if (logo.tagName.toLowerCase() === 'img') {
                    logo.src = defaultSrc;
                } else {
                    logo.style.backgroundImage = `url('${defaultSrc}')`;
                }
            };
        });
    }

    // Дополнительно: функция для принудительного обновления всех логотипов
    forceUpdateLogos(theme = null) {
        const currentTheme = theme || this.currentTheme;
        this.updateLogos(currentTheme);
    }

    // Установка размера шрифта
    setFontSize(size) {
        this.fontSize = size;
        document.documentElement.setAttribute('data-font-size', size);
        localStorage.setItem('selectedFontSize', size);
        
        // Диспатчим событие изменения настроек
        this.dispatchAppearanceChangeEvent();
    }

    // Установка плотности интерфейса
    setDensity(density) {
        this.density = density;
        document.documentElement.setAttribute('data-density', density);
        localStorage.setItem('selectedDensity', density);
        
        // Диспатчим событие изменения настроек
        this.dispatchAppearanceChangeEvent();
    }

    // Применение всех настроек внешнего вида
    applyAppearanceSettings() {
        document.documentElement.setAttribute('data-font-size', this.fontSize);
        document.documentElement.setAttribute('data-density', this.density);
    }

    updateActiveButtons(theme) {
        // Обновляем все переключатели темы на странице (и theme-btn, и theme-option)
        document.querySelectorAll('.theme-btn, .theme-option').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            }
        });
    }

    updateThemeColor(theme) {
        let themeColor = '#394458';
        
        // Расширенная палитра цветов для разных тем
        switch(theme) {
            case 'dark':
                themeColor = '#1E293B';
                break;
            case 'blue':
                themeColor = '#1e3a8a';
                break;
            case 'light-blue':
                themeColor = '#0ea5e9';
                break;
            case 'green':
                themeColor = '#065f46';
                break;
            case 'orange':
                themeColor = '#ea580c';
                break;
            case 'pinki':
                themeColor = '#be185d';
                break;
            case 'red':
                themeColor = '#dc2626';
                break;
            case 'violett':
                themeColor = '#7c3aed';
                break;
            case 'yellow':
                themeColor = '#ca8a04';
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

    // Анимация кнопки при клике
    animateButton(button) {
        button.style.transform = 'scale(0.9)';
        setTimeout(() => {
            button.style.transform = 'scale(1.1)';
        }, 100);
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }

    // События для уведомления других компонентов
    dispatchThemeChangeEvent(theme) {
        const event = new CustomEvent('themeChanged', {
            detail: { 
                theme,
                themeFolder: this.themeFolderMap[theme] || 'light'
            }
        });
        document.dispatchEvent(event);
    }

    dispatchAppearanceChangeEvent() {
        const event = new CustomEvent('appearanceChanged', {
            detail: {
                fontSize: this.fontSize,
                density: this.density
            }
        });
        document.dispatchEvent(event);
    }

    // Публичные методы для получения текущих настроек
    getCurrentTheme() {
        return this.currentTheme;
    }

    getThemeFolder() {
        return this.themeFolderMap[this.currentTheme] || 'light';
    }

    getFontSize() {
        return this.fontSize;
    }

    getDensity() {
        return this.density;
    }

    // Метод для сохранения всех настроек внешнего вида
    saveAppearanceSettings() {
        const appearanceData = {
            theme: this.currentTheme,
            fontSize: this.fontSize,
            density: this.density,
            lastUpdated: new Date().toISOString()
        };
        
        console.log('Сохранение настроек внешнего вида:', appearanceData);
        localStorage.setItem('appearanceSettings', JSON.stringify(appearanceData));
        return appearanceData;
    }

    // Метод для загрузки всех настроек внешнего вида
    loadAppearanceSettings() {
        const savedSettings = localStorage.getItem('appearanceSettings');
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                if (settings.theme) this.switchTheme(settings.theme);
                if (settings.fontSize) this.setFontSize(settings.fontSize);
                if (settings.density) this.setDensity(settings.density);
                return settings;
            } catch (error) {
                console.error('Ошибка загрузки настроек внешнего вида:', error);
            }
        }
        return null;
    }

    // Сброс к настройкам по умолчанию
    resetToDefaults() {
        this.switchTheme('light');
        this.setFontSize('medium');
        this.setDensity('normal');
        
        console.log('Настройки внешнего вида сброшены к значениям по умолчанию');
    }

    // Получение информации о текущих настройках
    getSettingsInfo() {
        return {
            theme: {
                current: this.currentTheme,
                folder: this.getThemeFolder(),
                available: Object.keys(this.themeFolderMap)
            },
            appearance: {
                fontSize: this.fontSize,
                density: this.density,
                availableFontSizes: ['small', 'medium', 'large'],
                availableDensities: ['compact', 'normal', 'comfortable']
            }
        };
    }
}

// Создаем глобальный экземпляр менеджера тем
window.themeManager = new ThemeManager();

// Экспорт для модульной системы
export default window.themeManager;