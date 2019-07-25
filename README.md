# @nuxtjs/netlify-files-module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Nuxt module to create new _headers and _redirects files for Netlify or to use existing ones

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `@nuxtjs/netlify-files-module` dependency to your project

```bash
yarn add @nuxtjs/netlify-files-module # or npm install @nuxtjs/netlify-files-module
```

2. Add `@nuxtjs/netlify-files-module` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    '@nuxtjs/netlify-files-module',

    // With options
    ['@nuxtjs/netlify-files-module', { /* module options */ }]
  ]
}
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Alexander Lichter <npm@lichter.io>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/netlify-files-module/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/@nuxtjs/netlify-files-module

[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxtjs/netlify-files-module.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/netlify-files-module

[circle-ci-src]: https://img.shields.io/circleci/project/github/nuxt-community/netlify-files-module.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/nuxt-community/netlify-files-module

[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/netlify-files-module.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/nuxt-community/netlify-files-module

[license-src]: https://img.shields.io/npm/l/@nuxtjs/netlify-files-module.svg?style=flat-square
[license-href]: https://npmjs.com/package/@nuxtjs/netlify-files-module
