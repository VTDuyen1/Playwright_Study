import { Page } from "@playwright/test";
import ProductItemComponent from "../components/ProductItemComponent";
import HeaderComponent from "../components/global/header/HeaderComponent";
import PageBodyComponent from "../components/global/PageBodyComponent";
import FooterComponent from "../components/global/footer/FooterComponent";

export default class HomePage{

    constructor(private page: Page){
        this.page = page;
    }

    // searchComponent(): SearchComponent{
    //     return new SearchComponent(this.page.locator(SearchComponent.selector)); 
    // }

    headerComponent(): HeaderComponent{
        return new HeaderComponent(this.page.locator(HeaderComponent.selector));
    } 

    pageBodyComponent(): PageBodyComponent{
        return new PageBodyComponent(this.page.locator(PageBodyComponent.selector)); 
    }

    footerComponent(): FooterComponent{
        return new FooterComponent(this.page.locator(FooterComponent.selector)); 
    }
}


