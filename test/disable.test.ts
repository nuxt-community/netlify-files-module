import { existsSync } from 'fs'
import { getNuxt, setupTest } from '@nuxt/test-utils'
import { resolvePaths } from './utils'

describe('disable', () => {
  setupTest({
    generate: true,
    fixture: 'fixture/disable'
  })

  test('should not copies netlify files', () => {
    const { headersPath, redirectsPath, tomlPath } = resolvePaths(getNuxt())

    expect(existsSync(headersPath)).toBe(false)
    expect(existsSync(redirectsPath)).toBe(false)
    expect(existsSync(tomlPath)).toBe(false)
  })
})
