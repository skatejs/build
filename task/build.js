var del = require('del');
var fs = require('fs');
var gat = require('gulp-auto-task');
var gulp = require('gulp');
var gulpBabel = require('gulp-babel');
var gulpConcat = require('gulp-concat');
var gulpDebug = require('gulp-debug');
var gulpFilter = require('gulp-filter');
var gulpIf = require('gulp-if');
var gulpUglify = require('gulp-uglify');
var path = require('path');
var rollup = require('rollup');
var rollupCommonjs = require('rollup-plugin-commonjs');
var rollupNpm = require('rollup-plugin-npm');

var tmpFile = 'src/global.js';
var package = require(path.join(process.cwd(), 'package.json'));
var packageMain = package['jsnext:main'] || package.main;
var packageName = package.name;
var noConflictAndGlobal = `
  import main from '../${packageMain}';

  const previousGlobal = window.${packageName};
  main.noConflict = function noConflict () {
    window.${packageName} = previousGlobal;
    return this;
  };
  window.${packageName} = main;

  export default main;
`;

module.exports = gulp.series(
  function cleanBefore () {
    return del(['dist', 'lib', tmpFile]);
  },
  function tmp (done) {
    fs.writeFile(tmpFile, new Buffer(noConflictAndGlobal, 'utf-8').toString(), done);
  },
  gulp.parallel(
    function dist (done) {
      var opts = gat.opts();
      rollup.rollup({
        entry: tmpFile,
        plugins: [
          rollupCommonjs({ include: 'node_modules/**' }),
          rollupNpm({ jsnext: true, main: true })
        ]
      }).then(function (bundle) {
        bundle.write({
          dest: 'dist/index.js',
          format: 'umd',
          globals: opts.globals,
          moduleName: package.name,
          sourceMap: true,
          useStrict: false
        }).then(function () {
          done();
        });
      });
    },
    function lib () {
      return gulp.src(['src/**/*.js'])
        .pipe(gulpBabel({ modules: 'umd' }))
        .pipe(gulpDebug({ title: 'lib' }))
        .pipe(gulp.dest('lib'));
    }
  ),
  function cleanAfter () {
    return del([tmpFile]);
  }
);
