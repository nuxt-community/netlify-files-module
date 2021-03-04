import { existsSync } from 'fs'
import { getNuxt, setupTest } from '@nuxt/test-utils'
import { resolvePaths } from './utils'

describe('forms', () => {
  setupTest({
    generate: true,
    fixture: 'fixture/forms'
  })

  test('it generate _netlify-forms.html', () => {
    const { formsPath } = resolvePaths(getNuxt())

    expect(existsSync(formsPath)).toBe(true)
  })
})
