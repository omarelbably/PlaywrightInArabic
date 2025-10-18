import BasePage from "../../basePage";

export default class JQueryMenusPage extends BasePage {
  private readonly enabled = this.page.getByRole('link', { name: 'Enabled' });
  private readonly downloads = this.page.getByRole('link', { name: 'Downloads' });
  private option(name: 'PDF' | 'CSV' | 'Excel') { return this.page.getByRole('link', { name }); }

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/jqueryui/menu');
  }

  async openDownloads() {
    await this.enabled.hover();
    await this.downloads.hover();
  }

  async clickOption(name: 'PDF' | 'CSV' | 'Excel') { await this.option(name).click(); }
}
