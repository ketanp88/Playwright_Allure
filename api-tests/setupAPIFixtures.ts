import { test as base, } from '@playwright/test';
import { BasePage } from '../core/basePage.core';
import { APIUtils } from '../utilityMethods/apiUtils';

type MyFixtures = {
    apiUtils: APIUtils;

  };

  export const test = base.extend<MyFixtures>({
    apiUtils: async ({ }, use, testInfo) => {
      BasePage.setTestCaseID(testInfo);
      await use(new APIUtils());
      BasePage.executionCompleted(testInfo);
   },
   
  });
