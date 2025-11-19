export function initStatistics() {
    console.log('Initializing statistics module...');
    
    // User data
    const userName = "Елена Плеханова";
    const userEmail = "";
    
    document.getElementById('userName').textContent = userName;

    // Initialize all statistics functionality
    initStatisticsCharts();
    initExportFunctionality();
}

function initStatisticsCharts() {
    // Grades Distribution Chart (Doughnut)
    const gradesCtx = document.getElementById('gradesDistributionChart');
    if (gradesCtx) {
        window.gradesChart = new Chart(gradesCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Отлично (5)', 'Хорошо (4)', 'Удовлетворительно (3)', 'Неудовлетворительно (2)'],
                datasets: [{
                    data: [45, 35, 15, 5],
                    backgroundColor: ['#2ECC71', '#3498DB', '#F39C12', '#E74C3C'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    // Courses Progress Chart (Bar)
    const coursesCtx = document.getElementById('coursesProgressChart');
    if (coursesCtx) {
        window.coursesChart = new Chart(coursesCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Программирование', 'Математика', 'Физика', 'WEB-технологии', 'Базы данных'],
                datasets: [{
                    label: 'Средний прогресс (%)',
                    data: [78, 65, 52, 71, 58],
                    backgroundColor: 'rgba(74, 111, 165, 0.7)',
                    borderColor: 'rgba(74, 111, 165, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, max: 100 }
                }
            }
        });
    }

    // Activity Chart (Line)
    const activityCtx = document.getElementById('activityChart');
    if (activityCtx) {
        window.activityChart = new Chart(activityCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                datasets: [{
                    label: 'Активность студентов',
                    data: [65, 75, 70, 80, 60, 55, 45],
                    borderColor: '#4A6FA5',
                    backgroundColor: 'rgba(74, 111, 165, 0.1)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, max: 100 }
                }
            }
        });
    }

    // Assignments Chart (Pie)
    const assignmentsCtx = document.getElementById('assignmentsChart');
    if (assignmentsCtx) {
        window.assignmentsChart = new Chart(assignmentsCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Выполнено', 'В процессе', 'Просрочено', 'Не начато'],
                datasets: [{
                    data: [65, 20, 5, 10],
                    backgroundColor: ['#2ECC71', '#F39C12', '#E74C3C', '#8A8A9F'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
}