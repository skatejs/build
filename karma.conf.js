const webpackConfig = require('./webpack.config');
const sauceBrowsers = {
  // Chrome
  chrome_latest_linux: {
    browserName: 'chrome',
    platform: 'Linux',
    version: 'latest'
  },
  chrome_latest_windows: {
    browserName: 'chrome',
    platform: 'Windows 10',
    version: 'latest'
  },
  chrome_latest_osx: {
    browserName: 'chrome',
    platform: 'OS X 10.11',
    version: 'latest'
  },
  chrome_latest_1: {
    browserName: 'chrome',
    platform: 'Linux',
    version: 'latest-1'
  },
  chrome_latest_2: {
    browserName: 'chrome',
    platform: 'Linux',
    version: 'latest-2'
  },
  chrome_latest_3: {
    browserName: 'chrome',
    platform: 'Linux',
    version: 'latest-3'
  },
  chrome_latest_4: {
    browserName: 'chrome',
    platform: 'Linux',
    version: 'latest-4'
  },

  // Firefox
  firefox_latest_linux: {
    browserName: 'firefox',
    platform: 'Linux',
    version: 'latest'
  },
  firefox_latest_windows: {
    browserName: 'firefox',
    platform: 'Windows 10',
    version: 'latest'
  },
  firefox_latest_osx: {
    browserName: 'firefox',
    platform: 'OS X 10.11',
    version: 'latest'
  },
  firefox_latest_1: {
    browserName: 'firefox',
    platform: 'Linux',
    version: 'latest-1'
  },
  firefox_latest_2: {
    browserName: 'firefox',
    platform: 'Linux',
    version: 'latest-2'
  },
  firefox_latest_3: {
    browserName: 'firefox',
    platform: 'Linux',
    version: 'latest-3'
  },
  firefox_latest_4: {
    browserName: 'firefox',
    platform: 'Linux',
    version: 'latest-4'
  },
  firefox_latest_5: {
    browserName: 'firefox',
    platform: 'Linux',
    version: 'latest-5'
  },
  firefox_latest_6: {
    browserName: 'firefox',
    platform: 'Linux',
    version: 'latest-6'
  },

  // Safari (<= 8 is severely crippled)
  safari_latest: {
    browserName: 'safari',
    version: 'latest',
    platform: 'OS X 10.11'
  },

  // IE
  internet_explorer_11: {
    browserName: 'internet explorer',
    version: '11',
    platform: 'Windows 8.1'
  },
  internet_explorer_10: {
    browserName: 'internet explorer',
    version: '10',
    platform: 'Windows 8'
  },
  internet_explorer_9: {
    browserName: 'internet explorer',
    version: '9',
    platform: 'Windows 7'
  },

  // Edge
  microsoftedge_latest: {
    browserName: 'microsoftedge',
    platform: 'Windows 10',
    version: 'latest'
  },

  // Opera (they don't have Opera latest with Blink)
  opera_12: {
    browserName: 'opera',
    platform: 'Windows 7',
    version: '12.12'
  },

  // iOS
  iphone: {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: 'latest',
    deviceName: 'iPhone Simulator'
  },

  // Android (when they update their images to 43+)
  android: {}
};

Object.keys(sauceBrowsers).forEach(function (key) {
  sauceBrowsers[key].base = 'SauceLabs';
});

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    // setting to process.cwd will make all paths start in current component directory
    basePath: process.cwd(),

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [ 'mocha', 'chai', 'sinon-chai' ],

    // list of files / patterns to load in the browser
    // all dependancies should be traced through here
    files: [ 'test/unit.js' ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // webpack will trace and watch all dependancies
    preprocessors: {
      'test/unit.js': [ 'webpack', 'sourcemap' ]
    },

    // karma watches the test entry points
    // (you don't need to specify the entry option)
    // webpack watches dependencies
    webpack: Object.assign({}, webpackConfig, {
      devtool: 'inline-source-map',
      entry: undefined
    }),

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [ 'progress' ],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE, LOG_ERROR, LOG_WARN, LOG_INFO, LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [ 'Chrome', 'Firefox' ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  }, process.argv.indexOf('--sauce') === -1 ? {} : {
    sauceLabs: {
      testName: 'Unit Tests',
      recordScreenshots: false,
      connectOptions: { verbose: true }
    },
    customLaunchers: sauceBrowsers,
    browsers: Object.keys(sauceBrowsers),
    captureTimeout: 120000,
    reporters: [ 'saucelabs', 'dots' ],
    autoWatch: false,
    concurrency: 5,
    client: {}
  });
};
