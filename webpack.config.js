const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './lib/client/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './lib/client/index.html',
      filename: 'index.html',
      inject: 'body',
      hash: false,
      minify: {
        collapseWhitespace: true
      }
    }),
    new UglifyJSPlugin({
      sourceMap: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }
};
