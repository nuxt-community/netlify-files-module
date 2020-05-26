module.exports = {
  rootDir: __dirname,
  buildModules: [
    { handler: require('../../../') }
  ],
  netlifyFiles: {
    netlifyToml: {
      build: {
        environment: {
          BAR: 'baz'
        }
      }
    }
  }
}
