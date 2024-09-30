import {test} from '@playwright/test';
import { timeout } from '../playwright.config';

test('Handle Dropdown Options', async({page})=>{

    const dropDownEl = await page.locator('#dropdown');
    await dropDownEl.selectOption({index: 1});
    await dropDownEl.selectOption({value: '2'});
    await dropDownEl.selectOption({label: 'Option 1'})
})

test('Test Handle IFrame', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/iframe');
    const iframeEl = await page.frameLocator('iframe[id^="mce"]');
    const editTextAreaEl = await page.locator('body > p'); 
    await editTextAreaEl.click();
    await editTextAreaEl.clear();
    await editTextAreaEl.fill('New Content'); 
    
    //Interact with the main frame's element
    const footerLinkEl = await page.locator('a:has-text("Elemental")');
    await footerLinkEl.click();
    await page.waitForTimeout(2000);
    
});

test('Mouse hover and narrow down searching scope', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/hovers');
    const allFigureEls = await page.locator('.figure').all();
    for(const figureFile of allFigureEls){
        const imgFig = await figureFile.locator('img');
        await imgFig.hover();
        await page.waitForTimeout(2000);
    } 
})

test.only('Checking element status and handle dynamic states', async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    
    const checkboxComp = await page.locator('#checkbox-example'); 
    const inputExampleComp = await page.locator('#input-example'); 
    
    const checkboxEl = await checkboxComp.locator('#checkbox input');
    const isEnable = await checkboxEl.isEnabled();
    let isSelected = await checkboxEl.isChecked();
    
    if(!isSelected){
        await checkboxEl.click();
    }
    let isSelectedAfter = await checkboxEl.isChecked();
    if(!isSelectedAfter){
        await checkboxEl.click();
    }

    const removeBtnEl = await checkboxComp.locator('button');
    await removeBtnEl.click();
    await page.waitForSelector('#checkbox-example #checkbox input', {state: 'hidden', timeout: 1 * 5000})
    await page.waitForTimeout(2000);

})