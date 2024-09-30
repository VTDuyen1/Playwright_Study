import {test} from '@playwright/test';

test('Link test - XPATH', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/');
    // const footerLinkEl = await page.locator('//a[contains(text(), "Elemental")]');
    const footerLinkEl = await page.waitForSelector('//a[contains(text(), "Elemental_teo")]', {timeout: 10000});
    await footerLinkEl.click();
    await page.waitForTimeout(1000);

});

test('Link test - CSS', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/');
    // const footerLinkEl = await page.locator('//a[contains(text(), "Elemental")]');
    const footerLinkEl = await page.locator('a:has-text("Elemental")');
    await footerLinkEl.click();
    await page.waitForTimeout(1000);

});

test('Link test - Filter', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/');
    // const footerLinkEl = await page.locator('//a[contains(text(), "Elemental")]');
    const footerLinkEl = await page.locator('a').filter({hasText: "Elemental"});

    await footerLinkEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    await footerLinkEl.click();
    await page.waitForTimeout(2000);

});

test('Multiple matching', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/');
    // const footerLinkEl = await page.locator('//a[contains(text(), "Elemental")]');
    const footerLinkEl = await page.locator('a').elementHandles();
    await footerLinkEl[10].click();
    await page.waitForTimeout(2000);
});

test ('Handle login form', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/');
    
    // Navigating to login form
    await page.locator('a').filter({hasText: "Form Authentication"}).click();
    await page.waitForLoadState("domcontentloaded");
    
    //Form interaction
    await page.locator('#username').fill('duyen@vu.com');
    await page.locator('#password').fill('duyen@vu.com');
    await page.waitForTimeout(2000);
    await page.locator('button[type="submit"]').click();
    await page.waitForLoadState("domcontentloaded");

    //
    await page.waitForTimeout(2000);

});

test.only('Element attribute, page tile, url... ', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/');
    
    // Navigating to login form
    await page.locator('a').filter({hasText: "Form Authentication"}).click();
    await page.waitForLoadState("domcontentloaded");
    
    //Form interaction
    await page.locator('#username').fill('duyen@vu.com');
    await page.locator('#password').fill('duyen@vu.com');
    await page.waitForTimeout(2000);
    await page.locator('button[type="submit"]').click();
    await page.waitForLoadState("domcontentloaded");

    
    //Get text
    const textContent = await page.locator('h4').textContent();  //=> Chi hien thi text hien tren ui
    const innerText = await page.locator('h4').innerText();  //=> Hien thi ca nhung text da bi hidden di roi

    console.log(textContent);
    console.log(innerText);
    
    //
    await page.waitForTimeout(2000);
});


/**
 * 
*/