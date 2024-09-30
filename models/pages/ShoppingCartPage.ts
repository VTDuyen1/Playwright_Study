import { Page } from "@playwright/test";
import ProductItemComponent from "../components/ProductItemComponent";
import HeaderComponent from "../components/global/header/HeaderComponent";
import PageBodyComponent from "../components/global/PageBodyComponent";
import FooterComponent from "../components/global/footer/FooterComponent";
import CartItemRowComponent from "../components/cart/CartItemRowComponent";
import TotalComponent from "../components/cart/TotalComponent";

export default class ShoppingCartPage {

    constructor(private page: Page){
        this.page = page;
    }

    public async cartItemRowComponentList(): Promise<CartItemRowComponent[]>{
        const CartItemRowComponents = await this.page.locator(CartItemRowComponent.selectorValue).all();
        return CartItemRowComponents.map(comp => new CartItemRowComponent(comp));
    }

    public totalComponent(): TotalComponent{
        return new TotalComponent(this.page.locator(TotalComponent.selectorValue));
    }

}


