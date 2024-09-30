import { Page } from "@playwright/test";

//INTRODUCE MAIN INTERACTION METHODS
export default class LoginPageMethod01{

    // Scope to keep element selectors
    private usernameLoc = '#username';
    private passwordLoc = '#password';
    private loginBtnLoc = 'button[type="submit"]';

    // Constructor
    constructor(private page: Page){
        this.page = page;

    }

    // Main interaction methods
    async inputUserName(username: string){
        await this.page.locator(this.usernameLoc).fill(username); 
    }
    async inputPassword(password: string){
        await this.page.locator(this.passwordLoc).fill(password); 
    }
    async clickLoginBtn(){
        await this.page.locator(this.loginBtnLoc).click();
    }
    
}