// js/modules/course-editor.js

// Настройка PDF.js worker
if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
}

export function initCreateCourseDetailPage() {
    initTabs();
    initVideoOptions();
    initEditor();
    initImportFunctionality();
    initPreview();
    initFormSubmission();
    initMaterialsPanel();
    addEditorStyles();
    initToastSystem();
}

function initToastSystem() {
    if (!document.getElementById('toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
}

function showToast(message, type = 'info', duration = 4000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };

    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">
                <i class="${icons[type] || icons.info}"></i>
            </div>
            <div class="toast-message">${message}</div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="toast-progress"></div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        hideToast(toast);
    });

    if (duration > 0) {
        setTimeout(() => {
            hideToast(toast);
        }, duration);
    }

    const progressBar = toast.querySelector('.toast-progress');
    if (progressBar) {
        progressBar.style.animation = `progress ${duration}ms linear`;
    }

    return toast;
}

function hideToast(toast) {
    toast.classList.remove('show');
    toast.classList.add('hide');
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

function initTabs() {
    const contentTabs = document.querySelectorAll('.content-tab');
    const contentPanels = document.querySelectorAll('.content-panel');
    
    contentTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            contentTabs.forEach(t => t.classList.remove('active'));
            contentPanels.forEach(p => p.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`${tabId}-panel`).classList.add('active');
        });
    });
}

function initVideoOptions() {
    const videoOptions = document.querySelectorAll('.video-option');
    const videoTypeInput = document.getElementById('video-type');
    const uploadSection = document.getElementById('upload-section');
    const youtubeSection = document.getElementById('youtube-section');
    
    // Видео теперь необязательно - убираем все required атрибуты
    const videoInput = document.getElementById('lecture-video');
    const youtubeInput = document.getElementById('youtube-url');
    
    if (videoInput) videoInput.removeAttribute('required');
    if (youtubeInput) youtubeInput.removeAttribute('required');
    if (videoTypeInput) videoTypeInput.removeAttribute('required');
    
    videoOptions.forEach(option => {
        option.addEventListener('click', function() {
            videoOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const type = this.getAttribute('data-type');
            if (videoTypeInput) videoTypeInput.value = type;
            
            if (type === 'upload') {
                if (uploadSection) uploadSection.style.display = 'block';
                if (youtubeSection) youtubeSection.style.display = 'none';
            } else {
                if (uploadSection) uploadSection.style.display = 'none';
                if (youtubeSection) youtubeSection.style.display = 'block';
            }
        });
    });
}

function initEditor() {
    const editorButtons = document.querySelectorAll('.editor-button');
    const editorContent = document.getElementById('lecture-content');
    const lectureTextInput = document.getElementById('lecture-text');
    
    if (!editorContent || !lectureTextInput) return;

    let savedSelection = null;
    let linkModal, imageModal;

    function createModals() {
        linkModal = document.createElement('div');
        linkModal.className = 'editor-modal';
        linkModal.innerHTML = `
            <div class="modal-content">
                <h3>Вставка ссылки</h3>
                <div class="form-group">
                    <label for="link-url">URL ссылки:</label>
                    <input type="url" id="link-url" class="form-control" placeholder="https://example.com">
                </div>
                <div class="form-group">
                    <label for="link-text">Текст ссылки:</label>
                    <input type="text" id="link-text" class="form-control" placeholder="Текст ссылки">
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-light" id="link-cancel">Отмена</button>
                    <button type="button" class="btn btn-success" id="link-insert">Вставить</button>
                </div>
            </div>
        `;
        
        imageModal = document.createElement('div');
        imageModal.className = 'editor-modal';
        imageModal.innerHTML = `
            <div class="modal-content">
                <h3>Вставка изображения</h3>
                <div class="form-group">
                    <label>Выберите источник:</label>
                    <div class="image-source-tabs">
                        <button type="button" class="source-tab active" data-source="url">Из URL</button>
                        <button type="button" class="source-tab" data-source="upload">Загрузить файл</button>
                    </div>
                </div>
                <div class="image-source-content">
                    <div class="source-panel active" id="url-panel">
                        <div class="form-group">
                            <label for="image-url">URL изображения:</label>
                            <input type="url" id="image-url" class="form-control" placeholder="https://example.com/image.jpg">
                        </div>
                        <div class="form-group">
                            <label for="image-alt">Альтернативный текст:</label>
                            <input type="text" id="image-alt" class="form-control" placeholder="Описание изображения">
                        </div>
                    </div>
                    <div class="source-panel" id="upload-panel">
                        <div class="form-group">
                            <label>Выберите файл:</label>
                            <div class="file-upload">
                                <input type="file" id="image-file" class="file-upload-input" accept="image/*">
                                <label for="image-file" class="file-upload-label">
                                    <div>
                                        <i class="fas fa-upload"></i>
                                        <span>Загрузите изображение</span>
                                        <span style="font-size: 0.8rem;">Поддерживаются JPG, PNG, GIF, WebP</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="upload-image-alt">Альтернативный текст:</label>
                            <input type="text" id="upload-image-alt" class="form-control" placeholder="Описание изображения">
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-light" id="image-cancel">Отмена</button>
                    <button type="button" class="btn btn-success" id="image-insert">Вставить</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(linkModal);
        document.body.appendChild(imageModal);
        
        setupModalEvents();
    }

    function setupModalEvents() {
        document.addEventListener('click', function(e) {
            if (e.target === linkModal) hideModal(linkModal);
            if (e.target === imageModal) hideModal(imageModal);
        });
        
        const linkCancelBtn = document.getElementById('link-cancel');
        const linkInsertBtn = document.getElementById('link-insert');
        if (linkCancelBtn && linkInsertBtn) {
            linkCancelBtn.addEventListener('click', () => hideModal(linkModal));
            linkInsertBtn.addEventListener('click', insertLink);
        }
        
        const imageCancelBtn = document.getElementById('image-cancel');
        const imageInsertBtn = document.getElementById('image-insert');
        if (imageCancelBtn && imageInsertBtn) {
            imageCancelBtn.addEventListener('click', () => hideModal(imageModal));
            imageInsertBtn.addEventListener('click', insertImage);
        }
        
        const sourceTabs = imageModal.querySelectorAll('.source-tab');
        sourceTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const source = this.getAttribute('data-source');
                
                sourceTabs.forEach(t => t.classList.remove('active'));
                imageModal.querySelectorAll('.source-panel').forEach(p => p.classList.remove('active'));
                
                this.classList.add('active');
                const sourcePanel = document.getElementById(`${source}-panel`);
                if (sourcePanel) sourcePanel.classList.add('active');
            });
        });
        
        const imageFileInput = document.getElementById('image-file');
        if (imageFileInput) {
            imageFileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        console.log('Файл загружен:', file.name);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    function executeEditorCommand(command) {
        saveSelection();
        
        switch(command) {
            case 'bold':
            case 'italic':
            case 'underline':
            case 'insertUnorderedList':
            case 'insertOrderedList':
                document.execCommand(command, false, null);
                break;
                
            case 'createLink':
                showLinkModal();
                break;
                
            case 'insertImage':
                showImageModal();
                break;
                
            case 'code':
                insertCodeBlock();
                break;
        }
        
        editorContent.focus();
        updateHiddenField();
    }

    function showLinkModal() {
        const selection = getSelectionText();
        const linkTextInput = document.getElementById('link-text');
        if (linkTextInput) linkTextInput.value = selection || '';
        showModal(linkModal);
    }

    function showImageModal() {
        showModal(imageModal);
    }

    function insertLink() {
        const linkUrlInput = document.getElementById('link-url');
        const linkTextInput = document.getElementById('link-text');
        
        if (!linkUrlInput || !linkTextInput) return;
        
        const url = linkUrlInput.value.trim();
        const text = linkTextInput.value.trim();
        
        if (!url) {
            showToast('Пожалуйста, введите URL ссылки', 'error', 4000);
            return;
        }
        
        restoreSelection();
        
        if (text) {
            document.execCommand('createLink', false, url);
        } else {
            document.execCommand('insertHTML', false, `<a href="${url}" target="_blank">${url}</a>`);
        }
        
        hideModal(linkModal);
        updateHiddenField();
    }

    function insertImage() {
        const urlPanel = document.getElementById('url-panel');
        const uploadPanel = document.getElementById('upload-panel');
        
        let imageUrl, altText;
        
        if (urlPanel && urlPanel.classList.contains('active')) {
            const imageUrlInput = document.getElementById('image-url');
            const imageAltInput = document.getElementById('image-alt');
            if (imageUrlInput && imageAltInput) {
                imageUrl = imageUrlInput.value.trim();
                altText = imageAltInput.value.trim();
            }
        } else {
            const fileInput = document.getElementById('image-file');
            if (!fileInput || !fileInput.files[0]) {
                showToast('Пожалуйста, выберите файл изображения', 'error', 4000);
                return;
            }
            
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                imageUrl = e.target.result;
                const uploadImageAltInput = document.getElementById('upload-image-alt');
                if (uploadImageAltInput) {
                    altText = uploadImageAltInput.value.trim();
                }
                insertImageElement(imageUrl, altText);
            };
            reader.readAsDataURL(file);
            return;
        }
        
        if (!imageUrl) {
            showToast('Пожалуйста, введите URL изображения', 'error', 4000);
            return;
        }
        
        insertImageElement(imageUrl, altText);
    }

    function insertImageElement(url, alt) {
        restoreSelection();
        
        const img = document.createElement('img');
        img.src = url;
        img.alt = alt || 'Изображение';
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        
        document.execCommand('insertHTML', false, img.outerHTML);
        
        hideModal(imageModal);
        updateHiddenField();
    }

    function insertCodeBlock() {
        restoreSelection();
        
        const selection = getSelectionText();
        if (selection) {
            document.execCommand('formatBlock', false, '<pre>');
            const pre = editorContent.querySelector('pre:last-child');
            if (pre) {
                pre.innerHTML = `<code>${selection}</code>`;
            }
        } else {
            document.execCommand('insertHTML', false, '<pre><code>Введите код здесь...</code></pre>');
        }
        
        updateHiddenField();
    }

    function saveSelection() {
        const sel = window.getSelection();
        if (sel.rangeCount > 0) {
            savedSelection = sel.getRangeAt(0);
        }
    }

    function restoreSelection() {
        if (savedSelection) {
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(savedSelection);
        }
    }

    function getSelectionText() {
        const sel = window.getSelection();
        return sel.toString();
    }

    function showModal(modal) {
        if (modal) {
            modal.style.display = 'flex';
            if (modal === linkModal) {
                const linkUrlInput = document.getElementById('link-url');
                if (linkUrlInput) linkUrlInput.value = '';
                if (!getSelectionText()) {
                    const linkTextInput = document.getElementById('link-text');
                    if (linkTextInput) linkTextInput.value = '';
                }
            } else if (modal === imageModal) {
                const imageUrlInput = document.getElementById('image-url');
                const imageAltInput = document.getElementById('image-alt');
                const imageFileInput = document.getElementById('image-file');
                const uploadImageAltInput = document.getElementById('upload-image-alt');
                
                if (imageUrlInput) imageUrlInput.value = '';
                if (imageAltInput) imageAltInput.value = '';
                if (imageFileInput) imageFileInput.value = '';
                if (uploadImageAltInput) uploadImageAltInput.value = '';
            }
        }
    }

    function hideModal(modal) {
        if (modal) modal.style.display = 'none';
    }

    function updateHiddenField() {
        lectureTextInput.value = editorContent.innerHTML;
    }

    function cleanPastedContent() {
        const elements = editorContent.querySelectorAll('*');
        elements.forEach(el => {
            el.removeAttribute('style');
            el.removeAttribute('class');
            ['id', 'dir', 'lang', 'xmlns'].forEach(attr => {
                el.removeAttribute(attr);
            });
        });
        
        updateHiddenField();
    }

    createModals();
    
    editorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const command = this.getAttribute('data-command');
            executeEditorCommand(command);
        });
    });
    
    editorContent.addEventListener('input', function() {
        updateHiddenField();
    });
    
    editorContent.addEventListener('paste', function(e) {
        setTimeout(() => {
            cleanPastedContent();
        }, 10);
    });
    
    updateHiddenField();
}

function initImportFunctionality() {
    const importWordBtn = document.getElementById('import-word-btn');
    const wordFileInput = document.getElementById('word-file-input');
    const importPdfBtn = document.getElementById('import-pdf-btn');
    const pdfFileInput = document.getElementById('pdf-file-input');
    const importStatus = document.getElementById('import-status');
    const progressBar = document.getElementById('import-progress-bar');
    const progress = document.getElementById('import-progress');
    const editorContent = document.getElementById('lecture-content');
    const lectureTextInput = document.getElementById('lecture-text');

    if (!importWordBtn || !importPdfBtn) return;

    importWordBtn.addEventListener('click', function() {
        if (wordFileInput) wordFileInput.click();
    });

    importPdfBtn.addEventListener('click', function() {
        if (pdfFileInput) pdfFileInput.click();
    });

    if (wordFileInput) {
        wordFileInput.addEventListener('change', handleWordImport);
    }

    if (pdfFileInput) {
        pdfFileInput.addEventListener('change', handlePdfImport);
    }

    function handleWordImport(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.name.match(/\.(docx|doc)$/)) {
            showImportStatus('error', 'Пожалуйста, выберите файл формата .docx или .doc');
            return;
        }

        showImportStatus('info', 'Обработка Word документа...');
        if (progressBar) progressBar.style.display = 'block';
        if (progress) progress.style.width = '30%';

        if (typeof mammoth !== 'undefined') {
            const readFileAsArrayBuffer = (file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        resolve(e.target.result);
                    };
                    reader.onerror = function(e) {
                        reject(e);
                    };
                    reader.readAsArrayBuffer(file);
                });
            };

            readFileAsArrayBuffer(file)
                .then(arrayBuffer => mammoth.convertToHtml({arrayBuffer}))
                .then(function(result) {
                    const html = result.value;
                    if (editorContent) editorContent.innerHTML = html;
                    if (lectureTextInput) lectureTextInput.value = html;
                    
                    if (progress) progress.style.width = '100%';
                    setTimeout(() => {
                        if (progressBar) progressBar.style.display = 'none';
                        showImportStatus('success', 'Word документ успешно импортирован!');
                    }, 500);
                })
                .catch(function(error) {
                    console.error('Ошибка при импорте Word документа:', error);
                    if (progressBar) progressBar.style.display = 'none';
                    showImportStatus('error', 'Ошибка при импорте Word документа. Пожалуйста, попробуйте еще раз.');
                });
        } else {
            showImportStatus('error', 'Библиотека для обработки Word документов не загружена');
        }

        e.target.value = '';
    }

    function handlePdfImport(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.name.match(/\.pdf$/)) {
            showImportStatus('error', 'Пожалуйста, выберите файл формата .pdf');
            return;
        }

        showImportStatus('info', 'Обработка PDF документа...');
        if (progressBar) progressBar.style.display = 'block';
        if (progress) progress.style.width = '10%';

        const fileReader = new FileReader();
        
        fileReader.onload = function() {
            const typedarray = new Uint8Array(this.result);
            
            if (typeof pdfjsLib !== 'undefined') {
                pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
                    let totalPages = pdf.numPages;
                    let pagesProcessed = 0;
                    
                    function extractPageText(pageNum) {
                        return pdf.getPage(pageNum).then(function(page) {
                            return page.getTextContent().then(function(textContentObj) {
                                let pageText = '';
                                textContentObj.items.forEach(function(textItem) {
                                    pageText += textItem.str + ' ';
                                });
                                return pageText;
                            });
                        });
                    }
                    
                    let pagePromises = [];
                    for (let i = 1; i <= totalPages; i++) {
                        pagePromises.push(extractPageText(i));
                    }
                    
                    Promise.all(pagePromises).then(function(pagesText) {
                        const textContent = pagesText.join('\n\n');
                        const formattedText = formatPdfText(textContent);
                        
                        if (editorContent) editorContent.innerHTML = formattedText;
                        if (lectureTextInput) lectureTextInput.value = formattedText;
                        
                        if (progress) progress.style.width = '100%';
                        setTimeout(() => {
                            if (progressBar) progressBar.style.display = 'none';
                            showImportStatus('success', `PDF документ успешно импортирован! Обработано ${totalPages} страниц.`);
                        }, 500);
                    });
                    
                    const updateProgress = function() {
                        pagesProcessed++;
                        const progressPercent = 10 + (pagesProcessed / totalPages) * 90;
                        if (progress) progress.style.width = `${progressPercent}%`;
                    };
                    
                    pagePromises.forEach(promise => {
                        promise.then(updateProgress);
                    });
                    
                }).catch(function(error) {
                    console.error('Ошибка при обработке PDF:', error);
                    if (progressBar) progressBar.style.display = 'none';
                    showImportStatus('error', 'Ошибка при импорте PDF документа. Пожалуйста, попробуйте еще раз.');
                });
            } else {
                showImportStatus('error', 'Библиотека для обработки PDF не загружена');
            }
        };
        
        fileReader.readAsArrayBuffer(file);
        e.target.value = '';
    }

    function showImportStatus(type, message) {
        if (importStatus) {
            importStatus.textContent = message;
            importStatus.className = 'import-status ' + type;
        }
    }

    function formatPdfText(text) {
        let lines = text.split('\n');
        let formattedLines = [];
        
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();
            if (!line) continue;
            
            if (line.length < 100 && 
                line === line.toUpperCase() && 
                !line.endsWith('.') && 
                !line.endsWith(',') && 
                !line.match(/\d/)) {
                formattedLines.push(`<h3>${line}</h3>`);
            } else if (line.length < 150 && 
                     line[0] === line[0].toUpperCase() && 
                     !line.endsWith('.') && 
                     !line.endsWith(',')) {
                formattedLines.push(`<h4>${line}</h4>`);
            } else {
                let sentences = line.split('. ');
                for (let j = 0; j < sentences.length; j++) {
                    let sentence = sentences[j].trim();
                    if (sentence) {
                        if (!sentence.endsWith('.') && j < sentences.length - 1) {
                            sentence += '.';
                        }
                        formattedLines.push(`<p>${sentence}</p>`);
                    }
                }
            }
        }
        
        return formattedLines.join('\n');
    }
}

function initPreview() {
    const titleInput = document.getElementById('lecture-title');
    const descInput = document.getElementById('lecture-desc');
    const durationInput = document.getElementById('lecture-duration');
    const orderInput = document.getElementById('lecture-order');
    
    const previewTitle = document.getElementById('preview-title');
    const previewDesc = document.getElementById('preview-desc');
    const previewDuration = document.getElementById('preview-duration');
    const previewOrder = document.getElementById('preview-order');
    
    if (titleInput && previewTitle) {
        titleInput.addEventListener('input', function() {
            previewTitle.textContent = this.value || 'Название лекции';
        });
    }
    
    if (descInput && previewDesc) {
        descInput.addEventListener('input', function() {
            previewDesc.textContent = this.value || 'Описание лекции появится здесь';
        });
    }
    
    if (durationInput && previewDuration) {
        durationInput.addEventListener('input', function() {
            if (this.value) {
                previewDuration.textContent = `Время: ${this.value} мин.`;
            } else {
                previewDuration.textContent = 'Время: -';
            }
        });
    }
    
    if (orderInput && previewOrder) {
        orderInput.addEventListener('input', function() {
            if (this.value) {
                previewOrder.textContent = `Порядок: ${this.value}`;
            } else {
                previewOrder.textContent = 'Порядок: -';
            }
        });
    }
}

function validateForm() {
    const title = document.getElementById('lecture-title').value.trim();
    const description = document.getElementById('lecture-desc').value.trim();
    const duration = document.getElementById('lecture-duration').value;
    const order = document.getElementById('lecture-order').value;
    const content = document.getElementById('lecture-text').value.trim();
    
    if (!title) {
        showToast('Пожалуйста, введите название лекции', 'error', 4000);
        return false;
    }
    
    if (!description) {
        showToast('Пожалуйста, введите описание лекции', 'error', 4000);
        return false;
    }
    
    if (!duration || duration < 1) {
        showToast('Пожалуйста, укажите корректную продолжительность лекции', 'error', 4000);
        return false;
    }
    
    if (!order || order < 1) {
        showToast('Пожалуйста, укажите корректный порядковый номер', 'error', 4000);
        return false;
    }
    
    if (!content || content === '<p>Введите содержание лекции здесь...</p><p>Вы можете использовать различные форматирования, списки, добавлять изображения и код.</p>') {
        showToast('Пожалуйста, добавьте содержание лекции', 'error', 4000);
        return false;
    }
    
    return true;
}

function resetForm() {
    const form = document.getElementById('lecture-form');
    const editorContent = document.getElementById('lecture-content');
    const previewTitle = document.getElementById('preview-title');
    const previewDesc = document.getElementById('preview-desc');
    const previewDuration = document.getElementById('preview-duration');
    const previewOrder = document.getElementById('preview-order');
    
    if (form) form.reset();
    if (editorContent) editorContent.innerHTML = '<p>Введите содержание лекции здесь...</p><p>Вы можете использовать различные форматирования, списки, добавлять изображения и код.</p>';
    
    if (previewTitle) previewTitle.textContent = 'Название лекции';
    if (previewDesc) previewDesc.textContent = 'Описание лекции появится здесь';
    if (previewDuration) previewDuration.textContent = 'Время: -';
    if (previewOrder) previewOrder.textContent = 'Порядок: -';
    
    // Сбрасываем тип видео к загрузке
    const uploadOption = document.querySelector('.video-option[data-type="upload"]');
    if (uploadOption) uploadOption.click();
}

function loadDraft() {
    const draft = localStorage.getItem('lectureDraft');
    if (draft) {
        try {
            const formData = JSON.parse(draft);
            
            document.getElementById('lecture-title').value = formData.title || '';
            document.getElementById('lecture-desc').value = formData.description || '';
            document.getElementById('lecture-duration').value = formData.duration || '';
            document.getElementById('lecture-order').value = formData.order || '';
            document.getElementById('lecture-text').value = formData.content || '';
            
            const editorContent = document.getElementById('lecture-content');
            if (editorContent && formData.content) {
                editorContent.innerHTML = formData.content;
            }
            
            if (formData.videoType === 'youtube') {
                const youtubeOption = document.querySelector('.video-option[data-type="youtube"]');
                if (youtubeOption) youtubeOption.click();
                document.getElementById('youtube-url').value = formData.youtubeUrl || '';
            }
            
            initPreview();
            
            console.log('Черновик загружен');
        } catch (error) {
            console.error('Ошибка при загрузке черновика:', error);
        }
    }
}

function initFormSubmission() {
    const form = document.getElementById('lecture-form');
    const saveDraftBtn = document.querySelector('.form-actions .btn-light');
    
    // Отключаем стандартную валидацию браузера
    if (form) {
        form.setAttribute('novalidate', 'novalidate');
    }
    
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const formData = {
                title: document.getElementById('lecture-title').value,
                description: document.getElementById('lecture-desc').value,
                duration: document.getElementById('lecture-duration').value,
                order: document.getElementById('lecture-order').value,
                videoType: document.getElementById('video-type').value,
                content: document.getElementById('lecture-text').value,
                youtubeUrl: document.getElementById('youtube-url').value || '',
                videoFile: document.getElementById('lecture-video').files[0] ? 'загружено' : null
            };
            
            localStorage.setItem('lectureDraft', JSON.stringify(formData));
            
            showToast('Черновик успешно сохранен!', 'success', 3000);
        });
    }
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Создание...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showToast('Лекция успешно создана!', 'success', 5000);
                
                resetForm();
                
                localStorage.removeItem('lectureDraft');
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    loadDraft();
}

function initMaterialsPanel() {
    const materialsList = document.querySelector('.materials-list');
    const addMaterialBtn = document.querySelector('#materials-panel .btn-light');
    
    if (!materialsList || !addMaterialBtn) return;
    
    materialsList.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-danger') || e.target.closest('.btn-danger')) {
            const materialItem = e.target.closest('.material-item');
            if (materialItem) {
                if (confirm('Вы уверены, что хотите удалить этот материал?')) {
                    materialItem.remove();
                }
            }
        }
        
        if (e.target.classList.contains('btn-light') || e.target.closest('.btn-light')) {
            const materialItem = e.target.closest('.material-item');
            if (materialItem) {
                showToast('Функция редактирования материалов будет реализована в будущем', 'info', 3000);
            }
        }
    });
    
    addMaterialBtn.addEventListener('click', function() {
        const newMaterial = document.createElement('div');
        newMaterial.className = 'material-item';
        newMaterial.innerHTML = `
            <div class="material-icon">
                <i class="far fa-file-pdf"></i>
            </div>
            <div class="material-info">
                <div class="material-title">Новый материал</div>
                <div class="material-meta">PDF • 0 MB</div>
            </div>
            <div class="material-actions">
                <button type="button" class="btn btn-small btn-light">Редактировать</button>
                <button type="button" class="btn btn-small btn-danger">Удалить</button>
            </div>
        `;
        materialsList.appendChild(newMaterial);
        
        showToast('Новый материал добавлен. В реальном приложении здесь будет загрузка файла.', 'info', 4000);
    });
}

function addEditorStyles() {
    const editorStyles = `
        .editor-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            align-items: center;
            justify-content: center;
        }
        
        .editor-modal .modal-content {
            background: white;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .editor-modal h3 {
            margin-bottom: 20px;
            color: var(--primary);
            text-align: center;
        }
        
        .editor-modal .form-group {
            margin-bottom: 20px;
        }
        
        .editor-modal label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: var(--primary);
        }
        
        .modal-actions {
            display: flex;
            gap: 15px;
            justify-content: flex-end;
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }
        
        .image-source-tabs {
            display: flex;
            border-bottom: 1px solid #ddd;
            margin-bottom: 15px;
        }
        
        .source-tab {
            padding: 10px 20px;
            background: none;
            border: none;
            cursor: pointer;
            border-bottom: 3px solid transparent;
            transition: all 0.3s;
            color: var(--secondary);
        }
        
        .source-tab.active {
            color: var(--accent);
            border-bottom-color: var(--accent);
            font-weight: bold;
        }
        
        .source-panel {
            display: none;
        }
        
        .source-panel.active {
            display: block;
        }
        
        #lecture-content pre {
            background: #f5f5f5;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            margin: 10px 0;
            overflow-x: auto;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        
        #lecture-content code {
            background: #f5f5f5;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        
        #lecture-content pre code {
            background: none;
            padding: 0;
        }
        
        #lecture-content img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 10px 0;
        }
        
        #lecture-content a {
            color: var(--accent);
            text-decoration: underline;
        }
        
        #lecture-content ul, #lecture-content ol {
            margin: 10px 0;
            padding-left: 30px;
        }
        
        #lecture-content li {
            margin: 5px 0;
        }
        
        .import-status {
            padding: 10px;
            border-radius: 4px;
            margin: 10px 0;
            font-size: 0.9em;
        }
        
        .import-status.info {
            background-color: #e3f2fd;
            color: #1565c0;
            border: 1px solid #bbdefb;
        }
        
        .import-status.success {
            background-color: #e8f5e9;
            color: #2e7d32;
            border: 1px solid #c8e6c9;
        }
        
        .import-status.error {
            background-color: #ffebee;
            color: #c62828;
            border: 1px solid #ffcdd2;
        }
        
        .progress-bar {
            width: 100%;
            height: 6px;
            background-color: #f0f0f0;
            border-radius: 3px;
            margin: 10px 0;
            overflow: hidden;
            display: none;
        }
        
        .progress {
            height: 100%;
            background: linear-gradient(90deg, var(--accent), var(--primary));
            border-radius: 3px;
            transition: width 0.3s ease;
            width: 0%;
        }
        
        .toast-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 400px;
        }
        
        .toast {
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            border-left: 4px solid;
        }
        
        .toast.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .toast.hide {
            transform: translateX(400px);
            opacity: 0;
        }
        
        .toast-success {
            border-left-color: #10b981;
        }
        
        .toast-error {
            border-left-color: #ef4444;
        }
        
        .toast-warning {
            border-left-color: #f59e0b;
        }
        
        .toast-info {
            border-left-color: #3b82f6;
        }
        
        .toast-content {
            display: flex;
            align-items: center;
            padding: 16px;
            position: relative;
        }
        
        .toast-icon {
            margin-right: 12px;
            font-size: 1.5em;
            flex-shrink: 0;
        }
        
        .toast-success .toast-icon {
            color: #10b981;
        }
        
        .toast-error .toast-icon {
            color: #ef4444;
        }
        
        .toast-warning .toast-icon {
            color: #f59e0b;
        }
        
        .toast-info .toast-icon {
            color: #3b82f6;
        }
        
        .toast-message {
            flex: 1;
            font-weight: 500;
            color: #374151;
            font-size: 0.95em;
            line-height: 1.4;
        }
        
        .toast-close {
            background: none;
            border: none;
            color: #9ca3af;
            cursor: pointer;
            padding: 4px;
            margin-left: 8px;
            border-radius: 4px;
            transition: all 0.2s;
            flex-shrink: 0;
        }
        
        .toast-close:hover {
            background: #f3f4f6;
            color: #6b7280;
        }
        
        .toast-progress {
            height: 3px;
            width: 100%;
            background: rgba(0, 0, 0, 0.1);
            position: relative;
        }
        
        .toast-progress::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            transform-origin: left;
            animation: progress linear;
        }
        
        .toast-success .toast-progress::before {
            background: linear-gradient(90deg, #10b981, #34d399);
        }
        
        .toast-error .toast-progress::before {
            background: linear-gradient(90deg, #ef4444, #f87171);
        }
        
        .toast-warning .toast-progress::before {
            background: linear-gradient(90deg, #f59e0b, #fbbf24);
        }
        
        .toast-info .toast-progress::before {
            background: linear-gradient(90deg, #3b82f6, #60a5fa);
        }
        
        @keyframes progress {
            0% {
                transform: scaleX(1);
            }
            100% {
                transform: scaleX(0);
            }
        }
        
        .fa-spin {
            animation: fa-spin 1s infinite linear;
        }
        
        @keyframes fa-spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        
        @media (max-width: 768px) {
            .toast-container {
                top: 10px;
                right: 10px;
                left: 10px;
                max-width: none;
            }
            
            .toast {
                transform: translateY(-100px);
            }
            
            .toast.show {
                transform: translateY(0);
            }
            
            .toast.hide {
                transform: translateY(-100px);
            }
        }
    `;

    if (!document.querySelector('#editor-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'editor-styles';
        styleSheet.textContent = editorStyles;
        document.head.appendChild(styleSheet);
    }
}