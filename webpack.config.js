var path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: __dirname + '/client/src/index.jsx',
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname + '/client/dist')
  },
  devServer: {
    contentBase: path.join(__dirname, '/client/dist'),
    proxy: 'http://localhost:3000/',
  },
  resolve: {extensions: ['.js','.jsx']},
};
