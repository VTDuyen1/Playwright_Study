import {test} from '@playwright/test';
import HomePage from '../models/pages/HomePage';
import ProductItemComponent from '../models/components/ProductItemComponent';
import PageBodyComponent from '../models/components/global/PageBodyComponent';

test('Test List  Component In Page', async ({page}) =>{
    await page.goto("https://demowebshop.tricentis.com/ ");
    const homePage: HomePage = new HomePage(page);
    const pageBodyComponent: PageBodyComponent = await homePage.pageBodyComponent(); 
    const productItemComList: ProductItemComponent[] = await pageBodyComponent.productItemComponentList(); 
    for (let productItemComponent of productItemComList) {
        const productTitle = await productItemComponent.productTitle().textContent();
        const productPrice = await productItemComponent.productPrice().textContent();
        console.log(`${productTitle?.trim()}: ${productPrice?.trim()}`);
        
    }
    await page.waitForTimeout(2000);

})