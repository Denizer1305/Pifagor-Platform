export function initValidation() {
    document.addEventListener('DOMContentLoaded', function() {
        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
        inputs.forEach(input => {
            if (!input.classList.contains('form-input')) {
                input.classList.add('form-input');
            }
        });
    });
}