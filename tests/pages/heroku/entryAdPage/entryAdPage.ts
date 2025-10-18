import BasePage from "../../basePage";
import { expect } from "@playwright/test";

export default class EntryAdPage extends BasePage {
  private readonly modal = this.page.locator('.modal');
  private readonly close = this.page.getByRole('button', { name: 'Close' });
  private readonly here = this.page.getByRole('link', { name: 'click here' });

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/entry_ad');
  }

  async closeModal() {
    await this.close.click();
    await expect(this.modal).toBeHidden();
  }

  async reEnableAndRefresh() {
    await this.here.click();
    await this.page.reload();
  }
}
