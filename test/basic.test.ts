import { existsSync } from 'fs'
import { getNuxt, setupTest } from '@nuxt/test-utils'
import { resolvePaths } from './utils'

describe('basic', () => {
  setupTest({
    generate: true,
    fixture: 'fixture/basic'
  })

  test('it copies netlify files', () => {
    const { headersPath, redirectsPath, tomlPath } = resolvePaths(getNuxt())

    expect(existsSync(headersPath)).toBe(true)
    expect(existsSync(redirectsPath)).toBe(true)
    expect(existsSync(tomlPath)).toBe(true)
  })
})
