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

  // Safari latest
  safari_latest: {
    browserName: 'safari',
    version: 'latest',
    platform: 'OS X 10.11'
  },
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

  microsoftedge_latest: {
    browserName: 'microsoftedge',
    platform: 'Windows 10',
    version: 'latest'
  },

  opera_12: {
    browserName: 'opera',
    platform: 'Windows 7',
    version: '12.12'
  },

  iphone: {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: 'latest',
    deviceName: 'iPhone Simulator'
  }
};

Object.keys(browsers).forEach(function(key) {
    browsers[key].base = 'SauceLabs';
});

module.exports = browsers;
