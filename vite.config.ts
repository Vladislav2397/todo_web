import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            manifest: {
                name: 'ToDo GLR',
                short_name: 'ToDo',
                description: 'A simple app for managing your tasks',
                theme_color: '#ffffff',
                icons: [
                    // {
                    //     src: 'pwa-192x192.png',
                    //     sizes: '192x192',
                    //     type: 'image/png'
                    // },
                    // {
                    //     src: 'pwa-512x512.png',
                    //     sizes: '512x512',
                    //     type: 'image/png'
                    // }
                ]
            },
            // devOptions: {
            //     enabled: true
            // }
        })
    ],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: fileURLToPath(new URL('./src', import.meta.url))
            },
        ],
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
    }
})
