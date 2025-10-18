import BasePage from "../basePage";
import { expect } from "@playwright/test";

export default class CheckoutInfoPage extends BasePage {
  private readonly title = this.page.locator('span.title', { hasText: 'Checkout: Your Information' });
  private readonly firstName = this.page.getByTestId('firstName');
  private readonly lastName = this.page.getByTestId('lastName');
  private readonly postalCode = this.page.getByTestId('postalCode');
  private readonly continueBtn = this.page.getByRole('button', { name: /^continue$/i });
  private readonly cancelBtn = this.page.getByRole('button', { name: /^cancel$/i });
  readonly error = this.page.locator('[data-test="error"]');

  async expectLoaded() {
    await expect(this.title).toBeVisible();
  }

  async fill(first: string, last: string, postal: string) {
    await this.actions.enterTextToElement(this.firstName, first);
    await this.actions.enterTextToElement(this.lastName, last);
    await this.actions.enterTextToElement(this.postalCode, postal);
  }

  async continue() {
    await this.actions.clickOnElement(this.continueBtn);
  }

  async cancel() {
    await this.actions.clickOnElement(this.cancelBtn);
  }
}
