// Модуль для функциональности чата с Анастасией
export function initChat() {
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    
    if (!sendButton || !messageInput) return;

    // Отправка сообщения по клику на кнопку
    sendButton.addEventListener('click', sendMessage);
    
    // Отправка сообщения по нажатию Enter
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Автоматическое изменение высоты textarea
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    
    // Прокрутка вниз при загрузке
    scrollToBottom();
}

// Функция для отправки сообщения
export function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();
    
    if (messageText === '') return;
    
    // Добавляем сообщение пользователя
    addMessage(messageText, 'user');
    
    // Очищаем поле ввода
    messageInput.value = '';
    
    // Показываем индикатор набора сообщения
    showTypingIndicator();
    
    // Имитируем ответ Анастасии через 1-2 секунды
    setTimeout(() => {
        removeTypingIndicator();
        const response = generateResponse(messageText);
        addMessage(response, 'anastasia');
        
        // Прокручиваем чат вниз
        scrollToBottom();
    }, 1500);
}

// Функция для добавления сообщения в чат
export function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const now = new Date();
    const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    if (sender === 'anastasia') {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="/frontend/static/assets/image/logo/Anastasia.svg" alt="Анастасия">
            </div>
            <div class="message-content">
                <div class="message-text">${text}</div>
                <div class="message-time">${timeString}</div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${text}</div>
                <div class="message-time">${timeString}</div>
            </div>
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Функция для показа индикатора набора сообщения
export function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <img src="/frontend/static/assets/image/logo/Anastasia.svg" alt="Анастасия">
        </div>
        <div class="message-content">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

// Функция для удаления индикатора набора сообщения
export function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Функция для прокрутки чата вниз
export function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

export function generateResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('привет') || lowerMessage.includes('здравствуй')) {
        return 'Здравствуйте! Рада снова вас видеть. Чем могу помочь?';
    } else if (lowerMessage.includes('тест') || lowerMessage.includes('вопрос')) {
        return 'Я могу помочь вам создать тест по нужной теме. Какие разделы вы хотели бы включить?';
    } else if (lowerMessage.includes('проверить') || lowerMessage.includes('работа')) {
        return 'Для проверки работы, пожалуйста, загрузите файл с заданием, и я проанализирую его.';
    } else if (lowerMessage.includes('python') || lowerMessage.includes('питон')) {
        return 'Python - отличный выбор! Это мощный и понятный язык программирования. По какой теме вам нужна помощь?';
    } else if (lowerMessage.includes('спасибо')) {
        return 'Всегда рада помочь! Если у вас есть еще вопросы, обращайтесь.';
    } else {
        return 'Я поняла ваш вопрос. Давайте обсудим это подробнее. Можете уточнить, что именно вас интересует?';
    }
}

// Функция для быстрых действий
export function quickAction(action) {
    let message = '';
    
    switch(action) {
        case 'variables':
            message = 'Хочу создать тест по переменным и типам данных в Python.';
            break;
        case 'syntax':
            message = 'Нужен тест по базовому синтаксису Python.';
            break;
        case 'functions':
            message = 'Интересует тест по функциям в Python.';
            break;
        case 'all':
            message = 'Создай тест по всем основным темам Python для начинающих.';
            break;
        case 'preview':
            message = 'Да, хочу посмотреть вопросы теста перед сохранением.';
            break;
        case 'save':
            message = 'Сохрани тест, пожалуйста.';
            break;
        case 'modify':
            message = 'Хочу изменить параметры теста.';
            break;
        default:
            message = 'Выбрано быстое действие: ' + action;
    }
    
    addMessage(message, 'user');
    showTypingIndicator();
    
    setTimeout(() => {
        removeTypingIndicator();
        const response = generateQuickActionResponse(action);
        addMessage(response, 'anastasia');
        scrollToBottom();
    }, 1500);
}

export function generateQuickActionResponse(action) {
    switch(action) {
        case 'variables':
            return 'Отлично! Создам тест по переменным и типам данных. Включу вопросы на определение типов, преобразование типов и объявление переменных. Сколько вопросов нужно?';
        case 'syntax':
            return 'Хорошо! Подготовлю тест по базовому синтаксису Python: отступы, комментарии, основные конструкции. Какой уровень сложности предпочтителен?';
        case 'functions':
            return 'Отличный выбор! Функции - важная тема. Включу вопросы на определение функций, параметры, возвращаемые значения и области видимости.';
        case 'all':
            return 'Создам комплексный тест по основным темам Python для начинающих. Включу вопросы по синтаксису, переменным, типам данных, операторам, условиям, циклам и функциям.';
        case 'preview':
            return 'Вот предварительный просмотр теста:\n\n1. Какой тип данных у значения 3.14?\n2. Как объявить переменную в Python?\n3. Что выведет print(2 + 3 * 4)?\n\nХотите что-то изменить?';
        case 'save':
            return 'Тест сохранен! Вы можете найти его в разделе "Мои тесты". Хотите поделиться им со студентами сейчас?';
        case 'modify':
            return 'Какие параметры вы хотите изменить? Количество вопросов, уровень сложности или темы?';
        default:
            return 'Я обработала ваше действие. Чем еще могу помочь?';
    }
}