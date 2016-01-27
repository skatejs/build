var resolve = require('./resolve');
var rollupBabel = require('rollup-plugin-babel');

module.exports = function (opts) {
  opts = opts || {};
  return rollupBabel({
    plugins: resolve('babel-plugin-syntax-jsx', ['babel-plugin-transform-react-jsx', opts.jsx]),
    presets: resolve('babel-preset-es2015-rollup')
  });
};
