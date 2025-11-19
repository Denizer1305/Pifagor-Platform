export function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

export function toggleElement(element, show, duration = 300) {
    if (show) {
        element.style.display = 'block';
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    } else {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.display = 'none';
        }, duration);
    }
}

export function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Плавная прокрутка для якорных ссылок
export function initSmoothAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Пропускаем пустые якоря и те, что используются для других целей
            if (href === '#' || href === '#!' || this.getAttribute('data-toggle')) {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Утилиты для фильтрации
export function initFilterSystem(filterContainer) {
    const filterItems = filterContainer.querySelectorAll('.filter-item');
    let currentFilter = 'all';
    
    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Обновляем активный элемент
            filterItems.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = filterValue;
            applyFilter(currentFilter);
        });
    });
    
    function applyFilter(filter) {
        // Эта функция должна быть переопределена в конкретном модуле
        console.log('Applying filter:', filter);
    }
    
    return {
        getCurrentFilter: () => currentFilter,
        setFilterHandler: (handler) => { applyFilter = handler; }
    };
}

// Поиск с дебаунсингом
export function initSearchWithDebounce(searchInput, callback, delay = 300) {
    let timeoutId;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback(this.value);
        }, delay);
    });
    
    // Очистка при размонтировании
    return () => clearTimeout(timeoutId);
}