var babel = require('../lib/babel');
var gat = require('gulp-auto-task');
var galv = require('galvatron');
var gulp = require('gulp');
var gulpConcat = require('gulp-concat');
var gulpFilter = require('gulp-filter');

var opts = gat.opts({
  unit: {}
});
var coreFiles = ['test/unit.js'];
var extraFiles = opts.unit.files || [];

module.exports = function () {
  var filterOutExtraFiles = gulpFilter(['**'].concat(extraFiles.map(function (file) {
    return '!' + file;
  })), { restore: true });
  return galv.trace(extraFiles.concat(coreFiles)).createStream()
    .pipe(filterOutExtraFiles)
    .pipe(galv.cache('babel', babel(opts.babel)))
    .pipe(galv.cache('globalize', galv.globalize()))
    .pipe(filterOutExtraFiles.restore)
    .pipe(gulpConcat('unit.js'))
    .pipe(gulp.dest('.tmp'));
};
