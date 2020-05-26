const { resolve } = require('path')
const { copyFileSync, existsSync, writeFileSync } = require('fs')
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
    existingFilesDirectory: srcDir,
    netlifyToml: undefined
  }
  const options = {
    ...DEFAULT_OPTIONS,
    ...this.options['netlify-files'],
    ...this.options.netlifyFiles,
    ...moduleOptions
  }

  this.nuxt.hook('generate:done', () => {
    // prevent netlify.toml from being copied when it has been generated programmatically
    const filesToCopy = options.netlifyToml ? FILE_NAMES.filter(file => file !== TOML_FILE_NAME) : FILE_NAMES

    programmaticallyCreateToml.bind(this)(options)
    copyExistingNetlifyFiles.bind(this)(options, filesToCopy)
  })
}

function programmaticallyCreateToml ({ netlifyToml }) {
  if (!netlifyToml) {
    return
  }

  const tomlObject = typeof netlifyToml === 'function' ? netlifyToml() : netlifyToml

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

module.exports.meta = require('../package.json')
