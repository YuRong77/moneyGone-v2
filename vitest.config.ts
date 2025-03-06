import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      setupFiles: './tests/setup.ts',
      coverage: {
        provider: 'istanbul', // or 'v8'
        reporter: ['text', 'json', 'html'],
        exclude: [...(configDefaults.coverage?.exclude || []), 'src/apis/modules/**']
      },
      reporters: 'verbose',
      server: {
        deps: {
          inline: ['element-plus']
        }
      }
    }
  })
)
