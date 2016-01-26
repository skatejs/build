var gulpBabel = require('gulp-babel');
var resolve = require('./resolve');
var report = require('./report');

module.exports = function () {
  return report(gulpBabel({
    plugins: resolve('babel-plugin-transform-es2015-modules-umd', 'babel-plugin-syntax-jsx', 'babel-plugin-transform-react-jsx'),
    presets: resolve('babel-preset-es2015')
  }));
};
