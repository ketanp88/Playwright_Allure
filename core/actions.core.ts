import { Page } from "@playwright/test";
import { BasePage } from "./basePage.core";
import { logAction, consoleLog, errorLog } from "./logs.core";
import { WebControl } from "./webControl.core";

/** 
 * All wrapper methods over playwright actions methods with logger.
 * @author Ketan Pardeshi  
 * */

export class Actions extends BasePage {

    constructor(page: Page) {
        super(page);
    }
  /**
   * Click on an element.
   * 
   * @param WebControl Control on which user want to click.
   * 
   * Example: 
   * 
   * loginBtn = new WebControl(this.page.locator('#login'), 'Login button');
   * 
   * click(loginBtn);
   */
    public async click(control: WebControl) {
        await control.controlLocator.click().then(() => {
            logAction("Clicked on '" + control.controlDescription + "'");
        }, (error) => {
            errorLog("Unable to click on '" + control.controlDescription+ "'");
        });
    }

    /**
   * Mouse hover on an element.
   * 
   * @param WebControl Control on which user want to mouse hover.
   * 
   * Example: 
   * 
   * loginBtn = new WebControl(this.page.locator('#login'), 'Login button');
   * 
   * mouseHover(loginBtn);
   */
    public async mouseHover(control: WebControl) {
        await control.controlLocator.hover().then(() => {
            logAction("Mouse hover to '" + control.controlDescription+ "'");
        }, (error) => {
            errorLog("Unable to mouse hover on :'" + control.controlDescription+ "'");
        });
    }


  /**
   * Focus on element and press keyboard button.
   * 
   * @param WebControl Control on which user want to focus and perform the keyboard action.
   * @param action Keyboard action which needs to perform.
   * 
   * Example: 
   * 
   * loginBtn = new WebControl(this.page.locator('#login'), 'Login button');
   * 
   * focusAndPressSpace(loginBtn, "Enter");
   */
    public async focusAndPressKeyboardEvent(control: WebControl, action: string) {
        await control.controlLocator.focus();
        await this.pressKeyboardEvent(control, action);
    }

   /**
   * Enter value in textbox control.
   * 
   * @param WebControl Textbox control on which user want to enter value.
   * @param textTobeEntered Value user want to enter in textbox.
   * Example: 
   * 
   * usernameTxtbx = new WebControl(this.page.locator("#username"), 'Username textbox');
   * 
   * type(usernameTxtbx);
   */
    public async type(control: WebControl, textTobeEntered: string) {
        await control.controlLocator.fill(textTobeEntered).then(() => {

            if (control.controlDescription.trim().toLowerCase().endsWith('textbox')) {
                logAction("Entered '" + textTobeEntered + "' in '" + control.controlDescription + "'");
            } else {
                logAction("Entered '" + textTobeEntered + "' in '" + control.controlDescription + "' textbox");
            }
        }, (error) => {
            errorLog("Unable to enter text in '" + control.controlDescription + "' textbox due to reason: " + error);
        });
    }

    /**
   * Press Keyboard event.
   * 
   * @param WebControl Control on which user want perform the keyboard action.
   * @param key Keyboard action which needs to perform.
   * 
   * Example: 
   * 
   * loginBtn = new WebControl(this.page.locator('#login'), 'Login button');
   * 
   * pressKeyboardEvent(loginBtn, "Enter");
   */
    public async pressKeyboardEvent(control: WebControl, key: string) {
        await control.controlLocator.press(key).then(() => {
            logAction("Press Key '" + key.toUpperCase() + "' on '" + control.controlDescription+ "'");
        });
    }
  /**
   * Select dropdown element by value.
   * 
   * @param WebControl Dropdown Control of which value need to be selected.
   * @param optionTobeSelcted Dropdown value which needs to be selected.
   * 
   * Example: 
   * 
   * cityDrpdwn = new WebControl(this.page.locator('#city'), 'City dropdown');
   * 
   * selectFromDropdownByValue(cityDrpdwn, "Sydney");
   */
    public async selectFromDropdownByValue(control: WebControl, optionTobeSelcted: string) {
        control.controlLocator.selectOption({value: optionTobeSelcted}).then(function () {
            logAction("Selected '" + optionTobeSelcted + "' from '" + control.controlDescription + "'");
        }, function () {
            errorLog("'Unable to select '" + optionTobeSelcted + "' from '" + control.controlDescription + "'");
        });
    }

    /**
   * Select dropdown element by text.
   * 
   * @param WebControl Dropdown Control.
   * @param optionTobeSelcted Dropdown text which needs to be selected.
   * 
   * Example: 
   * 
   * cityDrpdwn = new WebControl(this.page.locator('#city'), 'City dropdown');
   * 
   * selectDropDownByText(cityDrpdwn, "Sydney");
   */
    public async selectDropDownByText(control: WebControl, optionTobeSelcted: string) {
        control.controlLocator.selectOption({ label: optionTobeSelcted }).then(() => {
            logAction("Selected '" + optionTobeSelcted + "' from '" + control.controlDescription + "'");
        }, function () {
            errorLog("'Unable to select '" + optionTobeSelcted + "' from '" + control.controlDescription + "'");
        });
    }
    
    /**
   * Select dropdown element by index.
   * 
   * @param WebControl Dropdown Control.
   * @param index Item number which needs to be selected.
   * 
   * Example: 
   * 
   * cityDrpdwn = new WebControl(this.page.locator('#city'), 'City dropdown');
   * 
   * selectFromDropdownByIndex(cityDrpdwn, 1);
   */
    public async selectFromDropdownByIndex(control: WebControl, index: number) {
        control.controlLocator.first().selectOption({index: index}).then(function () {
            logAction("Selected '" + index + "' option from '" + control.controlDescription + "'");
        }, function () {
            errorLog("'Unable to select '" + index + "' option from '" + control.controlDescription + "'");
        });
    }

    /**
   * Select checkbox element.
   * 
   * @param WebControl Checkbox Control .
   * @param expectedCheckboxValue Expected checkbox value. If user want to select checkbox then provide 'true' else 'false'
   * 
   * Example: 
   * 
   * isMinorChkbx = new WebControl(this.page.locator('#Minor'), 'Minor Checkbox');
   * 
   * selectCheckbox(isMinorChkbx, true);
   */

    public async selectCheckbox(control: WebControl, expectedCheckboxValue: boolean = true) {
        await this.waitTillElementIsPresent(control);
        if (expectedCheckboxValue == true) {
            control.controlLocator.first().check().then(() => {
                logAction("Set checkbox value of '" + control.controlDescription + "' as checked");
            });
        }
        else {
            await control.controlLocator.first().uncheck().then(() => {
                logAction("Set checkbox value of '" + control.controlDescription + "' as unchecked");
            });
        }
    }

/**
   * Info to get weather checkbox/Radio element is selected or not.
   * Returns true if element is selected else false
   * 
   * @param WebControl Checkbox Control of which selected value need to retrived.
   * 
   * Example: 
   * 
   * isMinorChkbx = new WebControl(this.page.locator('#Minor'), 'Minor Checkbox');
   * 
   * let checkboxValue = isSelected(isMinorChkbx);
   */
    public async isSelected(control: WebControl) {
        await control.controlLocator.first().isChecked().then(function (value) {
            if (value) {
                consoleLog("'" + control.controlDescription + "' checkbox is selected");
            } else {
                consoleLog("'" + control.controlDescription + "' checkbox is not selected");
            }
        });
        return control.controlLocator.first().first().isChecked();
    }


    /**
   * Info to get wheather element is enabled or not.
   * Returns true if element is enabled else false
   * 
   * @param WebControl Control of which enabled or disabled value need to be retrived.
   * 
   * Example: 
   * 
  * loginBtn = new WebControl(this.page.locator('#login'), 'Login button');
   * 
   * let enabledValue = isEnabled(loginBtn);
   */
    public async isEnabled(control: WebControl) {
        await control.controlLocator.first().isEnabled().then(function (value) {
            if (value) {
                consoleLog("'" + control.controlDescription + "' is enabled");
            } else {
                consoleLog("'" + control.controlDescription + "' is not enabled");
            }
        });
        return control.controlLocator.first().isEnabled();
    }

    /**
   * Info to get wheather element is displayed or not.
   * Returns true if element is displayed else false
   * 
   * @param WebControl Control of which is displayed value need to be retrived.
   * 
   * Example: 
   * 
  *  loginBtn = new WebControl(this.page.locator('#login'), 'Login button');
   * 
   * let displayedValue = isDisplayed(loginBtn);
   */
    public async isDisplayed(control: WebControl) {
        await control.controlLocator.first().isVisible().then(function (value) {
            if (value) {
                consoleLog("'" + control.controlDescription + "' is displayed");
            } else {
                consoleLog("'" + control.controlDescription + "' is not displayed");
            }
        });
        return control.controlLocator.first().isVisible();
    }

/**
   * Read text of an element
   * 
   * @param WebControl Control of which text need to be retrieved.
   * 
   * Example: 
   * 
   * errorMsg = new WebControl(this.page.locator('#Alert'), 'Invalid Credentials Error message');
   * 
   * let errorMessage = getText(errorMsg);
   */
    public async getText(control: WebControl) {
        await control.controlLocator.first().innerText().then(function (value) {
            consoleLog("Value is read from '" + control.controlDescription + "' is: '" + value + "'");
        }, (error) => {
            errorLog("Unable to read the text from '" + control.controlDescription + "' due to reason: " + error)
        });
        return control.controlLocator.first().innerText();
    }

/**
   * Read textbox value of an element
   * 
   * @param WebControl textbox Control.
   * 
   * Example: 
   * 
   * usernameTxtbx = new WebControl(this.page.locator("#username"), 'Username textbox');
   * 
   * let textboxValue = getTextboxValue(usernameTxtbx);
   */

    public async getTextboxValue(control: WebControl) {
        await control.controlLocator.first().inputValue().then(function (value) {
            consoleLog("Value is read from textbox '" + control.controlDescription + "' is: '" + value + "'");
        }, (error) => {
            errorLog("Unable to read the value from '" + control.controlDescription + "' due to reason: " + error)
        });
        return await control.controlLocator.first().inputValue();
    }

   /**
   * Read selected dropdown item.
   * 
   * @param WebControl Dropdown Control.
   * 
   * Example: 
   * 
   * cityDrpdwn = new WebControl(this.page.locator('#City'), 'City dropdown');
   * 
   * let selectedItem = getSelectedItemFromDropdown(cityDrpdwn);
   */

    public async getSelectedItemFromDropdown(control: WebControl) {
        await control.controlLocator.first().inputValue().then(function (value) {
            consoleLog("Value is read from '" + control.controlDescription + "' is: '" + value + "'");
        }, (error) => {
            errorLog("Unable to read the value '" + control.controlDescription + "' due to reason: " + error)
        });
        return await control.controlLocator.first().inputValue();
    }


/**
   * Read attribute value of element.
   * 
   * @param WebControl Control of which attriubute value need to retrieved.
   * @param attributeName Name of attribute.
   * 
   * Example: 
   * 
   * usernameTxtbx = new WebControl(this.page.locator('#username'), 'Username textbox');
   * 
   * let attributeValue = getAttributeValue(usernameTxtbx, "title");
   */
    public async getAttributeValue(control: WebControl, attributeName: string) {
        await control.controlLocator.first().getAttribute(attributeName).then(function (value) {
            consoleLog("Attribute value for '" + control.controlDescription + "' is Attribute name: '" + attributeName + "' Value: '" + value + "'");
            return value;
        }, (reason) => {
            errorLog("Unable to read attribute value from '" + control.controlDescription + "' reason: '" + reason + "'");
        });
        return await control.controlLocator.first().getAttribute(attributeName);
    }

    /**
   * Scroll to an element.
   * 
   * @param WebControl Control on which scroll need to perform.
   * 
   * Example: 
   * 
   * loginBtn = new WebControl(this.page.locator('#login'), 'Login button');
   * 
   * scrollToControl(loginBtn);
   */

    public async scrollToControl(control: WebControl) {
        await control.controlLocator.first().scrollIntoViewIfNeeded();
    }


    /**
   * Navigate back on browser.
   * 
   * Example: 
   * 
   * navigateBack();
   */
    
    public async navigateBack() {
        await this.page.goBack();

    }

   /**
   * Handle web Alert by accepting or dismissing it 
   * 
   * @param action If send parameter as "accept" it accept alert else dismiss it.
   * 
   * Example: 
   * 
   * handleAlert("Accept");
   */

    public async handleAlert(action: string) {
        this.page.on("dialog", async (dialog) => {
            if (action.toLowerCase() === 'accept') {
                await dialog.accept().then(() => {
                    logAction('Alert is accepted');
                    return true;
                });
            } else {
                await dialog.dismiss().then(() => {
                    logAction('Alert is dismissed');
                    return false;
                });
            }
        })
    }

/**
   * Read the web alert message 
   *  
   * Example: 
   * 
   * let alertMsg = getAlertDialogMessage();
   */
    public async getAlertDialogMessage() {
        this.page.on('dialog', async (dialog) => {
            consoleLog('Alert is Displayed with text: ' + dialog.message());
        });
        return this.page.on('dialog', dialog => dialog.message());
    }

    public async findAll(control: WebControl) {
        await this.waitTillElementIsPresent(control);
        const allElements = await control.controlLocator.all();
        return allElements;
    }


/**
   * Read the web URL 
   *  
   * Example: 
   * 
   * let url = getURL();
   */

    public async getURL() {
        return this.page.url();
    }

    /**
   * Read the title of web Page 
   *  
   * Example: 
   * 
   * let title = getTitle();
   */
    public async getTitle() {
        return await this.page.title().then((value) => {
            logAction("Title of the webpage is: '" + value + "'");
        });
    }

   /**
   * Wait till URL contains value 
   *  
   * @param url Wait for URL.
   * 
   * Example: 
   * 
   * waitTillPageURLContains("https://www.google.com/");
   */

    public async waitTillPageURLContains(url: string) {
        try
        {
            return await this.page.waitForURL(url, {
                timeout:10000,
                waitUntil:"load"
            });
        }catch(error){}
    }


    /**
   * Wait till element is present 
   *  
   * @param control Wait for element to be present.
   * 
   * Example: 
   * 
   * usernameTxtbx = new WebControl(this.page.locator('#username'), 'Username textbox');
   * 
   * waitTillElementIsPresent(usernameTxtbx);
   */

    public async waitTillElementIsPresent(control: WebControl) {
        await this.page.waitForLoadState("domcontentloaded");
        try
        {
            await control.controlLocator.waitFor({
                state: "visible",
                timeout:10000
            })
        }catch(error){}
    }


/**
   * Wait till element is attached to the dom
   *  
   * @param control Wait for element to be attached in dom.
   * 
   * Example: 
   * 
   * usernameTxtbx = new WebControl(this.page.locator('#username'), 'Username textbox');
   * 
   * waitTillElementIsAttached(usernameTxtbx);
   */

    public async waitTillElementIsAttached(control: WebControl) {
        await this.page.waitForLoadState("domcontentloaded");
        try
        {
           await control.controlLocator.waitFor({
                state: "attached",
                timeout:10000
            })
        } catch(error){}
    }


    /**
    * Wait till element is not displayed
    *  
    * @param control WebControl for which wait to get hidden.
    * 
    * Example: 
    * 
    * usernameTxtbx = new WebControl(this.page.locator('#username'), 'Username textbox');
    * 
    * waitTillElementIsNotPresent(usernameTxtbx);
    */
    
    public async waitTillElementIsNotPresent(control: WebControl) {
        try
        {
            await control.controlLocator.waitFor({
                state: "hidden",
                timeout:10000
            })
        } catch(error){}
    }

    /**
    * Wait for execution to stop for given time
    *  
    * @param milliseconds Time for which executed should halt in seconds
    * 
    * Example: 
    * 
    * sleep(10);
    */

    public async sleep(milliseconds: number = 5) {
        return await new Promise(resolve => setTimeout(resolve, milliseconds*1000));
    }

   
}