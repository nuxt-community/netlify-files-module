const { join, resolve } = require('path')
const { existsSync } = require('fs')
const { generate, loadConfig } = require('@nuxtjs/module-test-utils')

describe('basic', () => {
  let nuxt

  beforeAll(async () => {
    ({ nuxt } = await generate(loadConfig(__dirname, 'basic')))
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('it copies netlify files file', () => {
    const distBasePath = resolve(nuxt.options.rootDir, nuxt.options.generate.dir)
    const headersPath = join(distBasePath, '_headers')
    const redirectsPath = join(distBasePath, '_redirects')

    expect(existsSync(headersPath)).toBe(true)
    expect(existsSync(redirectsPath)).toBe(true)
  })
})
