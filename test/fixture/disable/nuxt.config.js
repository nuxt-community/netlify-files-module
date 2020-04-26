module.exports = {
  rootDir: __dirname,
  buildModules: [
    { handler: require('../../../') }
  ],
  netlifyFiles: {
    copyExistingFiles: false
  }
}
