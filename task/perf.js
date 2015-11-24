var assign = require('lodash/object/assign');
var galv = require('galvatron');
var gat = require('gulp-auto-task');
var gulp = require('gulp');
var gulpBabel = require('gulp-babel');
var gulpConcat = require('gulp-concat');
var gulpFilter = require('gulp-filter');
var Server = require('karma').Server;

var benchFilter = gulpFilter(['**', '!**/benchmark.js'], { restore: true });
var filterEverythingExceptWebcomponents = gulpFilter(['**/*','!**/webcomponents.js/**/*'], { restore: true });

module.exports = function (done) {
  var args = [];
  var opts = assign({
    browsers: 'Firefox'
  }, gat.opts());

  if (opts.grep) {
    args.push('--grep');
    args.push(opts.grep);
  }

  gulp.src(['node_modules/benchmark/benchmark.js', 'test/perf.js'])
    .pipe(galv.trace())
    .pipe(benchFilter)
    .pipe(filterEverythingExceptWebcomponents)
    .pipe(galv.cache('babel', gulpBabel()))
    .pipe(filterEverythingExceptWebcomponents.restore)
    .pipe(galv.cache('globalize', galv.globalize()))
    .pipe(gulpConcat('perf.js'))
    .pipe(gulp.dest('.tmp'))
    .pipe(benchFilter.restore)
    .on('end', function() {
      new Server({
        singleRun: true,
        browserNoActivityTimeout: 1000000,
        browsers: opts.browsers.split(','),
        client: { args: args },
        files: [
          '.tmp/perf.js'
        ],
        frameworks: ['mocha', 'sinon-chai']
      }, function finishTaskAndExit (exitCode) {
        done();
        process.exit(exitCode);
      }).start();
    });
};
