import BasePage from "../../basePage";

export default class TyposPage extends BasePage {
  private readonly paragraph = this.page.locator('#content p');
  async navigate() { await this.page.goto('https://the-internet.herokuapp.com/typos'); }
  async text(): Promise<string> { return (await this.paragraph.innerText()).trim(); }
}
