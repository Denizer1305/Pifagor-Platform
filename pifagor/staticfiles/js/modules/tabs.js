export function initTabs() {
    const tabLinks = document.querySelectorAll('.sidebar-menu a[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    
    function switchTab(tabName) {
        tabContents.forEach(tab => {
            tab.classList.remove('active');
        });
        
        const activeTab = document.getElementById(`${tabName}-tab`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        tabLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-tab') === tabName) {
                link.classList.add('active');
            }
        });
    }
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    return { switchTab };
}