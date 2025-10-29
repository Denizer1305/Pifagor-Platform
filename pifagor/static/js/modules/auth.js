export function initAuth() {
    initPasswordToggle();
}

function initPasswordToggle() {
    window.togglePassword = function(inputId) {
        const input = document.getElementById(inputId);
        if (!input) return;
        
        const icon = input.parentNode.querySelector('.password-toggle i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    };
}