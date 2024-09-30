import { Locator } from '@playwright/test';
import {selector} from '../SelectorDecorator';

@selector("#opc-payment_method")
export default class PaymentMethodComponent {
    protected component: Locator;
    private codSel = '[value="Payments.CashOnDelivery"]';
    private checkMoneyOrderSel = '[value="Payments.CheckMoneyOrder"]';
    private creditCardSel = '[value="Payments.Manual"]';
    private purchaseOrderSel = '[value="Payments.PurchaseOrder"]';
    private continueBtn = 'input[class*="payment-method-next-step-button"]';

    protected constructor(component: Locator){
        this.component = component;
    } 

    public async selectCODMethod(): Promise<void>{
        await this.component.locator(this.codSel).click();
    }

    public async selectcheckMoneyOrderMethod(): Promise<void>{
        await this.component.locator(this.checkMoneyOrderSel).click();
    }

    public async selectcreditCardMethod(): Promise<void>{
        await this.component.locator(this.creditCardSel).click();
    }

    public async selectpurchaseOrderMethod(): Promise<void>{
        await this.component.locator(this.purchaseOrderSel).click();
    }
 
    public async clickOnContinueBtn(): Promise<void>{
        await this.component.locator(this.continueBtn).click();
        await this.component.locator(this.continueBtn).waitFor({state: "hidden", timeout: 5 * 1000}); 
    }  
     
}