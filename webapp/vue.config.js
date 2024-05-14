const MonacoLocalesPlugin = require('monaco-editor-locales-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    overlay: false,
    proxy: {
      '/contents': {
        target: 'http://host.docker.internal:8081',
        changeOrigin: true
      }
    }
  },
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
