// js/modules/course-students.js
import { modalManager } from './modal-manager.js';

export class CourseStudentsManager {
    constructor() {
        this.availableStudents = [
            { id: 1, name: "Анна Козлова", email: "anna.koz@example.com", group: "10-А", initials: "АК" },
            { id: 2, name: "Сергей Волков", email: "s.volkov@example.com", group: "10-Б", initials: "СВ" },
            { id: 3, name: "Ольга Морозова", email: "olga.moroz@example.com", group: "11-А", initials: "ОМ" },
            { id: 4, name: "Дмитрий Соколов", email: "d.sokolov@example.com", group: "10-А", initials: "ДС" },
            { id: 5, name: "Ирина Павлова", email: "i.pavlova@example.com", group: "11-Б", initials: "ИП" },
            { id: 6, name: "Александр Лебедев", email: "a.lebedev@example.com", group: "10-Б", initials: "АЛ" },
            { id: 7, name: "Наталья Воробьева", email: "n.vorob@example.com", group: "11-А", initials: "НВ" },
            { id: 8, name: "Михаил Орлов", email: "m.orlov@example.com", group: "10-А", initials: "МО" }
        ];
        
        this.currentStudents = [
            { id: 101, name: "Иван Иванов", email: "ivan.ivanov@example.com", group: "10-А", initials: "ИИ", progress: 92, grade: 4.9, lastActivity: "2 часа назад" },
            { id: 102, name: "Мария Петрова", email: "maria.petrova@example.com", group: "10-Б", initials: "МП", progress: 78, grade: 4.5, lastActivity: "Вчера" },
            { id: 103, name: "Алексей Сидоров", email: "alex.sidorov@example.com", group: "11-А", initials: "АС", progress: 65, grade: 4.2, lastActivity: "3 дня назад" },
            { id: 104, name: "Елена Новикова", email: "elena.novikova@example.com", group: "10-А", initials: "ЕН", progress: 45, grade: 3.8, lastActivity: "Неделю назад" }
        ];

        this.init();
    }

    init() {
        this.registerModals();
        this.initEventHandlers();
        this.renderStudentsList();
        this.updateStudentsTable();
        console.log('CourseStudentsManager initialized');
    }

    registerModals() {
        // Регистрируем модальное окно добавления студентов
        if (!modalManager.register('addStudentModal')) {
            console.warn('Add student modal not found, creating dynamically...');
            this.createStudentModal();
        }
    }

    createStudentModal() {
        const modalContent = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Добавить студентов в курс</h3>
                    <button type="button" class="modal-close" data-modal-close>
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="studentSearch" class="form-label">Поиск студентов</label>
                        <input type="text" id="studentSearch" class="form-control" placeholder="Введите имя, email или группу...">
                    </div>
                    
                    <div class="students-list-container">
                        <h4>Доступные студенты</h4>
                        <div id="studentsList" class="students-list">
                            <!-- Список студентов будет здесь -->
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-modal-close>Отмена</button>
                    <button type="button" class="btn btn-success" id="confirmStudentModal">Добавить выбранных</button>
                </div>
            </div>
        `;

        modalManager.createModal('addStudentModal', modalContent);
    }

    initEventHandlers() {
        // Обработчик кнопки добавления студента
        document.addEventListener('click', (e) => {
            if (e.target.closest('#addStudentBtn')) {
                this.openAddStudentModal();
            }
            
            if (e.target.closest('#confirmStudentModal')) {
                this.confirmAddStudents();
            }
        });

        // Обработчик поиска студентов
        document.addEventListener('input', (e) => {
            if (e.target.id === 'studentSearch') {
                this.filterStudents(e.target.value);
            }
        });
    }

    openAddStudentModal() {
        console.log('Opening student modal');
        this.renderStudentsList();
        modalManager.show('addStudentModal');
    }

    confirmAddStudents() {
        const selectedStudents = [];
        const checkboxes = document.querySelectorAll('#studentsList .student-checkbox:checked');
        
        checkboxes.forEach(checkbox => {
            const studentId = parseInt(checkbox.dataset.id);
            const student = this.availableStudents.find(s => s.id === studentId);
            if (student) {
                selectedStudents.push(student);
            }
        });
        
        if (selectedStudents.length === 0) {
            this.showNotification('Выберите хотя бы одного студента', 'error');
            return;
        }
        
        selectedStudents.forEach(student => {
            if (!this.currentStudents.some(s => s.id === student.id)) {
                this.currentStudents.push({
                    ...student,
                    progress: 0,
                    grade: 0,
                    lastActivity: 'Еще не активен'
                });
            }
        });
        
        this.updateStudentsTable();
        modalManager.hide('addStudentModal');
        this.showNotification(`Добавлено ${selectedStudents.length} студентов`);
    }

    filterStudents(searchTerm = '') {
        this.renderStudentsList(searchTerm);
    }

    renderStudentsList(searchTerm = '') {
        const studentsList = document.getElementById('studentsList');
        if (!studentsList) return;
        
        const filteredStudents = this.availableStudents.filter(student => 
            !this.currentStudents.some(current => current.id === student.id) &&
            (student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
             student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
             student.group.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        
        studentsList.innerHTML = '';
        
        if (filteredStudents.length === 0) {
            studentsList.innerHTML = '<div class="no-students">Нет студентов для добавления</div>';
            return;
        }
        
        filteredStudents.forEach(student => {
            const studentItem = document.createElement('div');
            studentItem.className = 'student-item';
            studentItem.innerHTML = `
                <input type="checkbox" class="student-checkbox" data-id="${student.id}">
                <div class="student-avatar-small">${student.initials}</div>
                <div class="student-info">
                    <div class="student-name">${student.name}</div>
                    <div class="student-email">${student.email}</div>
                </div>
                <div class="student-group">${student.group}</div>
            `;
            studentsList.appendChild(studentItem);
        });
    }

    updateStudentsTable() {
        const tableBody = document.querySelector('.students-table tbody');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        this.currentStudents.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div class="student-avatar">${student.initials}</div>
                        <div>${student.name}</div>
                    </div>
                </td>
                <td class="progress-cell">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${student.progress}%"></div>
                    </div>
                    <span>${student.progress}%</span>
                </td>
                <td>${student.grade}</td>
                <td>${student.lastActivity}</td>
                <td>
                    <button class="action-btn" data-action="email"><i class="fas fa-envelope"></i></button>
                    <button class="action-btn" data-action="stats"><i class="fas fa-chart-line"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        
        this.updateStudentCount();
        this.initActionButtons();
    }

    updateStudentCount() {
        const studentCountElement = document.querySelector('.management-card:nth-child(2) h3');
        if (studentCountElement) {
            studentCountElement.textContent = this.currentStudents.length;
        }
    }

    initActionButtons() {
        document.querySelectorAll('.action-btn[data-action="email"]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const studentName = button.closest('tr').querySelector('.student-name').textContent;
                this.showNotification(`Отправка сообщения студенту ${studentName}`);
            });
        });

        document.querySelectorAll('.action-btn[data-action="stats"]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const studentName = button.closest('tr').querySelector('.student-name').textContent;
                this.showNotification(`Просмотр статистики студента ${studentName}`);
            });
        });
    }

    showNotification(message, type = 'success') {
        if (typeof showToast !== 'undefined') {
            showToast(message, type);
        } else {
            console.log(`Notification [${type}]: ${message}`);
        }
    }
}