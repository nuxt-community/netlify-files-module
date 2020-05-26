const { existsSync, readFileSync } = require('fs')
const { generate, loadConfig } = require('@nuxtjs/module-test-utils')
const { resolvePaths } = require('./utils')

describe('programmatically', () => {
  let nuxt

  beforeAll(async () => {
    ({ nuxt } = await generate(loadConfig(__dirname, 'programmatically')))
  }, 90000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('it has all files in generate folder', () => {
    const { headersPath, redirectsPath, tomlPath } = resolvePaths(nuxt)

    expect(existsSync(headersPath)).toBe(true)
    expect(existsSync(redirectsPath)).toBe(true)
    expect(existsSync(tomlPath)).toBe(true)
  })
  test('it created netlify.toml correctly', () => {
    const { tomlPath } = resolvePaths(nuxt)
    const data = readFileSync(tomlPath, 'utf8')
    const dataArr = data.split(/\n/).map(str => str.trim()).filter(Boolean)
    expect(dataArr).toEqual(['[build.environment]', 'BAR = "baz"'])
  })
})
