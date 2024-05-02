import { Locator } from "@playwright/test";
/** 
 * Playwright Locator Object wrapped object
 * @author Ketan Pardeshi  
 * */
export class WebControl {
    public controlLocator: Locator;
    public controlDescription: string;

    constructor(controlLocator: Locator, controlDescription: string) {
        this.controlLocator = controlLocator;
        this.controlDescription = controlDescription;
    }

}