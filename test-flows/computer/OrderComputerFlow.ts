import { Page, expect } from "@playwright/test";
import defaultCheckoutUserData from "../../test-data/DefaultCheckoutUser.json";
import defaultCheckoutCardData from "../../test-data/DefaultCheckoutCard.json";
import ComputerEssentialComponent from "../../models/components/computer/ComputerEssentialComponent";
import ComputerDetailsPage, { ComputerComponentConstructor } from "../../models/pages/ComputerDetailsPage";
import ShoppingCartPage from "../../models/pages/ShoppingCartPage";
import CheckoutOptionsPage from "../../models/pages/CheckoutOptionsPage";
import CheckoutPage from "../../models/pages/CheckoutPage";
import BillingAddressComponent from "../../models/components/checkout/BillingAddressComponent";
import ShippingAddressComponent from "../../models/components/checkout/ShippingAddressComponent";
import ShippingMethodComponent from "../../models/components/checkout/ShippingMethodComponent";
import PaymentMethodComponent from "../../models/components/checkout/PaymentMethodComponent";
import PAYMENT_METHOD from "../../constants/Payment";
import PaymentInformationComponent from "../../models/components/checkout/PaymentInformationComponent";

/** 
 * locator: expect(locatorTYPE).methodName()
 * generic: expect(actualValue).methodName(expectedValue)
 * for Page: expect(pageTYPE).methodName()
 */

export default class OrderComputerFlow{

    private totalPrice: number;
    private productQuantity: number;
    constructor(
        private readonly page: Page, 
        private readonly computerComponentClass: ComputerComponentConstructor<ComputerEssentialComponent>,
        private readonly computerData: any
    ){
        this.page = page;
        this.computerComponentClass = computerComponentClass;
        this.computerData = computerData; 
    }

    async buildCompSpecAndAddToCart(): Promise <void> {
        //Build computer spec
        const computerDetailsPage: ComputerDetailsPage = new ComputerDetailsPage(this.page);
        const computerComp = computerDetailsPage.computerComp(this.computerComponentClass);
        await computerComp.unselectDefaultOptions();
        const selectedProcessorText = await computerComp.selectProcessorType(this.computerData.processorType);
        const selectedRAMText = await computerComp.selectRAMType(this.computerData.ram);
        const selectedHDDText = await computerComp.selectHDDType(this.computerData.hdd);
        const selectedSoftwareText = await computerComp.selectSoftwareType(this.computerData.software);
        // await computerComp.selectProcessorType("Acrobat Reader");
        console.log(`Additional Price selectedProcessorText: ${this.extractAdditionalPrice(selectedProcessorText)}`);
        console.log(`Additional Price selectedRAMText: ${this.extractAdditionalPrice(selectedRAMText)}`);
        console.log(`Additional Price selectedHDDext: ${this.extractAdditionalPrice(selectedHDDText)}`);

        this.productQuantity = await computerComp.getProductQuantity();

        let additionalOSPrice = 0;
        if(this.computerData.os){
            const selectedOSText = await computerComp.selectOSType(this.computerData.os);
            additionalOSPrice = this.extractAdditionalPrice(selectedOSText); 
        }

        //Calculate current product's price
        const basePrice = await computerComp.getProductPrice();
        const additionalPrices = this.extractAdditionalPrice(selectedProcessorText) +
                                this.extractAdditionalPrice(selectedRAMText)+
                                this.extractAdditionalPrice(selectedHDDText)+
                                 this.extractAdditionalPrice(selectedSoftwareText+
                                    additionalOSPrice
                                 );
        this.totalPrice = (basePrice + additionalPrices) * this.productQuantity;

        console.log(`totalPrice: ${this.totalPrice}`);
        await computerComp.clickOnAddToCartBtn();

        //Handle waiting add to cart
        const barNotificationText = await computerDetailsPage.getBarNotificationText();
        if(!barNotificationText.startsWith("The product has been added")){
            throw new Error('Failed to add product to cart!'); 
        }

        //Navigate to the shopping cart  
        await computerDetailsPage.headerComponent().clickOnShoppingCartLink(); 

        await this.page.waitForTimeout(5000);
    }

    public async verifyShoppingCart(): Promise<void>{
        //Will add assertion statements later
        const shoppingCartPage: ShoppingCartPage  = new ShoppingCartPage(this.page);
        const cartItemRowComponentList = await shoppingCartPage.cartItemRowComponentList();
        const totalComponent = shoppingCartPage.totalComponent();
        for (const cartItemRowComponent of cartItemRowComponentList) {
            const unitPrice = await cartItemRowComponent.unitPrice();
            const quantity = await cartItemRowComponent.quantity();
            const subtTotal = await cartItemRowComponent.subTotal();
            expect(unitPrice * quantity).toBe(subtTotal);
        }
        const priceCatagories = await totalComponent.priceCatagories();
        const subTotal = priceCatagories["Sub-Total:"];
        const shippingFee = priceCatagories["Shipping:"];
        const tax = priceCatagories["Tax:"];
        const total = priceCatagories["Total:"];
        expect(total).toBe(subTotal + shippingFee + tax);
        expect(total).toBe(this.totalPrice);
    }

    public async agreeTOSAndCheckout(): Promise<void>{
        //Will add assertion statements later
        const shoppingCartPage: ShoppingCartPage  = new ShoppingCartPage(this.page);
        await shoppingCartPage.totalComponent().acceptIOS();
        await shoppingCartPage.totalComponent().clickOnCheckoutBtn(); 

        //Exceptional case that the flow step is handling 2 pages
        const checkoutOptionsPage: CheckoutOptionsPage = new CheckoutOptionsPage(this.page);
        await checkoutOptionsPage .checkoutAsGuest();
    }

    public async inputBillingAddress(): Promise<void>{

        const {
            firstName, lastName, email, country, state, city, add1, zipCode, phoneNum
        } = defaultCheckoutUserData;
        //Use the default data
        const checkoutPage: CheckoutPage = new CheckoutPage(this.page);
        const billingAddressComponent: BillingAddressComponent = checkoutPage.billingAddressComponent();
        await billingAddressComponent.selectInputNewAddress(); 
        await billingAddressComponent.inputFirstName(firstName);
        await billingAddressComponent.inputLastName(lastName);
        await billingAddressComponent.selectCountry(country);
        await billingAddressComponent.selectStateProvince(state);
        await billingAddressComponent.inputCity(city);
        await billingAddressComponent.inputEmailAddress(add1);
        await billingAddressComponent.inputZIPCode(zipCode);
        await billingAddressComponent.inputPhoneNumber(phoneNum );
        await billingAddressComponent.inputFirstName(firstName);
    }

    public async inputShippingAddress(): Promise<void>{
        //Use the default data
        const checkoutPage: CheckoutPage = new CheckoutPage(this.page);
        const shippingAddressComponent: ShippingAddressComponent = checkoutPage.shippingAddressComponent();
        await shippingAddressComponent.clickOnContinueBtn(); 
    }

    public async selectShippingMethod(): Promise<void>{
        /**
         * 1. Randomly select a method: Math.floor(Math.random() * Size of InterableData) -> in-range random index
         * 
         * Example:
         * const randomIndex = Math.floor(Math.random() * myArray.length)
         * 
         */ 
    }

    public async selectPaymentMethod(paymentMethod: string){
        const checkoutPage: CheckoutPage = new CheckoutPage(this.page);
        const paymentMethodComponent: PaymentMethodComponent = checkoutPage.paymentInformationComponent();
        switch(paymentMethod){
            case PAYMENT_METHOD.code:
                await paymentMethodComponent.selectCODMethod();
                break;
            case PAYMENT_METHOD.checkMoneyOrder:
                await paymentMethodComponent.selectcheckMoneyOrderMethod();
                break;
            case PAYMENT_METHOD.creditCard:
                await paymentMethodComponent.selectcreditCardMethod();
                break;
            case PAYMENT_METHOD.purchaseOrder:
                await paymentMethodComponent.selectpurchaseOrderMethod();
                break;
        }
        await paymentMethodComponent.clickOnContinueBtn(); 
    }

    public async inputPaymentInformation(creditCardType: string){
        const checkoutPage: CheckoutPage = new CheckoutPage(this.page);
        const paymentInformationComponent: PaymentInformationComponent = checkoutPage.paymentInformationComponent();
        const {
            firstName, lastName
        } = defaultCheckoutUserData;
        const {
            expirationMonth, expirationYear,cardNumber, cardCode
        } = defaultCheckoutCardData;
        await paymentInformationComponent.selectCardType(creditCardType); 
        await paymentInformationComponent.inputCardNumber(cardNumber ); 
        await paymentInformationComponent.inputCardHolderName(firstName + " " + lastName); 
        await paymentInformationComponent.selectExpirationMonth(expirationMonth);
        await paymentInformationComponent.selectExpirationYear(expirationYear);
        await paymentInformationComponent.inputCardCode(cardCode);
        await paymentInformationComponent.clickOnContinueBtn(); 
    }

    public async confirmOrder(){
        await new CheckoutPage(this.page).confirmOrderComponent().clickOnContinueBtn();
    }

    private extractAdditionalPrice(fulltext: string): number{
        const regex = /\+\d+\.\d+/g;
        const matches = fulltext.match(regex);
        if(matches){
            return Number(matches[0].replace('+',''));
        }
        return 0;
    }
}