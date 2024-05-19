const MonacoLocalesPlugin = require('monaco-editor-locales-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  chainWebpack: config => {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        // Languages are loaded on demand at runtime
        languages: ['html']
      }
    ])
  },
  configureWebpack: {
    plugins: [
      new MonacoLocalesPlugin({
        languages: ['en'],
        defaultLanguage: "en",
        logUnmatched: false,
      })
    ]
  },
}
