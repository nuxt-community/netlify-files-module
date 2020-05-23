# @nuxtjs/netlify-files

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Nuxt module to create new _headers, _redirects and netlify.toml files for Netlify or to use existing ones

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `@nuxtjs/netlify-files` dependency to your project

```bash
yarn add --dev @nuxtjs/netlify-files # or npm install --save-dev @nuxtjs/netlify-files
```

2. Add `@nuxtjs/netlify-files` to the `buildModules` section of `nuxt.config.js`

```js
export default {
  buildModules: [
    // Simple usage
    '@nuxtjs/netlify-files',

    // With options
    ['@nuxtjs/netlify-files', { /* module options */ }]
  ]
}
```

:warning: If you are using Nuxt **< v2.9** you have to install the module as a `dependency` (No `--dev` or `--save-dev` flags) and use `modules` section in `nuxt.config.js` instead of `buildModules`.

### Using top level options

```js
export default {
  buildModules: [
    '@nuxtjs/netlify-files'
  ],
  netlifyFiles: {
    /* module options */
  }
}
```

## Options

### `copyExistingFiles`

- Type: `Boolean`
- Default: `true`

Enable/disable copying of existing files.

### `existingFilesDirectory`

- Type: `String`
- Default: `srcDir`

The directory where your _headers, _redirects and netlify.toml files are located.

## Usage

Currently, the module will look for `_headers`, `_redirects` and `netlify.toml` files and will copy them into the generate folder
(default: `dist`) after static generation. If you have them directly in your project folder, you don't have to do
anything else. In case the files are somewhere else you can configure the directory (see below)

```js
export default {
  netlifyFiles: {
    existingFilesDirectory: 'path/to/nuxt/directory', // The directory where your _headers, _redirects and netlify.toml files are located
  }
}
```

## License

[MIT License](./LICENSE)

Copyright (c) Nuxt Community

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/netlify-files/latest.svg
[npm-version-href]: https://npmjs.com/package/@nuxtjs/netlify-files

[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxtjs/netlify-files.svg
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/netlify-files

[github-actions-ci-src]: https://github.com/nuxt-community/netlify-files-module/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/nuxt-community/netlify-files-module/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/netlify-files-module.svg
[codecov-href]: https://codecov.io/gh/nuxt-community/netlify-files-module

[license-src]: https://img.shields.io/npm/l/@nuxtjs/netlify-files.svg
[license-href]: https://npmjs.com/package/@nuxtjs/netlify-files
