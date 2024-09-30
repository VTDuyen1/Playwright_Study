import {Page, test} from '@playwright/test';
import { timeout } from '../playwright.config';
import {getAdParams} from '../utils/AdHelper';
import {scrollToBottom} from '../utils/PageHelper';


const url = "https://the-internet.herokuapp.com/javascript_alerts";
const floatingMenuURL = "https://the-internet.herokuapp.com/floating_menu";
/**
 * Javascript Alert Handdling
 */

test('Handle JS Alert', async ({page}) => {
    page.goto(url);
    const jsAlertBtnEl = page.locator('[onclick="jsAlert()"]');

    //MUST define the event first
    page.on('dialog', async dialog => {
         await dialog.accept();
    })

    //Trigger the js alert
    await jsAlertBtnEl.click();

    await page.waitForTimeout(3000);
     
})

test('Handle JS Confirm', async ({page}) => {
    page.goto(url);
    const jsConfirmBtnEl = page.locator('[onclick="jsConfirm()"]');

    //MUST define the event first
    page.on('dialog', async dialog => {
        console.log(`Alert content is: ${dialog.message()}`); 
        await dialog.dismiss();
    })

    //Trigger the js alert
    await jsConfirmBtnEl.click();

    await page.waitForTimeout(3000);
     
})

test('Handle JS Prompt', async ({page}) => {
    page.goto(url);
    const jsPromptBtnEl = page.locator('[onclick="jsPrompt()"]');

    //MUST define the event first
    page.on('dialog', async dialog => {
        console.log(`Alert content is: ${dialog.message()}`); 
        await dialog.dismiss();
    })

    //Trigger the js alert
    await jsPromptBtnEl.click();

    await page.waitForTimeout(3000);
     
})

test('Handle JS Alert automatically', async ({page}) => {
    page.goto(url);
    const jsAlertBtnEl = page.locator('[onclick="jsAlert()"]');

    //Trigger the js alert
    await jsAlertBtnEl.click();

    await page.waitForTimeout(3000);
     
})


/**
 * Javascript snippet execution
 */
test('Execute JS without parameters', async({page}) => {
    await page.goto(floatingMenuURL);

    //Explore the highlight function
    await page.locator('h3').highlight();

    //Wait 2s
    await page.waitForTimeout(2000);

    //Scroll to bottom
    await page.evaluate(()=>{
        window.scrollTo(0, document.body.scrollHeight);
    });

    //Wait 2s
    await page.waitForTimeout(2000);
    
    //Scroll to top
    await page.evaluate(()=>{
        window.scrollTo(0, 0);
    });
    
    //Wait another 2s
    await page.waitForTimeout(2000);
})

test('Execute JS WITH parameters', async({page}) => {
    await page.goto(floatingMenuURL);

    //Scroll to bottom
    await scrollToBottom(page, 0.5);

    //Wait 2s
    await page. waitForTimeout(2000);
})

test.only('Execute JS and return the value', async({page}) => {
    await page.goto('https://www.foodandwine.com/');
    await page.waitForSelector('div[id="leaderboard-flex-1"]', {timeout: 1000, state: 'visible'});
    await scrollToBottom(page, 1);
    await page.waitForTimeout(1000); 
    const returnAdsValue = await getAdParams(page, 'leaderboard-flex-1');
    console.log(returnAdsValue);
})

/**
 * 
 * Utility methods 
 */
