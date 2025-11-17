export function initAttendance() {
    console.log('Initializing attendance module...');
    
    // User data
    const userName = "";
    const userEmail = "";
    
    document.getElementById('userName').textContent = userName;

    // Initialize all attendance functionality
    initAttendanceModal();
    initDayDetailsModal();
    initStatisticsModals();
    initBulkActions();
    initDateNavigation();
    initCalendarDays();
}

function initAttendanceModal() {
    const attendanceModal = document.getElementById('attendanceModal');
    const closeModal = document.getElementById('closeModal');
    const cancelAttendance = document.getElementById('cancelAttendance');
    const saveAttendance = document.getElementById('saveAttendance');
    const statusOptions = document.querySelectorAll('.status-option');
    const attendanceCells = document.querySelectorAll('.attendance-status');
    
    let currentStudent = null;
    let currentDate = null;
    let selectedStatus = null;

    if (!attendanceModal || !closeModal || !cancelAttendance || !saveAttendance) {
        console.log('Some attendance modal elements not found');
        return;
    }

    // Open modal when clicking on an attendance cell
    attendanceCells.forEach(cell => {
        cell.addEventListener('click', function() {
            const studentId = this.getAttribute('data-student');
            const date = this.getAttribute('data-date');
            
            const studentName = getStudentName(studentId);
            const formattedDate = formatDate(date);
            
            document.getElementById('studentDateInfo').textContent = 
                `Студент: ${studentName} • Дата: ${formattedDate}`;
            
            currentStudent = studentId;
            currentDate = date;
            
            // Set current status if exists
            const currentStatus = this.querySelector('.status-badge').className;
            if (currentStatus.includes('status-present')) {
                selectedStatus = 'present';
            } else if (currentStatus.includes('status-absent')) {
                selectedStatus = 'absent';
            } else if (currentStatus.includes('status-late')) {
                selectedStatus = 'late';
            } else if (currentStatus.includes('status-excused')) {
                selectedStatus = 'excused';
            }
            
            // Highlight current status
            statusOptions.forEach(option => {
                option.classList.remove('selected');
                if (option.getAttribute('data-status') === selectedStatus) {
                    option.classList.add('selected');
                }
            });
            
            attendanceModal.classList.add('active');
        });
    });

    // Close modal
    function closeAttendanceModal() {
        attendanceModal.classList.remove('active');
        selectedStatus = null;
        statusOptions.forEach(option => {
            option.classList.remove('selected');
        });
    }

    closeModal.addEventListener('click', closeAttendanceModal);
    cancelAttendance.addEventListener('click', closeAttendanceModal);

    // Select status
    statusOptions.forEach(option => {
        option.addEventListener('click', function() {
            statusOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedStatus = this.getAttribute('data-status');
        });
    });

    // Save attendance
    saveAttendance.addEventListener('click', function() {
        if (selectedStatus !== null) {
            console.log(`Saving attendance ${selectedStatus} for student ${currentStudent}, date ${currentDate}`);
            
            const targetCell = document.querySelector(`.attendance-status[data-student="${currentStudent}"][data-date="${currentDate}"]`);
            if (targetCell) {
                const statusBadge = targetCell.querySelector('.status-badge');
                
                if (selectedStatus === 'present') {
                    statusBadge.textContent = '0';
                    statusBadge.className = 'status-badge status-present';
                } else if (selectedStatus === 'absent') {
                    statusBadge.textContent = '2';
                    statusBadge.className = 'status-badge status-absent';
                } else if (selectedStatus === 'late') {
                    statusBadge.textContent = '1';
                    statusBadge.className = 'status-badge status-late';
                } else if (selectedStatus === 'excused') {
                    statusBadge.textContent = 'Уваж.';
                    statusBadge.className = 'status-badge status-excused';
                }
            }
            
            closeAttendanceModal();
        } else {
            alert('Пожалуйста, выберите статус посещаемости');
        }
    });
}

function initDayDetailsModal() {
    const dayDetailsModal = document.getElementById('dayDetailsModal');
    const closeDayDetailsModal = document.getElementById('closeDayDetailsModal');
    const modalDayDate = document.getElementById('modalDayDate');
    const lateList = document.getElementById('lateList');
    const absentList = document.getElementById('absentList');
    const presentList = document.getElementById('presentList');
    
    if (!dayDetailsModal || !closeDayDetailsModal || !modalDayDate) {
        console.log('Some day details modal elements not found');
        return;
    }

    // Mock данные о посещаемости по дням
    const attendanceByDay = {
        '2024-01-01': { 
            late: [], 
            absent: [], 
            present: [
                { id: 1, name: 'Иван Иванов', avatar: 'ИИ' },
                { id: 2, name: 'Мария Петрова', avatar: 'МП' },
            ]
        },
    };

    function renderStudentList(container, students) {
        if (!container) return;
        
        container.innerHTML = '';
        
        if (students.length === 0) {
            container.innerHTML = '<div class="no-data">Нет данных</div>';
            return;
        }
        
        students.forEach(student => {
            const studentItem = document.createElement('div');
            studentItem.className = 'student-item';
            studentItem.innerHTML = `
                <div class="student-avatar-small">${student.avatar}</div>
                <div class="student-name">${student.name}</div>
            `;
            container.appendChild(studentItem);
        });
    }

    function getDayType(dayElement) {
        const indicators = dayElement.querySelectorAll('.attendance-indicator');
        let hasRed = false;
        let hasYellow = false;
        let hasGreen = false;
        
        indicators.forEach(indicator => {
            if (indicator.classList.contains('indicator-poor')) hasRed = true;
            if (indicator.classList.contains('indicator-average')) hasYellow = true;
            if (indicator.classList.contains('indicator-good')) hasGreen = true;
        });
        
        if (hasRed && hasYellow) return 'both';
        if (hasRed) return 'absent';
        if (hasYellow) return 'late';
        if (hasGreen) return 'present';
        return 'none';
    }

    function openDayDetailsModal(date, dayNumber, dayElement) {
        const dateString = `${dayNumber} января 2024`;
        modalDayDate.textContent = dateString;
        
        const dayData = attendanceByDay[date] || { late: [], absent: [], present: [] };
        const dayType = getDayType(dayElement);
        
        if (lateList) lateList.style.display = 'none';
        if (absentList) absentList.style.display = 'none';
        if (presentList) presentList.style.display = 'none';
        
        switch(dayType) {
            case 'absent':
                if (absentList) {
                    absentList.style.display = 'block';
                    renderStudentList(absentList, dayData.absent);
                }
                break;
            case 'late':
                if (lateList) {
                    lateList.style.display = 'block';
                    renderStudentList(lateList, dayData.late);
                }
                break;
            case 'present':
                if (presentList) {
                    presentList.style.display = 'block';
                    presentList.innerHTML = '<div class="no-data">Все студенты присутствовали</div>';
                }
                break;
            case 'both':
                if (lateList) {
                    lateList.style.display = 'block';
                    renderStudentList(lateList, dayData.late);
                }
                if (absentList) {
                    absentList.style.display = 'block';
                    renderStudentList(absentList, dayData.absent);
                }
                break;
            default:
                if (lateList) {
                    lateList.style.display = 'block';
                    renderStudentList(lateList, dayData.late);
                }
                if (absentList) {
                    absentList.style.display = 'block';
                    renderStudentList(absentList, dayData.absent);
                }
                if (presentList) {
                    presentList.style.display = 'block';
                    renderStudentList(presentList, dayData.present);
                }
        }
        
        dayDetailsModal.classList.add('active');
    }

    function closeDayDetailsModalFunc() {
        dayDetailsModal.classList.remove('active');
    }

    // Add event listeners to calendar days
    const calendarDays = document.querySelectorAll('.calendar-day');
    calendarDays.forEach(day => {
        if (day.classList.contains('other-month')) return;
        
        day.style.cursor = 'pointer';
        
        day.addEventListener('click', function() {
            const dayNumber = this.querySelector('.day-number').textContent.trim();
            const date = `2024-01-${dayNumber.padStart(2, '0')}`;
            openDayDetailsModal(date, dayNumber, this);
        });
    });

    if (closeDayDetailsModal) {
        closeDayDetailsModal.addEventListener('click', closeDayDetailsModalFunc);
    }

    dayDetailsModal.addEventListener('click', function(e) {
        if (e.target === dayDetailsModal) {
            closeDayDetailsModalFunc();
        }
    });
}

function initStatisticsModals() {
    const bestAttendanceModal = document.getElementById('bestAttendanceModal');
    const worstAttendanceModal = document.getElementById('worstAttendanceModal');
    const problemSubjectModal = document.getElementById('problemSubjectModal');
    const monthlyTrendModal = document.getElementById('monthlyTrendModal');
    
    // Functions to open modals
    function openBestAttendanceModal() {
        if (bestAttendanceModal) bestAttendanceModal.classList.add('active');
    }
    
    function openWorstAttendanceModal() {
        if (worstAttendanceModal) worstAttendanceModal.classList.add('active');
    }
    
    function openProblemSubjectModal() {
        if (problemSubjectModal) problemSubjectModal.classList.add('active');
    }
    
    function openMonthlyTrendModal() {
        if (monthlyTrendModal) monthlyTrendModal.classList.add('active');
    }
    
    // Functions to close modals
    function closeBestAttendanceModalFunc() {
        if (bestAttendanceModal) bestAttendanceModal.classList.remove('active');
    }
    
    function closeWorstAttendanceModalFunc() {
        if (worstAttendanceModal) worstAttendanceModal.classList.remove('active');
    }
    
    function closeProblemSubjectModalFunc() {
        if (problemSubjectModal) problemSubjectModal.classList.remove('active');
    }
    
    function closeMonthlyTrendModalFunc() {
        if (monthlyTrendModal) monthlyTrendModal.classList.remove('active');
    }
    
    // Add event listeners to summary items
    const summaryItems = document.querySelectorAll('.summary-item');
    summaryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            switch(index) {
                case 0: openBestAttendanceModal(); break;
                case 1: openWorstAttendanceModal(); break;
                case 2: openProblemSubjectModal(); break;
                case 3: openMonthlyTrendModal(); break;
            }
        });
    });
    
    // Add close event listeners
    const closeButtons = [
        { id: 'closeBestAttendanceModal', func: closeBestAttendanceModalFunc },
        { id: 'closeBestAttendanceBtn', func: closeBestAttendanceModalFunc },
        { id: 'closeWorstAttendanceModal', func: closeWorstAttendanceModalFunc },
        { id: 'closeWorstAttendanceBtn', func: closeWorstAttendanceModalFunc },
        { id: 'closeProblemSubjectModal', func: closeProblemSubjectModalFunc },
        { id: 'closeProblemSubjectBtn', func: closeProblemSubjectModalFunc },
        { id: 'closeMonthlyTrendModal', func: closeMonthlyTrendModalFunc },
        { id: 'closeMonthlyTrendBtn', func: closeMonthlyTrendModalFunc }
    ];
    
    closeButtons.forEach(({ id, func }) => {
        const element = document.getElementById(id);
        if (element) element.addEventListener('click', func);
    });
    
    // Close on overlay click
    [bestAttendanceModal, worstAttendanceModal, problemSubjectModal, monthlyTrendModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    const closeFuncs = {
                        'bestAttendanceModal': closeBestAttendanceModalFunc,
                        'worstAttendanceModal': closeWorstAttendanceModalFunc,
                        'problemSubjectModal': closeProblemSubjectModalFunc,
                        'monthlyTrendModal': closeMonthlyTrendModalFunc
                    };
                    closeFuncs[modal.id]?.();
                }
            });
        }
    });
}

function initBulkActions() {
    const bulkActions = document.querySelectorAll('.bulk-action');
    
    bulkActions.forEach(action => {
        action.addEventListener('click', function() {
            const actionId = this.id;
            
            if (actionId === 'markAllPresent') {
                if (confirm('Отметить всех студентов как присутствующих на выбранную дату?')) {
                    alert('Все студенты отмечены как присутствующие');
                }
            } else if (actionId === 'markAllAbsent') {
                if (confirm('Отметить всех студентов как отсутствующих на выбранную дату?')) {
                    alert('Все студенты отмечены как отсутствующие');
                }
            } else if (actionId === 'exportData') {
                alert('Данные экспортированы в Excel');
            } else if (actionId === 'generateReport') {
                alert('Отчет о посещаемости сгенерирован');
            }
        });
    });
}

function initDateNavigation() {
    const prevBtn = document.querySelector('.nav-btn:first-child');
    const nextBtn = document.querySelector('.nav-btn:last-child');
    const currentDateElement = document.querySelector('.current-date');
    
    if (!prevBtn || !nextBtn || !currentDateElement) return;

    let currentMonth = 0;
    let currentYear = 2024;
    
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    
    function updateCalendar() {
        currentDateElement.textContent = `${months[currentMonth]} ${currentYear}`;
    }
    
    prevBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });
    
    nextBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });
}

function initCalendarDays() {
    const calendarDays = document.querySelectorAll('.calendar-day');
    calendarDays.forEach(day => {
        if (!day.classList.contains('other-month')) {
            day.style.cursor = 'pointer';
        }
    });
}

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

function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('ru-RU', options);
    } catch (e) {
        return dateString;
    }
}