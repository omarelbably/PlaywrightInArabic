import BasePage from "../../basePage";

export default class JavascriptErrorPage extends BasePage {
  async navigate() { await this.page.goto('https://the-internet.herokuapp.com/javascript_error'); }
}
