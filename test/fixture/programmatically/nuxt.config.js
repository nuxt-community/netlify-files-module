export default {
  rootDir: __dirname,
  buildModules: [
    '../../../src/index.ts'
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
