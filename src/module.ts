import { resolve } from 'path'
import { copyFileSync, existsSync, writeFileSync } from 'fs'
import type { Module } from '@nuxt/types'
import { parse, HTMLElement } from 'node-html-parser'
import { stringify as tomlStringify } from '@iarna/toml'
import consola from 'consola'
import defu from 'defu'
import { name, version } from '../package.json'

const logger = consola.withTag('nuxt:netlify-files')

export type NetlifyToml = object

export interface ModuleOptions {
  copyExistingFiles?: boolean,
  detectForms?: boolean,
  existingFilesDirectory?: string,
  netlifyToml?: NetlifyToml | (() => NetlifyToml)
}

const CONFIG_KEY = 'netlifyFiles'
const HEADERS_FILE_NAME = '_headers'
const REDIRECTS_FILE_NAME = '_redirects'
const TOML_FILE_NAME = 'netlify.toml'
const FILE_NAMES = [HEADERS_FILE_NAME, REDIRECTS_FILE_NAME, TOML_FILE_NAME]

const nuxtModule: Module<ModuleOptions> = function (moduleOptions) {
  const DEFAULTS: ModuleOptions = {
    copyExistingFiles: true,
    detectForms: false,
    existingFilesDirectory: this.options.srcDir,
    netlifyToml: undefined
  }

  const options: ModuleOptions = defu(
    this.options['netlify-files'],
    this.options[CONFIG_KEY],
    moduleOptions,
    DEFAULTS
  )

  const forms: HTMLElement[] = []

  if (options.detectForms) {
    this.nuxt.hook('generate:page', function ({ html }) {
      forms.push(...parse(html).querySelectorAll('form').filter((form) => {
        return form.getAttribute('netlify') === '' ||
          form.getAttribute('netlify') === 'true' ||
          form.getAttribute('data-netlify') === '' ||
          form.getAttribute('data-netlify') === 'true'
      }))
    })
  }

  this.nuxt.hook('generate:done', async () => {
    // prevent netlify.toml from being copied when it has been generated programmatically
    const filesToCopy = options.netlifyToml ? FILE_NAMES.filter(file => file !== TOML_FILE_NAME) : FILE_NAMES

    await programmaticallyCreateToml.bind(this)(options)
    copyExistingNetlifyFiles.bind(this)(options, filesToCopy)
    generatePageWithForms.bind(this)(options, forms)
  })
}

async function programmaticallyCreateToml ({ netlifyToml }: ModuleOptions) {
  if (!netlifyToml) {
    return
  }

  const tomlObject = typeof netlifyToml === 'function' ? await netlifyToml() : netlifyToml

  if (typeof tomlObject !== 'object') {
    throw new TypeError('`netlifyToml` must be an object, or a function that returns an object')
  }

  const toml = tomlStringify(tomlObject)
  const destination = resolve(this.options.rootDir, this.options.generate.dir, TOML_FILE_NAME)
  writeFileSync(destination, toml)
}

function copyExistingNetlifyFiles ({ existingFilesDirectory, copyExistingFiles }: ModuleOptions, filesToCopy: string[]) {
  if (!copyExistingFiles) {
    return
  }

  filesToCopy.forEach((name) => {
    const origin = resolve(existingFilesDirectory, name)
    const destination = resolve(this.options.rootDir, this.options.generate.dir, name)
    const isAvailable = existsSync(origin)

    if (!isAvailable) {
      logger.warn(`No \`${name}\` file found in \`${existingFilesDirectory}\`.`)
      return
    }

    copyFileSync(origin, destination)
  })
}

function generatePageWithForms ({ detectForms }: ModuleOptions, forms: HTMLElement[]) {
  if (!detectForms) {
    return
  }

  const destination = resolve(this.options.rootDir, this.options.generate.dir, '_netlify-forms.html')
  const content = forms.map(form => form.toString()).join('').trim()

  if (content) {
    writeFileSync(destination, content)
  }
}

;(nuxtModule as any).meta = { name, version }

declare module '@nuxt/types' {
  interface NuxtConfig { [CONFIG_KEY]?: ModuleOptions } // Nuxt 2.14+
  interface Configuration { [CONFIG_KEY]?: ModuleOptions } // Nuxt 2.9 - 2.13
}

export default nuxtModule
