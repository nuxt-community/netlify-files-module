const { generate, loadConfig } = require('@nuxtjs/module-test-utils')
const logger = require('../lib/logger')

logger.mockTypes(() => jest.fn())

describe('warn', () => {
  let nuxt

  beforeAll(async () => {
    ({ nuxt } = await generate(loadConfig(__dirname, 'warn')))
  }, 60000)

  beforeEach(() => {
    logger.clear()
  })

  afterAll(async () => {
    await nuxt.close()
  })

  test('should warn if not found the netlify files file', () => {
    expect(logger.warn).toHaveBeenCalledWith(expect.stringMatching(/^No `(.*)` file found in `(.*)`.$/))
  })
})
