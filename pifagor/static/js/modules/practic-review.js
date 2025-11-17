export function initPracticReview() {
    // Модальное окно проверки
    const reviewModal = document.getElementById('review-modal');
    const openReviewButtons = document.querySelectorAll('.open-review');
    const closeModalButton = document.getElementById('close-modal');
    const cancelReviewButton = document.getElementById('cancel-review');
    const gradeOptions = document.querySelectorAll('.grade-option');
    const submitReviewButton = document.getElementById('submit-review');
    const saveDraftButton = document.getElementById('save-draft');

    // Открытие модального окна
    openReviewButtons.forEach(button => {
        button.addEventListener('click', function() {
            reviewModal?.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Закрытие модального окна
    function closeModal() {
        reviewModal?.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeModalButton?.addEventListener('click', closeModal);
    cancelReviewButton?.addEventListener('click', closeModal);

    // Закрытие при клике вне модального окна
    reviewModal?.addEventListener('click', function(e) {
        if (e.target === reviewModal) {
            closeModal();
        }
    });

    // Выбор оценки
    gradeOptions.forEach(option => {
        option.addEventListener('click', function() {
            gradeOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Отправка проверки
    submitReviewButton?.addEventListener('click', function() {
        const selectedGrade = document.querySelector('.grade-option.selected');
        if (!selectedGrade) {
            alert('Пожалуйста, выберите оценку');
            return;
        }
        
        const gradeValue = selectedGrade.getAttribute('data-value');
        const comment = document.getElementById('review-comment')?.value;
        
        // В реальном приложении здесь был бы запрос к серверу
        alert(`Задание проверено! Оценка: ${gradeValue}/5`);
        closeModal();
        
        // Обновление статуса карточки
        const card = document.querySelector('.submission-card.pending');
        if (card) {
            card.classList.remove('pending');
            card.classList.add('reviewed');
            const statusElement = card.querySelector('.submission-status');
            if (statusElement) {
                statusElement.textContent = 'Проверено';
                statusElement.className = 'submission-status status-reviewed';
            }
            
            const actions = card.querySelector('.submission-actions');
            if (actions) {
                actions.innerHTML = `
                    <button class="btn btn-light btn-small">
                        <i class="fas fa-eye"></i> Просмотреть
                    </button>
                    <button class="btn btn-success btn-small">
                        <i class="fas fa-check"></i> Оценка: ${gradeValue}/5
                    </button>
                `;
            }
        }
    });

    // Сохранение черновика
    saveDraftButton?.addEventListener('click', function() {
        alert('Черновик сохранен');
    });

    // Фильтрация заданий
    const filters = document.querySelectorAll('.filter-select');
    filters.forEach(filter => {
        filter.addEventListener('change', function() {
            // В реальном приложении здесь была бы фильтрация через AJAX
            console.log('Фильтр изменен:', this.id, this.value);
        });
    });
}