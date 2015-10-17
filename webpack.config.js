var path = require('path');

module.exports = {
  entry: {
    background: './background.js',
    popup: './popup.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel?stage=0&optional=runtime' }
    ]
  } 
}