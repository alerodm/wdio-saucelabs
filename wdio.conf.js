exports.config = {
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  specs: [
    './test/*.js'
  ],
  maxInstances: 5,
  capabilities: [
    {
      browserName: 'chrome'
    }
  ],
  sync: true,
  // Level of logging verbosity: silent | verbose | command | data | result | error
  logLevel: 'error',
  coloredLogs: true,
  deprecationWarnings: true,
  bail: 0,
  screenshotPath: './screenshots',
  baseUrl: 'https://www.rottentomatoes.com/',
  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ['sauce'],
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 20000
  },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  before: (capabilities, specs) => {
    // save pointers to native commands that will be overriden
    browser._isExisting = browser.isExisting;

    browser.addCommand('sauceContext', (content) => {
      browser.execute(`sauce:context=${content}`);
    });

    // re-define isExisting to add support for a friendly name of the selector
    browser.addCommand('isExisting', function (selector, friendlyName) {
      browser.sauceContext(`Check for "${friendlyName}" to be present`);

      return browser._isExisting.call(this, selector);
    }, true);
  },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  beforeCommand: (commandName, args) => {
    switch (commandName) {
      case 'waitUntil':
        browser.sauceContext('Wait Condition');
        break;
    }
  }
}
