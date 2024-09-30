import { test } from '@playwright/test';
import ChipComputerComponent from '../../models/components/computer/ChipComputerComponent';
import OrderComputerFlow from '../../test-flows/computer/OrderComputerFlow';
import testData from '../../test-data/computer/CheapComputerData.json';
import ShoppingCartPage from '../../models/pages/ShoppingCartPage';
import PAYMENT_METHOD from '../../constants/Payment';
import CREDIT_CARD_TYPE from '../../constants/CreditCardType';
import TAGS from '../../constants/Tags';

testData.forEach(computerData => {
    test(`${TAGS.smoke} Test Cheap ComputerComponent |RAM: ${computerData.ram}`, async ({ page }) => {
        await page.goto('/build-your-cheap-own-computer', { timeout: 100000 });
        let computerFlow: OrderComputerFlow = new OrderComputerFlow(page, ChipComputerComponent, computerData);
        await computerFlow.buildCompSpecAndAddToCart();
        await computerFlow.verifyShoppingCart();
        await computerFlow.agreeTOSAndCheckout();
        await computerFlow.inputBillingAddress(); 
        await computerFlow.inputShippingAddress(); 
        await computerFlow.selectShippingMethod();
        await computerFlow.selectPaymentMethod(PAYMENT_METHOD.creditCard);
        await computerFlow.inputPaymentInformation(CREDIT_CARD_TYPE.discover);
        await computerFlow.confirmOrder();
    }) 
});