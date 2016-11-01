const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const htmlMinifyOptions = {
  removeAttributeQuotes: true,
  collapseWhitespace: true
};

module.exports = {
  context: __dirname,
  entry: {
    newtab: "./newtab",
    background: "./background"
  },
  output: {
    path: __dirname + "/dist",
    libraryTarget: "var",
    filename: "[name].js"
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: "underscore-template-loader", query: { engine: 'lodash'} },
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
    ]
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.css']
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'manifest.json' },
      { from: 'stylesheets/*.css', flatten: true }
    ]),
    new HtmlWebpackPlugin({
      title: 'New Tab',
      filename: 'newtab.html',
      template: 'templates/newtab.html',
      minify: htmlMinifyOptions,
      chunks: ['newtab']
    })
  ]
};
