# umi-plugin-sentry

[![NPM version](https://img.shields.io/npm/v/umi-plugin-sentry.svg?style=flat)](https://npmjs.org/package/umi-plugin-sentry)

Umi plugin for sentry.

## Use

Just setup the plugin on `.umirc.js`

```js
export default {
  plugins: [
    // ...
    ['umi-plugin-sentry', options],
    // ...
  ],
}
```

## Options

| name                               | type               | default                                      |
|------------------------------------|--------------------|----------------------------------------------|
| dsn                                | string (required)  | `process.env.SENTRY_DSN`                     |
| log (log to console before send)   | boolean (optional) | `NODE_ENV === 'development' ? true : false`  |
