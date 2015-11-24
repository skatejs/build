var build = require('./build');
var gulp = require('gulp');
var gulpWebserver = require('gulp-webserver');

module.exports = gulp.series(
  build,
  gulp.parallel(
    function server () {
      return gulp.src('.tmp/docs').pipe(gulpWebserver({
        host: '*',
        livereload: false,
        open: true
      }));
    },
    function watch (done) {
      gulp.watch('docs/**', build);
      done();
    }
  )
);
