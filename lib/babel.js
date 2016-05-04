var gulpBabel = require('gulp-babel');
var resolve = require('./resolve');
var report = require('./report');

module.exports = function (opts) {
  opts = opts || {};

  var plugins = resolve(
    'babel-plugin-add-module-exports',
    'babel-plugin-syntax-jsx',
    ['babel-plugin-transform-react-jsx', opts.jsx]
  );

  if (opts.umd) {
    plugins.push(resolve('babel-plugin-transform-es2015-modules-umd'));
  }

  return report(gulpBabel({
    plugins: plugins,
    presets: resolve('babel-preset-es2015')
  }));
};