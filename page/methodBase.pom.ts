import { Assertion } from "../core/assertion.core";
import { WebControl } from "../core/webControl.core";
import { Page, expect, Locator } from "@playwright/test";

export class MethodBase extends Assertion {

    constructor(page: Page) {
        super(page);
    }

    helloUsernameLabel = new WebControl(this.page.locator("#username_show"), 'Hello username label');
    searchHotelLnk = new WebControl(this.page.locator("#Search Hotel"), "Search Hotel link");
    bookedIternaryLink = new WebControl(this.page.locator("#Booked Itinerary"), "Booked Iternery link");
    changePasswordLink = new WebControl(this.page.locator("#Change Password"), "Change Password link");
    LogoutLink = new WebControl(this.page.locator("#Logout"), "Logout link");


}
