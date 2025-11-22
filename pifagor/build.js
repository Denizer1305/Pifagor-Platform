import * as esbuild from 'esbuild'
import { readdirSync, statSync } from 'fs'
import { join, relative } from 'path'

const context = await esbuild.context({
    entryPoints: ['static/js/main.js'],
    
    outfile: 'static/js/bundle.js',
    
    format: 'esm',
    
    platform: 'browser',
    
    target: 'es2020',
    
    minify: false, 
    
    sourcemap: true,
    
    bundle: true,
    
    external: ['ymaps'],
    
    loader: {
        '.js': 'js',
        '.css': 'css',
    },
    
    define: {
        'process.env.NODE_ENV': '"development"'
    }
})

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

console.log('Создание сборки JavaScript...')

if (process.argv.includes('--watch')) {
    await context.watch()
    console.log('Наблюдая за переменами...')
    
    if (process.argv.includes('--serve')) {
        const { port } = await context.serve({
        servedir: 'static',
        port: 3000
        })
        console.log(`Сервер работает: http://localhost:${port}`)
    }
    } else {
    await context.rebuild()
    await context.dispose()
    console.log('Сборка завершена!')
}