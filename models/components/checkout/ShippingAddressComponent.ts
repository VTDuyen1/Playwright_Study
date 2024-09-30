import { Locator } from '@playwright/test';
import {selector} from '../SelectorDecorator';

@selector("#opc-shipping")
export default class ShippingAddressComponent {
    protected component: Locator;
    private readonly continueBtnSel = 'input[value="Continue"]';

    protected constructor(component: Locator){
        this.component = component;
    } 

    //TODO: use the knowledge in pre lessons to remove this duplication 
    public async clickOnContinueBtn(): Promise<void>{
        await this.component.locator(this.continueBtnSel).click();
        await this.component.locator(this.continueBtnSel).waitFor({state: "hidden", timeout: 5 * 1000}); 
    } 


}