var assign = require('object-assign');
var resolve = require('./resolve');
var rollup = require('rollup');
var rollupBabel = require('rollup-plugin-babel');
var rollupCommonjs = require('rollup-plugin-commonjs');
var rollupNpm = require('rollup-plugin-npm');

module.exports = function (main, opts, done) {
  opts = assign({
    exports: 'default',
    format: 'umd',
    sourceMap: true,
    useStrict: false
  }, opts);

  var babel = rollupBabel({
    plugins: resolve('babel-plugin-syntax-jsx', ['babel-plugin-transform-react-jsx', opts.jsx]),
    presets: resolve('babel-preset-es2015-rollup')
  });

  return rollup.rollup({
    entry: main,
    plugins: [ babel, rollupCommonjs(), rollupNpm() ]
  }).catch(console.log).then(function (bundle) {
    bundle.write(opts).catch(console.log).then(function () {
      done();
    });
  });
};
