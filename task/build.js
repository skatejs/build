var del = require('del');
var galv = require('galvatron');
var gulp = require('gulp');
var gulpBabel = require('gulp-babel');
var gulpConcat = require('gulp-concat');
var gulpDebug = require('gulp-debug');
var gulpFilter = require('gulp-filter');
var gulpUglify = require('gulp-uglify');
var merge = require('merge-stream');

function task () {
  var filterOnlySrc = gulpFilter(function (file) {
    return file.path.indexOf('/src/') > -1;
  }, { restore: true });

  del.sync(['dist', 'lib']);
  merge(
    galv.trace('src/global.js').createStream()
      .pipe(filterOnlySrc)
      .pipe(gulpBabel())
      .pipe(filterOnlySrc.restore)
      .pipe(galv.globalize())
      .pipe(gulpConcat('index.js'))
      .pipe(gulp.dest('dist'))
      .pipe(gulpUglify())
      .pipe(gulpConcat('index.min.js'))
      .pipe(gulp.dest('dist'))
      .pipe(gulpDebug({ title: 'dist' })),
    gulp.src(['src/**/*.js', '!src/global.js'])
      .pipe(gulpBabel({ modules: 'umd' }))
      .pipe(gulpDebug({ title: 'lib' }))
      .pipe(gulp.dest('lib'))
  );
}
module.exports = task;
