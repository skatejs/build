var galv = require('galvatron');
var gat = require('gulp-auto-task');
var gulp = require('gulp');
var test = require('./test');
var testBuild = require('./test-build');

module.exports = gulp.series(
  test.create(gat.opts({
    singleRun: false,
    watch: true
  })),
  function watch (done) {
    gulp.watch(['src/**', 'test/**'], testBuild).on('change', galv.cache.expire);
    done();
  }
);
