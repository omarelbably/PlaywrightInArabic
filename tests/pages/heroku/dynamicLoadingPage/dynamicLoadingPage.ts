import BasePage from "../../basePage";
import { expect } from "@playwright/test";

export default class DynamicLoadingPage extends BasePage {
  private readonly startButton = this.page.getByRole('button', { name: 'Start' });
  private readonly finish = this.page.locator('#finish');

  async navigate(example: 1 | 2) {
    await this.page.goto(`https://the-internet.herokuapp.com/dynamic_loading/${example}`);
  }

  async startAndWaitForHello() {
    await this.actions.clickOnElement(this.startButton);
    await expect(this.finish).toHaveText('Hello World!', { timeout: 10000 });
  }
}
