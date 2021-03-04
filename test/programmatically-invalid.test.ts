import { setupTest } from '@nuxt/test-utils'

const mockReporter = {
  warn: jest.fn()
}

jest.mock('consola', () => ({
  info: jest.fn(),
  success: jest.fn(),
  debug: jest.fn(),
  warn: jest.fn(),
  withTag: jest.fn().mockImplementation(() => mockReporter)
}))

describe('programmatically-invalid', () => {
  setupTest({
    generate: true,
    fixture: 'fixture/programmatically-invalid'
  })

  test('it invalid netlify.toml', () => {
    expect(mockReporter.warn).toHaveBeenCalledWith('`netlifyToml` must be an object, or a function that returns an object')
  })
})
