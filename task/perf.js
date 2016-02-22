var assign = require('lodash/object/assign');
var babel = require('../lib/babel');
var galv = require('galvatron');
var gat = require('gulp-auto-task');
var gulp = require('gulp');
var gulpConcat = require('gulp-concat');
var gulpDebug = require('gulp-debug');
var gulpFilter = require('gulp-filter');
var Server = require('karma').Server;

var opts = gat.opts({
  perf: {}
});

var coreFiles = ['test/perf.js'];
var extraFiles = ['node_modules/skatejs-build/node_modules/benchmark/benchmark.js'].concat(opts.perf.files || []);

module.exports = gulp.series(
  function () {
    var filterOutExtraFiles = gulpFilter(['**'].concat(extraFiles.map(function (file) {
      return '!' + file;
    })), { restore: true });
    return galv.trace(extraFiles.concat(coreFiles)).createStream()
      .pipe(filterOutExtraFiles)
      .pipe(gulpDebug())
      .pipe(galv.cache('babel', babel(opts.babel)))
      .pipe(galv.cache('globalize', galv.globalize()))
      .pipe(filterOutExtraFiles.restore)
      .pipe(gulpConcat('perf.js'))
      .pipe(gulp.dest('.tmp'));
  },
  function (done) {
    var args = [];
    var opts = assign({
      browsers: 'Firefox'
    }, gat.opts());

    if (opts.grep) {
      args.push('--grep');
      args.push(opts.grep);
    }

    new Server({
      singleRun: true,
      browserNoActivityTimeout: 1000000,
      browsers: opts.browsers.split(','),
      client: { args: args },
      files: (opts.perf.scripts || []).concat([
        '.tmp/perf.js'
      ]),
      frameworks: ['mocha', 'sinon-chai']
    }, function finishTaskAndExit (exitCode) {
      done();
      process.exit(exitCode);
    }).start();
  }
);
