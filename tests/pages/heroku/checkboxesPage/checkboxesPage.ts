import BasePage from "../../basePage";
import { Locator } from "@playwright/test";

export default class CheckboxesPage extends BasePage {
  private readonly checkboxes: Locator = this.page.locator('#checkboxes input[type="checkbox"]');

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/');
    await this.page.getByRole('link', { name: 'Checkboxes' }).click();
  }

  private getCheckbox(index: number): Locator {
    return this.checkboxes.nth(index);
  }

  async toggle(index: number) {
    await this.getCheckbox(index).click();
  }

  async isChecked(index: number): Promise<boolean> {
    return this.getCheckbox(index).isChecked();
  }

  async count(): Promise<number> {
    return this.checkboxes.count();
  }
}
