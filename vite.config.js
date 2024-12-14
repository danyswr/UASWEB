import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import process from 'process';  // Tambahkan ini untuk polyfill process

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
            process: 'process/browser',  // Alias untuk polyfill process
        },
    },
    define: {
        'process.env': process.env,  // Polyfill untuk process.env
    },
});
