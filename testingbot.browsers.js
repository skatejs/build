// Check out https://testingbot.com/support/getting-started/browsers.html for all browser possibilities
const tbBrowsers = {
  // iOS
  // ipad: {
  //   platform: 'CAPITAN',
  //   version: '9.3',
  //   browserName: 'safari',
  //   deviceName: 'iPad 2',
  //   platformName: 'iOS',
  //   deviceOrientation: 'portrait',
  // },

  // Important: make sure mobile browsers are first,
  // to avoid viewport overflow isses after lots of
  // browsers are run.

  // Chrome
  chrome_latest_windows: {
    browserName: 'chrome',
    platform: 'WIN10',
  },
  chrome_latest_osx: {
    browserName: 'chrome',
    platform: 'CAPITAN',
  },
  chrome_latest_1: {
    browserName: 'chrome',
    platform: 'CAPITAN',
    version: '51',
  },
  chrome_latest_2: {
    browserName: 'chrome',
    platform: 'CAPITAN',
    version: '50',
  },
  chrome_latest_3: {
    browserName: 'chrome',
    platform: 'CAPITAN',
    version: '49',
  },
  chrome_latest_4: {
    browserName: 'chrome',
    platform: 'CAPITAN',
    version: '48',
  },

  // Firefox
  firefox_latest_windows: {
    browserName: 'firefox',
    platform: 'WIN10',
  },
  firefox_latest_osx: {
    browserName: 'firefox',
    platform: 'CAPITAN',
  },
  firefox_latest_1: {
    browserName: 'firefox',
    platform: 'CAPITAN',
    version: '47',
  },
  firefox_latest_2: {
    browserName: 'firefox',
    platform: 'CAPITAN',
    version: '46',
  },
  firefox_latest_3: {
    browserName: 'firefox',
    platform: 'CAPITAN',
    version: '45',
  },
  firefox_latest_4: {
    browserName: 'firefox',
    platform: 'CAPITAN',
    version: '44',
  },
  firefox_latest_5: {
    browserName: 'firefox',
    platform: 'CAPITAN',
    version: '43',
  },
  firefox_latest_6: {
    browserName: 'firefox',
    platform: 'CAPITAN',
    version: '42',
  },

  // Safari (<= 8 is severely crippled)
  safari_latest: {
    browserName: 'safari',
    platform: 'CAPITAN',
  },

  // IE
  internet_explorer_9: {
    browserName: 'internet explorer',
    platform: 'VISTA',
    version: '9',
  },
  internet_explorer_10: {
    browserName: 'internet explorer',
    platform: 'WIN8',
    version: '10',
  },
  internet_explorer_11: {
    browserName: 'internet explorer',
    platform: 'WIN10',
    version: '11',
  },

  // Edge
  microsoftedge_latest: {
    browserName: 'microsoftedge',
    platform: 'WIN10',
  },

  // Opera
  opera_latest: {
    browserName: 'opera',
    platform: 'WIN10',
  },
};

Object.keys(tbBrowsers).forEach((key) => {
  tbBrowsers[key].base = 'TestingBot';
});

module.exports = tbBrowsers;
