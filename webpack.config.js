import path from 'path';
import webpack from 'webpack';

export default {
  cache: true,
  entry: {
    background: './js/background.js',
    popup: './js/popup.js',
    vendors: ['react'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel?stage=0&optional=runtime' },
      { test: require.resolve('react'), loader: 'expose?React' },
    ],
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendors', 'vendor.js')
    ],
  }
};