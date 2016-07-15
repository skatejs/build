const camelCase = require('camelcase');
const path = require('path');
const webpack = require('webpack');
const pkg = require(path.join(process.cwd(), 'package.json'));
const shouldMininimize = process.argv.indexOf('--min') !== -1;
const standardConfig = {
  devtool: 'source-map',
  entry: {
    'dist/index-with-deps.js': './src/index.js',
    'dist/index-with-deps.min.js': './src/index.js',
  },
  output: {
    path: './',
    filename: '[name]',
    libraryTarget: 'umd',
    library: pkg['build:global'] || camelCase(pkg.name),
    sourceMapFilename: '[file].map',
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css',
    }, {
      test: /\.less$/,
      loader: 'style!css!less',
    }, {
      loader: 'babel-loader',
      test: /\.js$/,
      query: {
        presets: ['babel-preset-es2015', 'babel-preset-react'],
      },
    }],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
    }),
  ],
};

if (shouldMininimize) {
  Object.assign(standardConfig.entry, {
    'dist/bundle.min.js': './src/index.js',
  });
}

module.exports = standardConfig;
