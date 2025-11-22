export function initTabs() {
    const tabLinks = document.querySelectorAll('.sidebar-menu a[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    
    function switchTab(tabName) {
        // Скрыть все вкладки
        tabContents.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Показать выбранную вкладку
        const activeTab = document.getElementById(`${tabName}-tab`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // Обновить активное состояние в меню
        tabLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-tab') === tabName) {
                link.classList.add('active');
            }
        });
    }
    
    // Обработчики для ссылок вкладок
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    return { switchTab };
}