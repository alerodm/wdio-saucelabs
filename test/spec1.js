const assert = require('assert');

describe('rotten tomatoes homepage', () => {
  before(() => {
    browser.url('/');
    browser.waitUntil(() => browser.isExisting('#original_rt_logo', 'RT main logo'), 5000);
  });

  it('page title is expected', async () => {
    const actualTitle = browser.getTitle();

    return assert.equal(actualTitle.includes('Rotten Tomatoes: Movies | TV Shows'), true);
  });
});