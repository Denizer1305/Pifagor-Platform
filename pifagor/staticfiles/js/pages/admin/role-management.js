// Модуль управления ролями
export function initRoleManagement() {
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
    if (document.getElementById('rolesDistributionChart')) {
        loadChartJS().then(() => {
            initializeCharts();
        });
    }

    // Modal functionality
    const addRoleBtn = document.getElementById('addRoleBtn');
    const addRoleModal = document.getElementById('addRoleModal');
    const closeModal = document.getElementById('closeModal');
    const cancelAdd = document.getElementById('cancelAdd');
    const saveRole = document.getElementById('saveRole');
    
    if (addRoleBtn && addRoleModal) {
        // Open modal
        addRoleBtn.addEventListener('click', function() {
            addRoleModal.classList.add('active');
        });
        
        // Close modal
        function closeAddModal() {
            addRoleModal.classList.remove('active');
        }
        
        if (closeModal) closeModal.addEventListener('click', closeAddModal);
        if (cancelAdd) cancelAdd.addEventListener('click', closeAddModal);
        
        // Save role
        if (saveRole) {
            saveRole.addEventListener('click', function() {
                const roleName = document.getElementById('roleName')?.value;
                const roleKey = document.getElementById('roleKey')?.value;
                const roleDescription = document.getElementById('roleDescription')?.value;
                const roleType = document.getElementById('roleType')?.value;
                
                if (!roleName || !roleKey || !roleDescription) {
                    alert('Пожалуйста, заполните все обязательные поля');
                    return;
                }
                
                // In a real app, we would save the role to the server
                console.log(`Adding role: ${roleName}, ${roleKey}, ${roleDescription}, ${roleType}`);
                
                // Show success message
                alert(`Роль "${roleName}" успешно создана!`);
                
                // Close modal and reset form
                closeAddModal();
                document.getElementById('roleName').value = '';
                document.getElementById('roleKey').value = '';
                document.getElementById('roleDescription').value = '';
                
                // Reset checkboxes
                const checkboxes = document.querySelectorAll('.permissions-checkboxes input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });
            });
        }
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const roleCards = document.querySelectorAll('.role-card');
            
            roleCards.forEach(card => {
                const roleName = card.querySelector('.role-info h3')?.textContent.toLowerCase();
                if (roleName?.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Role filter
    const roleFilter = document.querySelector('.filter-select');
    if (roleFilter) {
        roleFilter.addEventListener('change', function() {
            const selectedFilter = this.value;
            const roleCards = document.querySelectorAll('.role-card');
            
            if (selectedFilter === 'Все роли') {
                roleCards.forEach(card => {
                    card.style.display = 'block';
                });
            } else if (selectedFilter === 'Системные роли') {
                roleCards.forEach(card => {
                    const roleStatus = card.querySelector('.role-status')?.textContent;
                    if (roleStatus === 'Системная роль') {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            } else if (selectedFilter === 'Пользовательские роли') {
                roleCards.forEach(card => {
                    const roleStatus = card.querySelector('.role-status')?.textContent;
                    if (roleStatus === 'Пользовательская роль') {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    }
    
    // Role actions
    const editButtons = document.querySelectorAll('.action-btn:not(.delete)');
    const deleteButtons = document.querySelectorAll('.action-btn.delete');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const roleCard = this.closest('.role-card');
            const roleName = roleCard.querySelector('.role-info h3')?.textContent;
            
            // In a real app, we would open edit modal
            alert(`Редактирование роли: ${roleName}`);
        });
    });
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const roleCard = this.closest('.role-card');
            const roleName = roleCard.querySelector('.role-info h3')?.textContent;
            const roleStatus = roleCard.querySelector('.role-status')?.textContent;
            
            if (roleStatus === 'Системная роль') {
                alert('Системные роли нельзя удалить');
                return;
            }
            
            if (confirm(`Вы уверены, что хотите удалить роль "${roleName}"?`)) {
                // In a real app, we would delete the role
                roleCard.remove();
                alert(`Роль "${roleName}" удалена`);
            }
        });
    });
    
    // Permission matrix toggles
    const permissionChecks = document.querySelectorAll('.permission-check');
    permissionChecks.forEach(check => {
        check.addEventListener('click', function() {
            this.classList.toggle('checked');
        });
    });
}

function initializeCharts() {
    if (typeof Chart === 'undefined') return;
    
    createRolesDistributionChart();
    createRolesActivityChart();
}

function createRolesDistributionChart() {
    const ctx = document.getElementById('rolesDistributionChart');
    if (!ctx) return;
    
    new Chart(ctx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Студенты', 'Преподаватели', 'Родители', 'Администраторы', 'Модераторы', 'Аналитики'],
            datasets: [{
                data: [987, 48, 212, 5, 2, 1],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(243, 156, 18, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(155, 89, 182, 0.7)',
                    'rgba(26, 188, 156, 0.7)'
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(243, 156, 18, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(231, 76, 60, 1)',
                    'rgba(155, 89, 182, 1)',
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

function createRolesActivityChart() {
    const ctx = document.getElementById('rolesActivityChart');
    if (!ctx) return;
    
    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Администраторы', 'Преподаватели', 'Студенты', 'Родители', 'Модераторы', 'Аналитики'],
            datasets: [{
                label: 'Среднее время в системе (часов/неделю)',
                data: [42, 38, 12, 5, 25, 30],
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