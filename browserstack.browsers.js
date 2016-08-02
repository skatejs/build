const browserstackBrowsers = {
  // iOS
  iphone: {
    os: 'ios',
    os_version: '9.1',
    device: 'iPhone 6S',
  },

  // Important: make sure mobile browsers are first,
  // to avoid viewport overflow isses after lots of
  // browsers are run.

  // Chrome (BrowserStack doesn't support Linux)
  chrome_latest_windows: {
    browser: 'chrome',
    os: 'WINDOWS',
    os_version: '10',
  },
  chrome_latest_osx: {
    browser: 'chrome',
    os: 'OS X',
    os_version: 'El Capitan',
  },
  chrome_latest_1: {
    browser: 'chrome',
    os: 'OS X',
    os_version: 'El Capitan',
    browser_version: '51.0',
  },
  chrome_latest_2: {
    browser: 'chrome',
    os: 'OS X',
    os_version: 'El Capitan',
    browser_version: '50.0',
  },
  chrome_latest_3: {
    browser: 'chrome',
    os: 'OS X',
    os_version: 'El Capitan',
    browser_version: '49.0',
  },
  chrome_latest_4: {
    browser: 'chrome',
    os: 'OS X',
    os_version: 'El Capitan',
    browser_version: '48.0',
  },

  // Firefox (BrowserStack doesn't support Linux)
  firefox_latest_windows: {
    browser: 'firefox',
    os: 'WINDOWS',
    os_version: '10',
  },
  firefox_latest_osx: {
    browser: 'firefox',
    os: 'OS X',
    os_version: 'El Capitan',
  },
  firefox_latest_1: {
    browser: 'firefox',
    os: 'OS X',
    os_version: 'El Capitan',
    browser_version: '45.0',
  },
  firefox_latest_2: {
    browser: 'firefox',
    os: 'OS X',
    os_version: 'El Capitan',
    browser_version: '44.0',
  },
  firefox_latest_3: {
    browser: 'firefox',
    os: 'OS X',
    os_version: 'El Capitan',
    browser_version: '43.0',
  },
  firefox_latest_4: {
    browser: 'firefox',
    os: 'OS X',
    os_version: 'El Capitan',
    browser_version: '42.0',
  },
  firefox_latest_5: {
    browser: 'firefox',
    os: 'OS X',
    os_version: 'El Capitan',
    browser_version: '41.0',
  },
  firefox_latest_6: {
    browser: 'firefox',
    os: 'OS X',
    os_version: 'El Capitan',
    browser_version: '40.0',
  },

  // Safari (<= 8 is severely crippled)
  safari_latest: {
    browser: 'safari',
    os: 'OS X',
    os_version: 'El Capitan',
  },

  // IE (IE 8/9/10 not supported)
  internet_explorer_11: {
    browser: 'ie',
    os: 'WINDOWS',
    os_version: '8.1',
    browser_version: '11',
  },

  // Edge
  microsoftedge_latest: {
    browser: 'edge',
    os: 'WINDOWS',
    os_version: '10',
  },

  // Opera
  opera_12: {
    browser: 'opera',
    os: 'WINDOWS',
    os_version: '8.1',
    browser_version: '12.16',
  },
};

Object.keys(browserstackBrowsers).forEach((key) => {
  browserstackBrowsers[key].base = 'BrowserStack';
});


module.exports = browserstackBrowsers;
