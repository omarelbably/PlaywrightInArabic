import BasePage from "../../basePage";
import { expect } from "@playwright/test";

export default class TinyMCEPage extends BasePage {
  async navigate() { await this.page.goto('https://the-internet.herokuapp.com/tinymce'); }
  async type(text: string) {
    const body = this.page.frameLocator('#mce_0_ifr').locator('body#tinymce');
    await body.evaluate((el: HTMLElement) => (el.innerHTML = ''));
    await body.click();
    await body.fill(text);
    await expect(body).toContainText(text);
  }
}
