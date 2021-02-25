const { resolve } = require('path')
const { copyFileSync, existsSync, writeFileSync } = require('fs')
const { parse } = require('node-html-parser')
const tomlStringify = require('@iarna/toml/stringify')
const logger = require('./logger')

const HEADERS_FILE_NAME = '_headers'
const REDIRECTS_FILE_NAME = '_redirects'
const TOML_FILE_NAME = 'netlify.toml'
const FILE_NAMES = [HEADERS_FILE_NAME, REDIRECTS_FILE_NAME, TOML_FILE_NAME]

module.exports = function (moduleOptions) {
  const { srcDir } = this.options
  const DEFAULT_OPTIONS = {
    copyExistingFiles: true,
    detectForms: false,
    existingFilesDirectory: srcDir,
    netlifyToml: undefined
  }
  const options = {
    ...DEFAULT_OPTIONS,
    ...this.options['netlify-files'],
    ...this.options.netlifyFiles,
    ...moduleOptions
  }

  const forms = []

  if (options.detectForms) {
    const isNetlifyForm = (form) => {
      return form.getAttribute('netlify') === '' || form.getAttribute('netlify') === 'true' ||
      form.getAttribute('data-netlify') === '' || form.getAttribute('data-netlify') === 'true'
    }

    this.nuxt.hook('generate:page', function ({ html }) {
      forms.push(...parse(html).querySelectorAll('form').filter(el => isNetlifyForm(el)))
    })
  }

  this.nuxt.hook('generate:done', () => {
    // prevent netlify.toml from being copied when it has been generated programmatically
    const filesToCopy = options.netlifyToml ? FILE_NAMES.filter(file => file !== TOML_FILE_NAME) : FILE_NAMES

    programmaticallyCreateToml.bind(this)(options)
    copyExistingNetlifyFiles.bind(this)(options, filesToCopy)
    generatePageWithForms.bind(this)(options, forms)
  })
}

async function programmaticallyCreateToml ({ netlifyToml }) {
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

function copyExistingNetlifyFiles ({ existingFilesDirectory, copyExistingFiles }, filesToCopy) {
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

function generatePageWithForms ({ detectForms }, forms) {
  if (!detectForms) {
    return
  }

  const destination = resolve(this.options.rootDir, this.options.generate.dir, '_netlify-forms.html')
  const content = forms.map(form => form.toString()).join('').trim()

  if (content) {
    writeFileSync(destination, content)
  }
}

module.exports.meta = require('../package.json')
