var build = require('./build');
var gulp = require('gulp');

module.exports = gulp.series(
  build,
  function watch (done) {
    gulp.watch('src/**', build);
    done();
  }
);
