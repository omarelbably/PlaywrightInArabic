import BasePage from "../../basePage";
import { expect } from "@playwright/test";

export default class DynamicControlsPage extends BasePage {
  private readonly removeAddButton = this.page.getByRole('button', { name: /Remove|Add/ });
  private readonly enableDisableButton = this.page.getByRole('button', { name: /Enable|Disable/ });
  private readonly input = this.page.locator('#input-example input');
  private readonly message = this.page.locator('#message');
  private readonly loading = this.page.locator('#loading');

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/');
    await this.page.getByRole('link', { name: 'Dynamic Controls' }).click();
  }

  async removeCheckbox() {
    await this.actions.clickOnElement(this.removeAddButton);
    await this.loading.waitFor({ state: 'visible' });
    await this.loading.waitFor({ state: 'hidden' });
    await expect(this.message).toContainText("It's gone!");
  }

  async addCheckbox() {
    await this.actions.clickOnElement(this.removeAddButton);
    await this.loading.waitFor({ state: 'visible' });
    await this.loading.waitFor({ state: 'hidden' });
    await expect(this.message).toContainText("It's back!");
  }

  async enableInput() {
    await this.actions.clickOnElement(this.enableDisableButton);
    await this.loading.waitFor({ state: 'visible' });
    await this.loading.waitFor({ state: 'hidden' });
    await expect(this.message).toContainText("It's enabled!");
    await expect(this.input).toBeEnabled();
  }

  async disableInput() {
    await this.actions.clickOnElement(this.enableDisableButton);
    await this.loading.waitFor({ state: 'visible' });
    await this.loading.waitFor({ state: 'hidden' });
    await expect(this.message).toContainText("It's disabled!");
    await expect(this.input).toBeDisabled();
  }

  async typeInInput(text: string) {
    await this.input.fill(text);
  }
}
