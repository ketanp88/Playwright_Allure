import { WebControl } from "../core/webControl.core";
import { Page, Locator } from "@playwright/test";
import { MethodBase } from "./methodBase.pom";
import { LoginData } from "../Models/Framework/LoginData";
import { FileReader } from '../utilityMethods/template-reader';


export class LoginPage extends MethodBase {

    constructor(page: Page) {
        super(page);
    }

    usernameTxtbx = new WebControl(this.page.locator("#username"), 'Username textbox');
    passwordTxtbx = new WebControl(this.page.locator('#password'), 'Password textbox');
    loginBtn = new WebControl(this.page.locator('#login'), 'Login button');
    invalidCredentials = new WebControl(this.page.locator("xpath=//div[@class='auth_error']"), "Invalid Credentials error message");

    
    public async doLogin(account: string = 'Normal QA')
    {
        const userDetails: LoginData[] = new FileReader().readUserLoginDetails();
        const loginUser = userDetails.find(function (p) { return p.accountType == account });
        if(loginUser?.username)
            await this.type(this.usernameTxtbx, loginUser.username);
        if(loginUser?.password)
            await this.type(this.passwordTxtbx, loginUser?.password);
        await this.click(this.loginBtn);
    }

    public async loginWithUsernameAndPassword(username: string, password: string)
    {
        await this.type(this.usernameTxtbx, username);
        await this.type(this.passwordTxtbx, password);
        await this.click(this.loginBtn);
    }

    public async verifySuccessfulLogin()
    {
        await this.verifyIsDisplayed(this.helloUsernameLabel);
    }

    public async verifyInvalidCredentialsErrorMessage()
    {
        await this.verifyDisplayedTextContains(this.invalidCredentials, "Invalid Login details or Your Password might have expired.");
    }



}
