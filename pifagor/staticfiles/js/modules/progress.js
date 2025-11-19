// modules/progress.js
export function initProgress() {
    // User data
    const userName = "Елена Плеханова";
    const userEmail = "elena.plekhanova@example.com";
    
    document.getElementById('userName').textContent = userName;
    
    // Generate avatar initials
    const nameParts = userName.split(' ');
    const initials = nameParts.map(part => part[0]).join('').toUpperCase();
    document.getElementById('userAvatar').textContent = initials;

    // Progress functionality
    // Period navigation
    const prevBtn = document.querySelector('.period-navigation .nav-btn:first-child');
    const nextBtn = document.querySelector('.period-navigation .nav-btn:last-child');
    const currentPeriodElement = document.querySelector('.current-period');
    
    const periods = ['I четверть', 'II четверть', 'III четверть', 'IV четверть'];
    let currentPeriodIndex = 0;
    
    function updatePeriod() {
        currentPeriodElement.textContent = periods[currentPeriodIndex];
        updateChart();
    }
    
    prevBtn.addEventListener('click', function() {
        currentPeriodIndex--;
        if (currentPeriodIndex < 0) {
            currentPeriodIndex = periods.length - 1;
        }
        updatePeriod();
    });
    
    nextBtn.addEventListener('click', function() {
        currentPeriodIndex++;
        if (currentPeriodIndex >= periods.length) {
            currentPeriodIndex = 0;
        }
        updatePeriod();
    });

    // Action buttons functionality
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('fa-chart-line')) {
                alert('Открыть детальную статистику студента');
            } else if (icon.classList.contains('fa-envelope')) {
                alert('Отправить сообщение студенту');
            }
        });
    });

    // Chart functionality
    let performanceChart = null;
    const chartTypeButtons = document.querySelectorAll('.chart-type-btn');
    const chartPeriodSelect = document.getElementById('chartPeriod');
    
    // Initialize chart
    function initChart() {
        const ctx = document.getElementById('performanceChart').getContext('2d');
        const activeType = document.querySelector('.chart-type-btn.active').getAttribute('data-type');
        
        if (performanceChart) {
            performanceChart.destroy();
        }
        
        const { labels, datasets } = getChartData(chartPeriodSelect.value, activeType);
        
        performanceChart = new Chart(ctx, {
            type: activeType,
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Динамика успеваемости студентов'
                    }
                },
                scales: activeType === 'radar' ? {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 5
                    }
                } : {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        title: {
                            display: true,
                            text: 'Средний балл'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Период обучения'
                        }
                    }
                }
            }
        });
    }
    
    function getChartData(period, type) {
        let labels = [];
        let datasets = [];
        
        if (period === 'За последний месяц') {
            labels = ['Неделя 1', 'Неделя 2', 'Неделя 3', 'Неделя 4'];
            
            datasets = [
                {
                    label: 'Иван Иванов',
                    data: [4.2, 4.3, 4.5, 4.6],
                    borderColor: '#4A6FA5',
                    backgroundColor: type === 'line' || type === 'radar' ? 'transparent' : 'rgba(74, 111, 165, 0.5)',
                    tension: 0.4
                },
                {
                    label: 'Мария Петрова',
                    data: [4.8, 4.9, 4.9, 5.0],
                    borderColor: '#2ECC71',
                    backgroundColor: type === 'line' || type === 'radar' ? 'transparent' : 'rgba(46, 204, 113, 0.5)',
                    tension: 0.4
                },
                {
                    label: 'Алексей Сидоров',
                    data: [2.8, 3.0, 2.9, 3.0],
                    borderColor: '#E74C3C',
                    backgroundColor: type === 'line' || type === 'radar' ? 'transparent' : 'rgba(231, 76, 60, 0.5)',
                    tension: 0.4
                }
            ];
        } else if (period === 'За последние 3 месяца') {
            labels = ['Январь', 'Февраль', 'Март'];
            
            datasets = [
                {
                    label: 'Средний балл класса',
                    data: [3.9, 4.1, 4.2],
                    borderColor: '#4A6FA5',
                    backgroundColor: type === 'line' || type === 'radar' ? 'transparent' : 'rgba(74, 111, 165, 0.5)',
                    tension: 0.4
                },
                {
                    label: 'Лучший ученик',
                    data: [4.7, 4.8, 5.0],
                    borderColor: '#2ECC71',
                    backgroundColor: type === 'line' || type === 'radar' ? 'transparent' : 'rgba(46, 204, 113, 0.5)',
                    tension: 0.4
                },
                {
                    label: 'Худший ученик',
                    data: [2.8, 3.0, 3.0],
                    borderColor: '#E74C3C',
                    backgroundColor: type === 'line' || type === 'radar' ? 'transparent' : 'rgba(231, 76, 60, 0.5)',
                    tension: 0.4
                }
            ];
        } else if (period === 'За учебный год') {
            labels = ['Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май'];
            
            datasets = [
                {
                    label: 'Средний балл класса',
                    data: [3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.2, 4.3],
                    borderColor: '#4A6FA5',
                    backgroundColor: type === 'line' || type === 'radar' ? 'transparent' : 'rgba(74, 111, 165, 0.5)',
                    tension: 0.4
                }
            ];
        }
        
        return { labels, datasets };
    }
    
    chartTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            chartTypeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            updateChart();
        });
    });
    
    chartPeriodSelect.addEventListener('change', updateChart);
    
    function updateChart() {
        initChart();
    }
    
    initChart();
}