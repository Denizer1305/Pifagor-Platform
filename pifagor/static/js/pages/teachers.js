export function initTeachersPage() {
    initTeachersFilter();
}


function initTeachersFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const teacherCards = document.querySelectorAll('.teacher-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));

            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');

            teacherCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-categories').includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 10);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('visible');
                }
            });
        });
    });
}