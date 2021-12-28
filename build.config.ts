import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  rollup: {
    emitCJS: false
  },
  entries: [
    { input: 'src/index' }
  ],
  externals: [
    '@nuxt/schema'
  ]
})
