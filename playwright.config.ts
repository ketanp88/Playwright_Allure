import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const config: PlaywrightTestConfig = {
  //testDir: './tests', '',

  testMatch: [
       "loginIn.e2e.test.*",
       "searchHotel.e2e.test.*",
       "dataProvider.e2e.*",
       "excelSampleTest.*",
       "getCommands.api.test.*",
       "postCommands.api.test.*",
       "patchCommands.api.test.*",
       "putCommands.api.test.*"
  ],

  /* Maximum time one test can run for. */
  timeout: 200 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10000
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */


  reporter: [
    ['html', { open: 'never', outputFolder: 'ExecutionResult'}],
    ['junit', { outputFile: './TestExecutionXML/TestExecutionResult.xml' }],
    [
      "allure-playwright",
      {
        detail: true,
        outputFolder: "allure-results",
        suiteTitle: true,
      },
    ],
],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 10000,
    /* Base URL to use in actions like `await page.goto('/')`. */
     // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless : false,
  },
  reportSlowTests: null,
  
  globalSetup: './core/global.setup',
  globalTeardown: './core/global.tearDown',
    
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Chrome',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
      },
    },
    {
      name: 'Android_Chrome',
      use: {
        ...devices['Pixel 5'],
        browserName: 'chromium',
      },
    },
    {
      name: 'Firefox',
      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
        launchOptions: {
          args: ["--kiosk"]
        }
      },
    },
    {
      name: 'Safari',
      use: {
        ...devices['Desktop Safari'],
        browserName: 'webkit',
      },
    },
    {
      name: 'iPhone',
      use: {
        ...devices['iPhone 13 Pro Max'],
        browserName: 'webkit',
      },
    },
    {
      name: 'API',
      use: {
        baseURL: 'https://gorest.co.in/public/v2/',
        extraHTTPHeaders: {
          "Authorization": "Bearer 123b934dd48340c191d0ee731fac0f54e122ac016798c5dba1bec7f5200ed2b1",
        }
      },
      
    },
  ],
};

export default config;
