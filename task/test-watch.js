var assign = require('object-assign');
var galv = require('galvatron');
var gulp = require('gulp');
var test = require('./test');
var testBuild = require('./test-build');
var _ = require('lodash');

module.exports = function (done) {
  test.call(assign({
    singleRun: false,
    watch: true
  }, this), done);
  gulp.watch(['src/**', 'test/**'])
    .on('change', galv.cache.expire)
    .on('change', testBuild);
};
