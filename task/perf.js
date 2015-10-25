var assign = require('lodash/object/assign');
var galv = require('galvatron');
var gulp = require('gulp');
var gulpBabel = require('gulp-babel');
var gulpConcat = require('gulp-concat');
var gulpFilter = require('gulp-filter');
var Server = require('karma').Server;

var filterEverythingExceptWebcomponents = gulpFilter(['**/*','!**/webcomponents.js/**/*'], { restore: true });

module.exports = function (opts, done) {
  var args = [];
  opts = assign({
    browsers: 'Firefox'
  }, opts);

  if (opts.grep) {
    args.push('--grep');
    args.push(opts.grep);
  }

  return gulp.src(['test/perf.js'])
    .pipe(galv.trace())
    .pipe(filterEverythingExceptWebcomponents)
    .pipe(galv.cache('babel', gulpBabel()))
    .pipe(filterEverythingExceptWebcomponents.restore)
    .pipe(galv.cache('globalize', galv.globalize()))
    .pipe(gulpConcat('perf.js'))
    .pipe(gulp.dest('.tmp'))
    .on('end', function() {
      new Server({
        singleRun: true,
        browserNoActivityTimeout: 1000000,
        browsers: opts.browsers.split(','),
        client: { args: args },
        files: [
          'node_modules/benchmark/benchmark.js',
          '.tmp/perf.js'
        ],
        frameworks: ['mocha', 'sinon-chai']
      }, function finishTaskAndExit (exitCode) {
        done();
        process.exit(exitCode);
      }).start();
    });
};
