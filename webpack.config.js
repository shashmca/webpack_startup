const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const bundleExtractPlugin = new ExtractTextPlugin({
  filename: './dist/bundle.css',
});

module.exports = {
  mode: "development",
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    bundleExtractPlugin
  ],
  module: {
    rules: [{
        test: /\.js$/, // include .js files
        enforce: "pre", // preload the eslint loader
        exclude: [/node_modules/, './src/js/vendor'], // exclude any and all files in the node_modules folder
        use: [{
          loader: "eslint-loader",
          options: {
            formatter: require("eslint/lib/formatters/stylish"),
            camelcase: true,
            emitErrors: false,
            failOnHint: false
          }
        }]
      },
      {
        test: /\.js$/, // include .js files
        enforce: "pre", // preload the jshint loader
        exclude: [/node_modules/, './src/js/vendor'], // exclude any and all files in the node_modules folder
        use: [{
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }]
      },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      {
        test: /\.scss$/,
        //use: bundleExtractPlugin.extract({
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS
          ]
          //})
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=src/css/fonts/[name].[ext]'
      }
    ]
  }
};