import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        'process.env': process.env
    },
    plugins: [
        react(),
        svgr(),
        mkcert()
    ],
    server: {
        host: true,
        port: 5173
    },
    resolve: {
        alias: [
            { find: '~', replacement: '/src' }
        ]
    }
})
