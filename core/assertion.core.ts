import { Actions } from './actions.core';
import { WebControl } from './webControl.core';
import { errorLog, logVerification } from './logs.core';
import { expect, Page } from '@playwright/test';
var ignoreCase = require('ignore-case');

/** 
 * All Verification methods required for test case verification.
 * @author Ketan Pardeshi  
 * */
export class Assertion extends Actions {

    constructor(page: Page) {
        super(page);
    }

    /**
   * Verify two objects are equals. 
   * If both objects are equal test case gets passed else fails.
   * 
   * @param object1 First object.
   * @param object2 Second object.
   * Example: 
   * 
   * verifyIsEquals("Invalid username", "Invalid username");
   */

    public verifyIsEquals(object1: any, object2: any) {
        try {
            const verificationResult = object1 === object2 ? "PASSED" : "Failed";
            logVerification(`VERIFICATION: ${verificationResult}. Expected: '${object1}' Actual: '${object2}'`);
            expect(object1).toBe(object2);
        } catch (error1) {
            errorLog("VERIFICATION: FAILED. Expected: '" + object1 + "' Actual: '" + object2 + "'");
            throw error1;
        }
    }

    /**
   * Verify first value contains substring as second. 
   * If expected value is present in actual value then test case gets passsed else failed.
   * 
   * @param expected First object which has .
   * @param actual Second object.
   * Example: 
   * 
   * verifyIsContains("Invalid username Test", "Invalid username");
   */
    public verifyIsContains(actual: string, expected: string) {
        try {
            const verificationResult = actual.trim().includes(expected.trim())? "PASSED" : "Failed";
            logVerification(`VERIFICATION: ${verificationResult}. Actual:  '${actual}'  contains Expected: '${expected.trim()}'`);
            expect(actual.trim()).toContain(expected.trim());
        } catch (error1) {
            errorLog("VERIFICATION: FAILED. Actual: '" + expected + "' contains Expected: '" + actual + "'");
            throw error1;
        }
    }



    /**
   * Verify element's displayed/not displayed status as per expected value
   * If expected element's displayed status is as per expected then test case gets passsed else failed.
   * 
   * @param control Control of which enable or disable status.
   * @param expValue Expected value enabled as true or disabled as false.
   * Example: 
   * 
   * loginBtn = new WebControl(this.page.locator('#login'), 'Login button');
   * 
   * verifyIsEnabled(loginBtn, true);
   */


public async verifyIsDisplayed(control: WebControl, expectedIsDisplayed: boolean = true) {
    await this.waitTillElementIsPresent(control);
    if (expectedIsDisplayed) {
        await this.isDisplayed(control).then(function (value) {
            const verificationResult = value === expectedIsDisplayed ? "PASSED" : "Failed";
            logVerification(`VERIFICATION: ${verificationResult} '${control.controlDescription}' displayed status is '${value}'`);
            expect(value).toBe(expectedIsDisplayed);
        },
        function (reason) {
            errorLog("VERIFICATION: FAILED. '" + control.controlDescription + "' displayed status is: '" + false + "' due to reason: " + reason);
        });
    }
    else {
        this.verifyIsNotDisplayed(control);
    }
}

/**
   * Verify element is not displayed
   * If expected element's displayed status is false the test case gets passed else failed.
   * 
   * @param control Control for which not displayed status need to verify.
   * @param isAlreadyHidden Is control already hidden or need to wait to get hidden.
   * Example: 
   * 
   * loginBtn = new WebControl(this.page.locator('#login'), 'Login button');
   * 
   * verifyIsNotDisplayed(loginBtn, true);
   */


public async verifyIsNotDisplayed(control: WebControl, isAlreadyHidden = false) {
    const element = control.controlLocator;
    if (!isAlreadyHidden) {
        await element.waitFor({ state: "hidden" });
    }
    await control.controlLocator.isHidden().then((value)=>{
        const verificationResult = value === true ? "PASSED" : "Failed";
        logVerification(`VERIFICATION: ${verificationResult}. '${control.controlDescription}'  hidden status is  '${value}'`);
        this.verifyIsEquals(value, true);
    })
}

/**
   * Verify attribute value of the control
   * If elements attribute value is as per expected value then test case gets passed else failed.
   * 
   * @param control Control for which attribute value need to verify.
   * @param attributeName Attribute name.
   * @param attributeValue Expected attribute value
   
   * Example: 
   * 
   * loginBtn = new WebControl(this.page.locator('#login'), 'Login button');
   * 
   * verifyAttributeValue(loginBtn, "value", "Submit");
   */

public async verifyAttributeValue(control: WebControl, attributeName: string, expectedAttributeValue: string) {
    await this.getAttributeValue(control, attributeName).then((value) => {
        const verificationResult = value === expectedAttributeValue ? "PASSED" : "Failed";
        logVerification(`VERIFICATION: ${verificationResult}. Expected:  '${expectedAttributeValue}' Actual :  '${value}'`);
        expect(value).toBe(expectedAttributeValue);
    });

}


/**
   * Verify element's enabled/disabled status as per expected value
   * If expected element's enabled status is as per expected then test case gets passsed else failed.
   * 
   * @param control Control of which enable or disable status.
   * @param expValue Expected value enabled as true or disabled as false.
   * Example: 
   * 
   * loginBtn = new WebControl(this.page.locator('#login'), 'Login button');
   * 
   * verifyIsEnabled(loginBtn, true);
   */


    public async verifyIsEnabled(control: WebControl, expValue: boolean = true) {
        if (expValue == true) {
            await this.page.waitForLoadState("load");
        }
        await control.controlLocator.isEnabled().then((value) => {
            const verificationResult = value === expValue ? "PASSED" : "Failed"; 
            logVerification(`VERIFICATION: ${verificationResult} '${control.controlDescription}' is enable status is: '${value}'`);
            expect(value).toBe(expValue);
        });
    }


    /**
   * Verify element's text as per expected value
   * If expected element's text is as per expected value then test case gets passsed else failed.
   * 
   * @param control Control of which text need to verify.
   * @param expectedText Expected value.
   * Example: 
   * 
   * errorMsg = new WebControl(this.page.locator('#error'), 'Login Error message');
   * 
   * verifyDisplayedText(loginBtn, "Invalid Username Test User");
   */

    public async verifyDisplayedText(control: WebControl, expectedText: string) {
        await this.getText(control).then(function (value) {
            const verificationResult = value.trim() === expectedText.trim()? "PASSED" : "Failed";
            logVerification(`VERIFICATION: '${verificationResult}'. Expected: '${expectedText}'  Actual: '${value}'`);
            expect(value.trim()).toBe(expectedText.trim());
        });
    }


    /**
   * Verify element's text contains partial expected value
   * If expected element's text contains expected value then test case gets passsed else failed.
   * 
   * @param control Control of which text need to verify.
   * @param expectedText Expected partial value.
   * Example: 
   * 
   * errorMsg = new WebControl(this.page.locator('#error'), 'Login Error message');
   * 
   * verifyDisplayedTextContains(loginBtn, "Invalid Username");
   */

    public async verifyDisplayedTextContains(control: WebControl, expectedText: string) {
        await this.getText(control).then(function (value) {
            const verificationResult = value.trim().includes(expectedText.trim()) ? "PASSED" : "Failed";
            logVerification(`VERIFICATION: ${verificationResult}. Expected: '${expectedText.trim()}' is present in Actual:  '${value.trim()}'`);
            expect(value.trim()).toContain(expectedText.trim());
        });
    }


 /**
   * Verify element's text does not contains expected value
   * If expected element's text does not contains expected value then test case gets passsed else failed.
   * 
   * @param control Control of which text need to verify.
   * @param expectedText Expected partial value.
   * Example: 
   * 
   * errorMsg = new WebControl(this.page.locator('#error'), 'Login Error message');
   * 
   * verifyDisplayedTextDoesNotContains(loginBtn, "Enter User");
   */


    public async verifyDisplayedTextDoesNotContains(control: WebControl, expectedText: string) {
        await this.getText(control).then(function (value) {
            const verificationResult = value.trim().includes(expectedText) ? "PASSED" : "Failed";
            logVerification(`VERIFICATION: ${verificationResult}. Expected:  '${expectedText}'  is present in Actual:  '${value}' `);
            expect(false).toBe(value.trim().includes(expectedText.trim()));
        });
    }


    /**
   * Verify element's textbox is equal to expected value
   * If expected element's textbox value to be expected value then test case gets passsed else failed.
   * 
   * @param control Textbox control.
   * @param expectedText Expected value.
   * Example: 
   * 
   * usernameTxtbx = new WebControl(this.page.locator('#username'), 'Username textbox');
   * 
   * verifyTextboxValue(usernameTxtbx, "Test@Adactin");
   */

    public async verifyTextboxValue(control: WebControl, expectedText: string) {
        await control.controlLocator.getAttribute("value").then(function (value) {
            const verificationResult = value === expectedText ? "PASSED" : "Failed";
            logVerification(`VERIFICATION: ${verificationResult}. Expected: '${expectedText}' Actual: '${value}'`);
            expect(value).toEqual(expectedText);
        });
    }

    /**
   * Verify element's checkbox/radio value is equal to expected value
   * If expected element's checkbox/radio value to be expected value then test case gets passsed else failed.
   * 
   * @param control Checkbox/radio control.
   * @param expectedText Expected checkbox/radio value.
   * Example: 
   * 
   * isMinor = new WebControl(this.page.locator('#isMinor'), 'Is Minor checkbox');
   * 
   * verifyCheckboxValue(isMinor, true);
   */

    public async verifyCheckboxValue(control: WebControl, value: boolean) {
        await this.isSelected(control).then(function (isChecked) {
            const verificationResult = value === isChecked ? "PASSED" : "Failed";
            logVerification(`VERIFICATION: ${verificationResult}. Value of '${control.controlDescription}'  Expected:  '${value}'  Actual: '${isChecked}'`);
            expect(isChecked).toBe(value);
        });
    }


    /**
   * Verify element's attribute value contains expected value
   * If element's attribute value contains expected value then test case gets passsed else failed.
   * 
   * @param control Control of which attribute value need to verify.
   * @param attributeName Attribute name
   * @param expectedText Expected partial value.
   * 
   * Example: 
   * 
   * loginBtn = new WebControl(this.page.locator('#login'), 'Login button');
   * 
   * verifyAttributeValueContains(loginBtn, "value", "Submit");
   */

    public async verifyAttributeValueContains(locator: WebControl, attributeName: string, attributeValue: string) {
        await this.getAttributeValue(locator, attributeName).then((value) => {
            if (value != null) {
                const verificationResult = value.includes(attributeValue) ? "PASSED" : "Failed";
                logVerification(`VERIFICATION: ${verificationResult}. Expected: '${attributeValue}' contains Actual : '${value}'`);
            }
            else {
                logVerification(`VERIFICATION: Failed. Expected: '${attributeValue}' does not contains Actual: '${value}'`);
            }
        });
        expect(await this.getAttributeValue(locator, attributeName)).toContain(attributeValue);
    }

    /**
   * Verify element's tagname is equal to expected value
   * If expected element's Tagname is equal to expected value then test case gets passsed else failed.
   * 
   * @param control Checkbox/radio control.
   * @param expectedText Expected checkbox/radio value.
   * Example: 
   * 
   * isMinor = new WebControl(this.page.locator('#isMinor'), 'Is Minor checkbox');
   * 
   * verifyTagName(isMinor, "a");
   */

    public async verifyTagName(control: WebControl, expectedTagName: string) {
        let tagName;
        const parent = control.controlLocator;
        if (parent != null) {
            tagName = await parent.evaluate(e => e.tagName);
        }
        const verificationResult = ignoreCase.equals(tagName, expectedTagName)  ? "PASSED" : "Failed";
        logVerification(`VERIFICATION: '${verificationResult}'. Expected: '${expectedTagName.toLowerCase()}' Actual : '${tagName?.toLowerCase()}'`);
        expect(tagName?.toLowerCase()).toBe(expectedTagName.toLowerCase())
    }


    public async verifyListContainsValue(control: WebControl, valueToVerify: string) {
        const listOfElements = await control.controlLocator.all();
        const count = listOfElements.filter(async function (elem) {
            return await elem.innerText().then(async function (text) {
                return text.trim().includes(valueToVerify);
            });
        }).length;
        const verificationResult = count >= 1 ? "PASSED" : "Failed";
        logVerification(`VERIFICATION: ${verificationResult}. '${valueToVerify}' is Present in list '${control.controlDescription}'`);
        expect(count).toBeGreaterThanOrEqual(1);
    }

    public async verifyListContainsMultipleValues(control: WebControl, listOfValueToVerify: string[], waitTillElementIsDisplayed = true) {
        if (waitTillElementIsDisplayed) {
            await this.waitTillElementIsPresent(control);
        }
        listOfValueToVerify.forEach(async expectedValue => {
            const listOfElements = await control.controlLocator.all();
            const count = listOfElements.filter(async function (element) {
                return await element.innerText().then(async function (text) {
                    return text.trim().includes(expectedValue);
                })
            }).length

            const verificationResult = count >= 1? "PASSED" : "Failed";
            logVerification(`VERIFICATION: ${verificationResult}. '${expectedValue}' is Present in list '${control.controlDescription}'`);
            expect(count).toBeGreaterThanOrEqual(1);
        });
    }

    public async verifyListForMultipleValues(control: WebControl, listOfValueToVerify: string[], waitTillElementIsDisplayed = true) {
        if (waitTillElementIsDisplayed) {
            await this.waitTillElementIsPresent(control);
        }
        const list = await control.controlLocator.all();
        for (let i = 0; i < listOfValueToVerify.length; i++) {
            await list[i].waitFor({state: "visible"});
            await list[i].innerText().then(function (value) {
                const verificationResult = value.trim().includes(listOfValueToVerify[i])? "PASSED" : "Failed";
                logVerification(`VERIFICATION: ${verificationResult}. Expected: '${listOfValueToVerify[i]}' Actual: '${value}'`);
                expect(value.trim()).toContain(listOfValueToVerify[i]);
            });
        }
    }

    /**
   * Verify Alert text is equal to expected value
   * If alert text is equal to expected value then test case gets passsed else failed.
   * 
   * @param expectedText Expected alert text.
   * Example: 
   * 
   * verifyAlertText("Password should be 8 digit.")
   */

    public async verifyAlertText(expectedText: string) {
        this.page.on('dialog', async (dialog) => {
            const verificationResult = dialog.message().includes(expectedText) ? "PASSED" : "Failed";
            logVerification(`VERIFICATION: ${verificationResult}. Expected Alert Text: '${expectedText}' Actual Alert Text: '${dialog.message()}'`);
            expect(dialog.message()).toContain(expectedText);
        });
    }

/**
   * Verify URL contains expected value
   * If URL contains expected value then test case gets passsed else failed.
   * 
   * @param expectedText Expected partial URL.
   * Example: 
   * 
   * verifyURLContains("google.com");
   */

    public async verifyURLContains(subString: string) {
        await this.getURL().then(function (value) {
            const verificationResult = value.includes(subString) ? "PASSED" : "Failed";
            logVerification(`VERIFICATION: ${verificationResult}. URL contains '${subString}' Actual URL: '${value}'`);
            expect(value).toContain(subString);
        });
    }

    /**
   * Verify count of elements which matched the control
   * If count of elements is equal to expected value then test case will get passsed else failed.
   * 
   * @param control Control element.
   * @param expectedCount Expected count of elements matching criteria
   * Example: 
   * 
   * checkboxes = new WebControl(this.page.locator("xpath=//a"), 'checkboxes');
   * verifyCountOfElements(isMinor, 5);
   */

    public async verifyCountOfElements(control: WebControl, expectedCount: number) {
        await control.controlLocator.count().then((value) => {
            const verificationResult = value >= expectedCount ? "PASSED" : "Failed";
            logVerification(`VERIFICATION: ${verificationResult}. '${control.controlDescription}' displayed with Actual count '${value}' Expected: '${expectedCount}'`);
            expect(value).toBeGreaterThanOrEqual(expectedCount);
        });
    }

    /**
   * Verify title of web page contains expected value
   * If title contains expected value then test case will get passsed else failed.
   * 
   * @param expectedText Expected partial Title.
   * Example: 
   * 
   * verifyPageTitleContains("Google");
   */


    public async verifyPageTitleContains(expectedText: string) {
        try {
            await this.page.title().then(function (value) {
                const verificationResult = value.trim().includes(expectedText) ? "PASSED" : "Failed";
                logVerification(`VERIFICATION: ${verificationResult}. Expected: '${expectedText}' is present in title Actual: '${value}'`);
                expect(value.trim()).toContain(expectedText);
            }, function (reason) {
                errorLog('Error : ' + reason);
            });

        } catch (error1) {
            errorLog("VERIFICATION: FAILED. Expected: '" + expectedText + "'is NOT present in title.");
            throw error1;
        }
    }

}


