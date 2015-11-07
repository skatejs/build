var assign = require('lodash/object/assign');
var Server = require('karma').Server;
var testBuild = require('./test-build');

module.exports = function (done) {
  var args = [];
  opts = assign({
    singleRun: true,
    watch: false,
    browsers: ['Firefox', 'Chrome'].join(',')
  }, this);

  if (opts.grep) {
    args.push('--grep');
    args.push(opts.grep);
  }

  var config = {
    autoWatch: opts.watch,
    browsers: opts.browsers.split(','),
    client: { args: args },
    frameworks: ['mocha', 'sinon-chai'],
    singleRun: opts.singleRun,
    files: [
      '.tmp/unit.js'
    ]
  };

  if (opts.saucelabs) {
    var saucelabsLaunchers = require('../lib/saucelabs-launchers');
    config = assign(config, {
      sauceLabs: {
        testName: 'Skate unit tests (master)',
        recordScreenshots: false,
        connectOptions: {
          verbose: true,
          verboseDebugging: true
        }
      },
      customLaunchers: saucelabsLaunchers,
      browsers: Object.keys(saucelabsLaunchers),
      captureTimeout: 120000,
      reporters: ['saucelabs', 'dots'],
      autoWatch: false,
      concurrency: 5,
      client: {}
    });
  }

  testBuild(opts)
    .on('error', function (e) {
      throw e;
    })
    .on('end', function () {
      new Server(config, function finishTaskAndExit (exitCode) {
        done();
        process.exit(exitCode);
      }).start();
    });
};
