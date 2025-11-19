export function initExport() {
    const exportScheduleBtn = document.getElementById('exportScheduleBtn');
    const exportScheduleModal = document.getElementById('exportScheduleModal');
    const cancelScheduleExport = document.getElementById('cancelScheduleExport');
    const confirmScheduleExport = document.getElementById('confirmScheduleExport');
    const exportContent = document.getElementById('exportContent');
    const printContent = document.getElementById('printContent');
    const exportDate = document.getElementById('exportDate');
    const exportTeacher = document.getElementById('exportTeacher');
    const exportPeriod = document.getElementById('exportPeriod');
    const exportScheduleView = document.getElementById('exportScheduleView');
    const exportEventsBody = document.getElementById('exportEventsBody');
    const exportUpcomingBody = document.getElementById('exportUpcomingBody');
    const exportScheduleLoading = document.getElementById('exportScheduleLoading');
    
    function setExportData() {
        const now = new Date();
        exportDate.textContent = now.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        exportTeacher.textContent = userName;
        
        if (currentView === 'month') {
            const monthNames = [
                'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
            ];
            exportPeriod.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        } else if (currentView === 'week') {
            const weekStart = new Date(currentDate);
            weekStart.setDate(currentDate.getDate() - currentDate.getDay() + 1);
            
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            
            const monthNames = [
                'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
            ];
            
            exportPeriod.textContent = `${weekStart.getDate()} ${monthNames[weekStart.getMonth()]} - ${weekEnd.getDate()} ${monthNames[weekEnd.getMonth()]} ${weekEnd.getFullYear()}`;
        } else if (currentView === 'day') {
            const monthNames = [
                'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
            ];
            const dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
            
            exportPeriod.textContent = `${dayNames[currentDate.getDay()]}, ${currentDate.getDate()} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        }
    }

    async function prepareExportContent() {
        return new Promise((resolve) => {
            exportContent.style.display = 'block';
            
            let currentViewElement;
            if (currentView === 'month') {
                currentViewElement = document.querySelector('.month-view');
            } else if (currentView === 'week') {
                currentViewElement = document.querySelector('.week-view');
            } else if (currentView === 'day') {
                currentViewElement = document.querySelector('.day-view');
            }
            
            if (currentViewElement) {
                exportScheduleView.innerHTML = '';
                const clone = currentViewElement.cloneNode(true);
                exportScheduleView.appendChild(clone);
            }
            
            exportEventsBody.innerHTML = '';
            const allEvents = getAllEvents().sort((a, b) => new Date(a.date) - new Date(b.date));
            
            allEvents.forEach(event => {
                const eventDate = new Date(event.date);
                const formattedDate = eventDate.toLocaleDateString('ru-RU');
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${formattedDate}</td>
                    <td>${event.time || 'Весь день'}</td>
                    <td>${event.title}</td>
                    <td>${getEventTypeName(event.type)}</td>
                    <td>${getCourseName(event.course) || ''}</td>
                    <td>${event.location || ''}</td>
                    <td>${event.description || ''}</td>
                `;
                exportEventsBody.appendChild(row);
            });
            
            exportUpcomingBody.innerHTML = '';
            const upcomingEvents = getUpcomingEvents();
            
            upcomingEvents.forEach(event => {
                const eventDate = new Date(event.date);
                const formattedDate = eventDate.toLocaleDateString('ru-RU');
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${formattedDate}</td>
                    <td>${event.time || 'Весь день'}</td>
                    <td>${event.title}</td>
                    <td>${getCourseName(event.course) || ''}</td>
                    <td>${event.location || ''}</td>
                `;
                exportUpcomingBody.appendChild(row);
            });
            
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    function showLoading() {
        exportScheduleLoading.style.display = 'flex';
    }

    function hideLoading() {
        exportScheduleLoading.style.display = 'none';
    }

    async function exportToPDF() {
        const { jsPDF } = window.jspdf;
        
        try {
            const canvas = await html2canvas(exportContent, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#FFFFFF',
                allowTaint: false,
                width: exportContent.scrollWidth,
                height: exportContent.scrollHeight
            });
            
            const imgData = canvas.toDataURL('/frontend/static/assets/image/logo/logo.png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('расписание_пифагор_' + new Date().toISOString().slice(0,10) + '.pdf');
        } catch (error) {
            console.error('Ошибка при экспорте в PDF:', error);
            throw error;
        }
    }

    async function exportToImage() {
        try {
            const canvas = await html2canvas(exportContent, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#FFFFFF',
                allowTaint: false,
                width: exportContent.scrollWidth,
                height: exportContent.scrollHeight
            });
            
            const link = document.createElement('a');
            link.download = 'расписание_пифагор_' + new Date().toISOString().slice(0,10) + '.png';
            link.href = canvas.toDataURL('/frontend/static/assets/image/logo/logo.png');
            link.click();
        } catch (error) {
            console.error('Ошибка при экспорте в изображение:', error);
            throw error;
        }
    }

    async function exportToWord() {
        try {
            const { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow } = window.docx;
            
            const doc = new Document({
                sections: [{
                    properties: {},
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Расписание занятий - ПИФАГОР",
                                    bold: true,
                                    size: 32
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `Дата генерации: ${new Date().toLocaleDateString('ru-RU')}`,
                                    size: 24
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `Преподаватель: ${userName}`,
                                    size: 24
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `Период: ${exportPeriod.textContent}`,
                                    size: 24
                                })
                            ]
                        }),
                        new Paragraph({
                            text: ""
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Все события периода:",
                                    bold: true,
                                    size: 28
                                })
                            ]
                        })
                    ]
                }]
            });
            
            const allEvents = getAllEvents().sort((a, b) => new Date(a.date) - new Date(b.date));
            
            if (allEvents.length > 0) {
                const tableRows = [
                    new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph({ children: [new TextRun("Дата")] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun("Время")] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun("Название")] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun("Тип")] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun("Курс")] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun("Место")] })] })
                        ]
                    })
                ];
                
                allEvents.forEach(event => {
                    const eventDate = new Date(event.date);
                    const formattedDate = eventDate.toLocaleDateString('ru-RU');
                    
                    tableRows.push(new TableRow({
                        children: [
                            new TableCell({ children: [new Paragraph({ children: [new TextRun(formattedDate)] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun(event.time || 'Весь день')] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun(event.title)] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun(getEventTypeName(event.type))] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun(getCourseName(event.course) || '')] })] }),
                            new TableCell({ children: [new Paragraph({ children: [new TextRun(event.location || '')] })] })
                        ]
                    }));
                });
                
                doc.addSection({
                    children: [
                        new Table({
                            width: {
                                size: 100,
                                type: "pct"
                            },
                            rows: tableRows
                        })
                    ]
                });
            }
            
            const blob = await Packer.toBlob(doc);
            saveAs(blob, 'расписание_пифагор_' + new Date().toISOString().slice(0,10) + '.docx');
        } catch (error) {
            console.error('Ошибка при экспорте в Word:', error);
            throw error;
        }
    }

    async function exportToExcel() {
        try {
            const wb = XLSX.utils.book_new();
            
            const allEvents = getAllEvents().sort((a, b) => new Date(a.date) - new Date(b.date));
            const eventsData = [
                ['Дата', 'Время', 'Название', 'Тип', 'Курс', 'Место', 'Описание']
            ];
            
            allEvents.forEach(event => {
                const eventDate = new Date(event.date);
                const formattedDate = eventDate.toLocaleDateString('ru-RU');
                
                eventsData.push([
                    formattedDate,
                    event.time || 'Весь день',
                    event.title,
                    getEventTypeName(event.type),
                    getCourseName(event.course) || '',
                    event.location || '',
                    event.description || ''
                ]);
            });
            
            const ws = XLSX.utils.aoa_to_sheet(eventsData);
            XLSX.utils.book_append_sheet(wb, ws, 'Расписание');
            
            const upcomingEvents = getUpcomingEvents();
            const upcomingData = [
                ['Дата', 'Время', 'Название', 'Курс', 'Место']
            ];
            
            upcomingEvents.forEach(event => {
                const eventDate = new Date(event.date);
                const formattedDate = eventDate.toLocaleDateString('ru-RU');
                
                upcomingData.push([
                    formattedDate,
                    event.time || 'Весь день',
                    event.title,
                    getCourseName(event.course) || '',
                    event.location || ''
                ]);
            });
            
            const ws2 = XLSX.utils.aoa_to_sheet(upcomingData);
            XLSX.utils.book_append_sheet(wb, ws2, 'Ближайшие события');
            
            XLSX.writeFile(wb, 'расписание_пифагор_' + new Date().toISOString().slice(0,10) + '.xlsx');
        } catch (error) {
            console.error('Ошибка при экспорте в Excel:', error);
            throw error;
        }
    }

    async function exportToPrint() {
        try {
            const canvas = await html2canvas(exportContent, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#FFFFFF',
                allowTaint: false,
                width: exportContent.scrollWidth,
                height: exportContent.scrollHeight
            });
            
            const imgData = canvas.toDataURL('/frontend/static/assets/image/logo/logo.png');
            
            printContent.innerHTML = '';
            
            const img = document.createElement('img');
            img.src = imgData;
            img.style.width = '100%';
            img.style.height = 'auto';
            
            printContent.appendChild(img);
            printContent.style.display = 'block';
            
            window.print();
            
        } catch (error) {
            console.error('Ошибка при печати:', error);
            throw error;
        } finally {
            setTimeout(() => {
                printContent.style.display = 'none';
                printContent.innerHTML = '';
            }, 500);
        }
    }

    exportScheduleBtn.addEventListener('click', function() {
        setExportData();
        exportScheduleModal.style.display = 'flex';
    });

    cancelScheduleExport.addEventListener('click', function() {
        exportScheduleModal.style.display = 'none';
    });

    exportScheduleModal.addEventListener('click', function(e) {
        if (e.target === exportScheduleModal) {
            exportScheduleModal.style.display = 'none';
        }
    });

    confirmScheduleExport.addEventListener('click', async function() {
        const format = document.querySelector('input[name="exportScheduleFormat"]:checked').value;
        exportScheduleModal.style.display = 'none';
        
        showLoading();
        
        try {
            await prepareExportContent();
            
            switch(format) {
                case 'pdf':
                    await exportToPDF();
                    break;
                case 'image':
                    await exportToImage();
                    break;
                case 'word':
                    await exportToWord();
                    break;
                case 'excel':
                    await exportToExcel();
                    break;
                case 'print':
                    await exportToPrint();
                    break;
            }
        } catch (error) {
            console.error('Ошибка при экспорте:', error);
            alert('Произошла ошибка при экспорте. Пожалуйста, попробуйте еще раз.');
        } finally {
            exportContent.style.display = 'none';
            hideLoading();
        }
    });
}