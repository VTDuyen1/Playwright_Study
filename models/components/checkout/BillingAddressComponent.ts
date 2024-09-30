import { Locator } from '@playwright/test';
import {selector} from '../SelectorDecorator';

@selector("#opc-billing")
export default class BillingAddressComponent {
    protected component: Locator;
    private readonly inputAddressDropdownSel = '#billing-address-select';
    private readonly firstNameSel = '#BillingNewAddress_FirstName';
    private readonly lastNameSel = '#BillingNewAddress_LastName';
    private readonly emailAddressSel = '#BillingNewAddress_Email';
    private readonly countryDropdownSel = '#BillingNewAddress_CountryId';
    private readonly stateProvinceDropdownSel = '#BillingNewAddress_StateProvinceId';
    private readonly citySel = '#BillingNewAddress_City';
    private readonly add1Sel = '#BillingNewAddress_Address1';
    private readonly zipcodeSel = '#BillingNewAddress_ZipPostalCode';
    private readonly phoneNumSel = '#BillingNewAddress_PhoneNumber';
    private readonly continueBtnSel = 'input[value="Continue"]';


    protected constructor(component: Locator){
        this.component = component;
    } 

    public async selectInputNewAddress(){
        const inputSelectDropdownEle = await this.component.locator(this.inputAddressDropdownSel);
        const isUsingExistingAddDropdownDisplayed = await inputSelectDropdownEle.count() > 0;
        if(isUsingExistingAddDropdownDisplayed){
            await inputSelectDropdownEle .selectOption({label: "New Address"}); 
        }
    }

    public async inputFirstName(firsname: string): Promise<void>{
        await this.component.locator(this.firstNameSel ).fill(firsname);
    }

    public async inputLastName(lastName: string): Promise<void>{
        await this.component.locator(this.lastNameSel ).fill(lastName);
    }

    public async inputEmailAddress(emailAddress: string): Promise<void>{
        await this.component.locator(this.emailAddressSel ).fill(emailAddress);
    }

    public async selectCountry(country: string): Promise<void>{
        await this.component.locator(this.countryDropdownSel).selectOption({label: country});
    }

    public async selectStateProvince(stateProvince: string): Promise<void>{
        await this.component.locator(this.stateProvinceDropdownSel).selectOption({label: stateProvince})
    }

    public async inputCity(cityName: string): Promise<void>{
        await this.component.locator(this.citySel).fill(cityName);
    }
     
    public async inputZIPCode(zipCode: string): Promise<void>{
        await this.component.locator(this.zipcodeSel ).fill(zipCode);
    }
     
    public async inputPhoneNumber(phoneNum: string): Promise<void>{
        await this.component.locator(this.phoneNumSel ).fill(phoneNum);
    }
     
    public async clickOnContinueBtn(): Promise<void>{
        await this.component.locator(this.continueBtnSel).click();
        await this.component.locator(this.continueBtnSel).waitFor({state: "hidden", timeout: 5 * 1000}); 
    }

    

}