import { join, resolve } from 'path'
import { NuxtOptions } from '@nuxt/types'

export const resolvePaths = (nuxt: { options: NuxtOptions }) => {
  const distBasePath = resolve(nuxt.options.rootDir, nuxt.options.generate.dir)
  const headersPath = join(distBasePath, '_headers')
  const redirectsPath = join(distBasePath, '_redirects')
  const tomlPath = join(distBasePath, 'netlify.toml')
  const formsPath = join(distBasePath, '_netlify-forms.html')

  return {
    headersPath,
    redirectsPath,
    tomlPath,
    formsPath
  }
}
