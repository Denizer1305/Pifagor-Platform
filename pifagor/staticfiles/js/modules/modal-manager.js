// js/modules/modal-manager.js
export class ModalManager {
    constructor() {
        this.modals = new Map();
        this.init();
    }

    init() {
        // Закрытие модальных окон по клику вне контента
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.hide(e.target.id);
            }
        });

        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideAll();
            }
        });
    }

    register(modalId, options = {}) {
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.warn(`Modal with id ${modalId} not found`);
            return false;
        }

        this.modals.set(modalId, {
            element: modal,
            options
        });

        // Добавляем обработчики для кнопок закрытия внутри модального окна
        const closeButtons = modal.querySelectorAll('[data-modal-close]');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.hide(modalId));
        });

        return true;
    }

    show(modalId) {
        const modalData = this.modals.get(modalId);
        if (!modalData) {
            console.error(`Modal ${modalId} not registered`);
            return false;
        }

        const modal = modalData.element;
        modal.style.display = 'flex';
        
        // Анимация появления
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);

        // Блокируем прокрутку body
        document.body.style.overflow = 'hidden';

        return true;
    }

    hide(modalId) {
        const modalData = this.modals.get(modalId);
        if (!modalData) return false;

        const modal = modalData.element;
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);

        return true;
    }

    hideAll() {
        this.modals.forEach((modalData, modalId) => {
            this.hide(modalId);
        });
    }

    // Динамическое создание модального окна
    createModal(modalId, content, options = {}) {
        if (this.modals.has(modalId)) {
            console.warn(`Modal ${modalId} already exists`);
            return false;
        }

        const modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal-overlay';
        modal.innerHTML = content;

        document.body.appendChild(modal);
        return this.register(modalId, options);
    }
}

// Создаем глобальный экземпляр
export const modalManager = new ModalManager();