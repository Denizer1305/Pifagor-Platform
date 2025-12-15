export function initProfileDataManager() {
    return {
        savePersonalData,
        saveSecuritySettings,
        saveAppearanceSettings,
        loadSavedData
    };
}

function savePersonalData() {
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        birthDate: document.getElementById('birthDate').value,
        bio: document.getElementById('bio').value,
        interests: document.getElementById('interests').value,
        grade: document.getElementById('grade').value,
        school: document.getElementById('school').value
    };
    localStorage.setItem('personalData', JSON.stringify(formData));
}

function saveSecuritySettings() {
    const securityData = {
        twoFactor: document.querySelector('#securityForm input[type="checkbox"]').checked,
        loginNotifications: document.querySelectorAll('#securityForm input[type="checkbox"]')[1].checked
    };
    localStorage.setItem('securitySettings', JSON.stringify(securityData));
}

function saveAppearanceSettings() {
    const appearanceData = {
        theme: localStorage.getItem('selectedTheme') || 'light',
        fontSize: localStorage.getItem('selectedFontSize') || 'medium',
        density: localStorage.getItem('selectedDensity') || 'normal'
    };
    localStorage.setItem('appearanceSettings', JSON.stringify(appearanceData));
}

function loadSavedData() {
    const personalData = JSON.parse(localStorage.getItem('personalData'));
    if (personalData) {
        document.getElementById('firstName').value = personalData.firstName || '';
        document.getElementById('lastName').value = personalData.lastName || '';
        document.getElementById('email').value = personalData.email || '';
        document.getElementById('phone').value = personalData.phone || '';
        document.getElementById('birthDate').value = personalData.birthDate || '';
        document.getElementById('bio').value = personalData.bio || '';
        document.getElementById('interests').value = personalData.interests || '';
        document.getElementById('grade').value = personalData.grade || '';
        document.getElementById('school').value = personalData.school || '';
    }

    const securitySettings = JSON.parse(localStorage.getItem('securitySettings'));
    if (securitySettings) {
        const checkboxes = document.querySelectorAll('#securityForm input[type="checkbox"]');
        checkboxes[0].checked = securitySettings.twoFactor || false;
        checkboxes[1].checked = securitySettings.loginNotifications || false;
    }
}