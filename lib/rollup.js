var assign = require('object-assign');
var rollup = require('rollup');
var rollupCommonjs = require('rollup-plugin-commonjs');
var rollupNpm = require('rollup-plugin-npm');

module.exports = function (main, opts, done) {
  opts = assign({
    exports: 'default',
    format: 'umd',
    sourceMap: true,
    useStrict: false
  }, opts);

  return rollup.rollup({
    entry: main,
    plugins: [ rollupCommonjs(), rollupNpm() ],
  }).catch(console.log).then(function (bundle) {
    bundle.write(opts).catch(console.log).then(function () {
      done();
    });
  });
};
