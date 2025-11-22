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
        
        this.fontSize = localStorage.getItem('selectedFontSize') || 'medium';
        this.density = localStorage.getItem('selectedDensity') || 'normal';
        
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.applyAppearanceSettings();
        this.setupEventListeners();
        
        this.initializeThemeOptions();
        this.initializeAppearanceOptions();
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('theme-btn')) {
                const theme = e.target.getAttribute('data-theme');
                this.switchTheme(theme);
                
                this.animateButton(e.target);
            }
            
            if (e.target.classList.contains('theme-option')) {
                const theme = e.target.getAttribute('data-theme');
                this.switchTheme(theme);
                
                this.animateButton(e.target);
            }
            
            if (e.target.classList.contains('font-size-option')) {
                const size = e.target.getAttribute('data-size');
                this.setFontSize(size);
                
                document.querySelectorAll('.font-size-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                e.target.classList.add('active');
            }
            
            if (e.target.classList.contains('density-option')) {
                const density = e.target.getAttribute('data-density');
                this.setDensity(density);
                
                document.querySelectorAll('.density-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        });
    }

    initializeThemeOptions() {
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', function() {
                const theme = this.getAttribute('data-theme');
                window.themeManager.switchTheme(theme);
            });
        });
    }

    initializeAppearanceOptions() {
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
        
        this.dispatchThemeChangeEvent(theme);
    }

    applyTheme(theme) {
        const existingTheme = document.getElementById('current-theme') || document.getElementById('dynamic-theme');
        if (existingTheme) {
            existingTheme.remove();
        }

        const staticBase = window.STATIC_URL || '/static/';
        const themeLink = document.createElement('link');
        themeLink.id = 'current-theme';
        themeLink.rel = 'stylesheet';
        themeLink.href = `${staticBase}css/themes/${theme}.css`;
        
        themeLink.onerror = () => {
            themeLink.remove();
            if (theme !== 'light') {
                this.switchTheme('light');
            }
        };

        document.head.appendChild(themeLink);
        this.updateLogos(theme);
        this.updateActiveButtons(theme);
        this.updateThemeColor(theme);
    }

    // Обновление логотипов согласно теме
    updateLogos(theme) {
        const folderName = this.themeFolderMap[theme] || 'light';
        const staticBase = window.STATIC_URL || '/static/';

        this.updateMainLogos(folderName, staticBase);
        this.updateFavicon(folderName, staticBase);
        this.updateSpecificHeroLogo(folderName, staticBase);
        this.updateSpecificAiCardLogo(folderName, staticBase);
        this.diagnoseLogoElements();
    }

    updateMainLogos(folderName, staticBase) {
        const mainLogos = document.querySelectorAll('.logo-header img, .mobile-logo img');
        
        mainLogos.forEach((logo, index) => {
            const newSrc = `${staticBase}assets/image/logo/${folderName}/logo.svg`;
            this.updateImageSource(logo, newSrc, 'Основной логотип');
        });
    }

    updateSpecificHeroLogo(folderName, staticBase) {
        const mainHeroLogo = document.querySelector('.hero-section .hero-logo, main .hero-logo, [data-logo-type="hero"]');
        
        if (!mainHeroLogo) {
            const allHeroLogos = document.querySelectorAll('.hero-logo');
            if (allHeroLogos.length > 0) {
                this.updateSingleHeroLogo(allHeroLogos[0], folderName, staticBase);
            } else {
                console.log('Основной hero-logo не найден');
            }
            return;
        }
        this.updateSingleHeroLogo(mainHeroLogo, folderName, staticBase);
    }

    updateSingleHeroLogo(logo, folderName, staticBase) {
        const possibleSources = [
            `${staticBase}assets/image/logo/${folderName}/hero-logo.svg`,
            `${staticBase}assets/image/logo/${folderName}/hero-logo.png`,
            `${staticBase}assets/image/logo/light/hero-logo.svg`,
            `${staticBase}assets/image/logo/dark/hero-logo.svg`
        ];

        let targetElement = logo;
        if (logo.classList.contains('hero-logo') && logo.tagName.toLowerCase() === 'div') {
            const innerImg = logo.querySelector('img');
            if (innerImg) {
                targetElement = innerImg;
            }
        }
        
        this.tryMultipleSources(targetElement, possibleSources, 'Основной герой-логотип');
    }

    updateSpecificAiCardLogo(folderName, staticBase) {
        const mainAiCardLogo = document.querySelector('.ai-card .ai-card-logo, [data-logo-type="ai-card"], .main-ai-logo');
        
        if (!mainAiCardLogo) {
            const allAiCardLogos = document.querySelectorAll('.ai-card-logo');
            if (allAiCardLogos.length > 0) {
                this.updateSingleAiCardLogo(allAiCardLogos[0], folderName, staticBase);
            } else {
                console.log('Основной ai-card-logo не найден');
            }
            return;
        }
        this.updateSingleAiCardLogo(mainAiCardLogo, folderName, staticBase);
    }

    updateSingleAiCardLogo(logo, folderName, staticBase) {
        const possibleSources = [
            `${staticBase}assets/image/logo/${folderName}/Anastasia.svg`,
            `${staticBase}assets/image/logo/${folderName}/anastasia.svg`,
            `${staticBase}assets/image/logo/${folderName}/Anastasia.png`,
            `${staticBase}assets/image/logo/${folderName}/anastasia.png`,
            `${staticBase}assets/image/logo/light/Anastasia.svg`,
            `${staticBase}assets/image/logo/dark/Anastasia.svg`
        ];

        let targetElement = logo;
        if (logo.classList.contains('ai-card-logo') && logo.tagName.toLowerCase() === 'div') {
            const innerImg = logo.querySelector('img');
            if (innerImg) {
                targetElement = innerImg;
            }
        }
        
        this.tryMultipleSources(targetElement, possibleSources, 'Основной AI Card логотип');
    }

    tryMultipleSources(element, sources, logName) {
        if (!element || !sources.length) {
            console.warn(`Нет элемента или источников для ${logName}`);
            return;
        }

        const trySource = (index) => {
            if (index >= sources.length) {
                console.error(`Все источники для ${logName} недоступны`);
                this.fallbackToDefault(element, logName);
                return;
            }

            const source = sources[index];
            const tempImage = new Image();
            tempImage.onload = () => {
                console.log(`✅ Источник доступен: ${source}`);
                this.applyImageToElement(element, source, logName);
            };
            
            tempImage.onerror = () => {
                console.warn(`Источник недоступен: ${source}`);
                trySource(index + 1);
            };
            
            const cacheBuster = `?t=${Date.now()}`;
            tempImage.src = source + cacheBuster;
        };

        trySource(0);
    }

    applyImageToElement(element, src, logName) {
        if (element.tagName.toLowerCase() === 'img') {
            element.src = src;
        } else {
            const innerImages = element.querySelectorAll('img');
            if (innerImages.length > 0) {
                innerImages.forEach(innerImg => {
                    innerImg.src = src;
                });
            } else {
                element.style.backgroundImage = `url('${src}')`;
            }
        }
    }

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

        this.applyImageToElement(element, fallbackSrc, `${logName} (fallback)`);
    }

    updateImageSource(imgElement, newSrc, logName) {
        if (!imgElement) {
            console.warn(`${logName}: элемент не найден`);
            return;
        }

        const cacheBuster = `?t=${Date.now()}`;
        const srcWithCacheBuster = newSrc + cacheBuster;

        const tempImage = new Image();
        tempImage.onload = () => {
            imgElement.src = srcWithCacheBuster;
            setTimeout(() => {
                if (imgElement.complete && imgElement.naturalHeight !== 0) {
                    console.log(`🎉 ${logName} подтвержден в DOM: ${newSrc}`);
                } else {
                    console.warn(`${logName} может не отображаться: ${newSrc}`);
                }
            }, 100);
        };
        
        tempImage.onerror = () => {
            console.error(`${logName} не найден: ${newSrc}`);
        };
        
        tempImage.src = srcWithCacheBuster;
    }

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
        };
        tempImage.onerror = () => {
            console.error(`Фавикон не найден: ${faviconSrc}`);
            const fallbackFavicon = `${staticBase}assets/image/logo/light/icons.svg`;
            favicon.href = fallbackFavicon + cacheBuster;
        };
        tempImage.src = faviconSrc + cacheBuster;
    }

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

    setFontSize(size) {
        this.fontSize = size;
        document.documentElement.setAttribute('data-font-size', size);
        localStorage.setItem('selectedFontSize', size);
        this.dispatchAppearanceChangeEvent();
    }

    setDensity(density) {
        this.density = density;
        document.documentElement.setAttribute('data-density', density);
        localStorage.setItem('selectedDensity', density);
        this.dispatchAppearanceChangeEvent();
    }

    applyAppearanceSettings() {
        document.documentElement.setAttribute('data-font-size', this.fontSize);
        document.documentElement.setAttribute('data-density', this.density);
    }

    updateActiveButtons(theme) {
        const buttons = document.querySelectorAll('.theme-btn, .theme-option');
        
        buttons.forEach(btn => {
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

    animateButton(button) {
        button.style.transform = 'scale(0.9)';
        setTimeout(() => {
            button.style.transform = 'scale(1.1)';
        }, 100);
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }

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

    forceUpdateLogos() {
        this.updateLogos(this.currentTheme);
    }

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
        
        for (const file of filesToCheck) {
            const url = `${staticBase}assets/image/logo/${folderName}/${file}`;
            const exists = await this.checkFileExists(url);
            console.log(`${exists ? '✅' : '❌'} ${file}: ${url}`);
        }
        
        console.groupEnd();
    }

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

window.themeManager = new ThemeManager();

window.debugThemeManager = {
    checkLogos: () => window.themeManager.checkLogoFiles(),
    forceUpdate: () => window.themeManager.forceUpdateLogos(),
    diagnose: () => window.themeManager.diagnoseLogoElements(),
    getInfo: () => window.themeManager.getSettingsInfo()
};

export default window.themeManager;