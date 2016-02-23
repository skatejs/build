var versions = {
    chrome: {
        current: 48,
        back: 44
    },
    firefox: {
        current: 44,
        back: 38
    },
    safari: {
        current: 9,
        back: 6
    },
    'internet explorer': {
        current: 11,
        back: 9
    },
    opera: {
        current: 12,
        back: 12
    }
};

var browsers = {
  // Chrome latest
  chrome_latest_linux: {
    browserName: 'chrome',
    platform: 'Linux'
  },
  chrome_latest_windows: {
    browserName: 'chrome',
    platform: 'Windows 10'
  },
  chrome_latest_osx: {
    browserName: 'chrome',
    platform: 'OS X 10.11'
  },

  // Firefox latest
  firefox_latest_linux: {
    browserName: 'firefox',
    platform: 'Linux'
  },
  firefox_latest_windows: {
    browserName: 'firefox',
    platform: 'Windows 10'
  },
  firefox_latest_osx: {
    browserName: 'firefox',
    platform: 'OS X 10.11'
  },

  // Safari latest
  safari_latest_osx: {
    browserName: 'safari',
    platform: 'OS X 10.11'
  },

  internet_explorer_latest: {
    browserName: 'internet explorer'
  },

  microsoftedge_latest: {
    browserName: 'microsoftedge',
    platform: 'Windows 10'
  },
  opera_latest: {
    browserName: 'opera'
  }
};

Object.keys(versions).forEach(function(browserName) {
    var v = versions[browserName];
    for(var current = --v.current; current >= v.back; current--) {
        browsers[(browserName + ' ' + current).replace(/ /g, '_')] = {
            browserName: browserName,
            version: current
        };
    }
});

Object.keys(browsers).forEach(function(key) {
    browsers[key].base = 'SauceLabs';
});

module.exports = browsers;
