export function initAppearanceSettings() {
    const fontSizeOptions = document.querySelectorAll('.font-size-option');
    const densityOptions = document.querySelectorAll('.density-option');

    // Обработчики для размера шрифта
    fontSizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            fontSizeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const size = this.getAttribute('data-size');
            document.documentElement.setAttribute('data-font-size', size);
            localStorage.setItem('selectedFontSize', size);
        });
    });

    // Обработчики для плотности интерфейса
    densityOptions.forEach(option => {
        option.addEventListener('click', function() {
            densityOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const density = this.getAttribute('data-density');
            document.documentElement.setAttribute('data-density', density);
            localStorage.setItem('selectedDensity', density);
        });
    });

    // Загрузка сохраненных настроек внешнего вида
    const savedFontSize = localStorage.getItem('selectedFontSize') || 'medium';
    const savedDensity = localStorage.getItem('selectedDensity') || 'normal';
    
    document.documentElement.setAttribute('data-font-size', savedFontSize);
    document.documentElement.setAttribute('data-density', savedDensity);
    
    const savedFontSizeOption = document.querySelector(`.font-size-option[data-size="${savedFontSize}"]`);
    const savedDensityOption = document.querySelector(`.density-option[data-density="${savedDensity}"]`);
    
    if (savedFontSizeOption) {
        fontSizeOptions.forEach(opt => opt.classList.remove('active'));
        savedFontSizeOption.classList.add('active');
    }
    
    if (savedDensityOption) {
        densityOptions.forEach(opt => opt.classList.remove('active'));
        savedDensityOption.classList.add('active');
    }
}