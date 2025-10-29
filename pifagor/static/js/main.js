// Анимация при скролле
// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Анимация появления элементов при скролле
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    observer.observe(element);
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Фильтрация преподавателей
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const teacherCards = document.querySelectorAll('.teacher-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Показываем/скрываем карточки преподавателей
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
});



// FAQ accordion functionality
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

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
    this.reset();
});


// Particle Background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Password visibility toggle
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password', 'confirmPassword');

togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

// Form validation
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    
    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
    }
    
    // Check password length
    if (password.length < 8) {
        alert('Пароль должен содержать не менее 8 символов!');
        return;
    }
    
    // Check if terms are accepted
    if (!terms) {
        alert('Пожалуйста, примите условия использования!');
        return;
    }
    
    // If all validations pass, show success message
    alert(`Регистрация успешно завершена! Добро пожаловать, ${firstName} ${fullName}!`);
    // In a real application, you would submit the form to the server here
});

createParticles();

// Form submission
document.getElementById('resetForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    
    // In a real application, you would send the data to a server here
    // For demonstration, we'll just show a success message
    document.getElementById('successMessage').style.display = 'block';
    
    // Reset form
    this.reset();
    
    // Optionally redirect after a delay
    // setTimeout(() => {
    //     window.location.href = '/frontend/templates/auth/login.html';
    // }, 5000);
});

// Timer functionality
let timeLeft = 300; // 5 minutes in seconds
const countdownElement = document.getElementById('countdown');
const resendButton = document.getElementById('resendCode');

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeLeft > 0) {
        timeLeft--;
        setTimeout(updateTimer, 1000);
    } else {
        resendButton.disabled = false;
        resendButton.innerHTML = '<i class="fas fa-redo"></i> Отправить код повторно';
    }
}

// Start the timer
updateTimer();

// Resend code functionality
resendButton.addEventListener('click', function() {
    if (timeLeft <= 0) {
        // Reset timer
        timeLeft = 300;
        updateTimer();
        resendButton.disabled = true;
        resendButton.innerHTML = '<i class="fas fa-clock"></i> Код отправлен';
        
        // In a real application, you would send a request to resend the code
        alert('Код подтверждения был отправлен повторно на ваш email.');
        
        // Re-enable the button after 30 seconds
        setTimeout(() => {
            resendButton.disabled = false;
            resendButton.innerHTML = '<i class="fas fa-redo"></i> Отправить код повторно';
        }, 30000);
    }
});

// Code input functionality
const codeDigits = document.querySelectorAll('.code-digit');

codeDigits.forEach((digit, index) => {
    digit.addEventListener('input', function() {
        if (this.value.length === 1) {
            if (index < codeDigits.length - 1) {
                codeDigits[index + 1].focus();
            }
        }
    });
    
    digit.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
            codeDigits[index - 1].focus();
        }
    });
});

// Verify code functionality
document.getElementById('verifyCode').addEventListener('click', function() {
    let code = '';
    codeDigits.forEach(digit => {
        code += digit.value;
    });
    
    if (code.length === 6) {
        // In a real application, you would verify the code with the server
        // For demonstration, we'll just show the role selection
        document.getElementById('roleSelection').style.display = 'block';
        document.getElementById('verifyCode').style.display = 'none';
        document.getElementById('resendCode').style.display = 'none';
        document.querySelector('.btn-light').style.display = 'none';
        document.querySelector('.timer-container').style.display = 'none';
        
        // Optionally redirect after a delay
        // setTimeout(() => {
        //     window.location.href = '/frontend/templates/main/dashboard.html';
        // }, 3000);
    } else {
        alert('Пожалуйста, введите полный 6-значный код.');
    }
});


// Simulate email from registration
// In a real application, this would come from the server or URL parameters
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email') || 'user@example.com';
document.getElementById('userEmail').textContent = email;

// Timer functionality for auto-redirect
// let timeLeft = 10;
// const countdownElement = document.getElementById('countdown');
// const secondsElement = document.getElementById('seconds');

// function updateTimer() {
//     countdownElement.textContent = timeLeft.toString().padStart(2, '0');
//     secondsElement.textContent = timeLeft;
    
//     if (timeLeft > 0) {
//         timeLeft--;
//         setTimeout(updateTimer, 1000);
//     } else {
//         Redirect to main page
//         window.location.href = '/frontend/templates/main/index.html';
//     }
// }

// Start the timer
// updateTimer();

// Simulate user data
// In a real application, this would come from the server or session
const userName = "Денис Быков";
const userEmail = "denizer1305@yandex.ru";

document.getElementById('userName').textContent = userName;
document.getElementById('userEmail').textContent = userEmail;

// Generate avatar initials
const nameParts = userName.split(' ');
const initials = nameParts.map(part => part[0]).join('').toUpperCase();