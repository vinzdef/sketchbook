const webpackConfig = require('./webpack.config')
const scriptsBundler = require('../tasks/utils/webpack-bundlers').scripts

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

module.exports = {
  server: {
    baseDir: ['/dist/public', '/static'],
    serveStaticOptions: {
      extensions: ['html']
    }
  },
  port: 80,
  open: false,
  browser: false,
  ghostMode: false,
  middleware: [
    webpackDevMiddleware(scriptsBundler, {
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true }
    }),
    webpackHotMiddleware(scriptsBundler)
  ]
}
