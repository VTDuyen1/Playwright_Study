import { Locator } from "@playwright/test";
import InformationColumnComponent from "./InformationColumnComponent";
import CustomerServiceColumnComponent from "./CustomerServiceColumnComponent";

export default class FooterComponent{
    public static selector: string = '.footer';

    constructor(private component: Locator){
        this.component = component;
    }

    informationColumnComponent(): InformationColumnComponent{
        return new InformationColumnComponent(this.component.locator(InformationColumnComponent.selector));
    }
    
    customerServiceColumnComponent(): CustomerServiceColumnComponent{
        return new CustomerServiceColumnComponent(this.component.locator(CustomerServiceColumnComponent.selector));
    }
}