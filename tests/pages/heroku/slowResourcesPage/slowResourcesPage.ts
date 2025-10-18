import BasePage from "../../basePage";

export default class SlowResourcesPage extends BasePage {
  async navigate() { await this.page.goto('https://the-internet.herokuapp.com/slow'); }
}
