import BasePage from "../basePage";
import { expect } from "@playwright/test";

export default class CartPage extends BasePage {
  private readonly title = this.page.locator('span.title', { hasText: 'Your Cart' });
  private readonly checkoutButton = this.page.getByRole('button', { name: /^checkout$/i });

  async expectLoaded() {
    await expect(this.title).toBeVisible();
  }

  async expectItemsPresent(names: string[]) {
    for (const n of names) {
      await expect(this.page.locator('.cart_item .inventory_item_name', { hasText: n })).toBeVisible();
    }
  }

  async remove(name: string) {
    const row = this.page.locator('.cart_item').filter({ has: this.page.getByText(name) });
    await this.actions.clickOnElement(row.getByRole('button', { name: /^remove$/i }));
  }

  async checkout() {
    await this.actions.clickOnElement(this.checkoutButton);
  }
}
