export function initMobileMenu() {
    console.log('Mobile menu initialized');
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const closeButton = document.querySelector('.mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!burgerMenu || !mobileMenu) return;

    const burgerIcon = burgerMenu.querySelector('i');
    
    function toggleMenu() {
        const isExpanded = burgerMenu.getAttribute('aria-expanded') === 'true';
        burgerMenu.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
        
        // Обновляем иконку
        if (!isExpanded) {
            burgerIcon.classList.remove('fa-bars');
            burgerIcon.classList.add('fa-times');
        } else {
            burgerIcon.classList.remove('fa-times');
            burgerIcon.classList.add('fa-bars');
        }
    }
    
    function closeMenu() {
        burgerMenu.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Возвращаем иконку меню
        burgerIcon.classList.remove('fa-times');
        burgerIcon.classList.add('fa-bars');
    }
    
    // Обработчики событий
    burgerMenu.addEventListener('click', toggleMenu);
    if (closeButton) closeButton.addEventListener('click', closeMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
}