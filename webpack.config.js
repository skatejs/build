const camelCase = require('camelcase');
const path = require('path');
const webpack = require('webpack');
const pkg = require(path.join(process.cwd(), 'package.json'));
const shouldMininimize = process.argv.indexOf('--min') !== -1;
const plugins = [new webpack.optimize.UglifyJsPlugin({
  include: /\.min\.js$/,
  minimize: true,
})];

if (process.argv.indexOf('--perf')) {
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }));
}

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
      exclude: /node_modules/,
      query: {
        plugins: ['transform-class-properties', 'transform-flow-strip-types'],
        presets: ['babel-preset-es2015', 'babel-preset-react'],
      },
    }],
  },
  plugins
};

if (shouldMininimize) {
  Object.assign(standardConfig.entry, {
    'dist/bundle.min.js': './src/index.js',
  });
}

module.exports = standardConfig;
