import { initAttendance } from '../modules/attendance.js';
import { initProgress } from '../modules/progress.js';
import { initStatistics } from '../modules/statistics.js';
import { initExport } from '../modules/export.js';

export function initAttendancePage() {
    console.log('Initializing attendance page...');
    initAttendance();
}

export function initProgressPage() {
    console.log('Initializing progress page...');
    initProgress();
}

export function initStatisticsPage() {
    console.log('Initializing statistics page...');
    initStatistics();
    initExport(); // Changed from initExport to initScheduleExport
}