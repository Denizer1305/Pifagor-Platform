// Модуль анимаций
export function initScrollAnimations() {
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
}

export function initHeaderScrollEffect() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}

export function initCommonAnimations() {
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
}

export function initCommonPracticeAnimations() {
    const subjectCards = document.querySelectorAll('.subject-card');
    
    subjectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const topicCards = document.querySelectorAll('.topic-card');
    
    topicCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn')) {
                const link = this.querySelector('.btn-practice');
                if (link) {
                    window.location.href = link.getAttribute('href');
                }
            }
        });
    });

}

// Дополнительные анимации для практических заданий
export function initPracticeAnimations() {
    // Анимация карточек заданий
    const practiceCards = document.querySelectorAll('.practice-card, .subject-card, .topic-card');
    
    practiceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Анимация кнопок в карточках заданий
    const topicCards = document.querySelectorAll('.topic-card');
    
    topicCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn')) {
                const link = this.querySelector('.btn-practice');
                if (link) {
                    // Добавляем анимацию перехода
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        window.location.href = link.getAttribute('href');
                    }, 200);
                }
            }
        });
    });

    // Анимация прогресса выполнения
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const width = bar.style.width || bar.getAttribute('data-width') || '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

export function initPracticOverview() {
    // Добавляем интерактивность карточкам предметов
    const subjectCards = document.querySelectorAll('.subject-card');
    
    subjectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

export function initPracticList() {
    // Добавляем интерактивность карточкам тем
    const topicCards = document.querySelectorAll('.topic-card');
    
    topicCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Игнорируем клики по кнопкам
            if (!e.target.classList.contains('btn')) {
                const link = this.querySelector('.btn-practice');
                if (link) {
                    window.location.href = link.getAttribute('href');
                }
            }
        });
    });
}