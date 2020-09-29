var path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: __dirname + '/client/src/index.jsx',
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
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
