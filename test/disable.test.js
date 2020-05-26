const { existsSync } = require('fs')
const { generate, loadConfig } = require('@nuxtjs/module-test-utils')
const { resolvePaths } = require('./utils')

describe('disable', () => {
  let nuxt

  beforeAll(async () => {
    ({ nuxt } = await generate(loadConfig(__dirname, 'disable')))
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('should not copies netlify files', () => {
    const { headersPath, redirectsPath, tomlPath } = resolvePaths(nuxt)

    expect(existsSync(headersPath)).toBe(false)
    expect(existsSync(redirectsPath)).toBe(false)
    expect(existsSync(tomlPath)).toBe(false)
  })
})
