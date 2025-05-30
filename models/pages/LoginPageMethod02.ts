import { Locator, Page } from "@playwright/test";

//INTRODUCING ELEMENTS/LOCATORS
export default class LoginPageMethod01{

    // Scope to keep element selectors
    private usernameLoc = '#username';
    private passwordLoc = '#password';
    private loginBtnLoc = 'button[type="submit"]';

    // Constructor
    constructor(private page: Page){
        this.page = page;

    }

    // Return the found elements
    username(): Locator{
        return this.page.locator(this.usernameLoc);
    }
    password(): Locator{
        return this.page.locator(this.passwordLoc);
    }
    loginBtn(): Locator{
        return this.page.locator(this.loginBtnLoc);
    }
    
}