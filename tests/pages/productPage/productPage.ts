import BasePage from "../basePage";

export default class ProductPage extends BasePage{
    private readonly sauceLabsBackpackAddToCartBtn = this.page.locator('[id="add-to-cart-sauce-labs-backpack"]');
    private readonly cartBtn = this.page.locator('[id="shopping_cart_container"]');

    async clickOnAddToCartBtn(){
        await this.actions.clickOnElement(this.sauceLabsBackpackAddToCartBtn);
    }
    async clickOnCartBtn(){
        await this.actions.clickOnElement(this.cartBtn);
    }

}