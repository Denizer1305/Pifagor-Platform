// Модуль управления пользователями платформы
export function initPlatformUsers() {
    // User data
    const userName = "Администратор";
    const userEmail = "admin@school.ru";
    
    // Обновляем информацию пользователя
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = userName;
    }

    // Загружаем Chart.js если нужен
    if (document.getElementById('rolesChart')) {
        loadChartJS().then(() => {
            initializeCharts();
        });
    }

    // Modal functionality
    const addUserBtn = document.getElementById('addUserBtn');
    const addUserModal = document.getElementById('addUserModal');
    const closeModal = document.getElementById('closeModal');
    const cancelAdd = document.getElementById('cancelAdd');
    const saveUser = document.getElementById('saveUser');
    
    if (addUserBtn && addUserModal) {
        // Open modal
        addUserBtn.addEventListener('click', function() {
            addUserModal.classList.add('active');
        });
        
        // Close modal
        function closeAddModal() {
            addUserModal.classList.remove('active');
        }
        
        if (closeModal) closeModal.addEventListener('click', closeAddModal);
        if (cancelAdd) cancelAdd.addEventListener('click', closeAddModal);
        
        // Save user
        if (saveUser) {
            saveUser.addEventListener('click', function() {
                const userFirstName = document.getElementById('userFirstName')?.value;
                const userLastName = document.getElementById('userLastName')?.value;
                const userEmail = document.getElementById('userEmail')?.value;
                const userRole = document.getElementById('userRole')?.value;
                const userStatus = document.getElementById('userStatus')?.value;
                const userPassword = document.getElementById('userPassword')?.value;
                const userConfirmPassword = document.getElementById('userConfirmPassword')?.value;
                
                if (!userFirstName || !userLastName || !userEmail || !userPassword) {
                    alert('Пожалуйста, заполните все обязательные поля');
                    return;
                }
                
                if (userPassword !== userConfirmPassword) {
                    alert('Пароли не совпадают');
                    return;
                }
                
                // In a real app, we would save the user to the server
                console.log(`Adding user: ${userFirstName} ${userLastName}, ${userEmail}, ${userRole}, ${userStatus}`);
                
                // Show success message
                alert(`Пользователь ${userFirstName} ${userLastName} успешно добавлен!`);
                
                // Close modal and reset form
                closeAddModal();
                document.getElementById('userFirstName').value = '';
                document.getElementById('userLastName').value = '';
                document.getElementById('userEmail').value = '';
                document.getElementById('userPassword').value = '';
                document.getElementById('userConfirmPassword').value = '';
            });
        }
    }
    
    // Select all checkbox
    const selectAllCheckbox = document.getElementById('selectAll');
    const userCheckboxes = document.querySelectorAll('.user-checkbox');
    
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            userCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const userRows = document.querySelectorAll('.user-row');
            
            userRows.forEach(row => {
                const userName = row.querySelector('.user-name')?.textContent.toLowerCase();
                const userEmail = row.querySelector('.user-email')?.textContent.toLowerCase();
                if (userName?.includes(searchTerm) || userEmail?.includes(searchTerm)) {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Role filter
    const roleFilter = document.querySelectorAll('.filter-select')[0];
    if (roleFilter) {
        roleFilter.addEventListener('change', function() {
            const selectedRole = this.value;
            const userRows = document.querySelectorAll('.user-row');
            
            if (selectedRole === 'Все роли') {
                userRows.forEach(row => {
                    row.style.display = 'table-row';
                });
            } else {
                userRows.forEach(row => {
                    const role = row.querySelector('.role-badge')?.textContent;
                    if (role === selectedRole) {
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
            const userRows = document.querySelectorAll('.user-row');
            
            if (selectedStatus === 'Все статусы') {
                userRows.forEach(row => {
                    row.style.display = 'table-row';
                });
            } else {
                userRows.forEach(row => {
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
    
    // User actions
    const editButtons = document.querySelectorAll('.action-btn:not(.delete)');
    const deleteButtons = document.querySelectorAll('.action-btn.delete');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const userRow = this.closest('.user-row');
            const userName = userRow.querySelector('.user-name')?.textContent;
            
            // In a real app, we would open edit modal
            alert(`Редактирование пользователя: ${userName}`);
        });
    });
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const userRow = this.closest('.user-row');
            const userName = userRow.querySelector('.user-name')?.textContent;
            
            if (confirm(`Вы уверены, что хотите удалить пользователя ${userName}?`)) {
                // In a real app, we would delete the user
                userRow.remove();
                alert(`Пользователь ${userName} удален`);
            }
        });
    });
}

function initializeCharts() {
    if (typeof Chart === 'undefined') return;
    
    createRolesChart();
    createRegistrationChart();
    createActivityChart();
    createStatusChart();
}

function createRolesChart() {
    const ctx = document.getElementById('rolesChart');
    if (!ctx) return;
    
    new Chart(ctx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Студенты', 'Преподаватели', 'Родители', 'Администраторы'],
            datasets: [{
                data: [987, 48, 212, 5],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(243, 156, 18, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(231, 76, 60, 0.7)'
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(243, 156, 18, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(231, 76, 60, 1)'
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

function createRegistrationChart() {
    const ctx = document.getElementById('registrationChart');
    if (!ctx) return;
    
    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            datasets: [{
                label: 'Новые пользователи',
                data: [45, 60, 75, 80, 65, 70, 55, 120, 180, 150, 90, 70],
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

function createActivityChart() {
    const ctx = document.getElementById('activityChart');
    if (!ctx) return;
    
    new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            datasets: [{
                label: 'Активные пользователи',
                data: [850, 920, 810, 930, 1010, 650, 580],
                borderColor: 'rgba(46, 204, 113, 1)',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                tension: 0.3,
                fill: true
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

function createStatusChart() {
    const ctx = document.getElementById('statusChart');
    if (!ctx) return;
    
    new Chart(ctx.getContext('2d'), {
        type: 'pie',
        data: {
            labels: ['Активные', 'Неактивные', 'Ожидают подтверждения'],
            datasets: [{
                data: [1189, 45, 13],
                backgroundColor: [
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(149, 165, 166, 0.7)',
                    'rgba(243, 156, 18, 0.7)'
                ],
                borderColor: [
                    'rgba(46, 204, 113, 1)',
                    'rgba(149, 165, 166, 1)',
                    'rgba(243, 156, 18, 1)'
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