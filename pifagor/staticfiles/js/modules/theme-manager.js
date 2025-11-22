// Централизованный менеджер тем с поддержкой расширенной цветовой схемы
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
        console.log(`🎨 Переключение темы на: ${theme}`);
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
            console.error(`❌ Не удалось загрузить тему: ${theme}`);
            themeLink.remove();
            // Загружаем тему по умолчанию
            if (theme !== 'light') {
                this.switchTheme('light');
            }
        };

        themeLink.onload = () => {
            console.log(`✅ Тема CSS загружена: ${theme}`);
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
        
        console.log(`🔄 Обновление логотипов для темы: ${theme}, папка: ${folderName}`);
        
        // Основной логотип в хедере
        this.updateMainLogos(folderName, staticBase);

        // Фавикон
        this.updateFavicon(folderName, staticBase);

        // Герой-логотип - ТОЛЬКО основной, не все элементы с классом
        this.updateSpecificHeroLogo(folderName, staticBase);

        // AI Card логотип - ТОЛЬКО основной, не все элементы с классом
        this.updateSpecificAiCardLogo(folderName, staticBase);

        // Диагностика - покажем какие элементы найдены
        this.diagnoseLogoElements();
    }

    // Обновление основных логотипов
    updateMainLogos(folderName, staticBase) {
        const mainLogos = document.querySelectorAll('.logo-header img, .mobile-logo img');
        console.log(`📊 Найдено основных логотипов: ${mainLogos.length}`);
        
        mainLogos.forEach((logo, index) => {
            const newSrc = `${staticBase}assets/image/logo/${folderName}/logo.svg`;
            console.log(`🖼️ Основной логотип ${index + 1}:`, {
                element: logo,
                currentSrc: logo.src,
                newSrc: newSrc,
                tagName: logo.tagName
            });
            this.updateImageSource(logo, newSrc, 'Основной логотип');
        });
    }

    // Обновление ОСНОВНОГО герой-логотипа (а не всех)
    updateSpecificHeroLogo(folderName, staticBase) {
        // Ищем основной герой-логотип по более специфичному селектору
        const mainHeroLogo = document.querySelector('.hero-section .hero-logo, main .hero-logo, [data-logo-type="hero"]');
        
        if (!mainHeroLogo) {
            // Если не нашли по специфичному селектору, берем первый
            const allHeroLogos = document.querySelectorAll('.hero-logo');
            if (allHeroLogos.length > 0) {
                console.log(`⚠️ Найдено ${allHeroLogos.length} hero-logo, используем первый`);
                this.updateSingleHeroLogo(allHeroLogos[0], folderName, staticBase);
            } else {
                console.log('❌ Основной hero-logo не найден');
            }
            return;
        }
        
        console.log('✅ Найден основной hero-logo по специфичному селектору');
        this.updateSingleHeroLogo(mainHeroLogo, folderName, staticBase);
    }

    // Обновление одного герой-логотипа
    updateSingleHeroLogo(logo, folderName, staticBase) {
        const possibleSources = [
            `${staticBase}assets/image/logo/${folderName}/hero-logo.svg`,
            `${staticBase}assets/image/logo/${folderName}/hero-logo.png`,
            `${staticBase}assets/image/logo/light/hero-logo.svg`,
            `${staticBase}assets/image/logo/dark/hero-logo.svg`
        ];
        
        console.log(`🌟 Основной герой-логотип:`, {
            element: logo,
            currentSrc: logo.src || logo.style.backgroundImage,
            tagName: logo.tagName,
            classList: logo.classList
        });
        
        // Находим img внутри hero-logo, если это div
        let targetElement = logo;
        if (logo.classList.contains('hero-logo') && logo.tagName.toLowerCase() === 'div') {
            const innerImg = logo.querySelector('img');
            if (innerImg) {
                targetElement = innerImg;
                console.log('🎯 Найден внутренний img в hero-logo, будем менять его src');
            }
        }
        
        this.tryMultipleSources(targetElement, possibleSources, 'Основной герой-логотип');
    }

    // Обновление ОСНОВНОГО AI Card логотипа (а не всех)
    updateSpecificAiCardLogo(folderName, staticBase) {
        // Ищем основной AI Card логотип по более специфичному селектору
        const mainAiCardLogo = document.querySelector('.ai-card .ai-card-logo, [data-logo-type="ai-card"], .main-ai-logo');
        
        if (!mainAiCardLogo) {
            // Если не нашли по специфичному селектору, берем первый
            const allAiCardLogos = document.querySelectorAll('.ai-card-logo');
            if (allAiCardLogos.length > 0) {
                console.log(`⚠️ Найдено ${allAiCardLogos.length} ai-card-logo, используем первый`);
                this.updateSingleAiCardLogo(allAiCardLogos[0], folderName, staticBase);
            } else {
                console.log('❌ Основной ai-card-logo не найден');
            }
            return;
        }
        
        console.log('✅ Найден основной ai-card-logo по специфичному селектору');
        this.updateSingleAiCardLogo(mainAiCardLogo, folderName, staticBase);
    }

    // Обновление одного AI Card логотипа
    updateSingleAiCardLogo(logo, folderName, staticBase) {
        const possibleSources = [
            `${staticBase}assets/image/logo/${folderName}/Anastasia.svg`,
            `${staticBase}assets/image/logo/${folderName}/anastasia.svg`,
            `${staticBase}assets/image/logo/${folderName}/Anastasia.png`,
            `${staticBase}assets/image/logo/${folderName}/anastasia.png`,
            `${staticBase}assets/image/logo/light/Anastasia.svg`,
            `${staticBase}assets/image/logo/dark/Anastasia.svg`
        ];
        
        console.log(`🤖 Основной AI Card логотип:`, {
            element: logo,
            currentSrc: logo.src || logo.style.backgroundImage,
            tagName: logo.tagName,
            classList: logo.classList
        });
        
        // Находим img внутри ai-card-logo, если это div
        let targetElement = logo;
        if (logo.classList.contains('ai-card-logo') && logo.tagName.toLowerCase() === 'div') {
            const innerImg = logo.querySelector('img');
            if (innerImg) {
                targetElement = innerImg;
                console.log('🎯 Найден внутренний img в ai-card-logo, будем менять его src');
            }
        }
        
        this.tryMultipleSources(targetElement, possibleSources, 'Основной AI Card логотип');
    }

    // Попробовать несколько источников для элемента
    tryMultipleSources(element, sources, logName) {
        if (!element || !sources.length) {
            console.warn(`❌ Нет элемента или источников для ${logName}`);
            return;
        }

        const trySource = (index) => {
            if (index >= sources.length) {
                console.error(`❌ Все источники для ${logName} недоступны`);
                this.fallbackToDefault(element, logName);
                return;
            }

            const source = sources[index];
            console.log(`🔍 Пробуем источник ${index + 1}/${sources.length} для ${logName}: ${source}`);

            const tempImage = new Image();
            tempImage.onload = () => {
                console.log(`✅ Источник доступен: ${source}`);
                this.applyImageToElement(element, source, logName);
            };
            
            tempImage.onerror = () => {
                console.warn(`❌ Источник недоступен: ${source}`);
                trySource(index + 1);
            };
            
            // Добавляем timestamp для обхода кэша
            const cacheBuster = `?t=${Date.now()}`;
            tempImage.src = source + cacheBuster;
        };

        trySource(0);
    }

    // Применить изображение к элементу
    applyImageToElement(element, src, logName) {
        // ВАЖНО: Всегда используем src для img элементов, независимо от класса
        if (element.tagName.toLowerCase() === 'img') {
            // Для img элементов используем src
            element.src = src;
            console.log(`✅ ${logName} (img src) установлен: ${src}`);
        } else {
            // Для не-img элементов ищем внутри img и меняем им src
            const innerImages = element.querySelectorAll('img');
            if (innerImages.length > 0) {
                innerImages.forEach(innerImg => {
                    innerImg.src = src;
                    console.log(`✅ ${logName} (inner img src) установлен: ${src}`, innerImg);
                });
            } else {
                // Если внутри нет img, только тогда используем background-image как fallback
                element.style.backgroundImage = `url('${src}')`;
                console.log(`✅ ${logName} (background fallback) установлен: ${src}`);
            }
        }

        // Добавляем обработчик ошибок для конечного элемента
        element.onerror = () => {
            console.error(`❌ ${logName} не загрузился в элемент: ${src}`);
        };

        if (element.tagName.toLowerCase() === 'img') {
            element.onload = () => {
                console.log(`🎉 ${logName} успешно загружен в элемент: ${src}`);
            };
        } else {
            // Для не-img элементов создаем временное изображение для проверки загрузки
            const verifyImage = new Image();
            verifyImage.onload = () => {
                console.log(`🎉 ${logName} успешно загружен: ${src}`);
            };
            verifyImage.onerror = () => {
                console.error(`❌ ${logName} не загрузился: ${src}`);
            };
            verifyImage.src = src;
        }
    }

    // Fallback на изображение по умолчанию
    fallbackToDefault(element, logName) {
        const staticBase = window.STATIC_URL || '/static/';
        let fallbackSrc = '';

        if (logName.includes('AI Card')) {
            fallbackSrc = `${staticBase}assets/image/logo/light/Anastasia.svg`;
        } else if (logName.includes('Герой')) {
            fallbackSrc = `${staticBase}assets/image/logo/light/hero-logo.svg`;
        } else {
            fallbackSrc = `${staticBase}assets/image/logo/light/logo.svg`;
        }

        console.log(`🔄 Используем fallback для ${logName}: ${fallbackSrc}`);
        this.applyImageToElement(element, fallbackSrc, `${logName} (fallback)`);
    }

    // Универсальный метод обновления источника изображения
    updateImageSource(imgElement, newSrc, logName) {
        if (!imgElement) {
            console.warn(`❌ ${logName}: элемент не найден`);
            return;
        }

        console.log(`🔧 Обновление ${logName}:`, {
            element: imgElement,
            currentSrc: imgElement.src,
            newSrc: newSrc
        });

        // Добавляем timestamp для обхода кэша
        const cacheBuster = `?t=${Date.now()}`;
        const srcWithCacheBuster = newSrc + cacheBuster;

        const tempImage = new Image();
        tempImage.onload = () => {
            imgElement.src = srcWithCacheBuster;
            console.log(`✅ ${logName} успешно обновлен: ${newSrc}`);
            
            // Проверяем, что изображение действительно загрузилось
            setTimeout(() => {
                if (imgElement.complete && imgElement.naturalHeight !== 0) {
                    console.log(`🎉 ${logName} подтвержден в DOM: ${newSrc}`);
                } else {
                    console.warn(`⚠️ ${logName} может не отображаться: ${newSrc}`);
                }
            }, 100);
        };
        
        tempImage.onerror = () => {
            console.error(`❌ ${logName} не найден: ${newSrc}`);
        };
        
        tempImage.src = srcWithCacheBuster;
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
        const cacheBuster = `?t=${Date.now()}`;
        
        const tempImage = new Image();
        tempImage.onload = () => {
            favicon.href = faviconSrc + cacheBuster;
            console.log(`✅ Фавикон обновлен: ${faviconSrc}`);
        };
        tempImage.onerror = () => {
            console.error(`❌ Фавикон не найден: ${faviconSrc}`);
            // Пробуем альтернативный фавикон
            const fallbackFavicon = `${staticBase}assets/image/logo/light/icons.svg`;
            favicon.href = fallbackFavicon + cacheBuster;
        };
        tempImage.src = faviconSrc + cacheBuster;
    }

    // Диагностика элементов логотипов
    diagnoseLogoElements() {
        console.group('🔍 Диагностика логотипов');
        
        const selectors = [
            '.logo-header img',
            '.mobile-logo img', 
            '.hero-logo',
            '.ai-card-logo',
            '.hero-section .hero-logo',
            '.ai-card .ai-card-logo',
            '[data-logo-type="hero"]',
            '[data-logo-type="ai-card"]'
        ];
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            console.log(`${selector}: найдено ${elements.length} элементов`);
            
            elements.forEach((el, index) => {
                console.log(`  ${selector} [${index}]:`, {
                    tagName: el.tagName,
                    currentSrc: el.src || 'N/A',
                    backgroundImage: el.style.backgroundImage || 'N/A',
                    classList: Array.from(el.classList),
                    parent: el.parentElement?.tagName || 'N/A'
                });
            });
        });
        
        console.groupEnd();
    }

    // Установка размера шрифта
    setFontSize(size) {
        this.fontSize = size;
        document.documentElement.setAttribute('data-font-size', size);
        localStorage.setItem('selectedFontSize', size);
        
        console.log(`📏 Размер шрифта установлен: ${size}`);
        
        // Диспатчим событие изменения настроек
        this.dispatchAppearanceChangeEvent();
    }

    // Установка плотности интерфейса
    setDensity(density) {
        this.density = density;
        document.documentElement.setAttribute('data-density', density);
        localStorage.setItem('selectedDensity', density);
        
        console.log(`📐 Плотность интерфейса установлена: ${density}`);
        
        // Диспатчим событие изменения настроек
        this.dispatchAppearanceChangeEvent();
    }

    // Применение всех настроек внешнего вида
    applyAppearanceSettings() {
        document.documentElement.setAttribute('data-font-size', this.fontSize);
        document.documentElement.setAttribute('data-density', this.density);
        console.log('🎨 Настройки внешнего вида применены');
    }

    updateActiveButtons(theme) {
        // Обновляем все переключатели темы на странице (и theme-btn, и theme-option)
        const buttons = document.querySelectorAll('.theme-btn, .theme-option');
        console.log(`🎯 Обновление активных кнопок темы: найдено ${buttons.length} кнопок`);
        
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
                console.log(`✅ Кнопка активирована: ${theme}`, btn);
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
        console.log(`🎨 Цвет темы обновлен: ${themeColor}`);
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
        console.log(`📢 Событие themeChanged отправлено: ${theme}`);
    }

    dispatchAppearanceChangeEvent() {
        const event = new CustomEvent('appearanceChanged', {
            detail: {
                fontSize: this.fontSize,
                density: this.density
            }
        });
        document.dispatchEvent(event);
        console.log('📢 Событие appearanceChanged отправлено');
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

    // Принудительное обновление всех логотипов на странице
    forceUpdateLogos() {
        console.log('🔄 Принудительное обновление всех логотипов');
        this.updateLogos(this.currentTheme);
    }

    // Проверить существование файлов логотипов
    async checkLogoFiles() {
        const theme = this.currentTheme;
        const folderName = this.themeFolderMap[theme] || 'light';
        const staticBase = window.STATIC_URL || '/static/';
        
        const filesToCheck = [
            'logo.svg',
            'icons.svg', 
            'hero-logo.svg',
            'Anastasia.svg',
            'anastasia.svg'
        ];

        console.group('🔍 Проверка файлов логотипов');
        
        for (const file of filesToCheck) {
            const url = `${staticBase}assets/image/logo/${folderName}/${file}`;
            const exists = await this.checkFileExists(url);
            console.log(`${exists ? '✅' : '❌'} ${file}: ${url}`);
        }
        
        console.groupEnd();
    }

    // Проверить существование файла
    checkFileExists(url) {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.open('HEAD', url);
            xhr.onload = () => resolve(xhr.status === 200);
            xhr.onerror = () => resolve(false);
            xhr.send();
        });
    }
}

// Создаем глобальный экземпляр менеджера тем
window.themeManager = new ThemeManager();

// Добавляем глобальные методы для отладки
window.debugThemeManager = {
    checkLogos: () => window.themeManager.checkLogoFiles(),
    forceUpdate: () => window.themeManager.forceUpdateLogos(),
    diagnose: () => window.themeManager.diagnoseLogoElements(),
    getInfo: () => window.themeManager.getSettingsInfo()
};

// Экспорт для модульной системы
export default window.themeManager;