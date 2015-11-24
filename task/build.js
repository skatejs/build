var del = require('del');
var galv = require('galvatron');
var gat = require('gulp-auto-task');
var gulp = require('gulp');
var gulpBabel = require('gulp-babel');
var gulpConcat = require('gulp-concat');
var gulpDebug = require('gulp-debug');
var gulpFilter = require('gulp-filter');
var gulpIf = require('gulp-if');
var gulpUglify = require('gulp-uglify');

module.exports = gulp.series(
  function clean (done) {
    return del(['dist', 'lib'], done);
  },
  gulp.parallel(
    function dist () {
      var opts = gat.opts({
        max: false
      });
      var filterOnlySrc = gulpFilter(function (file) {
        return file.path.indexOf('/src/') > -1;
      }, { restore: true });
      return galv.trace('src/global.js').createStream()
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
      return gulp.src(['src/**/*.js', '!src/global.js'])
        .pipe(galv.cache('babel-umd', gulpBabel({ modules: 'umd' })))
        .pipe(gulpDebug({ title: 'lib' }))
        .pipe(gulp.dest('lib'))
    }
  )
);
