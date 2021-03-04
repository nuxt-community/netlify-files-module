import { existsSync, readFileSync } from 'fs'
import { getNuxt, setupTest } from '@nuxt/test-utils'
import { resolvePaths } from './utils'

describe('programmatically-func', () => {
  setupTest({
    generate: true,
    fixture: 'fixture/programmatically-func'
  })

  test('it has all files in generate folder', () => {
    const { headersPath, redirectsPath, tomlPath } = resolvePaths(getNuxt())

    expect(existsSync(headersPath)).toBe(true)
    expect(existsSync(redirectsPath)).toBe(true)
    expect(existsSync(tomlPath)).toBe(true)
  })

  test('it created netlify.toml correctly', () => {
    const { tomlPath } = resolvePaths(getNuxt())
    const data = readFileSync(tomlPath, 'utf8')
    const dataArr = data.split(/\n/).map(str => str.trim()).filter(Boolean)

    expect(dataArr).toEqual(['[build.environment]', 'BAR = "baz"'])
  })
})
