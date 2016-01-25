var del = require('del');
var fs = require('fs');
var galv = require('galvatron');
var gat = require('gulp-auto-task');
var gulp = require('gulp');
var gulpBabel = require('gulp-babel');
var gulpConcat = require('gulp-concat');
var gulpDebug = require('gulp-debug');
var gulpFilter = require('gulp-filter');
var gulpIf = require('gulp-if');
var gulpUglify = require('gulp-uglify');
var path = require('path');

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
  function cleanBefore (done) {
    return del(['dist', 'lib', tmpFile], done);
  },
  function tmp (done) {
    fs.writeFile(tmpFile, new Buffer(noConflictAndGlobal, 'utf-8').toString(), done);
  },
  gulp.parallel(
    function dist () {
      var opts = gat.opts({
        max: false
      });
      var filterOnlySrc = gulpFilter(function (file) {
        return file.path.indexOf('/src/') > -1;
      }, { restore: true });
      return galv.trace(tmpFile).createStream()
        .pipe(filterOnlySrc)
        .pipe(galv.cache('babel', gulpBabel()))
        .pipe(filterOnlySrc.restore)
        .pipe(galv.cache('globalize', galv.globalize()))
        .pipe(gulpConcat('index.js'))
        .pipe(gulp.dest('dist'))
        .pipe(gulpIf(!opts.max, gulpUglify()))
        .pipe(gulpConcat('index.min.js'))
        .pipe(gulp.dest('dist'))
        .pipe(gulpDebug({ title: 'dist' }));
    },
    function lib () {
      return gulp.src(['src/**/*.js'])
        .pipe(galv.cache('babel-umd', gulpBabel({ modules: 'umd' })))
        .pipe(gulpDebug({ title: 'lib' }))
        .pipe(gulp.dest('lib'));
    }
  ),
  function cleanAfter (done) {
    del([tmpFile], done);
  }
);
