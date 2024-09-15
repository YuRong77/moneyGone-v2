import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'auto-imports.d.ts',
      eslintrc: {
        enabled: true
      },
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dirs: ['src/components', 'src/views/**/components'],
      dts: 'components.d.ts',
      resolvers: [ElementPlusResolver()]
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '大花錢V2',
        short_name: '大花錢',
        description: '大花錢開發中',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'dog192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'dog512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
