var babel = require('../lib/babel');
var galv = require('galvatron');
var gulp = require('gulp');
var gulpConcat = require('gulp-concat');
var gulpFilter = require('gulp-filter');

module.exports = function () {
  var filterEverythingExceptWebcomponents = gulpFilter(function (file) {
    return file.path.indexOf('webcomponents.js') === -1;
  }, { restore: true });
  return galv.trace('test/unit.js').createStream()
    .pipe(filterEverythingExceptWebcomponents)
    .pipe(galv.cache('babel', babel()))
    .pipe(filterEverythingExceptWebcomponents.restore)
    .pipe(galv.cache('globalize', galv.globalize()))
    .pipe(gulpConcat('unit.js'))
    .pipe(gulp.dest('.tmp'));
};
