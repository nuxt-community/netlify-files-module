const { join, resolve } = require('path')
const { existsSync } = require('fs')
const { generate, loadConfig } = require('@nuxtjs/module-test-utils')

describe('disable', () => {
  let nuxt

  beforeAll(async () => {
    ({ nuxt } = await generate(loadConfig(__dirname, 'disable')))
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('should not copies netlify files', () => {
    const distBasePath = resolve(nuxt.options.rootDir, nuxt.options.generate.dir)
    const headersPath = join(distBasePath, '_headers')
    const redirectsPath = join(distBasePath, '_redirects')

    expect(existsSync(headersPath)).toBe(false)
    expect(existsSync(redirectsPath)).toBe(false)
  })
})
