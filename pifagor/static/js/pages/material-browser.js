export function initMaterialBrowser() {
    // Анимация появления элементов при скролле
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Фильтрация материалов по темам и типам
    const topicItems = document.querySelectorAll('.topic-item');
    const filterItems = document.querySelectorAll('.filter-item');
    const materialCards = document.querySelectorAll('.material-card');
    const materialsTitle = document.querySelector('.materials-title');
    const materialsDescription = document.querySelector('.materials-description');
    
    let currentTopic = 'all';
    let currentType = 'all';
    
    // Обработчики для тем
    topicItems.forEach(item => {
        item.addEventListener('click', function() {
            const topic = this.getAttribute('data-topic');
            
            // Обновляем активный элемент
            topicItems.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            currentTopic = topic;
            filterMaterials();
            updateMaterialsHeader();
        });
    });
    
    // Обработчики для типов материалов
    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            
            // Обновляем активный элемент
            filterItems.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            currentType = type;
            filterMaterials();
            updateMaterialsHeader();
        });
    });
    
    // Функция для фильтрации материалов
    function filterMaterials() {
        let visibleCount = 0;
        
        materialCards.forEach(card => {
            const cardTopic = card.getAttribute('data-topic');
            const cardType = card.getAttribute('data-type');
            
            const topicMatch = currentTopic === 'all' || cardTopic === currentTopic;
            const typeMatch = currentType === 'all' || cardType === currentType;
            
            if (topicMatch && typeMatch) {
                card.style.display = 'block';
                visibleCount++;
                
                // Анимация появления
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Обновляем счетчик видимых материалов
        const descriptionElement = document.querySelector('.materials-description');
        if (descriptionElement) {
            descriptionElement.textContent = `${visibleCount} материалов по основам программирования`;
        }
        
        // Показываем/скрываем сообщение о пустом результате
        const emptyState = document.querySelector('.empty-state');
        if (emptyState) {
            if (visibleCount === 0) {
                emptyState.style.display = 'block';
            } else {
                emptyState.style.display = 'none';
            }
        }
    }
    
    // Функция для обновления заголовка в зависимости от выбранной темы
    function updateMaterialsHeader() {
        const activeTopic = document.querySelector('.topic-item.active');
        let topicName = 'Все материалы';
        
        if (activeTopic) {
            const topicSpan = activeTopic.querySelector('span');
            if (topicSpan) {
                topicName = topicSpan.textContent;
            }
        }
        
        if (materialsTitle) {
            materialsTitle.textContent = topicName;
        }
    }
    
    // Поиск материалов
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            materialCards.forEach(card => {
                const titleElement = card.querySelector('h3');
                const descriptionElement = card.querySelector('.material-description');
                
                if (titleElement && descriptionElement) {
                    const title = titleElement.textContent.toLowerCase();
                    const description = descriptionElement.textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
            
            // Обновляем счетчик после поиска
            updateMaterialCount();
        });
    }
    
    // Функция для обновления счетчика материалов
    function updateMaterialCount() {
        const visibleCards = document.querySelectorAll('.material-card[style*="display: block"], .material-card:not([style*="display: none"])');
        const descriptionElement = document.querySelector('.materials-description');
        
        if (descriptionElement) {
            descriptionElement.textContent = `${visibleCards.length} материалов по основам программирования`;
        }
    }
    
    // Инициализация счетчика при загрузке
    updateMaterialCount();
    
    // Обработчики для карточек материалов
    materialCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Если клик не по кнопке действия
            if (!e.target.classList.contains('btn') && !e.target.closest('.btn')) {
                const link = this.querySelector('a.btn');
                if (link) {
                    window.location.href = link.getAttribute('href');
                }
            }
        });
        
        // Эффекты при наведении
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Сброс фильтров
    const resetFiltersBtn = document.querySelector('.reset-filters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            // Сброс тем
            topicItems.forEach(item => {
                if (item.getAttribute('data-topic') === 'all') {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            
            // Сброс типов
            filterItems.forEach(item => {
                if (item.getAttribute('data-type') === 'all') {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            
            // Сброс поиска
            if (searchInput) {
                searchInput.value = '';
            }
            
            currentTopic = 'all';
            currentType = 'all';
            
            filterMaterials();
            updateMaterialsHeader();
        });
    }
}