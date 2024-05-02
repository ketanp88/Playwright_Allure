import { test } from './setupFixtures';
import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import * as path from 'path';
import { BasePage } from '../core/basePage.core';
const credentials = require('../testData/loginData.json');

test.describe('Login Page scenarios using data provider', async () => {

  // Data Provider using simple array from json file

  for(let i =0; i<credentials.length; i++)
  {
      test("Verify error message for invalid credentials with username as " + credentials[i].username+" and password as " + credentials[i].password, async ({testBase, loginPage}, testInfo) => {
          await loginPage.loginWithUsernameAndPassword(credentials[i].username, credentials[i].password);
          await loginPage.verifyInvalidCredentialsErrorMessage();
      });
  }
  
  // Data Provide by reading data from CSV file

  const records = parse(fs.readFileSync(path.join(__dirname, '../testData/LoginDetails.csv')), {
        columns: true,
        skip_empty_lines: true
    });

  for (const record of records) {
    test(`Verify error message for invalid credentials username as ${record.Username} and password as ${record.Password}`, async ({testBase, loginPage}, testInfo) => {
        await loginPage.loginWithUsernameAndPassword(record.Username, record.Password);
        await loginPage.verifyInvalidCredentialsErrorMessage();
    });
  }
  
    // Data provider by reading data from excel file

    test('Verify error message for invalid credentials', async ({ testBase, excel, loginPage }, testInfo) => {
      let filePath = __dirname + './../testData/LoginDetails.xlsx';
      let testData = await excel.readDataProviderTestDataFromExcel(filePath);
      for (const data of testData) {
          BasePage.setTestCaseID(testInfo);
          await loginPage.loginWithUsernameAndPassword(data.Username, data.Password);
          await loginPage.verifyInvalidCredentialsErrorMessage();
          BasePage.executionCompleted(testInfo);
      }
    });
  
});


