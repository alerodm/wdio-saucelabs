# WebdriverIO + Saucelabs Example

* Includes one passing test that runs on Saucelabs using Chrome browser.
* Uses `addCommand` to add a new command that uses Saucelabs anotations to improve logging when needed.
* Uses `addCommand` to override native `isExisting` command for logging purposes.
* Uses `beforeCommand` hook as another alternative to add logging for builtin commands.

### Setup

Install dependencies:
```bash
npm install
```

Export your Saucelabs credentials to ENV variables `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY`.

### Execution

```bash
npm test
````