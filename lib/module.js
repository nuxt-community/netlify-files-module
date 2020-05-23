const { resolve } = require('path')
const { copyFileSync, existsSync } = require('fs')
const logger = require('./logger')

const HEADERS_FILE_NAME = '_headers'
const REDIRECTS_FILE_NAME = '_redirects'
const TOML_FILE_NAME = 'netlify.toml'
const FILE_NAMES = [HEADERS_FILE_NAME, REDIRECTS_FILE_NAME, TOML_FILE_NAME]

module.exports = function (moduleOptions) {
  const { srcDir } = this.options
  const DEFAULT_OPTIONS = {
    copyExistingFiles: true,
    existingFilesDirectory: srcDir
  }
  const options = {
    ...DEFAULT_OPTIONS,
    ...this.options['netlify-files'],
    ...this.options.netlifyFiles,
    ...moduleOptions
  }

  if (options.copyExistingFiles) {
    copyExistingNetlifyFiles.bind(this)(options)
  }
}

function copyExistingNetlifyFiles ({ existingFilesDirectory }) {
  this.nuxt.hook('generate:done', () => {
    FILE_NAMES.forEach((name) => {
      const origin = resolve(existingFilesDirectory, name)
      const destination = resolve(this.options.rootDir, this.options.generate.dir, name)
      const isAvailable = existsSync(origin)

      if (!isAvailable) {
        logger.warn(`No \`${name}\` file found in \`${existingFilesDirectory}\`.`)
        return
      }

      copyFileSync(origin, destination)
    })
  })
}

module.exports.meta = require('../package.json')
