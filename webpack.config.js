const path = require('path')
const webpack = require('webpack')
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './src/base.js',
  output: {
    libraryTarget: 'umd',
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [{
      test: /\.js/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  node: {
    __dirname: true,
    __filename: true
  },
  plugins: [
    // new uglifyJsPlugin(),
    new CleanWebpackPlugin(['dist'])
  ]
}
