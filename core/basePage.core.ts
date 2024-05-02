import { Page, TestInfo } from '@playwright/test';
import { URLData } from '../Models/Framework/URLData';
import { FileReader } from '../utilityMethods/template-reader';
import { logAction, logTestResult } from './logs.core';
import { Configuration } from './configuration.core';
import { allure } from "allure-playwright";
/** 
 * Browser Initilization
 * @author Ketan Pardeshi  
 * */
export class BasePage {

    protected page: Page;
    constructor(page: Page) {
        this.page = page;
    }
 /**
   * This will Initilize browser and open URL as per 
   * given environment(ExecutionSettings.json) 
   * and URL provided in AppConfigurations.json
   */
    public async initializeBrowser()
    {    
        const urlDetails: URLData[] = new FileReader().readBrowserURLDetails();
        let url = Configuration.get("URL");
        
        await this.page.goto(url, { 
                waitUntil: "load",
                timeout: 20000
            }).then(() => {
                logAction("Navigated to URL: " + url);
        });
    }

    public static setTestCaseID(testInfo: TestInfo, testCaseID: number = 0) {
        testInfo.testId = testCaseID.toString();
        logTestResult('');
        logTestResult("===== START Of Execution For TestCase ID: " + testInfo.testId +" Title: '" + testInfo.title + "' ======");
        logTestResult('');
        allure.epic(testInfo.title);
        allure.id(testInfo.testId);
    }

    public static executionCompleted(testinfo: TestInfo) {
        logTestResult('');
        logTestResult("===== END Of Execution For Test Case: '" + testinfo.title + "' With Test Result: '" + testinfo.status?.toUpperCase() + "' =====");
        logTestResult('');
    }



}
