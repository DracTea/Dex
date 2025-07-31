import { defineConfig } from 'vite';
import path from 'path';
import laravel from 'laravel-vite-plugin';
import { glob } from 'glob';


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const scss =
        glob.sync('src/styles/**/*.scss')
            .filter(file => !file.includes('_'))
            .map(file => file);

    return {
        plugins: [
            laravel({
                hotFile: '../public/ap.hot',
                buildDirectory: '../public/dist',
                input: ['src/styles/main.scss', 'src/main.ts'],
                refresh: [
                    '../src/views/**/*.php',
                ],
            }),
        ],
        css: {
            devSourcemap: true,
        },
        // '/starter/wp-content/assets/dist/',
        base: mode === 'development' ? '/' : '/',
        build: {
            emptyOutDir: true,
            manifest: true,
            outDir: '../wp-content/assets/dist',
            rollupOptions: {
                input: [
                    path.resolve(__dirname, 'src/main.ts'),
                    ...scss
                ],
            },
        },
        server: {
            port: 5142,
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                "lumo": path.resolve(__dirname, "./src/lumo"),
            },
        },
    }
})
