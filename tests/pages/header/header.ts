import BasePage from "../basePage";
import { expect } from "@playwright/test";

export default class Header extends BasePage {
  private readonly cartLink = this.page.locator('a.shopping_cart_link');
  private readonly cartBadge = this.page.locator('.shopping_cart_badge');
  private readonly openMenuButton = this.page.getByRole('button', { name: /open menu/i });

  async openCart() {
    await this.actions.clickOnElement(this.cartLink);
  }

  async openMenu() {
    await this.actions.clickOnElement(this.openMenuButton);
  }

  async expectCartCount(count: number) {
    if (count === 0) {
      await expect(this.cartBadge).toHaveCount(0);
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }
}
