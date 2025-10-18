import BasePage from "../../basePage";

export default class ABTestingPage extends BasePage {
  private readonly header = this.page.locator('h3');
  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/abtest');
  }
  async headerText(): Promise<string> {
    return (await this.header.innerText()).trim();
  }
}
