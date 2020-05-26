const { existsSync } = require('fs')
const { generate, loadConfig } = require('@nuxtjs/module-test-utils')
const { resolvePaths } = require('./utils')

describe('basic', () => {
  let nuxt

  beforeAll(async () => {
    ({ nuxt } = await generate(loadConfig(__dirname, 'basic')))
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('it copies netlify files', () => {
    const { headersPath, redirectsPath, tomlPath } = resolvePaths(nuxt)

    expect(existsSync(headersPath)).toBe(true)
    expect(existsSync(redirectsPath)).toBe(true)
    expect(existsSync(tomlPath)).toBe(true)
  })
})
