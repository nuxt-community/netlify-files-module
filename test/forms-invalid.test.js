const { existsSync } = require('fs')
const { generate, loadConfig } = require('@nuxtjs/module-test-utils')
const logger = require('../lib/logger')
const { resolvePaths } = require('./utils')

logger.mockTypes(() => jest.fn())

describe('forms invalid', () => {
  let nuxt

  beforeAll(async () => {
    ({ nuxt } = await generate(loadConfig(__dirname, 'forms-invalid')))
  }, 60000)

  beforeEach(() => {
    logger.clear()
  })

  afterAll(async () => {
    await nuxt.close()
  })

  test('it doesn`t generate _netlify-forms.html', () => {
    const { formsPath } = resolvePaths(nuxt)

    expect(existsSync(formsPath)).toBe(false)
  })
})
