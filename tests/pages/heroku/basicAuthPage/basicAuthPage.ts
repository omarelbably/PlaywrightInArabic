import BasePage from "../../basePage";
import { expect } from "@playwright/test";

export default class BasicAuthPage extends BasePage {
  async navigateWithCreds(username: string, password: string) {
    await this.page.goto(`https://${username}:${password}@the-internet.herokuapp.com/basic_auth`);
  }

  async assertSuccess() {
    await expect(this.page.locator('p')).toContainText('Congratulations!');
  }
}
