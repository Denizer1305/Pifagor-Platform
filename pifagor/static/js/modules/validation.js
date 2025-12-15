/**
 * Validation Manager - унифицированная система валидации для образовательной платформы
 * Включает общую валидацию, валидацию форм, данных, файлов и бизнес-логики
 */

export class ValidationManager {
    constructor() {
        this.rules = new Map();
        this.customValidators = new Map();
        this.errorMessages = new Map();
        this.isActive = false;
        
        // Стандартные правила валидации
        this.initializeDefaultRules();
        this.initializeErrorMessages();
        this.initializeCustomValidators();
    }

    async activate(config = {}) {
        this.isActive = true;
        
        try {
            this.setupGlobalHandlers();
            
            console.log('Validation Manager activated');
        } catch (error) {
            console.error('Error activating Validation Manager:', error);
        }
    }

    deactivate() {
        this.isActive = false;
        this.cleanupGlobalHandlers();
        console.log('Validation Manager deactivated');
    }

    // ===== МЕТОДЫ ДЛЯ ВАЛИДАЦИИ ФОРМ ПРОФИЛЯ =====

    /**
     * Валидация формы личных данных
     */
    validatePersonalForm() {
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        
        let isValid = true;
        const errors = [];
        
        // Сброс предыдущих ошибок
        this.clearValidationErrors();
        
        // Валидация имени
        if (!firstName || !firstName.value.trim()) {
            this.showFieldError(firstName, 'Имя обязательно для заполнения');
            isValid = false;
            errors.push('Имя обязательно для заполнения');
        } else if (firstName.value.trim().length < 2) {
            this.showFieldError(firstName, 'Имя должно содержать минимум 2 символа');
            isValid = false;
            errors.push('Имя должно содержать минимум 2 символа');
        }
        
        // Валидация фамилии
        if (!lastName || !lastName.value.trim()) {
            this.showFieldError(lastName, 'Фамилия обязательна для заполнения');
            isValid = false;
            errors.push('Фамилия обязательна для заполнения');
        } else if (lastName.value.trim().length < 2) {
            this.showFieldError(lastName, 'Фамилия должна содержать минимум 2 символа');
            isValid = false;
            errors.push('Фамилия должна содержать минимум 2 символа');
        }
        
        // Валидация email
        if (!email || !email.value.trim()) {
            this.showFieldError(email, 'Email обязателен для заполнения');
            isValid = false;
            errors.push('Email обязателен для заполнения');
        } else if (!this.isValidEmail(email.value)) {
            this.showFieldError(email, 'Введите корректный email адрес');
            isValid = false;
            errors.push('Введите корректный email адрес');
        }
        
        return {
            isValid: isValid,
            errors: errors,
            fields: {
                firstName: { isValid: !!firstName?.value.trim(), errors: [] },
                lastName: { isValid: !!lastName?.value.trim(), errors: [] },
                email: { isValid: this.isValidEmail(email?.value), errors: [] }
            }
        };
    }

    /**
     * Валидация формы безопасности
     */
    validateSecurityForm() {
        const currentPassword = document.getElementById('currentPassword');
        const newPassword = document.getElementById('newPassword');
        const confirmPassword = document.getElementById('confirmPassword');
        
        let isValid = true;
        const errors = [];
        
        // Сброс предыдущих ошибок
        this.clearValidationErrors();
        
        // Если пользователь пытается сменить пароль
        if ((newPassword && newPassword.value) || (confirmPassword && confirmPassword.value)) {
            if (!currentPassword || !currentPassword.value) {
                this.showFieldError(currentPassword, 'Введите текущий пароль');
                isValid = false;
                errors.push('Введите текущий пароль');
            }
            
            if (newPassword && newPassword.value.length < 8) {
                this.showFieldError(newPassword, 'Пароль должен содержать не менее 8 символов');
                isValid = false;
                errors.push('Пароль должен содержать не менее 8 символов');
            }
            
            if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
                this.showFieldError(confirmPassword, 'Пароли не совпадают');
                isValid = false;
                errors.push('Пароли не совпадают');
            }
        }
        
        return {
            isValid: isValid,
            errors: errors,
            fields: {
                currentPassword: { isValid: !!currentPassword?.value, errors: [] },
                newPassword: { isValid: !newPassword?.value || newPassword.value.length >= 8, errors: [] },
                confirmPassword: { isValid: newPassword?.value === confirmPassword?.value, errors: [] }
            }
        };
    }

    /**
     * Показать ошибку поля
     */
    showFieldError(field, message) {
        if (!field) return;
        
        field.style.borderColor = '#f44336';
        const errorElement = document.createElement('div');
        errorElement.className = 'field-pifagor_error';
        errorElement.textContent = message;
        errorElement.style.cssText = 'color: #f44336; font-size: 12px; margin-top: 5px;';
        field.parentNode.appendChild(errorElement);
    }

    /**
     * Очистка ошибок валидации
     */
    clearValidationErrors() {
        const fields = document.querySelectorAll('.form-control, input, textarea, select');
        fields.forEach(field => {
            field.style.borderColor = '';
        });
        
        const errors = document.querySelectorAll('.field-pifagor_error, .validation-pifagor_error-message');
        errors.forEach(error => error.remove());
    }

    /**
     * Проверка валидности email
     */
    isValidEmail(email) {
        if (!email) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ===== ОСНОВНЫЕ МЕТОДЫ ВАЛИДАЦИИ =====

    // Инициализация стандартных правил
    initializeDefaultRules() {
        // Базовые правила для строк
        this.rules.set('required', (value) => {
            if (value === null || value === undefined || value === '') {
                return false;
            }
            if (Array.isArray(value) && value.length === 0) {
                return false;
            }
            return true;
        });

        this.rules.set('email', (value) => {
            if (!value) return true; // Если пустое, пропускаем (если не required)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        });

        this.rules.set('phone', (value) => {
            if (!value) return true;
            const phoneRegex = /^(\+7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
            return phoneRegex.test(value.replace(/\s/g, ''));
        });

        this.rules.set('minLength', (value, param) => {
            if (!value) return true;
            return String(value).length >= param;
        });

        this.rules.set('maxLength', (value, param) => {
            if (!value) return true;
            return String(value).length <= param;
        });

        this.rules.set('exactLength', (value, param) => {
            if (!value) return true;
            return String(value).length === param;
        });

        // Числовые правила
        this.rules.set('number', (value) => {
            if (!value) return true;
            return !isNaN(parseFloat(value)) && isFinite(value);
        });

        this.rules.set('min', (value, param) => {
            if (!value) return true;
            const num = parseFloat(value);
            return !isNaN(num) && num >= param;
        });

        this.rules.set('max', (value, param) => {
            if (!value) return true;
            const num = parseFloat(value);
            return !isNaN(num) && num <= param;
        });

        this.rules.set('range', (value, params) => {
            if (!value) return true;
            const num = parseFloat(value);
            return !isNaN(num) && num >= params[0] && num <= params[1];
        });

        // Специфичные для платформы правила
        this.rules.set('studentId', (value) => {
            if (!value) return true;
            const studentIdRegex = /^STU\d{6,8}$/i;
            return studentIdRegex.test(value);
        });

        this.rules.set('teacherId', (value) => {
            if (!value) return true;
            const teacherIdRegex = /^TCH\d{6,8}$/i;
            return teacherIdRegex.test(value);
        });

        this.rules.set('courseCode', (value) => {
            if (!value) return true;
            const courseCodeRegex = /^[A-Z]{3,4}\d{3,4}$/;
            return courseCodeRegex.test(value);
        });

        this.rules.set('grade', (value) => {
            if (!value) return true;
            const grade = parseFloat(value);
            return !isNaN(grade) && grade >= 1 && grade <= 5 && grade % 0.5 === 0;
        });

        this.rules.set('password', (value) => {
            if (!value) return true;
            // Минимум 8 символов,至少 одна заглавная, одна строчная, одна цифра
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            return passwordRegex.test(value);
        });

        // Правила для дат
        this.rules.set('date', (value) => {
            if (!value) return true;
            const date = new Date(value);
            return date instanceof Date && !isNaN(date);
        });

        this.rules.set('dateAfter', (value, param) => {
            if (!value) return true;
            const date = new Date(value);
            const compareDate = new Date(param);
            return date > compareDate;
        });

        this.rules.set('dateBefore', (value, param) => {
            if (!value) return true;
            const date = new Date(value);
            const compareDate = new Date(param);
            return date < compareDate;
        });

        // Правила для файлов
        this.rules.set('fileType', (value, allowedTypes) => {
            if (!value) return true;
            if (!(value instanceof File)) return false;
            
            const fileExtension = value.name.split('.').pop().toLowerCase();
            const mimeType = value.type;
            
            return allowedTypes.some(type => {
                if (type.startsWith('.')) {
                    return fileExtension === type.slice(1);
                }
                return mimeType === type;
            });
        });

        this.rules.set('fileSize', (value, maxSize) => {
            if (!value) return true;
            if (!(value instanceof File)) return false;
            
            return value.size <= maxSize;
        });

        // Массивы и коллекции
        this.rules.set('array', (value) => {
            return Array.isArray(value);
        });

        this.rules.set('minItems', (value, param) => {
            if (!value) return true;
            return Array.isArray(value) && value.length >= param;
        });

        this.rules.set('maxItems', (value, param) => {
            if (!value) return true;
            return Array.isArray(value) && value.length <= param;
        });
    }

    // Инициализация сообщений об ошибках
    initializeErrorMessages() {
        this.errorMessages.set('required', 'Поле обязательно для заполнения');
        this.errorMessages.set('email', 'Введите корректный email адрес');
        this.errorMessages.set('phone', 'Введите корректный номер телефона');
        this.errorMessages.set('minLength', 'Минимальная длина: {param} символов');
        this.errorMessages.set('maxLength', 'Максимальная длина: {param} символов');
        this.errorMessages.set('exactLength', 'Должно быть exactly {param} символов');
        this.errorMessages.set('number', 'Введите число');
        this.errorMessages.set('min', 'Минимальное значение: {param}');
        this.errorMessages.set('max', 'Максимальное значение: {param}');
        this.errorMessages.set('range', 'Значение должно быть между {param[0]} и {param[1]}');
        this.errorMessages.set('studentId', 'Неверный формат студенческого ID');
        this.errorMessages.set('teacherId', 'Неверный формат преподавательского ID');
        this.errorMessages.set('courseCode', 'Неверный формат кода курса');
        this.errorMessages.set('grade', 'Оценка должна быть от 1 до 5 с шагом 0.5');
        this.errorMessages.set('password', 'Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы и цифры');
        this.errorMessages.set('date', 'Введите корректную дату');
        this.errorMessages.set('dateAfter', 'Дата должна быть после {param}');
        this.errorMessages.set('dateBefore', 'Дата должна быть до {param}');
        this.errorMessages.set('fileType', 'Недопустимый тип файла. Разрешены: {param}');
        this.errorMessages.set('fileSize', 'Размер файла не должен превышать {param}');
        this.errorMessages.set('array', 'Значение должно быть массивом');
        this.errorMessages.set('minItems', 'Минимальное количество элементов: {param}');
        this.errorMessages.set('maxItems', 'Максимальное количество элементов: {param}');
    }

    // Инициализация кастомных валидаторов
    initializeCustomValidators() {
        // Валидатор для проверки уникальности email (асинхронный)
        this.customValidators.set('uniqueEmail', async (email) => {
            try {
                const response = await fetch(`/api/auth/check-email?email=${encodeURIComponent(email)}`);
                const data = await response.json();
                return !data.exists;
            } catch (error) {
                console.error('Email validation pifagor_error:', error);
                return false;
            }
        });

        // Валидатор для проверки сложности пароля
        this.customValidators.set('passwordStrength', (password) => {
            if (!password) return true;
            
            let score = 0;
            
            // Длина
            if (password.length >= 8) score++;
            if (password.length >= 12) score++;
            
            // Разнообразие символов
            if (/[a-z]/.test(password)) score++;
            if (/[A-Z]/.test(password)) score++;
            if (/[0-9]/.test(password)) score++;
            if (/[^a-zA-Z0-9]/.test(password)) score++;
            
            return score >= 4; // Минимум 4 из 6 баллов
        });

        // Валидатор для даты рождения (минимум 16 лет)
        this.customValidators.set('birthDate', (dateString) => {
            const birthDate = new Date(dateString);
            const today = new Date();
            const minAgeDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
            
            return birthDate <= minAgeDate;
        });

        // Валидатор для учебного года
        this.customValidators.set('academicYear', (year) => {
            const currentYear = new Date().getFullYear();
            return year >= 2000 && year <= currentYear + 1;
        });
    }

    // Основной метод валидации
    validate(value, rules, fieldName = '') {
        const errors = [];
        
        for (const rule of rules) {
            const [ruleName, param] = this.parseRule(rule);
            const validator = this.rules.get(ruleName);
            
            if (!validator) {
                console.warn(`Unknown validation rule: ${ruleName}`);
                continue;
            }
            
            const isValid = validator(value, param);
            
            if (!isValid) {
                const errorMessage = this.getErrorMessage(ruleName, param, fieldName);
                errors.push(errorMessage);
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors,
            field: fieldName,
            value: value
        };
    }

    // Асинхронная валидация
    async validateAsync(value, rules, fieldName = '') {
        const errors = [];
        
        for (const rule of rules) {
            const [ruleName, param] = this.parseRule(rule);
            
            // Проверяем стандартные правила
            const standardValidator = this.rules.get(ruleName);
            if (standardValidator) {
                const isValid = standardValidator(value, param);
                if (!isValid) {
                    const errorMessage = this.getErrorMessage(ruleName, param, fieldName);
                    errors.push(errorMessage);
                }
                continue;
            }
            
            // Проверяем кастомные асинхронные валидаторы
            const asyncValidator = this.customValidators.get(ruleName);
            if (asyncValidator) {
                try {
                    const isValid = await asyncValidator(value, param);
                    if (!isValid) {
                        const errorMessage = this.getErrorMessage(ruleName, param, fieldName);
                        errors.push(errorMessage);
                    }
                } catch (error) {
                    console.error(`Async validation error for ${ruleName}:`, error);
                    errors.push(`Ошибка проверки ${fieldName}`);
                }
            } else {
                console.warn(`Unknown validation rule: ${ruleName}`);
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors,
            field: fieldName,
            value: value
        };
    }

    // Валидация формы
    validateForm(formData, validationSchema) {
        const results = {};
        let isValid = true;
        
        for (const [fieldName, rules] of Object.entries(validationSchema)) {
            const value = formData[fieldName];
            const result = this.validate(value, rules, fieldName);
            
            results[fieldName] = result;
            
            if (!result.isValid) {
                isValid = false;
            }
        }
        
        return {
            isValid: isValid,
            results: results,
            hasErrors: !isValid
        };
    }

    // Асинхронная валидация формы
    async validateFormAsync(formData, validationSchema) {
        const results = {};
        let isValid = true;
        
        for (const [fieldName, rules] of Object.entries(validationSchema)) {
            const value = formData[fieldName];
            const result = await this.validateAsync(value, rules, fieldName);
            
            results[fieldName] = result;
            
            if (!result.isValid) {
                isValid = false;
            }
        }
        
        return {
            isValid: isValid,
            results: results,
            hasErrors: !isValid
        };
    }

    // Парсинг правил валидации
    parseRule(rule) {
        if (typeof rule === 'string') {
            return [rule, null];
        }
        
        if (Array.isArray(rule)) {
            return [rule[0], rule[1]];
        }
        
        if (typeof rule === 'object') {
            return [rule.name, rule.param];
        }
        
        console.warn('Invalid rule format:', rule);
        return [rule, null];
    }

    // Получение сообщения об ошибке
    getErrorMessage(ruleName, param, fieldName) {
        let message = this.errorMessages.get(ruleName) || `Неверное значение для ${fieldName}`;
        
        // Заменяем плейсхолдеры
        if (param !== null && param !== undefined) {
            if (Array.isArray(param)) {
                message = message.replace('{param[0]}', param[0]).replace('{param[1]}', param[1]);
            } else {
                message = message.replace('{param}', param);
            }
        }
        
        return message;
    }

    // Добавление кастомного правила
    addRule(name, validator, errorMessage = null) {
        this.rules.set(name, validator);
        
        if (errorMessage) {
            this.errorMessages.set(name, errorMessage);
        }
        
        return this;
    }

    // Добавление кастомного асинхронного валидатора
    addAsyncValidator(name, validator, errorMessage = null) {
        this.customValidators.set(name, validator);
        
        if (errorMessage) {
            this.errorMessages.set(name, errorMessage);
        }
        
        return this;
    }

    // Добавление кастомного сообщения об ошибке
    addErrorMessage(ruleName, message) {
        this.errorMessages.set(ruleName, message);
        return this;
    }

    // Валидация специфичных для платформы данных
    validateStudentData(studentData) {
        const schema = {
            firstName: ['required', 'minLength:2', 'maxLength:50'],
            lastName: ['required', 'minLength:2', 'maxLength:50'],
            email: ['required', 'email'],
            phone: ['phone'],
            studentId: ['required', 'studentId'],
            birthDate: ['required', 'date', 'birthDate'],
            group: ['required', 'minLength:3', 'maxLength:20']
        };
        
        return this.validateForm(studentData, schema);
    }

    validateTeacherData(teacherData) {
        const schema = {
            firstName: ['required', 'minLength:2', 'maxLength:50'],
            lastName: ['required', 'minLength:2', 'maxLength:50'],
            email: ['required', 'email'],
            phone: ['phone'],
            teacherId: ['required', 'teacherId'],
            department: ['required', 'minLength:3', 'maxLength:100'],
            subjects: ['required', 'array', 'minItems:1']
        };
        
        return this.validateForm(teacherData, schema);
    }

    validateCourseData(courseData) {
        const schema = {
            title: ['required', 'minLength:5', 'maxLength:200'],
            code: ['required', 'courseCode'],
            description: ['maxLength:1000'],
            credits: ['required', 'number', 'range:1,10'],
            duration: ['required', 'number', 'min:1'],
            maxStudents: ['number', 'min:1', 'max:500']
        };
        
        return this.validateForm(courseData, schema);
    }

    validateHomeworkData(homeworkData) {
        const schema = {
            title: ['required', 'minLength:5', 'maxLength:200'],
            description: ['required', 'minLength:10'],
            dueDate: ['required', 'date', 'dateAfter:today'],
            maxScore: ['required', 'number', 'range:1,100'],
            courseId: ['required'],
            assignmentType: ['required']
        };
        
        return this.validateForm(homeworkData, schema);
    }

    validateGradeData(gradeData) {
        const schema = {
            studentId: ['required'],
            courseId: ['required'],
            grade: ['required', 'grade'],
            assignmentId: ['required'],
            comments: ['maxLength:500']
        };
        
        return this.validateForm(gradeData, schema);
    }

    // Валидация файлов
    validateFile(file, rules) {
        const errors = [];
        
        for (const rule of rules) {
            const [ruleName, param] = this.parseRule(rule);
            const validator = this.rules.get(ruleName);
            
            if (!validator) {
                console.warn(`Unknown file validation rule: ${ruleName}`);
                continue;
            }
            
            const isValid = validator(file, param);
            
            if (!isValid) {
                const errorMessage = this.getErrorMessage(ruleName, param, 'файл');
                errors.push(errorMessage);
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors,
            file: file
        };
    }

    // Валидация пароля с проверкой сложности
    validatePassword(password, confirmPassword = null) {
        const rules = ['required', 'minLength:8', 'passwordStrength'];
        const result = this.validate(password, rules, 'пароль');
        
        if (confirmPassword && password !== confirmPassword) {
            result.errors.push('Пароли не совпадают');
            result.isValid = false;
        }
        
        return result;
    }

    // Валидация email с проверкой уникальности
    async validateEmailUnique(email) {
        return await this.validateAsync(email, ['required', 'email', 'uniqueEmail'], 'email');
    }

    // Утилиты для работы с DOM
    setupGlobalHandlers() {
        // Автоматическая валидация форм с data-attributes
        document.addEventListener('submit', this.handleFormSubmit.bind(this));
        document.addEventListener('input', this.handleFieldInput.bind(this));
        document.addEventListener('blur', this.handleFieldBlur.bind(this));
    }

    cleanupGlobalHandlers() {
        document.removeEventListener('submit', this.handleFormSubmit.bind(this));
        document.removeEventListener('input', this.handleFieldInput.bind(this));
        document.removeEventListener('blur', this.handleFieldBlur.bind(this));
    }

    handleFormSubmit(event) {
        const form = event.target;
        if (!form.hasAttribute('data-validate')) return;
        
        event.preventDefault();
        this.validateFormElement(form);
    }

    handleFieldInput(event) {
        const field = event.target;
        if (!field.hasAttribute('data-validate')) return;
        
        this.validateFieldElement(field);
    }

    handleFieldBlur(event) {
        const field = event.target;
        if (!field.hasAttribute('data-validate')) return;
        
        this.validateFieldElement(field);
    }

    // Валидация DOM элемента формы
    validateFormElement(form) {
        const fields = form.querySelectorAll('[data-validate]');
        let isValid = true;
        
        fields.forEach(field => {
            const fieldResult = this.validateFieldElement(field);
            if (!fieldResult.isValid) {
                isValid = false;
            }
        });
        
        if (isValid) {
            form.dispatchEvent(new CustomEvent('validation:success'));
        } else {
            form.dispatchEvent(new CustomEvent('validation:pifagor_error'));
        }
        
        return isValid;
    }

    // Валидация DOM элемента поля
    validateFieldElement(field) {
        const rules = field.getAttribute('data-validate').split(' ');
        const value = field.value;
        const fieldName = field.getAttribute('name') || field.getAttribute('id') || 'field';
        
        const result = this.validate(value, rules, fieldName);
        
        this.displayFieldValidation(field, result);
        
        return result;
    }

    // Отображение результатов валидации в DOM
    displayFieldValidation(field, result) {
        // Удаляем предыдущие сообщения об ошибках
        const existingError = field.parentNode.querySelector('.validation-pifagor_error');
        if (existingError) {
            existingError.remove();
        }
        
        // Удаляем предыдущие классы
        field.classList.remove('validation-pifagor_error', 'validation-success');
        
        if (result.isValid) {
            field.classList.add('validation-success');
        } else {
            field.classList.add('validation-pifagor_error');
            
            // Добавляем сообщение об ошибке
            const errorElement = document.createElement('div');
            errorElement.className = 'validation-pifagor_error-message';
            errorElement.textContent = result.errors[0];
            errorElement.style.cssText = `
                color: #dc3545;
                font-size: 0.875rem;
                margin-top: 0.25rem;
            `;
            
            field.parentNode.appendChild(errorElement);
        }
        
        // Диспатчим событие валидации
        field.dispatchEvent(new CustomEvent('validation:result', {
            detail: result
        }));
    }

    // Генерация схемы валидации из DOM
    generateSchemaFromForm(form) {
        const schema = {};
        const fields = form.querySelectorAll('[data-validate]');
        
        fields.forEach(field => {
            const fieldName = field.getAttribute('name');
            if (fieldName) {
                const rules = field.getAttribute('data-validate').split(' ');
                schema[fieldName] = rules;
            }
        });
        
        return schema;
    }

    // Статистика и утилиты
    getValidationStats() {
        return {
            totalRules: this.rules.size,
            totalCustomValidators: this.customValidators.size,
            totalErrorMessages: this.errorMessages.size
        };
    }

    // Сброс к дефолтным настройкам
    resetToDefaults() {
        this.rules.clear();
        this.customValidators.clear();
        this.errorMessages.clear();
        
        this.initializeDefaultRules();
        this.initializeErrorMessages();
        this.initializeCustomValidators();
    }

    // Экспорт/импорт конфигурации
    exportConfig() {
        return {
            rules: Array.from(this.rules.entries()),
            customValidators: Array.from(this.customValidators.keys()),
            errorMessages: Array.from(this.errorMessages.entries())
        };
    }

    importConfig(config) {
        if (config.rules) {
            this.rules = new Map(config.rules);
        }
        if (config.errorMessages) {
            this.errorMessages = new Map(config.errorMessages);
        }
    }
}

// Глобальный экземпляр для быстрого доступа
window.ValidationManager = new ValidationManager();

// CSS стили для валидации
const validationStyles = `
.validation-success {
    border-color: #28a745 !important;
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25) !important;
}

.validation-error {
    border-color: #dc3545 !important;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
}

.validation-error-message {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.field-error {
    color: #f44336;
    font-size: 12px;
    margin-top: 5px;
}

.validation-hint {
    color: #6c757d;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group.has-error .form-control {
    border-color: #dc3545;
}

.form-group.has-success .form-control {
    border-color: #28a745;
}

.real-time-validation {
    transition: all 0.3s ease;
}
`;

// Добавляем стили в документ
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = validationStyles;
    document.head.appendChild(styleSheet);
}

export default ValidationManager;