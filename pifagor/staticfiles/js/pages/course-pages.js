import { initCourseCreation } from '../modules/course-creation.js';
import { initCourseDetailManagement } from '../modules/course-detail-management.js';
import { initCourseManagement } from '../modules/course-management.js';
import { initCreateCourseDetailPage } from '../modules/course-editor.js';
import { initCoursePages } from '../modules/courses.js';

export function initCoursesModule() {
    const currentPath = window.location.pathname;
    console.log('Инициализация модуля "Курсы":', currentPath);

    initCoursePages();

    if (currentPath.includes('create-courses.html') || document.getElementById('course-form')) {
        console.log('Обнаружена страница создания курса');
        initCourseCreation();
        initCourseManagement();
    }
    
    if (currentPath.includes('create-course-detail.html')) {
        console.log('Обнаружена страница создания подробной информации о курсе');
        initCreateCourseDetailPage();
        initCourseDetailManagement();
    }
    
    if (currentPath.includes('course-management.html') || 
        currentPath.includes('courses.html') && document.querySelector('.module-card')) {
        console.log('Обнаружена страница управления курсом');
        initCourseManagement();
    }

    initSpecificCourseComponents();
}

function initSpecificCourseComponents() {
    if (document.getElementById('course-form')) {
        initCourseCreation();
    }
    
    if (document.querySelector('.module-card') || document.querySelector('.add-module-btn')) {
        initCourseManagement();
    }
    
    if (document.getElementById('lecture-content') || document.querySelector('.content-tabs')) {
        initCreateCourseDetailPage();
    }
    
    if (document.querySelector('.materials-list') || document.querySelector('.add-lesson-btn')) {
        initCourseDetailManagement();
    }
}

export function createCourseModule(title, description, type = 'theory') {
    return {
        id: Date.now(),
        title,
        description,
        type,
        lessons: [],
        createdAt: new Date().toISOString()
    };
}

export function createCourseLesson(title, type = 'lecture', content = '') {
    return {
        id: Date.now(),
        title,
        type,
        content,
        duration: 0,
        order: 0,
        materials: [],
        createdAt: new Date().toISOString()
    };
}

export function validateCourseData(courseData) {
    const errors = [];
    
    if (!courseData.title || courseData.title.trim().length < 3) {
        errors.push('Название курса должно содержать минимум 3 символа');
    }
    
    if (!courseData.description || courseData.description.trim().length < 10) {
        errors.push('Описание курса должно содержать минимум 10 символов');
    }
    
    if (!courseData.category) {
        errors.push('Необходимо выбрать категорию курса');
    }
    
    if (!courseData.level) {
        errors.push('Необходимо указать уровень сложности');
    }
    
    if (!courseData.duration || courseData.duration < 1) {
        errors.push('Продолжительность курса должна быть положительным числом');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

export function saveCourseDraft(courseData) {
    try {
        const draft = {
            ...courseData,
            savedAt: new Date().toISOString(),
            version: '1.0'
        };
        
        localStorage.setItem('courseDraft', JSON.stringify(draft));
        return true;
    } catch (error) {
        console.error('Ошибка при сохранении черновика:', error);
        return false;
    }
}

export function loadCourseDraft() {
    try {
        const draft = localStorage.getItem('courseDraft');
        return draft ? JSON.parse(draft) : null;
    } catch (error) {
        console.error('Ошибка при загрузке черновика:', error);
        return null;
    }
}

export function clearCourseDraft() {
    try {
        localStorage.removeItem('courseDraft');
        return true;
    } catch (error) {
        console.error('Ошибка при очистке черновика:', error);
        return false;
    }
}


export const CourseUtils = {
    formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        
        if (hours > 0) {
            return mins > 0 ? `${hours}ч ${mins}м` : `${hours}ч`;
        }
        return `${mins}м`;
    },
    
    getLevelText(level) {
        const levels = {
            beginner: 'Начальный',
            intermediate: 'Средний',
            advanced: 'Продвинутый'
        };
        return levels[level] || 'Не указан';
    },
    
    getLessonTypeText(type) {
        const types = {
            lecture: 'Лекция',
            test: 'Тест',
            practice: 'Практика'
        };
        return types[type] || 'Лекция';
    },
    
    isValidYouTubeUrl(url) {
        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        return regex.test(url);
    },
    
    extractYouTubeId(url) {
        const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }
};

if (typeof window !== 'undefined') {
    window.CourseUtils = CourseUtils;
    window.createCourseModule = createCourseModule;
    window.createCourseLesson = createCourseLesson;
}