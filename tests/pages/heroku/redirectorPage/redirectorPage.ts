import BasePage from "../../basePage";

export default class RedirectorPage extends BasePage {
  private readonly link = this.page.getByRole('link', { name: 'here' });
  async navigate() { await this.page.goto('https://the-internet.herokuapp.com/redirector'); }
  async clickLink() { await this.link.click(); }
}
