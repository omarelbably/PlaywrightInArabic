import BasePage from "../../basePage";
import { expect } from "@playwright/test";

export default class ExitIntentPage extends BasePage {
  private readonly modal = this.page.locator('.modal');
  private readonly close = this.page.getByRole('button', { name: 'Close' });

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/exit_intent');
  }

  async triggerExitIntent() {
    await this.page.mouse.move(10, 10);
    await this.page.mouse.move(10, 0);
  }

  async closeModal() {
    await this.close.click();
    await expect(this.modal).toBeHidden();
  }
}
