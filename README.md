# umi-plugin-sentry

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

`type: [Object]`

### Props

| name                | type               | default                                      |
|---------------------|--------------------|----------------------------------------------|
| dsn                 | string (required)  | `process.env.SENTRY_DSN`                     |
| log                 | boolean (optional) | `NODE_ENV === 'development' ? true : false`  |

