// modules/journal.js
export function initJournalPage() {
    // User data initialization
    const userName = "Елена Плеханова";
    const userEmail = "elena.plekhanova@example.com";
    
    document.getElementById('userName').textContent = userName;
    
    // Generate avatar initials
    const nameParts = userName.split(' ');
    const initials = nameParts.map(part => part[0]).join('').toUpperCase();
    document.getElementById('userAvatar').textContent = initials;

    // Grade editor functionality
    const gradeModal = document.getElementById('gradeModal');
    const closeModal = document.getElementById('closeModal');
    const cancelGrade = document.getElementById('cancelGrade');
    const saveGrade = document.getElementById('saveGrade');
    const gradeOptions = document.querySelectorAll('.grade-option');
    const gradeCells = document.querySelectorAll('.grade-cell');
    
    let currentStudent = null;
    let currentTask = null;
    let selectedGrade = null;

    // Open modal when clicking on a grade cell
    gradeCells.forEach(cell => {
        cell.addEventListener('click', function() {
            const studentId = this.getAttribute('data-student');
            const taskId = this.getAttribute('data-task');
            
            const studentName = getStudentName(studentId);
            const taskName = getTaskName(taskId);
            
            document.getElementById('studentTaskInfo').textContent = 
                `Студент: ${studentName} • Задание: ${taskName}`;
            
            currentStudent = studentId;
            currentTask = taskId;
            
            // Set current grade if exists
            const currentGrade = this.querySelector('.grade-badge').textContent;
            if (currentGrade !== '-') {
                selectedGrade = currentGrade;
                gradeOptions.forEach(option => {
                    if (option.getAttribute('data-grade') === currentGrade) {
                        option.classList.add('selected');
                    }
                });
            }
            
            gradeModal.classList.add('active');
        });
    });

    // Close modal
    function closeGradeModal() {
        gradeModal.classList.remove('active');
        selectedGrade = null;
        gradeOptions.forEach(option => {
            option.classList.remove('selected');
        });
    }

    closeModal.addEventListener('click', closeGradeModal);
    cancelGrade.addEventListener('click', closeGradeModal);

    // Select grade
    gradeOptions.forEach(option => {
        option.addEventListener('click', function() {
            gradeOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedGrade = this.getAttribute('data-grade');
        });
    });

    // Save grade
    saveGrade.addEventListener('click', function() {
        if (selectedGrade !== null) {
            console.log(`Saving grade ${selectedGrade} for student ${currentStudent}, task ${currentTask}`);
            
            const targetCell = document.querySelector(`.grade-cell[data-student="${currentStudent}"][data-task="${currentTask}"]`);
            const gradeBadge = targetCell.querySelector('.grade-badge');
            
            if (selectedGrade === '0') {
                gradeBadge.textContent = '-';
                gradeBadge.className = 'grade-badge grade-missing';
            } else {
                gradeBadge.textContent = selectedGrade;
                
                if (selectedGrade === '5') {
                    gradeBadge.className = 'grade-badge grade-excellent';
                } else if (selectedGrade === '4') {
                    gradeBadge.className = 'grade-badge grade-good';
                } else if (selectedGrade === '3') {
                    gradeBadge.className = 'grade-badge grade-satisfactory';
                } else {
                    gradeBadge.className = 'grade-badge grade-poor';
                }
            }
            
            closeGradeModal();
        } else {
            alert('Пожалуйста, выберите оценку');
        }
    });

    // Mock data functions
    function getStudentName(studentId) {
        const students = {
            '1': 'Иван Иванов',
            '2': 'Мария Петрова',
            '3': 'Алексей Сидоров',
            '4': 'Елена Новикова',
            '5': 'Дмитрий Козлов'
        };
        return students[studentId] || 'Неизвестный студент';
    }

    function getTaskName(taskId) {
        const tasks = {
            'lr1': 'Лабораторная работа #1',
            'lr2': 'Лабораторная работа #2',
            'lr3': 'Лабораторная работа #3',
            'project': 'Проект "Калькулятор"',
            'exam': 'Экзамен'
        };
        return tasks[taskId] || 'Неизвестное задание';
    }

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('.journal-table tbody tr');
        
        rows.forEach(row => {
            const studentName = row.querySelector('.student-info div:first-child').textContent.toLowerCase();
            if (studentName.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}