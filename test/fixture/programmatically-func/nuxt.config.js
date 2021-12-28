export default {
  rootDir: __dirname,
  buildModules: [
    '../../../src/index.ts'
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
