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
var tmpFile = 'lib/global.js';
var package = require(path.join(process.cwd(), 'package.json'));
var packageMain = package['jsnext:main'] || package.main;
var packageName = package.name;
var packageNameVar = opts.global || camelcase(packageName);
var noConflictAndGlobal = `
  import main from '../${package.main}';

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
  function createTmp () {
    fs.writeFileSync(tmpFile, new Buffer(noConflictAndGlobal, 'utf-8').toString());
    return gulp.src(tmpFile)
      .pipe(galv.cache('lib-global', babel(opts.babel)))
      .pipe(gulp.dest('lib'));
  },
  function dist (done) {
    rollup(tmpFile, {
      dest: 'dist/index.js',
      globals: opts.globals,
      moduleName: packageName
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
