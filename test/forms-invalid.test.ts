import { existsSync } from 'fs'
import { getNuxt, setupTest } from '@nuxt/test-utils'
import { resolvePaths } from './utils'

describe('forms invalid', () => {
  setupTest({
    generate: true,
    fixture: 'fixture/forms-invalid'
  })

  test('it doesn`t generate _netlify-forms.html', () => {
    const { formsPath } = resolvePaths(getNuxt())

    expect(existsSync(formsPath)).toBe(false)
  })
})
