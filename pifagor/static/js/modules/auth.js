export function initAuth() {
    initLogin();
    initRegistration();
    initPasswordReset();
    initEmailVerification();
    initLogout();
    initCreateNewPassword();
}

function initLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Валидация email
        if (!email || !isValidEmail(email)) {
            showAlert('Ошибка входа', 'Пожалуйста, введите корректный email адрес', 'error');
            return;
        }
        
        // Валидация пароля
        if (!password) {
            showAlert('Ошибка входа', 'Пожалуйста, введите пароль', 'error');
            return;
        }
        
        // Имитация проверки учетных данных
        if (password.length < 6) {
            showAlert('Ошибка входа', 'Неверный email или пароль. Проверьте правильность введенных данных', 'error');
            return;
        }
        
        // Показываем загрузку
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Вход...';
        submitButton.disabled = true;
        
        // Имитация запроса к серверу
        setTimeout(() => {
            showAlert('Вход выполнен!', `Добро пожаловать! Вы успешно вошли в систему.${remember ? ' Ваши данные сохранены.' : ''}`, 'success');
            
            // Восстанавливаем кнопку
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Перенаправление на главную страницу через 2 секунды
            setTimeout(() => {
                window.location.href = '/frontend/templates/main/index.html';
            }, 2000);
            
        }, 1500);
    });
}

// Функция валидации email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function initRegistration() {
    const registerForm = document.getElementById('register-form');
    if (!registerForm) return;

    // Password visibility toggle for registration form
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    console.log('Registration elements:', { togglePassword, passwordInput, toggleConfirmPassword, confirmPasswordInput });
    
    // Toggle password visibility
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
            }
            console.log('Toggled password visibility:', type);
        });
    }
    
    if (toggleConfirmPassword && confirmPasswordInput) {
        toggleConfirmPassword.addEventListener('click', function() {
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
            }
            console.log('Toggled confirm password visibility:', type);
        });
    }

    // Password strength checker for registration
    function checkPasswordStrength(password) {
        let strength = 0;
        const requirements = {
            length: false,
            uppercase: false,
            number: false,
            special: false
        };
        
        // Length requirement
        if (password.length >= 8) {
            strength += 25;
            requirements.length = true;
        }
        
        // Uppercase requirement
        if (/[A-Z]/.test(password)) {
            strength += 25;
            requirements.uppercase = true;
        }
        
        // Number requirement
        if (/[0-9]/.test(password)) {
            strength += 25;
            requirements.number = true;
        }
        
        // Special character requirement
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 25;
            requirements.special = true;
        }
        
        return { strength, requirements };
    }
    
    // Update password requirements UI for registration
    function updatePasswordRequirements(requirements) {
        const lengthReq = document.getElementById('lengthReq');
        const uppercaseReq = document.getElementById('uppercaseReq');
        const numberReq = document.getElementById('numberReq');
        const specialReq = document.getElementById('specialReq');
        
        if (lengthReq) {
            if (requirements.length) {
                lengthReq.classList.remove('invalid');
                lengthReq.classList.add('valid');
                lengthReq.innerHTML = '<i class="fas fa-check"></i> Не менее 8 символов';
            } else {
                lengthReq.classList.remove('valid');
                lengthReq.classList.add('invalid');
                lengthReq.innerHTML = '<i class="fas fa-times"></i> Не менее 8 символов';
            }
        }
        
        if (uppercaseReq) {
            if (requirements.uppercase) {
                uppercaseReq.classList.remove('invalid');
                uppercaseReq.classList.add('valid');
                uppercaseReq.innerHTML = '<i class="fas fa-check"></i> Заглавная буква';
            } else {
                uppercaseReq.classList.remove('valid');
                uppercaseReq.classList.add('invalid');
                uppercaseReq.innerHTML = '<i class="fas fa-times"></i> Заглавная буква';
            }
        }
        
        if (numberReq) {
            if (requirements.number) {
                numberReq.classList.remove('invalid');
                numberReq.classList.add('valid');
                numberReq.innerHTML = '<i class="fas fa-check"></i> Хотя бы одна цифра';
            } else {
                numberReq.classList.remove('valid');
                numberReq.classList.add('invalid');
                numberReq.innerHTML = '<i class="fas fa-times"></i> Хотя бы одна цифра';
            }
        }
        
        if (specialReq) {
            if (requirements.special) {
                specialReq.classList.remove('invalid');
                specialReq.classList.add('valid');
                specialReq.innerHTML = '<i class="fas fa-check"></i> Специальный символ';
            } else {
                specialReq.classList.remove('valid');
                specialReq.classList.add('invalid');
                specialReq.innerHTML = '<i class="fas fa-times"></i> Специальный символ';
            }
        }
    }
    
    // Update password strength bar for registration
    function updatePasswordStrengthBar(strength) {
        const strengthBar = document.getElementById('passwordStrengthBar');
        if (!strengthBar) return;
        
        strengthBar.className = 'password-strength-bar';
        
        if (strength <= 25) {
            strengthBar.classList.add('strength-weak');
        } else if (strength <= 50) {
            strengthBar.classList.add('strength-fair');
        } else if (strength <= 75) {
            strengthBar.classList.add('strength-good');
        } else {
            strengthBar.classList.add('strength-strong');
        }
    }
    
    // Check if passwords match for registration
    function checkPasswordMatch() {
        const password = passwordInput ? passwordInput.value : '';
        const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';
        const passwordMatch = document.getElementById('passwordMatch');
        
        if (!passwordMatch) return false;
        
        if (confirmPassword.length > 0) {
            if (password === confirmPassword) {
                passwordMatch.style.display = 'none';
                passwordMatch.innerHTML = '<i class="fas fa-check"></i> Пароли совпадают';
                passwordMatch.classList.remove('invalid');
                passwordMatch.classList.add('valid');
                return true;
            } else {
                passwordMatch.style.display = 'block';
                passwordMatch.innerHTML = '<i class="fas fa-times"></i> Пароли не совпадают';
                passwordMatch.classList.remove('valid');
                passwordMatch.classList.add('invalid');
                return false;
            }
        } else {
            passwordMatch.style.display = 'none';
            return false;
        }
    }
    
    // Enable/disable submit button based on form validity for registration
    function updateSubmitButton() {
        const password = passwordInput ? passwordInput.value : '';
        const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';
        const submitButton = registerForm.querySelector('button[type="submit"]');
        
        if (!submitButton) return;
        
        const { strength, requirements } = checkPasswordStrength(password);
        const passwordsMatch = checkPasswordMatch();
        
        const allRequirementsMet = requirements.length && requirements.uppercase && 
                                  requirements.number && requirements.special;
        
        if (allRequirementsMet && passwordsMatch && password.length > 0 && confirmPassword.length > 0) {
            submitButton.disabled = false;
            submitButton.classList.remove('btn-disabled');
        } else {
            submitButton.disabled = true;
            submitButton.classList.add('btn-disabled');
        }
    }
    
    // Event listeners for password inputs in registration
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const { strength, requirements } = checkPasswordStrength(password);
            
            updatePasswordStrengthBar(strength);
            updatePasswordRequirements(requirements);
            updateSubmitButton();
        });
    }
    
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            checkPasswordMatch();
            updateSubmitButton();
        });
    }

    registerForm.addEventListener('submit', function(e) {
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
            showAlert('Ошибка', 'Пароли не совпадают!', 'error');
            return;
        }
        
        // Check password length
        if (password.length < 8) {
            showAlert('Ошибка', 'Пароль должен содержать не менее 8 символов!', 'error');
            return;
        }
        
        // Check password strength
        const { requirements } = checkPasswordStrength(password);
        const allRequirementsMet = requirements.length && requirements.uppercase && 
                                  requirements.number && requirements.special;
        
        if (!allRequirementsMet) {
            showAlert('Ошибка', 'Пароль не соответствует требованиям безопасности!', 'error');
            return;
        }
        
        // Check if terms are accepted
        if (!terms) {
            showAlert('Внимание', 'Пожалуйста, примите условия использования!', 'warning');
            return;
        }
        
        // Show loading state
        const submitButton = registerForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Регистрация...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showAlert('Регистрация завершена!', `Добро пожаловать, ${firstName} ${fullName}! Ваш аккаунт успешно создан.`, 'success', {
                autoClose: 300000,
                onConfirm: () => {
                    // Redirect to login page
                    window.location.href = '/frontend/templates/auth/login.html';
                }
            });
            
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });

    // Initialize form state
    updateSubmitButton();
}

// Улучшенная функция кастомного alert
function showAlert(title, message, type = 'info', options = {}) {
    // Если уже есть открытый alert, сначала закрываем его
    const existingAlert = document.querySelector('.alert-overlay');
    if (existingAlert) {
        document.body.removeChild(existingAlert);
    }
    
    // Создаем элементы
    const overlay = document.createElement('div');
    overlay.className = 'alert-overlay';
    
    const alertBox = document.createElement('div');
    alertBox.className = `alert-box ${type}`;
    
    const iconEl = document.createElement('div');
    iconEl.className = 'alert-icon';
    
    // Выбираем иконку в зависимости от типа
    switch(type) {
        case 'success':
            iconEl.innerHTML = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            iconEl.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            iconEl.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        default:
            iconEl.innerHTML = '<i class="fas fa-info-circle"></i>';
    }
    
    const titleEl = document.createElement('div');
    titleEl.className = 'alert-title';
    titleEl.textContent = title;
    
    const messageEl = document.createElement('div');
    messageEl.className = 'alert-message';
    messageEl.textContent = message;
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'alert-buttons';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '10px';
    buttonContainer.style.justifyContent = 'center';
    buttonContainer.style.marginTop = '1.5rem';
    
    const confirmButton = document.createElement('button');
    confirmButton.className = 'alert-button';
    confirmButton.textContent = options.confirmText || 'Понятно';
    
    // Собираем структуру
    alertBox.appendChild(iconEl);
    alertBox.appendChild(titleEl);
    alertBox.appendChild(messageEl);
    
    buttonContainer.appendChild(confirmButton);
    
    // Добавляем кнопку отмены если нужно
    if (options.showCancel) {
        const cancelButton = document.createElement('button');
        cancelButton.className = 'alert-button btn-light';
        cancelButton.textContent = options.cancelText || 'Отмена';
        cancelButton.style.background = 'transparent';
        cancelButton.style.border = '2px solid var(--primary)';
        cancelButton.style.color = 'var(--primary)';
        
        cancelButton.onclick = () => {
            document.body.removeChild(overlay);
            if (options.onCancel) options.onCancel();
        };
        
        buttonContainer.appendChild(cancelButton);
    }
    
    alertBox.appendChild(buttonContainer);
    overlay.appendChild(alertBox);
    
    // Добавляем в DOM
    document.body.appendChild(overlay);
    
    // Фокусируем на кнопке для доступности
    confirmButton.focus();
    
    // Обработчик закрытия
    const closeAlert = () => {
        if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
        }
        if (options.onConfirm) options.onConfirm();
    };
    
    confirmButton.onclick = closeAlert;
    
    // Закрытие по клику на оверлей
    overlay.onclick = (e) => {
        if (e.target === overlay && !options.disableOverlayClose) {
            closeAlert();
        }
    };
    
    // Закрытие по клавише Escape
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeAlert();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    // Автозакрытие если указано
    if (options.autoClose) {
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                closeAlert();
            }
        }, options.autoClose);
    }
    
    return {
        close: closeAlert
    };
}

function initPasswordReset() {
    const resetForm = document.getElementById('resetForm');
    if (!resetForm) return;

    resetForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        
        // In a real application, you would send the data to a server here
        document.getElementById('successMessage').style.display = 'block';
        
        // Reset form
        this.reset();
    });
}

function initEmailVerification() {
    // Timer functionality
    let timeLeft = 300; // 5 minutes in seconds
    const countdownElement = document.getElementById('countdown');
    const resendButton = document.getElementById('resendCode');
    const verifyButton = document.getElementById('verifyCode');
    const codeDigits = document.querySelectorAll('.code-digit');
    
    if (!countdownElement || !resendButton || !verifyButton) return;

    // Получаем email из URL или используем значение по умолчанию
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email') || 'user@example.com';
    const userEmailElement = document.getElementById('userEmail');
    if (userEmailElement) {
        userEmailElement.textContent = email;
    }

    // Функция обновления таймера
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft > 0) {
            timeLeft--;
            setTimeout(updateTimer, 1000);
        } else {
            resendButton.disabled = false;
            resendButton.classList.remove('btn-disabled');
            resendButton.innerHTML = '<i class="fas fa-redo"></i> Отправить код повторно';
            countdownElement.textContent = '00:00';
            countdownElement.style.color = 'var(--danger)';
        }
    }

    // Функция для повторной отправки кода
    function resendCode() {
        if (timeLeft <= 0) {
            // Сброс таймера
            timeLeft = 300;
            updateTimer();
            resendButton.disabled = true;
            resendButton.classList.add('btn-disabled');
            resendButton.innerHTML = '<i class="fas fa-clock"></i> Код отправлен';
            countdownElement.style.color = 'var(--text)';

            // Показываем уведомление об отправке
            showAlert('Код отправлен', `Новый код подтверждения был отправлен на ${email}`, 'info', {
                autoClose: 3000
            });

            // В реальном приложении здесь был бы запрос на сервер
            console.log('Resending verification code to:', email);

            // Включаем кнопку через 30 секунд
            setTimeout(() => {
                if (timeLeft > 0) {
                    resendButton.disabled = false;
                    resendButton.classList.remove('btn-disabled');
                    resendButton.innerHTML = '<i class="fas fa-redo"></i> Отправить код повторно';
                }
            }, 30000);
        }
    }

    // Обработчик для кнопки повторной отправки
    resendButton.addEventListener('click', resendCode);

    // Функционал ввода кода
    codeDigits.forEach((digit, index) => {
        digit.addEventListener('input', function() {
            if (this.value.length === 1) {
                // Автопереход к следующему полю
                if (index < codeDigits.length - 1) {
                    codeDigits[index + 1].focus();
                } else {
                    // Если последняя цифра, убираем фокус
                    this.blur();
                }
                
                // Проверяем, заполнен ли весь код
                checkCodeCompletion();
            }
            
            // Валидация - только цифры
            this.value = this.value.replace(/[^0-9]/g, '');
        });
        
        digit.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                codeDigits[index - 1].focus();
            }
            
            // Навигация стрелками
            if (e.key === 'ArrowLeft' && index > 0) {
                codeDigits[index - 1].focus();
            }
            if (e.key === 'ArrowRight' && index < codeDigits.length - 1) {
                codeDigits[index + 1].focus();
            }
        });
        
        digit.addEventListener('paste', function(e) {
            e.preventDefault();
            const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
            if (pasteData.length === 6) {
                for (let i = 0; i < 6; i++) {
                    if (codeDigits[i]) {
                        codeDigits[i].value = pasteData[i] || '';
                    }
                }
                checkCodeCompletion();
                codeDigits[5].focus();
            }
        });
    });

    // Функция проверки заполнения кода
    function checkCodeCompletion() {
        let code = '';
        codeDigits.forEach(digit => {
            code += digit.value;
        });
        
        if (code.length === 6) {
            verifyButton.disabled = false;
            verifyButton.classList.remove('btn-disabled');
        } else {
            verifyButton.disabled = true;
            verifyButton.classList.add('btn-disabled');
        }
    }

    // Функция верификации кода
    function verifyCode() {
        let code = '';
        codeDigits.forEach(digit => {
            code += digit.value;
        });
        
        if (code.length !== 6) {
            showAlert('Ошибка', 'Пожалуйста, введите полный 6-значный код.', 'error');
            return;
        }

        // Показываем состояние загрузки
        const originalText = verifyButton.innerHTML;
        verifyButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Проверка...';
        verifyButton.disabled = true;

        // Имитация запроса к серверу
        setTimeout(() => {
            // В реальном приложении здесь была бы проверка кода на сервере
            if (code === '123456') { // Тестовый код для демонстрации
                showAlert('Успешная верификация!', 'Ваш email успешно подтвержден. Теперь вы можете пользоваться всеми функциями платформы.', 'success', {
                    autoClose: 300000,
                    onConfirm: () => {
                        // Перенаправление после успешной верификации
                        window.location.href = '/frontend/templates/main/dashboard.html';
                    }
                });
            } else {
                showAlert('Ошибка', 'Неверный код подтверждения. Пожалуйста, проверьте код и попробуйте снова.', 'error');
                
                // Сброс полей ввода
                codeDigits.forEach(digit => {
                    digit.value = '';
                });
                codeDigits[0].focus();
                verifyButton.innerHTML = originalText;
                verifyButton.disabled = true;
                verifyButton.classList.add('btn-disabled');
            }
        }, 2000);
    }

    // Обработчик для кнопки подтверждения
    verifyButton.addEventListener('click', verifyCode);

    // Обработчик нажатия Enter в любом поле ввода
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            let code = '';
            codeDigits.forEach(digit => {
                code += digit.value;
            });
            
            if (code.length === 6) {
                verifyCode();
            }
        }
    });

    // Запускаем таймер
    updateTimer();
    
    // Фокусируемся на первом поле ввода
    if (codeDigits.length > 0) {
        codeDigits[0].focus();
    }
}

// Функция для инициализации страницы сброса пароля
function initPasswordResetCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email') || 'user@example.com';
    
    // Обновляем email на странице
    const userEmailElement = document.getElementById('userEmail');
    if (userEmailElement) {
        userEmailElement.textContent = email;
    }
    
    // Таймер обратного отсчета (30 минут)
    let timeLeft = 1800; // 30 минут в секундах
    const countdownElement = document.getElementById('countdown');
    const resendButton = document.getElementById('resendCode');
    
    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        if (countdownElement) {
            countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        if (timeLeft > 0) {
            timeLeft--;
            setTimeout(updateTimer, 1000);
        } else if (resendButton) {
            resendButton.disabled = false;
            resendButton.innerHTML = '<i class="fas fa-redo"></i> Отправить код повторно';
        }
    }
    
    // Запуск таймера
    updateTimer();
    
    // Обработчик повторной отправки кода
    if (resendButton) {
        resendButton.addEventListener('click', function() {
            if (timeLeft <= 0) {
                timeLeft = 1800;
                updateTimer();
                resendButton.disabled = true;
                resendButton.innerHTML = '<i class="fas fa-clock"></i> Код отправлен';
                
                // Показываем уведомление
                showAlert('Код отправлен', 'Новый код подтверждения был отправлен на ваш email', 'info');
            }
        });
    }
    
    // Обработка ввода кода
    const codeDigits = document.querySelectorAll('.code-digit');
    const verifyButton = document.getElementById('verifyCode');
    
    codeDigits.forEach((digit, index) => {
        digit.addEventListener('input', function() {
            if (this.value.length === 1 && index < codeDigits.length - 1) {
                codeDigits[index + 1].focus();
            }
            checkCodeCompletion();
        });
        
        digit.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                codeDigits[index - 1].focus();
            }
        });
    });
    
    function checkCodeCompletion() {
        let code = '';
        codeDigits.forEach(digit => {
            code += digit.value;
        });
        
        if (verifyButton) {
            verifyButton.disabled = code.length !== 6;
        }
    }
    
    // Обработка подтверждения кода
    if (verifyButton) {
        verifyButton.addEventListener('click', function() {
            let code = '';
            codeDigits.forEach(digit => {
                code += digit.value;
            });
            
            if (code.length === 6) {
                // Показываем загрузку
                const originalText = verifyButton.innerHTML;
                verifyButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Проверка...';
                verifyButton.disabled = true;
                
                // Имитация проверки кода
                setTimeout(() => {
                    // Перенаправление на страницу создания нового пароля
                    window.location.href = '/frontend/templates/auth/create-new-password.html?email=' + encodeURIComponent(email);
                }, 2000);
            } else {
                showAlert('Ошибка', 'Пожалуйста, введите полный 6-значный код', 'error');
            }
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.password-reset-code-form')) {
        initPasswordResetCode();
    }
});

function initLogout() {
    // Timer functionality for auto-redirect
    let timeLeft = 10;
    const countdownElement = document.getElementById('countdown');
    const secondsElement = document.getElementById('seconds');
    
    if (!countdownElement || !secondsElement) return;

    function updateTimer() {
        countdownElement.textContent = timeLeft.toString().padStart(2, '0');
        secondsElement.textContent = timeLeft;
        
        if (timeLeft > 0) {
            timeLeft--;
            setTimeout(updateTimer, 1000);
        } else {
            // Redirect to main page
            window.location.href = '/frontend/templates/main/index.html';
        }
    }
    
    // Start the timer
    updateTimer();

    // Simulate user data
    const userName = "Денис Быков";
    const userEmail = "denizer1305@yandex.ru";
    
    document.getElementById('userName').textContent = userName;
    document.getElementById('userEmail').textContent = userEmail;
}

function initCreateNewPassword() {
    const createPasswordForm = document.getElementById('resetPasswordForm');
    if (!createPasswordForm) return;

    // Password visibility toggle
    const toggleNewPassword = document.getElementById('toggleNewPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (toggleNewPassword && newPasswordInput) {
        toggleNewPassword.addEventListener('click', function() {
            const type = newPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            newPasswordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }
    
    if (toggleConfirmPassword && confirmPasswordInput) {
        toggleConfirmPassword.addEventListener('click', function() {
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }

    // Password strength checker
    function checkPasswordStrength(password) {
        let strength = 0;
        const requirements = {
            length: false,
            uppercase: false,
            number: false,
            special: false
        };
        
        // Length requirement
        if (password.length >= 8) {
            strength += 25;
            requirements.length = true;
        }
        
        // Uppercase requirement
        if (/[A-Z]/.test(password)) {
            strength += 25;
            requirements.uppercase = true;
        }
        
        // Number requirement
        if (/[0-9]/.test(password)) {
            strength += 25;
            requirements.number = true;
        }
        
        // Special character requirement
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 25;
            requirements.special = true;
        }
        
        return { strength, requirements };
    }
    
    // Update password requirements UI
    function updatePasswordRequirements(requirements) {
        const lengthReq = document.getElementById('lengthReq');
        const uppercaseReq = document.getElementById('uppercaseReq');
        const numberReq = document.getElementById('numberReq');
        const specialReq = document.getElementById('specialReq');
        
        if (lengthReq && requirements.length) {
            lengthReq.classList.remove('invalid');
            lengthReq.classList.add('valid');
            lengthReq.innerHTML = '<i class="fas fa-check"></i> Не менее 8 символов';
        } else if (lengthReq) {
            lengthReq.classList.remove('valid');
            lengthReq.classList.add('invalid');
            lengthReq.innerHTML = '<i class="fas fa-times"></i> Не менее 8 символов';
        }
        
        if (uppercaseReq && requirements.uppercase) {
            uppercaseReq.classList.remove('invalid');
            uppercaseReq.classList.add('valid');
            uppercaseReq.innerHTML = '<i class="fas fa-check"></i> Заглавная буква';
        } else if (uppercaseReq) {
            uppercaseReq.classList.remove('valid');
            uppercaseReq.classList.add('invalid');
            uppercaseReq.innerHTML = '<i class="fas fa-times"></i> Заглавная буква';
        }
        
        if (numberReq && requirements.number) {
            numberReq.classList.remove('invalid');
            numberReq.classList.add('valid');
            numberReq.innerHTML = '<i class="fas fa-check"></i> Хотя бы одна цифра';
        } else if (numberReq) {
            numberReq.classList.remove('valid');
            numberReq.classList.add('invalid');
            numberReq.innerHTML = '<i class="fas fa-times"></i> Хотя бы одна цифра';
        }
        
        if (specialReq && requirements.special) {
            specialReq.classList.remove('invalid');
            specialReq.classList.add('valid');
            specialReq.innerHTML = '<i class="fas fa-check"></i> Специальный символ';
        } else if (specialReq) {
            specialReq.classList.remove('valid');
            specialReq.classList.add('invalid');
            specialReq.innerHTML = '<i class="fas fa-times"></i> Специальный символ';
        }
    }
    
    // Update password strength bar
    function updatePasswordStrengthBar(strength) {
        const strengthBar = document.getElementById('passwordStrengthBar');
        if (!strengthBar) return;
        
        strengthBar.className = 'password-strength-bar';
        
        if (strength <= 25) {
            strengthBar.classList.add('strength-weak');
        } else if (strength <= 50) {
            strengthBar.classList.add('strength-fair');
        } else if (strength <= 75) {
            strengthBar.classList.add('strength-good');
        } else {
            strengthBar.classList.add('strength-strong');
        }
    }
    
    // Check if passwords match
    function checkPasswordMatch() {
        const newPassword = newPasswordInput ? newPasswordInput.value : '';
        const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';
        const passwordMatch = document.getElementById('passwordMatch');
        
        if (!passwordMatch) return false;
        
        if (confirmPassword.length > 0) {
            if (newPassword === confirmPassword) {
                passwordMatch.style.display = 'none';
                return true;
            } else {
                passwordMatch.style.display = 'block';
                return false;
            }
        } else {
            passwordMatch.style.display = 'none';
            return false;
        }
    }
    
    // Enable/disable submit button based on form validity
    function updateSubmitButton() {
        const newPassword = newPasswordInput ? newPasswordInput.value : '';
        const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';
        const submitButton = document.getElementById('submitButton');
        
        if (!submitButton) return;
        
        const { strength, requirements } = checkPasswordStrength(newPassword);
        const passwordsMatch = checkPasswordMatch();
        
        const allRequirementsMet = requirements.length && requirements.uppercase && 
                                  requirements.number && requirements.special;
        
        if (allRequirementsMet && passwordsMatch && newPassword.length > 0 && confirmPassword.length > 0) {
            submitButton.disabled = false;
            submitButton.classList.remove('btn-disabled');
        } else {
            submitButton.disabled = true;
            submitButton.classList.add('btn-disabled');
        }
    }
    
    // Event listeners for password inputs
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', function() {
            const password = this.value;
            const { strength, requirements } = checkPasswordStrength(password);
            
            updatePasswordStrengthBar(strength);
            updatePasswordRequirements(requirements);
            updateSubmitButton();
        });
    }
    
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            updateSubmitButton();
        });
    }
    
    // Form submission
    if (createPasswordForm) {
        createPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newPassword = newPasswordInput ? newPasswordInput.value : '';
            const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';
            const submitButton = document.getElementById('submitButton');
            
            if (!submitButton) return;
            
            // Show loading state
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Обновление...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showAlert('Пароль обновлен!', 'Ваш пароль был успешно изменен. Теперь вы можете войти в систему с новым паролем.', 'success', {
                    autoClose: 3000,
                    onConfirm: () => {
                        // Redirect to login page
                        window.location.href = '/frontend/templates/auth/login.html';
                    }
                });
                
                // Reset button state (though redirect will happen)
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}