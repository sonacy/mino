const base = require('./webpack.base.conf')
const merge = require('webpack-merge')
const webpack = require('webpack')

module.exports = merge(base, {
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    port: 3000,
    noInfo: false,
    progress: true,
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
