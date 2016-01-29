var build = require('./build');
var galv = require('galvatron');
var gulp = require('gulp');

module.exports = gulp.series(
  build,
  function watch (done) {
    gulp.watch('src/**', build).on('change', galv.cache.expire);
    done();
  }
);
