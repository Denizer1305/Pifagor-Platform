// Модуль управления предметами
export function initSubjectManagement() {
    // User data
    const userName = "Администратор";
    
    // Обновляем информацию пользователя
    const userNameElement = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');
    
    if (userNameElement) {
        userNameElement.textContent = userName;
    }
    
    if (userAvatar) {
        const nameParts = userName.split(' ');
        const initials = nameParts.map(part => part[0]).join('').toUpperCase();
        userAvatar.textContent = initials;
    }

    // Загружаем Chart.js если нужен
    if (document.getElementById('studentsDistributionChart')) {
        loadChartJS().then(() => {
            initializeCharts();
        });
    }

    // Modal functionality
    const addSubjectBtn = document.getElementById('addSubjectBtn');
    const addSubjectModal = document.getElementById('addSubjectModal');
    const closeModal = document.getElementById('closeModal');
    const cancelAdd = document.getElementById('cancelAdd');
    const saveSubject = document.getElementById('saveSubject');
    
    if (addSubjectBtn && addSubjectModal) {
        // Open modal
        addSubjectBtn.addEventListener('click', function() {
            addSubjectModal.classList.add('active');
        });
        
        // Close modal
        function closeAddModal() {
            addSubjectModal.classList.remove('active');
        }
        
        if (closeModal) closeModal.addEventListener('click', closeAddModal);
        if (cancelAdd) cancelAdd.addEventListener('click', closeAddModal);
        
        // Save subject
        if (saveSubject) {
            saveSubject.addEventListener('click', function() {
                const subjectName = document.getElementById('subjectName')?.value;
                const subjectCategory = document.getElementById('subjectCategory')?.value;
                const subjectStatus = document.getElementById('subjectStatus')?.value;
                const subjectDescription = document.getElementById('subjectDescription')?.value;
                
                if (!subjectName || !subjectDescription) {
                    alert('Пожалуйста, заполните все обязательные поля');
                    return;
                }
                
                // In a real app, we would save the subject to the server
                console.log(`Adding subject: ${subjectName}, ${subjectCategory}, ${subjectStatus}, ${subjectDescription}`);
                
                // Show success message
                alert(`Предмет "${subjectName}" успешно создан!`);
                
                // Close modal and reset form
                closeAddModal();
                document.getElementById('subjectName').value = '';
                document.getElementById('subjectDescription').value = '';
                
                // Reset checkboxes
                const checkboxes = document.querySelectorAll('.teachers-select input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });
            });
        }
    }
    
    // Select all checkbox
    const selectAllCheckbox = document.getElementById('selectAll');
    const subjectCheckboxes = document.querySelectorAll('.subject-checkbox');
    
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            subjectCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const subjectCards = document.querySelectorAll('.subject-card');
            const subjectRows = document.querySelectorAll('.subject-row');
            
            subjectCards.forEach(card => {
                const subjectName = card.querySelector('.subject-info h3')?.textContent.toLowerCase();
                if (subjectName?.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            subjectRows.forEach(row => {
                const subjectName = row.querySelector('.subject-name')?.textContent.toLowerCase();
                if (subjectName?.includes(searchTerm)) {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Category filter
    const categoryFilter = document.querySelectorAll('.filter-select')[0];
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const selectedCategory = this.value;
            const subjectCards = document.querySelectorAll('.subject-card');
            const subjectRows = document.querySelectorAll('.subject-row');
            
            if (selectedCategory === 'Все категории') {
                subjectCards.forEach(card => {
                    card.style.display = 'block';
                });
                subjectRows.forEach(row => {
                    row.style.display = 'table-row';
                });
            } else {
                subjectCards.forEach(card => {
                    const category = card.querySelector('.subject-info p')?.textContent;
                    if (category === selectedCategory) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                subjectRows.forEach(row => {
                    const category = row.querySelector('td:nth-child(3)')?.textContent;
                    if (category === selectedCategory) {
                        row.style.display = 'table-row';
                    } else {
                        row.style.display = 'none';
                    }
                });
            }
        });
    }
    
    // Status filter
    const statusFilter = document.querySelectorAll('.filter-select')[1];
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            const selectedStatus = this.value;
            const subjectCards = document.querySelectorAll('.subject-card');
            const subjectRows = document.querySelectorAll('.subject-row');
            
            if (selectedStatus === 'Все статусы') {
                subjectCards.forEach(card => {
                    card.style.display = 'block';
                });
                subjectRows.forEach(row => {
                    row.style.display = 'table-row';
                });
            } else {
                subjectCards.forEach(card => {
                    const status = card.querySelector('.subject-status')?.textContent;
                    if (status?.includes(selectedStatus)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                subjectRows.forEach(row => {
                    const status = row.querySelector('.status-badge')?.textContent;
                    if (status === selectedStatus) {
                        row.style.display = 'table-row';
                    } else {
                        row.style.display = 'none';
                    }
                });
            }
        });
    }
    
    // Subject actions
    const editButtons = document.querySelectorAll('.action-btn:not(.delete)');
    const deleteButtons = document.querySelectorAll('.action-btn.delete');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const subjectCard = this.closest('.subject-card') || this.closest('.subject-row');
            const subjectName = subjectCard.querySelector('.subject-info h3, .subject-name')?.textContent;
            
            // In a real app, we would open edit modal
            alert(`Редактирование предмета: ${subjectName}`);
        });
    });
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const subjectCard = this.closest('.subject-card') || this.closest('.subject-row');
            const subjectName = subjectCard.querySelector('.subject-info h3, .subject-name')?.textContent;
            
            if (confirm(`Вы уверены, что хотите удалить предмет "${subjectName}"?`)) {
                // In a real app, we would delete the subject
                subjectCard.remove();
                alert(`Предмет "${subjectName}" удален`);
            }
        });
    });
}

function initializeCharts() {
    if (typeof Chart === 'undefined') return;
    
    createStudentsDistributionChart();
    createCoursesDistributionChart();
}

function createStudentsDistributionChart() {
    const ctx = document.getElementById('studentsDistributionChart');
    if (!ctx) return;
    
    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Математика', 'Физика', 'Программирование', 'Химия', 'Английский', 'История', 'Биология', 'Литература'],
            datasets: [{
                label: 'Количество студентов',
                data: [587, 421, 723, 312, 654, 398, 285, 376],
                backgroundColor: 'rgba(74, 111, 165, 0.7)',
                borderColor: 'rgba(74, 111, 165, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createCoursesDistributionChart() {
    const ctx = document.getElementById('coursesDistributionChart');
    if (!ctx) return;
    
    new Chart(ctx.getContext('2d'), {
        type: 'pie',
        data: {
            labels: ['Математика', 'Физика', 'Программирование', 'Химия', 'Английский', 'История', 'Другие'],
            datasets: [{
                data: [24, 18, 32, 14, 28, 16, 32],
                backgroundColor: [
                    'rgba(74, 111, 165, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(243, 156, 18, 0.7)',
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(155, 89, 182, 0.7)',
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(26, 188, 156, 0.7)'
                ],
                borderColor: [
                    'rgba(74, 111, 165, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(243, 156, 18, 1)',
                    'rgba(52, 152, 219, 1)',
                    'rgba(155, 89, 182, 1)',
                    'rgba(231, 76, 60, 1)',
                    'rgba(26, 188, 156, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}