var path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: __dirname + '/client/src/index.jsx',
  devtool: 'source-map',

  module: {
    rules: [
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ['style-loader', 'css-loader']},
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '/client/dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, '/client/dist'),
    port: 8080,
    // Send API requests on localhost to API server get around CORS.
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
      },
    },
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css'],
  },
};
