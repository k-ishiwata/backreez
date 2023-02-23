import { defineConfig, splitVendorChunkPlugin } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                // 'resources/scss/app.scss',
                'resources/ts/index.tsx'
            ],
            refresh: true,
        }),
        react(),
        splitVendorChunkPlugin()
    ],
    resolve: {
        alias: {
            '@': '/resources/ts',
        },
    },
    server: {
        host: true,
        hmr: {
            host: 'localhost',
        },
        watch: {
            usePolling: true,
        },
    },
});
