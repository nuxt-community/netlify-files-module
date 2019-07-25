# @nuxtjs/netlify-files

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Nuxt module to create new _headers and _redirects files for Netlify or to use existing ones

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `@nuxtjs/netlify-files` dependency to your project

```bash
yarn add @nuxtjs/netlify-files # or npm install @nuxtjs/netlify-files
```

2. Add `@nuxtjs/netlify-files` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    '@nuxtjs/netlify-files',

    // With options
    ['@nuxtjs/netlify-files', { /* module options */ }]
  ]
}
```

## Usage

Currently, the module will look for `_headers` and `_redirects` files and will copy into the generate folder 
(default: `dist`) after static generation. If you have them directly in your project folder, you don't have to do 
anything else. In case the files are somewhere else you can configure the directory (see below)

### Config

```js
export default { 
  netlifyFiles: {
    existingFilesDirectory: 'path/to/nuxt/directory', // The directory where your _headers and _redirects file is located
  }
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
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/netlify-files/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/@nuxtjs/netlify-files

[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxtjs/netlify-files.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/netlify-files

[circle-ci-src]: https://img.shields.io/circleci/project/github/nuxt-community/netlify-files.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/nuxt-community/netlify-files

[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/netlify-files.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/nuxt-community/netlify-files

[license-src]: https://img.shields.io/npm/l/@nuxtjs/netlify-files.svg?style=flat-square
[license-href]: https://npmjs.com/package/@nuxtjs/netlify-files
