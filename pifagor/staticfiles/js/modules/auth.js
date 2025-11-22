export function initAuth() {
    initLogin();
    initPasswordReset();
    initEmailVerification();
    initLogout();
    initCreateNewPassword();
    initRegistration();
}

function initLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    const loginElement = document.querySelector('.login');
    if (!loginElement) {
        console.error('Element with class "login" not found');
        return;
    }
    const indexUrl = loginElement.dataset.indexUrl;

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        if (!email || !isValidEmail(email)) {
            showAlert('Ошибка входа', 'Пожалуйста, введите корректный email адрес', 'error');
            return;
        }
        
        if (!password) {
            showAlert('Ошибка входа', 'Пожалуйста, введите пароль', 'error');
            return;
        }
        
        if (password.length < 6) {
            showAlert('Ошибка входа', 'Неверный email или пароль. Проверьте правильность введенных данных', 'error');
            return;
        }
        
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Вход...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showAlert('Вход выполнен!', `Добро пожаловать! Вы успешно вошли в систему.${remember ? ' Ваши данные сохранены.' : ''}`, 'success');
            
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            setTimeout(() => {
                window.location.href = indexUrl;
            }, 2000);
            
        }, 1500);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function getCSRFToken() {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
    return csrfToken ? csrfToken.value : '';
}

function initRegistration() {
    const registerForm = document.querySelector('form#register-form');
    const requirementIds = ['lengthReq', 'uppercaseReq', 'numberReq', 'specialReq'];
    requirementIds.forEach(id => {
        const element = document.getElementById(id);
    });

    function initPasswordToggles() {
        const passwordToggles = document.querySelectorAll('.password-toggle');
        
        passwordToggles.forEach(toggle => {
            const newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);
            
            newToggle.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Password toggle clicked');
                
                const targetId = this.getAttribute('data-target');
                console.log('Target ID:', targetId);
                
                const passwordInput = document.getElementById(targetId);
                
                const currentType = passwordInput.getAttribute('type');
                const newType = currentType === 'password' ? 'text' : 'password';
                
                passwordInput.setAttribute('type', newType);
                
                const icon = this.querySelector('i');
                if (icon) {
                    if (newType === 'password') {
                        icon.className = 'fas fa-eye';
                    } else {
                        icon.className = 'fas fa-eye-slash';
                    }
                }
            });
        });
    }

    initPasswordToggles();

    function checkPasswordStrength(password) {
        let strength = 0;
        const requirements = {
            length: false,
            uppercase: false,
            number: false,
            special: false
        };
        
        if (!password) {
            return { strength: 0, requirements };
        }

        if (password.length >= 8) {
            strength += 25;
            requirements.length = true;
        }
        
        if (/[A-Z]/.test(password)) {
            strength += 25;
            requirements.uppercase = true;
        }
        
        if (/[0-9]/.test(password)) {
            strength += 25;
            requirements.number = true;
        }
        
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            strength += 25;
            requirements.special = true;
        }
        
        return { strength, requirements };
    }

    function checkPasswordMatch() {
        const password1 = document.getElementById('id_password1')?.value || '';
        const password2 = document.getElementById('id_password2')?.value || '';
        const passwordMatch = document.getElementById('passwordMatch');
        
        if (!passwordMatch) return false;
        
        if (password2.length > 0) {
            if (password1 === password2) {
                passwordMatch.style.display = 'block';
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
    
    function updatePasswordRequirements(requirements) {
        const requirementsConfig = {
            'length': { 
                elementId: 'lengthReq', 
                text: 'Не менее 8 символов' 
            },
            'uppercase': { 
                elementId: 'uppercaseReq', 
                text: 'Заглавная буква' 
            },
            'number': { 
                elementId: 'numberReq', 
                text: 'Хотя бы одна цифра' 
            },
            'special': { 
                elementId: 'specialReq', 
                text: 'Специальный символ' 
            }
        };
        
        Object.keys(requirementsConfig).forEach(requirementType => {
            const config = requirementsConfig[requirementType];
            const element = document.getElementById(config.elementId);
            
            const isValid = requirements[requirementType];
            
            if (isValid) {
                element.classList.remove('invalid');
                element.classList.add('valid');
                const currentText = element.textContent || config.text;
                element.innerHTML = '<i class="fas fa-check"></i> ' + currentText.replace(/^.*?(\s|$)/, '');
            } else {
                element.classList.remove('valid');
                element.classList.add('invalid');
                const currentText = element.textContent || config.text;
                element.innerHTML = '<i class="fas fa-times"></i> ' + currentText.replace(/^.*?(\s|$)/, '');
            }

        });
    }
    
    function updatePasswordStrengthBar(strength) {
        const strengthBar = document.getElementById('passwordStrengthBar');
        if (!strengthBar) return;
        
        strengthBar.className = 'password-strength-bar';
        strengthBar.style.width = '0%';
        
        if (strength > 0) {
            if (strength <= 25) {
                strengthBar.classList.add('strength-weak');
                strengthBar.style.width = '25%';
            } else if (strength <= 50) {
                strengthBar.classList.add('strength-fair');
                strengthBar.style.width = '50%';
            } else if (strength <= 75) {
                strengthBar.classList.add('strength-good');
                strengthBar.style.width = '75%';
            } else {
                strengthBar.classList.add('strength-strong');
                strengthBar.style.width = '100%';
            }
        }
    }
    
    function updateSubmitButton() {
        const password1 = document.getElementById('id_password1')?.value || '';
        const password2 = document.getElementById('id_password2')?.value || '';
        const termsCheckbox = document.getElementById('terms');
        const roleSelected = document.querySelector('input[name="role"]:checked');
        const submitButton = registerForm.querySelector('button[type="submit"]');
        
        if (!submitButton) return;
        
        const { requirements } = checkPasswordStrength(password1);
        const passwordsMatch = checkPasswordMatch();
        const termsAccepted = termsCheckbox ? termsCheckbox.checked : false;
        const roleIsSelected = roleSelected !== null;
        
        const allRequirementsMet = requirements.length && requirements.uppercase && 
                                  requirements.number && requirements.special;
        
        const isFormValid = allRequirementsMet && passwordsMatch && 
                           password1.length > 0 && password2.length > 0 && 
                           termsAccepted && roleIsSelected;
        
        if (isFormValid) {
            submitButton.disabled = false;
            submitButton.classList.remove('btn-disabled');
        } else {
            submitButton.disabled = true;
            submitButton.classList.add('btn-disabled');
        }
    }
    
    const password1Input = document.getElementById('id_password1');
    const password2Input = document.getElementById('id_password2');
    const termsCheckbox = document.getElementById('terms');
    const roleInputs = document.querySelectorAll('input[name="role"]');
    
    if (password1Input) {
        password1Input.addEventListener('input', function() {
            const password = this.value;
            const { strength, requirements } = checkPasswordStrength(password);
            
            updatePasswordStrengthBar(strength);
            updatePasswordRequirements(requirements);
            checkPasswordMatch();
            updateSubmitButton();
        });
    }
    
    if (password2Input) {
        password2Input.addEventListener('input', function() {
            checkPasswordMatch();
            updateSubmitButton();
        });
    }
    
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', function() {
            updateSubmitButton();
        });
    }
    
    roleInputs.forEach(input => {
        input.addEventListener('change', function() {
            updateSubmitButton();
        });
    });

registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password1 = document.getElementById('id_password1')?.value || '';
    const password2 = document.getElementById('id_password2')?.value || '';
    const terms = document.getElementById('terms')?.checked || false;
    const roleSelected = document.querySelector('input[name="role"]:checked');
    
    if (password1 !== password2) {
        showAlert('Ошибка', 'Пароли не совпадают!', 'error');
        return;
    }
    
    const { requirements } = checkPasswordStrength(password1);
    const allRequirementsMet = requirements.length && requirements.uppercase && 
                              requirements.number && requirements.special;
    
    if (!allRequirementsMet) {
        showAlert('Ошибка', 'Пароль не соответствует требованиям безопасности!', 'error');
        return;
    }
    
    if (!terms) {
        showAlert('Ошибка', 'Пожалуйста, примите условия использования!', 'error');
        return;
    }
    
    if (!roleSelected) {
        showAlert('Ошибка', 'Пожалуйста, выберите роль!', 'error');
        return;
    }

    const formData = new FormData(registerForm);
    const submitButton = registerForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.textContent = 'Регистрация...';
    submitButton.disabled = true;

    fetch(registerForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': getCSRFToken()
        }
    })
    .then(response => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json().then(data => {
                return { data, status: response.status, ok: response.ok };
            });
        } else {
            throw new Error('Server returned non-JSON response');
        }
    })
    .then(({ data, status, ok }) => {
        console.log('Response data:', data);
        
        if (ok && data.success) {
            showAlert('Успешная регистрация!', 
                     'Ваш аккаунт был успешно создан. Теперь вы можете войти в систему.', 
                     'success', {
                autoClose: 5000,
                onConfirm: () => {
                    window.location.href = data.redirect_url || '/authorization/login/';
                }
            });
        } else {
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
                el.textContent = '';
            });
            
            if (data.errors) {
                let hasFieldErrors = false;
                
                Object.keys(data.errors).forEach(field => {
                    let errorElement;
                    
                    if (field === 'password1' || field === 'id_password1') {
                        errorElement = document.querySelector('#id_password1')?.closest('.form-group')?.querySelector('.error-message');
                    } else if (field === 'password2' || field === 'id_password2') {
                        errorElement = document.querySelector('#id_password2')?.closest('.form-group')?.querySelector('.error-message');
                    } else if (field === 'email' || field === 'id_email') {
                        errorElement = document.querySelector('#id_email')?.closest('.form-group')?.querySelector('.error-message');
                    } else if (field === 'fullname' || field === 'id_fullname') {
                        errorElement = document.querySelector('#id_fullname')?.closest('.form-group')?.querySelector('.error-message');
                    } else if (field === 'role') {
                        errorElement = document.querySelector('.role-selector')?.closest('.form-group')?.querySelector('.error-message');
                    } else if (field === '__all__') {
                        showAlert('Ошибка регистрации', Array.isArray(data.errors[field]) ? data.errors[field][0] : data.errors[field], 'error');
                        return;
                    }
                    
                    if (errorElement) {
                        const errorText = Array.isArray(data.errors[field]) ? data.errors[field][0] : data.errors[field];
                        errorElement.textContent = errorText;
                        errorElement.style.display = 'block';
                        hasFieldErrors = true;
                    }
                });
                if (!hasFieldErrors) {
                    showAlert('Ошибка регистрации', 
                             'Пожалуйста, исправьте ошибки в форме.', 
                             'error');
                }
            } else {
                showAlert('Ошибка регистрации', 
                         'Произошла неизвестная ошибка. Пожалуйста, попробуйте еще раз.', 
                         'error');
            }
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        
        let errorMessage = 'Произошла ошибка при регистрации. ';
        
        if (error.message.includes('non-JSON')) {
            errorMessage += 'Сервер вернул некорректный ответ.';
        } else {
            errorMessage += 'Пожалуйста, попробуйте еще раз.';
        }
        
        showAlert('Ошибка', errorMessage, 'error');
    })
    .finally(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
});

    updateSubmitButton();
    const { strength, requirements } = checkPasswordStrength('');
    updatePasswordStrengthBar(strength);
    updatePasswordRequirements(requirements);
}

function showAlert(title, message, type = 'info', options = {}) {
    const existingAlert = document.querySelector('.alert-overlay');
    if (existingAlert) {
        document.body.removeChild(existingAlert);
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'alert-overlay';
    
    const alertBox = document.createElement('div');
    alertBox.className = `alert-box ${type}`;
    
    const iconEl = document.createElement('div');
    iconEl.className = 'alert-icon';
    
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
    
    alertBox.appendChild(iconEl);
    alertBox.appendChild(titleEl);
    alertBox.appendChild(messageEl);
    
    buttonContainer.appendChild(confirmButton);
    
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
    
    document.body.appendChild(overlay);
    
    confirmButton.focus();
    
    const closeAlert = () => {
        if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
        }
        if (options.onConfirm) options.onConfirm();
    };
    
    confirmButton.onclick = closeAlert;
    
    overlay.onclick = (e) => {
        if (e.target === overlay && !options.disableOverlayClose) {
            closeAlert();
        }
    };
    
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeAlert();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    
    document.addEventListener('keydown', handleEscape);
    
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
        document.getElementById('successMessage').style.display = 'block';
        this.reset();
    });
}

function initEmailVerification() {
    let timeLeft = 300;
    const countdownElement = document.getElementById('countdown');
    const resendButton = document.getElementById('resendCode');
    const verifyButton = document.getElementById('verifyCode');
    const codeDigits = document.querySelectorAll('.code-digit');
    
    if (!countdownElement || !resendButton || !verifyButton) return;

    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email') || 'user@example.com';
    const userEmailElement = document.getElementById('userEmail');
    if (userEmailElement) {
        userEmailElement.textContent = email;
    }

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

    function resendCode() {
        if (timeLeft <= 0) {
            timeLeft = 300;
            updateTimer();
            resendButton.disabled = true;
            resendButton.classList.add('btn-disabled');
            resendButton.innerHTML = '<i class="fas fa-clock"></i> Код отправлен';
            countdownElement.style.color = 'var(--text)';

            showAlert('Код отправлен', `Новый код подтверждения был отправлен на ${email}`, 'info', {
                autoClose: 3000
            });

            setTimeout(() => {
                if (timeLeft > 0) {
                    resendButton.disabled = false;
                    resendButton.classList.remove('btn-disabled');
                    resendButton.innerHTML = '<i class="fas fa-redo"></i> Отправить код повторно';
                }
            }, 30000);
        }
    }

    resendButton.addEventListener('click', resendCode);

    codeDigits.forEach((digit, index) => {
        digit.addEventListener('input', function() {
            if (this.value.length === 1) {
                if (index < codeDigits.length - 1) {
                    codeDigits[index + 1].focus();
                } else {
                    this.blur();
                }
                
                checkCodeCompletion();
            }
            
            this.value = this.value.replace(/[^0-9]/g, '');
        });
        
        digit.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                codeDigits[index - 1].focus();
            }
            
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

    function verifyCode() {
        let code = '';
        codeDigits.forEach(digit => {
            code += digit.value;
        });
        
        if (code.length !== 6) {
            showAlert('Ошибка', 'Пожалуйста, введите полный 6-значный код.', 'error');
            return;
        }

        const originalText = verifyButton.innerHTML;
        verifyButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Проверка...';
        verifyButton.disabled = true;

        setTimeout(() => {
            if (code === '123456') {
                showAlert('Успешная верификация!', 'Ваш email успешно подтвержден. Теперь вы можете пользоваться всеми функциями платформы.', 'success', {
                    autoClose: 3000,
                    onConfirm: () => {
                        window.location.href = '/authorization/login/';
                    }
                });
            } else {
                showAlert('Ошибка', 'Неверный код подтверждения. Пожалуйста, проверьте код и попробуйте снова.', 'error');
                
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

    verifyButton.addEventListener('click', verifyCode);

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

    updateTimer();
    
    if (codeDigits.length > 0) {
        codeDigits[0].focus();
    }
}

function initPasswordResetCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email') || 'user@example.com';
    
    const userEmailElement = document.getElementById('userEmail');
    if (userEmailElement) {
        userEmailElement.textContent = email;
    }
    
    let timeLeft = 300;
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
    
    updateTimer();
    
    if (resendButton) {
        resendButton.addEventListener('click', function() {
            if (timeLeft <= 0) {
                timeLeft = 1800;
                updateTimer();
                resendButton.disabled = true;
                resendButton.innerHTML = '<i class="fas fa-clock"></i> Код отправлен';
                
                showAlert('Код отправлен', 'Новый код подтверждения был отправлен на ваш email', 'info');
            }
        });
    }
    
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
    
    if (verifyButton) {
        verifyButton.addEventListener('click', function() {
            let code = '';
            codeDigits.forEach(digit => {
                code += digit.value;
            });
            
            if (code.length === 6) {
                const originalText = verifyButton.innerHTML;
                verifyButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Проверка...';
                verifyButton.disabled = true;
                
                setTimeout(() => {
                    window.location.href = '/authorization/create-new-password/?email=' + encodeURIComponent(email); // Исправлен путь
                }, 2000);
            } else {
                showAlert('Ошибка', 'Пожалуйста, введите полный 6-значный код', 'error');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.password-reset-code-form')) {
        initPasswordResetCode();
    }
});

function initLogout() {
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
            window.location.href = '/'; 
        }
    }
    
    updateTimer();

    const userName = "Денис Быков";
    const userEmail = "denizer1305@yandex.ru";
    
    document.getElementById('userName').textContent = userName;
    document.getElementById('userEmail').textContent = userEmail;
}

function initCreateNewPassword() {
    const createPasswordForm = document.getElementById('resetPasswordForm');
    if (!createPasswordForm) return;

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

    function checkPasswordStrength(password) {
        let strength = 0;
        const requirements = {
            length: false,
            uppercase: false,
            number: false,
            special: false
        };
        
        if (password.length >= 8) {
            strength += 25;
            requirements.length = true;
        }
        
        if (/[A-Z]/.test(password)) {
            strength += 25;
            requirements.uppercase = true;
        }
        
        if (/[0-9]/.test(password)) {
            strength += 25;
            requirements.number = true;
        }
        
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 25;
            requirements.special = true;
        }
        
        return { strength, requirements };
    }
    
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
    
    if (createPasswordForm) {
        createPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newPassword = newPasswordInput ? newPasswordInput.value : '';
            const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';
            const submitButton = document.getElementById('submitButton');
            
            if (!submitButton) return;
            
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Обновление...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showAlert('Пароль обновлен!', 'Ваш пароль был успешно изменен. Теперь вы можете войти в систему с новым паролем.', 'success', {
                    autoClose: 3000,
                    onConfirm: () => {
                        window.location.href = '/authorization/login/';
                    }
                });
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}