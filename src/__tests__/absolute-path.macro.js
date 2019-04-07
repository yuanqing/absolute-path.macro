const path = require('path')
const pluginTester = require('babel-plugin-tester')
const plugin = require('babel-plugin-macros')

const projectDirectoryAbsolutePath = path.join(__dirname, '..', '..')

expect.addSnapshotSerializer({
  test: function (value) {
    return typeof value === 'string'
  },
  print: function (value) {
    return value.replace(projectDirectoryAbsolutePath, '/<PROJECT_ROOT>')
  }
})

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: {
    filename: __filename
  },
  tests: {
    'No usage': {
      code: `const { absolutePath } = require('../absolute-path.macro')`
    },
    'Incorrect usage': {
      code: `
        const { absolutePath } = require('../absolute-path.macro')
        console.log(absolutePath('foo'))
      `,
      error: true
    },
    'Empty template literal': {
      code: `
        const { absolutePath } = require('../absolute-path.macro')
        console.log(absolutePath\`\`)
      `
    },
    'Non-empty template literal': {
      code: `
        const { absolutePath } = require('../absolute-path.macro')
        console.log(absolutePath\`foo\`)
      `
    }
  }
})
