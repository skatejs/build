var babel = require('../lib/babel');
var babelRollup = require('../lib/babel-rollup');
var camelcase = require('camelcase');
var del = require('del');
var fs = require('fs');
var gat = require('gulp-auto-task');
var gulp = require('gulp');
var gulpRename = require('gulp-rename');
var gulpSourcemaps = require('gulp-sourcemaps');
var gulpUglify = require('gulp-uglify');
var path = require('path');
var report = require('../lib/report');
var rollup = require('rollup');
var rollupCommonjs = require('rollup-plugin-commonjs');
var rollupNpm = require('rollup-plugin-npm');

var tmpFile = 'src/global.js';
var package = require(path.join(process.cwd(), 'package.json'));
var packageMain = package['jsnext:main'] || package.main;
var packageName = package.name;
var packageNameVar = camelcase(packageName);
var noConflictAndGlobal = `
  import main from '../${packageMain}';

  const previousGlobal = window.${packageNameVar};
  main.noConflict = function noConflict () {
    window.${packageNameVar} = previousGlobal;
    return this;
  };
  window.${packageNameVar} = main;

  export default main;
`;

var opts = gat.opts();

function log (e) {
  console.log(e);
}

function noop (done) {
  done();
}

module.exports = gulp.series(
  function cleanBefore () {
    return del(['dist', 'lib', tmpFile]);
  },
  gulp.parallel(
    gulp.series(
      function tmp (done) {
        fs.writeFile(tmpFile, new Buffer(noConflictAndGlobal, 'utf-8').toString(), done);
      },
      function dist (done) {
        rollup.rollup({
          entry: tmpFile,
          plugins: [
            babelRollup(opts.babel),
            rollupCommonjs(),
            rollupNpm()
          ]
        }).catch(log).then(function (bundle) {
          bundle.write({
            dest: 'dist/index.js',
            format: 'umd',
            globals: opts.globals,
            moduleName: packageName,
            sourceMap: true,
            useStrict: false
          }).catch(log).then(function () {
            done();
          });
        });
      },
      opts.max ? noop : function uglify () {
        return gulp.src('dist/index.js')
          .pipe(gulpRename({ basename: 'index.min' }))
          .pipe(gulpSourcemaps.init())
          .pipe(report(gulpUglify()))
          .pipe(gulpSourcemaps.write('.'))
          .pipe(gulp.dest('dist'));
      },
      function cleanTmp () {
        return del([tmpFile]);
      }
    ),
    function lib () {
      return gulp.src(['src/**/*.js'])
        .pipe(babel(opts.babel))
        .pipe(gulp.dest('lib'));
    }
  )
);
