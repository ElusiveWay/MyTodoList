const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(svg|png|jpe?g)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
};

module.exports = config;