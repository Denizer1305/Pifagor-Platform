import * as esbuild from 'esbuild'
import { readdirSync, statSync } from 'fs'
import { join, relative } from 'path'

const context = await esbuild.context({
    // Точка входа - ваш главный JS файл
    entryPoints: ['static/js/main.js'],
    
    // Выходной файл
    outfile: 'static/js/bundle.js',
    
    // Формат модуля
    format: 'esm',
    
    // Платформа браузера
    platform: 'browser',
    
    // Целевая версия ES
    target: 'es2020',
    
    // Минификация
    minify: false, // Поставьте true для продакшена
    
    // Source maps для отладки
    sourcemap: true,
    
    // Пакетирование всех зависимостей
    bundle: true,
    
    // Внешние библиотеки (если используете CDN)
    external: ['ymaps'], // Яндекс карты подключаются отдельно
    
    // Загрузчики для разных типов файлов
    loader: {
        '.js': 'js',
        '.css': 'css',
    },
    
    // Определения для глобальных переменных
    define: {
        'process.env.NODE_ENV': '"development"'
    }
})

// Функция для рекурсивного поиска всех JS файлов
function findJSFiles(dir) {
    let results = []
    const list = readdirSync(dir)
    
    list.forEach(file => {
        const filePath = join(dir, file)
        const stat = statSync(filePath)
        
        if (stat && stat.isDirectory()) {
        results = results.concat(findJSFiles(filePath))
        } else if (file.endsWith('.js')) {
        results.push(relative(process.cwd(), filePath))
        }
    })
    
    return results
}

console.log('Building JavaScript bundle...')

if (process.argv.includes('--watch')) {
    // Режим наблюдения
    await context.watch()
    console.log('Watching for changes...')
    
    if (process.argv.includes('--serve')) {
        // Локальный сервер для тестирования
        const { port } = await context.serve({
        servedir: 'static',
        port: 3000
        })
        console.log(`Server running at http://localhost:${port}`)
    }
    } else {
    // Однократная сборка
    await context.rebuild()
    await context.dispose()
    console.log('Build completed!')
}