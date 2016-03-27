const HtmlMinifier = require('html-minifier');
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
    background: "./background",
    popup: "./popup"
  },
  output: {
    path: __dirname + "/dist",
    libraryTarget: "var",
    filename: "[name].js"
  },
  module: {
    loaders: [
      { test: /\.ttf$|\.woff$|\.woff2$|\.eot$|\.svg$/, loader: 'url-loader' },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.html$/, loader: "underscore-template-loader", query: { engine: 'lodash'} },
      { test: /\.tsx$|\.ts$/, loader: 'babel-loader?presets[]=es2015&presets[]=react!ts-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.css'],
    alias: {
      'localforage': 'localforage/dist/localforage.nopromises'
    }
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'manifest.json' },
      { from: 'images/*.png' }
    ]),
    new HtmlWebpackPlugin({
      title: 'Popup',
      filename: 'popup.html',
      template: 'templates/popup.html',
      minify: htmlMinifyOptions,
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      title: 'New Tab',
      filename: 'newtab.html',
      template: 'templates/newtab.html',
      minify: htmlMinifyOptions,
      chunks: ['newtab']
    })
  ]
};
