# [Echo Photos Homepage](https://www.echophotos.io)

Codebase for [echophotos.io]

## Dev Setup

1. Use Node `20.19.0` or newer.

2. `pnpm install`

3. `pnpm dev`


## Deploy
Make sure to copy `next-i18mext.config.js` to `/public` when changed as firebase hosting ignores it else.


## Notes
`next/swc-darwin-arm64` as a `devDependency` is just a workaround for a current dependency bug.
