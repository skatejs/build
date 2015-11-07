var galv = require('galvatron');
var gulp = require('gulp');
var gulpBabel = require('gulp-babel');
var gulpConcat = require('gulp-concat');
var gulpDebug = require('gulp-debug');
var gulpRename = require('gulp-rename');
var gulpUglify = require('gulp-uglify');
var merge = require('merge-stream');

function task () {
  merge(
    galv.trace('src/global.js').createStream()
      .pipe(gulpBabel())
      .pipe(galv.globalize())
      .pipe(gulpConcat('index.js'))
      .pipe(gulp.dest('dist'))
      .pipe(gulpUglify())
      .pipe(gulpConcat('index.min.js'))
      .pipe(gulp.dest('dist'))
      .pipe(gulpDebug({ title: 'dist' })),
    galv.trace('src/index.js').createStream()
      .pipe(gulpBabel({ modules: 'umd' }))
      .pipe(gulpRename(function (path) {
        path.dirname = path.dirname.replace(/^src/, '.');
      }))
      .pipe(gulp.dest('lib'))
      .pipe(gulpDebug({ title: 'lib' }))
  );
}
task.dependencies = ['./clean'];
module.exports = task;
