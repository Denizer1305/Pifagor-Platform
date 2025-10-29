export function initAuthPages() {
    initRegistrationValidation();
    initLogoutTimer();
}

function initRegistrationValidation() {
    const registerForm = document.getElementById('register-form');
    if (!registerForm) return;
    
    registerForm.addEventListener('submit', function(e) {
        const password = document.getElementById('{{ form.password.id_for_label }}');
        const confirmPassword = document.getElementById('{{ form.password_confirm.id_for_label }}');
        const terms = document.getElementById('terms');
        
        if (password && confirmPassword && password.value !== confirmPassword.value) {
            e.preventDefault();
            alert('Пароли не совпадают!');
            return;
        }
        
        if (password && password.value.length < 8) {
            e.preventDefault();
            alert('Пароль должен содержать не менее 8 символов!');
            return;
        }
        
        if (terms && !terms.checked) {
            e.preventDefault();
            alert('Пожалуйста, примите условия использования!');
            return;
        }
    });
}

function initLogoutTimer() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    let timeLeft = 10;
    
    function updateTimer() {
        countdownElement.textContent = timeLeft.toString().padStart(2, '0');
        const secondsElement = document.getElementById('seconds');
        if (secondsElement) {
            secondsElement.textContent = timeLeft;
        }
        
        if (timeLeft > 0) {
            timeLeft--;
            setTimeout(updateTimer, 1000);
        } else {
            window.location.href = "/";
        }
    }
    updateTimer();
}