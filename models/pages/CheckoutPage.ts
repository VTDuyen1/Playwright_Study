import { Page } from "@playwright/test";
import BillingAddressComponent from "../components/checkout/BillingAddressComponent";

export default class CheckoutPage {
 
    constructor(private page: Page){
        this.page = page;
    }

    public billingAddressComponent(): BillingAddressComponent{
        return new BillingAddressComponent(this.page.locator(BillingAddressComponent.selectorValue));
    }

    public shippingAddressComponent(): ShippingAddressComponent{
        return new ShippingAddressComponent(this.page.locator(ShippingAddressComponent.selectorValue));
    }

    public shippingMethodComponent(): ShippingMethodComponent{
        return new ShippingMethodComponent(this.page.locator(ShippingMethodComponent.selectorValue));
    }

    public paymentInformationComponent(): PaymentInformationComponent{
        return new PaymentInformationComponent(this.page.locator(PaymentInformationComponent.selectorValue));
    }

    public confirmOrderComponent(): ConfirmOrderComponent{
        return new ConfirmOrderComponent(this.page.locator(ConfirmOrderComponent.selectorValue));
    }

    
}


