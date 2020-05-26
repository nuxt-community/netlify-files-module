const { join, resolve } = require('path')
const { existsSync, readFileSync } = require('fs')
const { generate, loadConfig } = require('@nuxtjs/module-test-utils')

describe('programmatically', () => {
  let nuxt

  beforeAll(async () => {
    ({ nuxt } = await generate(loadConfig(__dirname, 'programmatically')))
  }, 90000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('it has all files in generate folder', () => {
    const distBasePath = resolve(nuxt.options.rootDir, nuxt.options.generate.dir)
    const headersPath = join(distBasePath, '_headers')
    const redirectsPath = join(distBasePath, '_redirects')
    const tomlPath = join(distBasePath, 'netlify.toml')

    expect(existsSync(headersPath)).toBe(true)
    expect(existsSync(redirectsPath)).toBe(true)
    expect(existsSync(tomlPath)).toBe(true)
  })
  test('it created netlify.toml correctly', () => {
    const distBasePath = resolve(nuxt.options.rootDir, nuxt.options.generate.dir)
    const tomlPath = join(distBasePath, 'netlify.toml')
    const data = readFileSync(tomlPath, 'utf8')
    const dataArr = data.split(/\n/).map(str => str.trim()).filter(str => str)
    expect(dataArr).toEqual(['[build.environment]', 'BAR = "baz"'])
  })
})
