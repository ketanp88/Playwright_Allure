import { test as base } from '@playwright/test';
import { LoginPage } from '../page/login.pom';
import { SearchHotelPage } from '../page/searchHotel.pom'
import { ExcelUtil } from "../utilityMethods/excelUtil";
import { BasePage } from '../core/basePage.core';

type MyFixtures = {
    loginPage: LoginPage;
    doLogin: LoginPage;
    searchHotelPage: SearchHotelPage;
    excel: ExcelUtil;
    testBase:LoginPage;
  };

  export const test = base.extend<MyFixtures>({

    testBase: async ({ page } , use, testInfo) => {
      BasePage.setTestCaseID(testInfo);
      const loginPage = new LoginPage(page);
      await loginPage.initializeBrowser();
      await use(loginPage);
      BasePage.executionCompleted(testInfo);
    },

    loginPage: async ({ page }  , use, testInfo) => {
      const loginPage = new LoginPage(page);
      await use(loginPage);
    },

    doLogin: async ({ page }  , use, testInfo) => {
      const loginPage = new LoginPage(page);
      await loginPage.doLogin();
      await use(loginPage);
    },

    searchHotelPage: async ({ page }, use, testInfo) => {
        await use(new SearchHotelPage(page));
     },

     excel: async ({ }, use) => {
      //Need to move this to the entries to the configuration file.
      //await use(new ExcelUtil("Test_Excel.xlsx", "Test_Sheet"));
      await use(new ExcelUtil("Test_Excel.xlsx", 0));
   },
  });


