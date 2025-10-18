import BasePage from "../basePage";
import { expect } from "@playwright/test";

export default class CheckoutOverviewPage extends BasePage {
  private readonly title = this.page.locator('span.title', { hasText: 'Checkout: Overview' });
  private readonly itemTotal = this.page.locator('.summary_subtotal_label');
  private readonly tax = this.page.locator('.summary_tax_label');
  private readonly total = this.page.locator('.summary_total_label');
  private readonly cancelBtn = this.page.getByRole('button', { name: /^cancel$/i });
  private readonly finishBtn = this.page.getByRole('button', { name: /^finish$/i });

  async expectLoaded() {
    await expect(this.title).toBeVisible();
  }

  async expectTotalsVisible() {
    await expect(this.itemTotal).toBeVisible();
    await expect(this.tax).toBeVisible();
    await expect(this.total).toBeVisible();
  }

  async cancel() {
    await this.actions.clickOnElement(this.cancelBtn);
  }

  async finish() {
    await this.actions.clickOnElement(this.finishBtn);
  }
}
