const camelcase = require('camelcase');
const rollupBabel = require('rollup-plugin-babel');
const rollupCommonjs = require('rollup-plugin-commonjs');
const rollupNodeResolve = require('rollup-plugin-node-resolve');
const rollupUglify = require('rollup-plugin-uglify');
const path = require('path');
const pkg = require(path.join(process.cwd(), 'package.json'));
const shouldMinify = process.argv.indexOf('--min') !== -1;
const presetEs2015 = require('babel-preset-es2015-rollup');

const babel = rollupBabel({
  presets: presetEs2015,
  plugins: ['transform-flow-strip-types']
});
const plugins = [
  babel,
  rollupCommonjs(),
  rollupNodeResolve(),
];

if (shouldMinify) {
  plugins.push(rollupUglify());
}

const externalDeps = Object.assign({}, pkg.dependencies, pkg.peerDependencies);
const deps = Object.keys(externalDeps);
const entry = pkg['jsnext:main'] || pkg.main || 'src/index.js';
const moduleName = pkg['build:global'] || camelcase(pkg.name);

module.exports = {
  dest: `dist/index${shouldMinify ? '.min' : ''}.js`,
  entry,
  exports: 'named',
  external: id => deps.indexOf(id) > -1,
  format: 'umd',
  moduleName,
  plugins,
  sourceMap: true,
  useStrict: false,
};
