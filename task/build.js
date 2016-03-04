var babel = require('../lib/babel');
var camelcase = require('camelcase');
var del = require('del');
var fs = require('fs');
var gat = require('gulp-auto-task');
var galv = require('galvatron');
var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var gulpRename = require('gulp-rename');
var gulpSourcemaps = require('gulp-sourcemaps');
var gulpUglify = require('gulp-uglify');
var path = require('path');
var report = require('../lib/report');
var rollup = require('../lib/rollup');

var opts = gat.opts();
var tmpFile = 'src/global.js';
var packageJson = require(path.join(process.cwd(), 'package.json'));
var packageMain = packageJson['jsnext:main'] || packageJson.main;
var packageName = packageJson.name;
var packageNameVar = opts.global || camelcase(packageName);
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

module.exports = gulp.series(
  function cleanBefore () {
    return del(['dist', 'lib', tmpFile]);
  },
  function lib () {
    return gulp.src(['src/**/*.js'])
      .pipe(galv.cache('lib', babel(opts.babel)))
      .pipe(gulp.dest('lib'));
  },
  function createTmp (done) {
    fs.writeFile(tmpFile, new Buffer(noConflictAndGlobal, 'utf-8').toString(), done);
  },
  function dist (done) {
    rollup(tmpFile, {
      dest: 'dist/index.js',
      exports: opts.exports,
      format: opts.format,
      globals: opts.globals,
      jsx: opts.jsx,
      moduleName: packageNameVar
    }, done);
  },
  function removeTmp () {
    return del([tmpFile]);
  },
  opts.max ? function (done) {
    done();
  } : function uglify () {
    return gulp.src('dist/index.js')
      .pipe(gulpRename({ basename: 'index.min' }))
      .pipe(gulpSourcemaps.init())
      .pipe(report(gulpUglify()))
      .pipe(gulpSourcemaps.write('.'))
      .pipe(gulp.dest('dist'));
  },
  function notify (done) {
    gulpUtil.log('Done!');
    done();
  }
);
