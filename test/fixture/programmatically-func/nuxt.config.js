module.exports = {
  rootDir: __dirname,
  buildModules: [
    { handler: require('../../../') }
  ],
  netlifyFiles: {
    netlifyToml: () => {
      return {
        build: {
          environment: {
            BAR: 'baz'
          }
        }

      }
    }
  }
}
