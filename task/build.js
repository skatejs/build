var del = require('del');
var fs = require('fs');
var gat = require('gulp-auto-task');
var gulp = require('gulp');
var gulpBabel = require('gulp-babel');
var gulpRename = require('gulp-rename');
var gulpSourcemaps = require('gulp-sourcemaps');
var gulpUglify = require('gulp-uglify');
var path = require('path');
var report = require('../lib/report');
var rollup = require('rollup');
var rollupBabel = require('rollup-plugin-babel');
var rollupCommonjs = require('rollup-plugin-commonjs');
var rollupNpm = require('rollup-plugin-npm');

var opts = gat.opts();
var tmpFile = 'src/global.js';
var package = require(path.join(process.cwd(), 'package.json'));
var packageMain = package['jsnext:main'] || package.main;
var packageName = package.name;
var noConflictAndGlobal = `
  import main from '../${packageMain}';

  const previousGlobal = window.${packageName};
  main.noConflict = function noConflict () {
    window.${packageName} = previousGlobal;
    return this;
  };
  window.${packageName} = main;

  export default main;
`;

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
            rollupBabel({
              presets: ['../node_modules/skatejs-build/node_modules/babel-preset-es2015-rollup']
            }),
            rollupCommonjs(),
            rollupNpm()
          ]
        }).then(function (bundle) {
          bundle.write({
            dest: 'dist/index.js',
            format: 'umd',
            globals: opts.globals,
            moduleName: package.name,
            sourceMap: true,
            useStrict: false
          }).then(function () {
            done();
          }).catch(function (e) {
            console.log(e);
          });
        });
      },
      function uglify () {
        if (opts.max) {
          return;
        }
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
        .pipe(report(gulpBabel({
          plugins: ['../node_modules/skatejs-build/node_modules/babel-plugin-transform-es2015-modules-umd'],
          presets: ['../node_modules/skatejs-build/node_modules/babel-preset-es2015']
        })))
        .pipe(gulp.dest('lib'));
    }
  )
);
