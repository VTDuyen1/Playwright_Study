import { Locator } from '@playwright/test';
import {selector} from '../SelectorDecorator';

@selector(".cart-footer .totals")
export default class TotalComponent {
    protected component: Locator;
    private priceTableRowSel = 'table tr';
    private priceTypeSel = '.cart-total-left span';
    private priceValueSel = '.cart-total-right .product-price ';
    private termOfServiceCheckboxSel = '#termofservice';
    private checkoutBtnSel = '#checkout'; 
    protected constructor(component: Locator){
        this.component = component;
    } 

    public async priceCatagories(): Promise<any>{
        /**
         * {
         *      "Sub-Total": 123,
         *      ...
         * }
         */

        let priceCatagories ={};
        const priceTableRowEls = await this.component.locator(this.priceTableRowSel).all();
        for (const tableRowEl of priceTableRowEls) {
            const priceTypeText = await tableRowEl.locator(this.priceTypeSel).textContent() ;
            const priceValueText = await tableRowEl.locator(this.priceValueSel).textContent();
            priceCatagories[priceTypeText] = Number(priceValueText); 
        }
        return priceCatagories; 
    }

    public async acceptIOS(): Promise<void>{
        await this.component.locator(this.termOfServiceCheckboxSel).click();
    }

    public async clickOnCheckoutBtn(): Promise<void>{
        await this.component.locator(this.checkoutBtnSel ).click();
    }



}