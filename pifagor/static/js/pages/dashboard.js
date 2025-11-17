// pages/dashboard.js
export function initDashboard() {
    // Classes management functionality
    const createClassBtn = document.getElementById('createClassBtn');
    const createClassModal = document.getElementById('createClassModal');
    const closeModal = document.getElementById('closeModal');
    const cancelCreate = document.getElementById('cancelCreate');
    const saveClass = document.getElementById('saveClass');
    
    // Open modal
    createClassBtn.addEventListener('click', function() {
        createClassModal.classList.add('active');
    });
    
    // Close modal
    function closeCreateModal() {
        createClassModal.classList.remove('active');
    }
    
    closeModal.addEventListener('click', closeCreateModal);
    cancelCreate.addEventListener('click', closeCreateModal);
    
    // Save class
    saveClass.addEventListener('click', function() {
        const className = document.getElementById('className').value;
        const classGrade = document.getElementById('classGrade').value;
        const classDescription = document.getElementById('classDescription').value;
        
        if (!className) {
            alert('Пожалуйста, введите название класса');
            return;
        }
        
        console.log(`Creating class: ${className}, ${classGrade}, ${classDescription}`);
        
        alert(`Класс "${className}" успешно создан!`);
        
        closeCreateModal();
        document.getElementById('className').value = '';
        document.getElementById('classDescription').value = '';
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const classCards = document.querySelectorAll('.class-card');
        
        classCards.forEach(card => {
            const className = card.querySelector('.class-info h3').textContent.toLowerCase();
            if (className.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Class actions
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const classCard = this.closest('.class-card');
            const className = classCard.querySelector('.class-info h3').textContent;
            
            if (this.querySelector('.fa-edit')) {
                alert(`Редактирование класса: ${className}`);
            } else if (this.querySelector('.fa-cog')) {
                alert(`Настройки класса: ${className}`);
            }
        });
    });

    // Grades functionality
    const gradeModal = document.getElementById('gradeModal');
    const gradeCloseModal = document.getElementById('closeModal');
    const cancelGrade = document.getElementById('cancelGrade');
    const saveGrade = document.getElementById('saveGrade');
    const gradeOptions = document.querySelectorAll('.grade-option');
    const gradeCells = document.querySelectorAll('.grade-value');
    const bulkActions = document.querySelectorAll('.bulk-action');
    
    let currentStudent = null;
    let currentTask = null;
    let selectedGrade = null;

    // Open modal when clicking on a grade cell
    gradeCells.forEach(cell => {
        cell.addEventListener('click', function() {
            const studentId = this.getAttribute('data-student');
            const task = this.getAttribute('data-task');
            
            const studentName = getStudentName(studentId);
            const taskName = getTaskName(task);
            
            document.getElementById('studentTaskInfo').textContent = 
                `Студент: ${studentName} • Задание: ${taskName}`;
            
            currentStudent = studentId;
            currentTask = task;
            
            const currentGrade = this.querySelector('.grade-badge').textContent;
            selectedGrade = currentGrade;
            
            gradeOptions.forEach(option => {
                if (option.getAttribute('data-grade') === selectedGrade) {
                    option.classList.add('selected');
                }
            });
            
            gradeModal.classList.add('active');
        });
    });

    function closeGradeModal() {
        gradeModal.classList.remove('active');
        selectedGrade = null;
        gradeOptions.forEach(option => {
            option.classList.remove('selected');
        });
        document.getElementById('gradeComment').value = '';
    }

    gradeCloseModal.addEventListener('click', closeGradeModal);
    cancelGrade.addEventListener('click', closeGradeModal);

    gradeOptions.forEach(option => {
        option.addEventListener('click', function() {
            gradeOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedGrade = this.getAttribute('data-grade');
        });
    });

    saveGrade.addEventListener('click', function() {
        if (selectedGrade !== null) {
            const comment = document.getElementById('gradeComment').value;
            console.log(`Saving grade ${selectedGrade} for student ${currentStudent}, task ${currentTask}, comment: ${comment}`);
            
            const targetCell = document.querySelector(`.grade-value[data-student="${currentStudent}"][data-task="${currentTask}"]`);
            const gradeBadge = targetCell.querySelector('.grade-badge');
            
            gradeBadge.textContent = selectedGrade;
            
            gradeBadge.className = 'grade-badge';
            
            if (selectedGrade === '5') {
                gradeBadge.classList.add('grade-excellent');
            } else if (selectedGrade === '4') {
                gradeBadge.classList.add('grade-good');
            } else if (selectedGrade === '3') {
                gradeBadge.classList.add('grade-average');
            } else {
                gradeBadge.classList.add('grade-poor');
            }
            
            updateStudentAverage(currentStudent);
            
            closeGradeModal();
        } else {
            alert('Пожалуйста, выберите оценку');
        }
    });

    bulkActions.forEach(action => {
        action.addEventListener('click', function() {
            const actionId = this.id;
            
            if (actionId === 'addTask') {
                alert('Добавление нового задания');
            } else if (actionId === 'importGrades') {
                alert('Импорт оценок из файла');
            } else if (actionId === 'exportGrades') {
                alert('Экспорт оценок в Excel');
            } else if (actionId === 'generateReport') {
                alert('Отчет об успеваемости сгенерирован');
            }
        });
    });

    const prevBtn = document.querySelector('.term-navigation .nav-btn:first-child');
    const nextBtn = document.querySelector('.term-navigation .nav-btn:last-child');
    const currentTermElement = document.querySelector('.current-term');
    
    const terms = ['I четверть', 'II четверть', 'III четверть', 'IV четверть'];
    let currentTermIndex = 0;
    
    function updateTerm() {
        currentTermElement.textContent = terms[currentTermIndex];
    }
    
    prevBtn.addEventListener('click', function() {
        currentTermIndex--;
        if (currentTermIndex < 0) {
            currentTermIndex = terms.length - 1;
        }
        updateTerm();
    });
    
    nextBtn.addEventListener('click', function() {
        currentTermIndex++;
        if (currentTermIndex >= terms.length) {
            currentTermIndex = 0;
        }
        updateTerm();
    });

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
            'hw1': 'ДЗ №1',
            'test1': 'Тест №1',
            'project': 'Проект',
            'hw2': 'ДЗ №2',
            'test2': 'Тест №2'
        };
        return tasks[taskId] || 'Неизвестное задание';
    }
    
    function updateStudentAverage(studentId) {
        const studentCells = document.querySelectorAll(`.grade-value[data-student="${studentId}"]`);
        let sum = 0;
        let count = 0;
        
        studentCells.forEach(cell => {
            const grade = parseInt(cell.querySelector('.grade-badge').textContent);
            if (!isNaN(grade)) {
                sum += grade;
                count++;
            }
        });
        
        if (count > 0) {
            const average = (sum / count).toFixed(1);
            const averageCell = document.querySelector(`tr[data-student="${studentId}"] td:nth-child(7) .grade-badge`);
            if (averageCell) {
                averageCell.textContent = average;
                
                averageCell.className = 'grade-badge';
                if (average >= 4.5) {
                    averageCell.classList.add('grade-excellent');
                } else if (average >= 3.5) {
                    averageCell.classList.add('grade-good');
                } else if (average >= 2.5) {
                    averageCell.classList.add('grade-average');
                } else {
                    averageCell.classList.add('grade-poor');
                }
            }
        }
    }
}