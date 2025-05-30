import { Locator } from "@playwright/test";
import ComputerEssentialComponent from "./ComputerEssentialComponent";
import {selector} from '../SelectorDecorator';

@selector(".product-essential")
export default class ChipComputerComponent extends ComputerEssentialComponent{
    constructor(component: Locator){
        super(component);
    }

    async selectProcessorType(type: string): Promise<string>{
        return await this.selectCompOption(type);
    }
    
    async selectRAMType(type: string): Promise<string>{
        return await this.selectCompOption(type);
    }
}