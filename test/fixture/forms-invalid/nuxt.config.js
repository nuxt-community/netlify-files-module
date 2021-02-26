module.exports = {
  rootDir: __dirname,
  buildModules: [
    { handler: require('../../../') }
  ],
  netlifyFiles: {
    detectForms: true
  }
}
