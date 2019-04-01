const tsImportPluginFactory = require('ts-import-plugin')

const getCustomTransformers = () => ({
  before: [tsImportPluginFactory([{
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }, ])],
})

module.exports = getCustomTransformers