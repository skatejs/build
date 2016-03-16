var browsers = {
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
    version: 'latest-1'
  },
  chrome_latest_2: {
    browserName: 'chrome',
    version: 'latest-2'
  },
  chrome_latest_3: {
    browserName: 'chrome',
    version: 'latest-3'
  },
  chrome_latest_4: {
    browserName: 'chrome',
    version: 'latest-4'
  },

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
    version: 'latest-1'
  },
  firefox_latest_2: {
    browserName: 'firefox',
    version: 'latest-2'
  },
  firefox_latest_3: {
    browserName: 'firefox',
    version: 'latest-3'
  },
  firefox_latest_4: {
    browserName: 'firefox',
    version: 'latest-4'
  },
  firefox_latest_5: {
    browserName: 'firefox',
    version: 'latest-5'
  },
  firefox_latest_6: {
    browserName: 'firefox',
    version: 'latest-6'
  },

  // Safari latest
  safari_latest: {
    browserName: 'safari',
    version: 'latest'
  },
  safari_latest_1: {
    browserName: 'safari',
    version: 'latest-1'
  },
  safari_latest_2: {
    browserName: 'safari',
    version: 'latest-2'
  },
  safari_latest_3: {
    browserName: 'safari',
    version: 'latest-3'
  },

  internet_explorer_latest: {
    browserName: 'internet explorer',
    version: 'latest'
  },
  internet_explorer_latest_1: {
    browserName: 'internet explorer',
    version: 'latest-1'
  },
  internet_explorer_latest_2: {
    browserName: 'internet explorer',
    version: 'latest-2'
  },

  microsoftedge_latest: {
    browserName: 'microsoftedge',
    platform: 'Windows 10',
    version: 'latest'
  },

  opera_latest: {
    browserName: 'opera',
    version: 'latest'
  }
};

Object.keys(browsers).forEach(function(key) {
    browsers[key].base = 'SauceLabs';
});

module.exports = browsers;
