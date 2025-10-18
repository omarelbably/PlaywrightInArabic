import BasePage from "../basePage";
import { expect } from "@playwright/test";

export default class ProductDetailsPage extends BasePage {
  private readonly backButton = this.page.getByRole('button', { name: /back to products/i });
  private readonly title = this.page.locator('.inventory_details_name_large');
  private readonly addButton = this.page.getByRole('button', { name: /add to cart/i });

  async expectLoadedWith(name: string) {
    await expect(this.title).toHaveText(name);
  }

  async addToCart() {
    await this.actions.clickOnElement(this.addButton);
  }

  async backToProducts() {
    await this.actions.clickOnElement(this.backButton);
  }
}
