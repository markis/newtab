const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const htmlMinifyOptions = {
  removeAttributeQuotes: true,
  collapseWhitespace: true
};

module.exports = {
  entry: {
    newtab: "./newtab",
    background: "./background"
  },
  output: {
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
        test: /\.html$/,
        loader: "underscore-template-loader",
        options: {
          engine: 'lodash'
        }
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    alias: {
      'react': 'react/dist/react.min',
      'react-dom': 'react-dom/dist/react-dom.min'
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css']
  },
  plugins: [
    new CopyWebpackPlugin([{
        from: 'manifest.json'
      },
      {
        from: 'stylesheets/*.css',
        flatten: true
      },
      {
        from: 'images/*.png'
      }
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
