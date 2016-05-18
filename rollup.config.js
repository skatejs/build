const rollupBabel = require('rollup-plugin-babel');
const rollupCommonjs = require('rollup-plugin-commonjs');
const rollupNodeResolve = require('rollup-plugin-node-resolve');
const rollupUglify = require('rollup-plugin-uglify');
const path = require('path');
const pkg = require(path.join(process.cwd(), 'package.json'));
const shouldMinify = process.argv.indexOf('--min') !== -1;
const babel = rollupBabel({
  presets: require('babel-preset-es2015-rollup')
});
const plugins = [
  babel,
  rollupCommonjs(),
  rollupNodeResolve()
];

if (shouldMinify) {
  plugins.push(rollupUglify());
}

const entry = pkg['jsnext:main'] || pkg.main || 'src/index.js';
const moduleName = pkg['build:global'] || pkg.name;
const pkgVersion = pkg.version;

const outro = `
var previousGlobal = window.${moduleName};
exports.noConflict = function () {
  window.${moduleName} = previousGlobal;
  return this;
};
exports.version = '${pkgVersion}';
`;

module.exports = {
  dest: `dist/index${shouldMinify ? '.min' : ''}.js`,
  entry,
  exports: 'named',
  format: 'umd',
  moduleName,
  outro,
  plugins,
  sourceMap: true,
  useStrict: false
};
