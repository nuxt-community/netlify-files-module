import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  rootDir: __dirname,
  buildModules: [
    '../../../src/index.ts'
  ]
})
