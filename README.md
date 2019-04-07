# absolute-path.macro [![npm Version](https://badgen.net/npm/v/absolute-path.macro)](https://www.npmjs.org/package/absolute-path.macro) [![Build Status](https://badgen.net/travis/yuanqing/absolute-path.macro?label=build)](https://travis-ci.org/yuanqing/absolute-path.macro)

> A [Babel macro](https://github.com/kentcdodds/babel-plugin-macros) to convert relative paths to absolute paths

## Usage

First, [configure `babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros/blob/master/other/docs/user.md).

Then, use `absolute-path.macro` as follows:

```js
const {absolutePath} = require('absolute-path.macro')

console.log(absolutePath`foo`)
```

The above code will compile into:

```js
console.log(`/path/to/foo`)
```

(Where `/path/to/foo` is the absolute path to `foo`.)

## Installation

```sh
$ yarn add --dev absolute-path.macro
```

## License

[MIT](LICENSE.md)
