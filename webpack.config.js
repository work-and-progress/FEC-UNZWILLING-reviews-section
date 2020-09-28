var path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: __dirname + '/client/src/index.jsx',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },

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
  },
};
