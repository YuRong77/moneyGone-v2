import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    }
  },
  e2e: {
    baseUrl: 'http://localhost:5173/',
    setupNodeEvents(on, config) {},
    env: {
      BASE_URL: 'http://localhost:5173/#',
      API_URL: 'http://localhost:3002'
    }
  }
})
