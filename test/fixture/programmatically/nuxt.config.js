export default {
  rootDir: __dirname,
  buildModules: [
    '../../../src/module.ts'
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
