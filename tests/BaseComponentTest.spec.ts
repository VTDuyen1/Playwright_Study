import {test} from '@playwright/test';
import HomePage from '../models/pages/HomePage';
import ProductItemComponent from '../models/components/ProductItemComponent';
import HeaderComponent from '../models/components/global/header/HeaderComponent';
import SearchComponent from '../models/components/global/header/SearchComponent';
import FooterColumnComponent from '../models/components/global/footer/FooterColumnComponent';
import InformationColumnComponent from '../models/components/global/footer/InformationColumnComponent';
import FooterComponent from '../models/components/global/footer/FooterComponent';
import CustomerServiceColumnComponent from '../models/components/global/footer/CustomerServiceColumnComponent';

test('Test Base Component In Page', async ({page}) =>{
    await page.goto("https://demowebshop.tricentis.com/ ");
    const homePage: HomePage = new HomePage(page);
    const footerComponent: FooterComponent = homePage.footerComponent();
    const informationColumnComponent: InformationColumnComponent = footerComponent.informationColumnComponent();
    const customerServiceColumnComponent: CustomerServiceColumnComponent = footerComponent.customerServiceColumnComponent();

    const informationColumnTitle =  informationColumnComponent.title();
    const customerColumnTitle =  customerServiceColumnComponent.title();

    console.log(`Result is: ${informationColumnTitle}: ${customerColumnTitle}`);
    await page.waitForTimeout(2000);

})