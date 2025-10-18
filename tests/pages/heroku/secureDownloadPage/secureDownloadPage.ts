import BasePage from "../../basePage";

export default class SecureDownloadPage extends BasePage {
  private readonly files = this.page.locator('.example a');
  async navigateWithCreds(username: string, password: string) {
    await this.page.goto(`https://${username}:${password}@the-internet.herokuapp.com/download_secure`);
  }
  async clickFirst() { await this.files.first().click(); }
}
