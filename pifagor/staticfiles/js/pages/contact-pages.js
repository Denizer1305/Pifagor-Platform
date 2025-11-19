// Контактная страница - специфический функционал
export function initMap() {
    if (typeof ymaps === 'undefined') {
        console.warn('Yandex Maps not loaded');
        return;
    }
    
    ymaps.ready(function() {
        const mapElement = document.getElementById('map');
        if (!mapElement) return;

        // Создание карты
        var myMap = new ymaps.Map("map", {
            center: [56.118550, 40.378320],
            zoom: 15,
            controls: ['zoomControl', 'fullscreenControl']
        });
        
        // Создание метки
        var myPlacemark = new ymaps.Placemark([56.118550, 40.378320], {
            hintContent: 'ВлГК им. Д.К.Советкина - Владимирский государственный колледж',
            balloonContentHeader: 'ВлГК им. Д.К.Советкина',
            balloonContentBody: `
                <div style="padding: 10px 0;">
                    <p><strong>Адрес:</strong> г. Владимир, ул. Офицерская, д. 11</p>
                    <p><strong>Телефон:</strong> +7 (800) 555-35-35</p>
                    <p><strong>Режим работы:</strong> Пн-Пт: 8:00-17:00</p>
                </div>
            `,
            balloonContentFooter: 'Основан в 1885 году'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#4A6FA5" d="M16 0C10.477 0 6 4.477 6 10c0 5.523 10 22 10 22s10-16.477 10-22c0-5.523-4.477-10-10-10zm0 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/></svg>'),
            iconImageSize: [32, 32],
            iconImageOffset: [-16, -32]
        });
        
        // Добавление метки на карту
        myMap.geoObjects.add(myPlacemark);
        
        // Открываем балун при загрузке
        myPlacemark.balloon.open();
    });
}

export function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = question.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('active');
            });
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If the clicked question wasn't active, open it
            if (!isActive) {
                answer.classList.add('active');
                item.classList.add('active');
            }
        });
    });
}

export function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }
}