const { createMacro } = require('babel-plugin-macros')
const { dirname, isAbsolute, join, resolve } = require('path')

function absolutePathMacro ({ references, babel, state }) {
  const sourceFilePath = state.file.opts.filename
  const { absolutePath = [] } = references
  absolutePath.forEach(function (path) {
    if (babel.types.isCallExpression(path.parentPath)) {
      throw new Error('Usage as Call Expression is not supported')
    }
    if (!babel.types.isTaggedTemplateExpression(path.parentPath)) {
      return
    }
    ;['raw', 'cooked'].forEach(function (type) {
      path.parent.quasi.quasis[0].value[type] = addAbsolutePathPrefix(
        path.parent.quasi.quasis[0].value[type],
        sourceFilePath
      )
    })
    path.parentPath.replaceWith(path.parent.quasi)
  })
}

function addAbsolutePathPrefix (path, sourceFilePath) {
  if (isAbsolute(path)) {
    return path
  }
  const parentDirectoryPath = dirname(resolve(sourceFilePath))
  return join(parentDirectoryPath, path)
}

module.exports = createMacro(absolutePathMacro)
