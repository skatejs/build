var gulpBabel = require('gulp-babel');
var resolve = require('./resolve');
var report = require('./report');

module.exports = function (opts) {
  opts = opts || {};
  return report(gulpBabel({
    plugins: resolve(
      'babel-plugin-add-module-exports',
      'babel-plugin-syntax-jsx',
      'babel-plugin-transform-es2015-modules-umd',
      ['babel-plugin-transform-react-jsx', opts.jsx]
    ),
    presets: resolve('babel-preset-es2015')
  }));
};
