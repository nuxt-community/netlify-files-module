import { resolve } from 'path'
import { copyFileSync, existsSync, writeFileSync } from 'fs'
import { parse, HTMLElement } from 'node-html-parser'
import { stringify as tomlStringify } from '@iarna/toml'
import { defineNuxtModule } from '@nuxt/kit'
import { logger } from './logger'

export type NetlifyToml = object
export interface NuxtNetlifyFilesOptions {
  copyExistingFiles?: boolean,
  detectForms?: boolean,
  existingFilesDirectory?: string,
  netlifyToml?: NetlifyToml | (() => NetlifyToml)
}

const CONFIG_KEY = 'netlifyFiles'

const FILES = {
  HEADER: '_headers',
  REDIRECTS: '_redirects',
  TOML: 'netlify.toml'
}
const FILE_NAMES = Object.values(FILES)

export default defineNuxtModule<NuxtNetlifyFilesOptions>({
  meta: { name: 'netlify-files', configKey: CONFIG_KEY },
  defaults: nuxt => ({
    copyExistingFiles: true,
    detectForms: false,
    existingFilesDirectory: nuxt.options.srcDir,
    netlifyToml: undefined
  }),
  setup (options, nuxt) {
    const forms: HTMLElement[] = []

    if (options.detectForms) {
      nuxt.hook('generate:page', function ({ html }) {
        const NETLIFY_ATTRIBUTES = ['netlify', 'data-netlify']
        const VALID_VALUES = ['', 'true']
        const isNetlifyForm = (form: HTMLElement) => NETLIFY_ATTRIBUTES.some(attr => VALID_VALUES.includes(form.getAttribute(attr)))

        forms.push(...parse(html).querySelectorAll('form').filter(isNetlifyForm))
      })
    }

    nuxt.hook('generate:done', async () => {
      // prevent netlify.toml from being copied when it has been generated programmatically
      const filesToCopy = options.netlifyToml ? FILE_NAMES.filter(file => file !== FILES.TOML) : FILE_NAMES

      await programmaticallyCreateToml(options)
      copyExistingNetlifyFiles(options, filesToCopy)
      generatePageWithForms(options, forms)
    })

    async function programmaticallyCreateToml ({ netlifyToml }: NuxtNetlifyFilesOptions) {
      if (!netlifyToml) {
        return
      }

      const tomlObject = typeof netlifyToml === 'function' ? await netlifyToml() : netlifyToml

      if (typeof tomlObject !== 'object') {
        throw new TypeError('`netlifyToml` must be an object, or a function that returns an object')
      }

      const toml = tomlStringify(tomlObject)
      const destination = resolve(nuxt.options.rootDir, nuxt.options.generate.dir, FILES.TOML)
      writeFileSync(destination, toml)
    }

    function copyExistingNetlifyFiles ({ existingFilesDirectory, copyExistingFiles }: NuxtNetlifyFilesOptions, filesToCopy: string[]) {
      if (!copyExistingFiles) {
        return
      }

      filesToCopy.forEach((name) => {
        const origin = resolve(existingFilesDirectory, name)
        const destination = resolve(nuxt.options.rootDir, nuxt.options.generate.dir, name)
        const isAvailable = existsSync(origin)

        if (!isAvailable) {
          logger.warn(`No \`${name}\` file found in \`${existingFilesDirectory}\`.`)
          return
        }

        copyFileSync(origin, destination)
      })
    }

    function generatePageWithForms ({ detectForms }: NuxtNetlifyFilesOptions, forms: HTMLElement[]) {
      if (!detectForms) {
        return
      }

      const destination = resolve(nuxt.options.rootDir, nuxt.options.generate.dir, '_netlify-forms.html')
      const content = forms.map(form => form.toString()).join('').trim()

      if (content) {
        writeFileSync(destination, content)
      }
    }
  }
})
