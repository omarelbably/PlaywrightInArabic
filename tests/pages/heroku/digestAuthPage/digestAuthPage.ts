import BasePage from "../../basePage";
import { expect } from "@playwright/test";

export default class DigestAuthPage extends BasePage {
  async navigateWithCreds(username: string, password: string) {
    await this.page.goto(`https://${username}:${password}@the-internet.herokuapp.com/digest_auth`);
  }

  async assertSuccess() {
    await expect(this.page.locator('p')).toContainText('Congratulations!');
  }
}
