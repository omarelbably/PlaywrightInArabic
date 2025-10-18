import BasePage from "../../basePage";

export default class FileDownloadPage extends BasePage {
  private readonly files = this.page.locator('.example a');

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/download');
  }

  async downloadFirst() {
    const [ download ] = await Promise.all([
      this.page.waitForEvent('download'),
      this.files.first().click()
    ]);
    const path = await download.path();
    return { suggested: download.suggestedFilename(), path };
  }
}
