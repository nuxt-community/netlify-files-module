export default {
  rootDir: __dirname,
  buildModules: [
    '../../../src/module.ts'
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
