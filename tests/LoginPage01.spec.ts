import {test} from '@playwright/test';
import LoginPageMethod01 from '../models/pages/LoginPageMethod01';

test('Test POM method 01 - Introducing main interaction methods', async ({page}) =>{
    const loginPage: LoginPageMethod01 = new LoginPageMethod01(page);
    await page.goto("https://the-internet.herokuapp.com/login");
    await loginPage.inputUserName("tomsmith");
    await loginPage.inputPassword("SuperSecretPassword!");
    await loginPage.clickLoginBtn();
    await page.waitForURL("**/secure");
})