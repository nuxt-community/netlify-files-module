jest.setTimeout(60000)

const { resolve, join } = require('path')
const { readFileSync } = require('fs')
const { Nuxt, Builder, Generator } = require('nuxt-edge')
const config = require('../example/nuxt.config')
config.dev = false

let nuxt

describe('basic', () => {
  beforeAll(async () => {
    nuxt = new Nuxt(config)
    await nuxt.ready()
    const builder = await new Builder(nuxt)
    const generator = new Generator(nuxt, builder)
    await generator.generate()
  })

  afterAll(async () => {
    await nuxt.close()
  })

  test('it copies netlify files file', () => {
    const distBasePath = resolve(nuxt.options.rootDir, join(nuxt.options.generate.dir))
    const headersPath = join(distBasePath, '_headers')
    const redirectsPath = join(distBasePath, '_redirects')

    expect(readFileSync(headersPath, { encoding: 'utf8' })).toMatchSnapshot()
    expect(readFileSync(redirectsPath, { encoding: 'utf8' })).toMatchSnapshot()
  })
})
