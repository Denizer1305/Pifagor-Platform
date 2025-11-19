function initTestTaking() {
    let timeLeft = 20 * 60;
    const timerElement = document.getElementById('timer');
    const sidebarTimerElement = document.getElementById('sidebar-timer');
    
    let timerInterval;
    
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timerElement) timerElement.textContent = timeString;
        if (sidebarTimerElement) sidebarTimerElement.textContent = timeString;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishTest();
        } else {
            timeLeft--;
        }
    }
    
    if (timerElement) {
        timerInterval = setInterval(updateTimer, 1000);
    }
    
    const optionItems = document.querySelectorAll('.option-item');
    
    optionItems.forEach(item => {
        item.addEventListener('click', function() {
            optionItems.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    const questionNavItems = document.querySelectorAll('.question-nav-item');
    const currentQuestionElement = document.getElementById('current-question');
    const progressFillElement = document.getElementById('progress-fill');
    const progressPercentElement = document.getElementById('progress-percent');
    const totalQuestions = 15;
    
    if (questionNavItems.length > 0) {
        questionNavItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                const questionNumber = index + 1;
                if (currentQuestionElement) {
                    currentQuestionElement.textContent = questionNumber;
                }
                
                const progressPercent = Math.round((questionNumber / totalQuestions) * 100);
                if (progressFillElement) {
                    progressFillElement.style.width = `${progressPercent}%`;
                }
                if (progressPercentElement) {
                    progressPercentElement.textContent = `${progressPercent}%`;
                }

                questionNavItems.forEach(nav => nav.classList.remove('current'));
                this.classList.add('current');
                
                // Здесь должна быть логика загрузки вопроса
                console.log(`Загружаем вопрос ${questionNumber}`);
            });
        });
    }
    
    const nextQuestionBtn = document.getElementById('next-question-btn');
    
    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', function() {
            const currentQuestion = parseInt(currentQuestionElement.textContent);
            if (currentQuestion < totalQuestions) {
                const nextQuestion = currentQuestion + 1;
                if (currentQuestionElement) {
                    currentQuestionElement.textContent = nextQuestion;
                }
                
                const progressPercent = Math.round((nextQuestion / totalQuestions) * 100);
                if (progressFillElement) {
                    progressFillElement.style.width = `${progressPercent}%`;
                }
                if (progressPercentElement) {
                    progressPercentElement.textContent = `${progressPercent}%`;
                }
                
                questionNavItems.forEach(nav => nav.classList.remove('current'));
                questionNavItems[nextQuestion - 1].classList.add('current');
                
                questionNavItems[currentQuestion - 1].classList.add('answered');
                
                console.log(`Загружаем вопрос ${nextQuestion}`);
            } else {
                finishTest();
            }
        });
    }
    
    // Завершение теста
    function finishTest() {
        clearInterval(timerInterval);
        window.location.href = '/frontend/templates/test/test-result.html';
    }
    
    const finishTestBtn = document.querySelector('.btn-danger');
    if (finishTestBtn) {
        finishTestBtn.addEventListener('click', function() {
            if (confirm('Вы уверены, что хотите завершить тест? После завершения вы сможете посмотреть результаты.')) {
                finishTest();
            }
        });
    }
}

function initTestResults() {
    const detailsTabs = document.querySelectorAll('.details-tab');
    const detailsPanels = document.querySelectorAll('.details-panel');
    
    if (detailsTabs.length > 0) {
        detailsTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                detailsTabs.forEach(t => t.classList.remove('active'));
                detailsPanels.forEach(p => p.classList.remove('active'));
                
                this.classList.add('active');
                const panel = document.getElementById(`${tabId}-panel`);
                if (panel) panel.classList.add('active');
            });
        });
    }
}

function initTestsList() {
    const levelFilters = document.querySelectorAll('input[type="checkbox"]');
    
    if (levelFilters.length > 0) {
        levelFilters.forEach(filter => {
            filter.addEventListener('change', function() {
                // В реальном приложении здесь будет логика фильтрации
                console.log('Фильтр изменен:', this.id, this.checked);
            });
        });
    }
}

function initTestResultsPage() {
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

    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const detailsTabs = document.querySelectorAll('.details-tab');
    const detailsPanels = document.querySelectorAll('.details-panel');
    
    if (detailsTabs.length > 0) {
        detailsTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                detailsTabs.forEach(t => t.classList.remove('active'));
                detailsPanels.forEach(p => p.classList.remove('active'));
                
                this.classList.add('active');
                const panel = document.getElementById(`${tabId}-panel`);
                if (panel) panel.classList.add('active');
            });
        });
    }

    const watchDetailsBtn = document.querySelector('a[href="#results"]');
    if (watchDetailsBtn) {
        watchDetailsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const resultsSection = document.getElementById('results');
            if (resultsSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = resultsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

export { 
    initTestTaking, 
    initTestResults, 
    initTestsList,
    initTestResultsPage,
};