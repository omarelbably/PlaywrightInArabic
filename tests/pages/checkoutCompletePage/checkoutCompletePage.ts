import BasePage from "../basePage";
import { expect } from "@playwright/test";

export default class CheckoutCompletePage extends BasePage {
  private readonly title = this.page.locator('span.title', { hasText: 'Checkout: Complete!' });
  private readonly header = this.page.getByRole('heading', { name: /thank you for your order/i });
  private readonly backHome = this.page.getByRole('button', { name: /^back home$/i });

  async expectLoaded() {
    await expect(this.title).toBeVisible();
    await expect(this.header).toBeVisible();
  }

  async backToInventory() {
    await this.actions.clickOnElement(this.backHome);
  }
}
