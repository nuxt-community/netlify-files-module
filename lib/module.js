const { resolve } = require('path')
const fs = require('fs-extra')
const consola = require('consola')
const logger = consola.withScope('nuxt-netlify-files')

const HEADERS_FILE_NAME = '_headers'
const REDIRECTS_FILE_NAME = '_redirects'
const FILE_NAMES = [HEADERS_FILE_NAME, REDIRECTS_FILE_NAME]

module.exports = function (moduleOptions) {
  logger.log('hi')
  const { srcDir, build } = this.options
  const DEFAULT_OPTIONS = {
    copyExistingFiles: true,
    existingFilesDirectory: srcDir,
    publicPath: build.publicPath
  }
  const options = {
    ...DEFAULT_OPTIONS,
    ...this.options.netlifyFiles,
    ...moduleOptions
  }

  if (options.copyExistingFiles) {
    copyExistingNetlifyFiles.bind(this)(options)
  }
}

function copyExistingNetlifyFiles ({ existingFilesDirectory }) {
  this.nuxt.hook('generate:done', async () => {
    await Promise.all(FILE_NAMES.map(async (name) => {
      const origin = resolve(existingFilesDirectory, name)
      const isAvailable = await fs.pathExists(origin)
      if (!isAvailable) {
        return
      }
      const destination = resolve(this.options.rootDir, this.options.generate.dir, name)
      return fs.copy(origin, destination)
    }))
  })
}

module.exports.meta = require('../package.json')
